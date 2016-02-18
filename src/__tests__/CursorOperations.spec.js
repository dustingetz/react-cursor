/* global describe, it, expect */
import _ from 'lodash';
import {Cursor, RefCursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe('Cursor updates', () => {
  let cur, storeValue;
  const initialState = {a: {b: 42}, c: [1, 2, 3], d: {foo: 1, bar: 2, baz: {qux: 3}}};


  let suite = {

    'set at leaf': () => {
      expect(storeValue()).to.deep.equal(initialState);
      cur.refine('a', 'b').set(43);
      expect(storeValue().a).to.deep.equal({b: 43});
    },

    'set at object': () => {
      expect(storeValue()).to.deep.equal(initialState);
      cur.refine('a').set({b: 43});
      expect(storeValue().a).to.deep.equal({b: 43});
    },

    'refine and set creates key if non-existent': () => {
      expect(storeValue()).to.deep.equal(initialState);
      expect(storeValue().e).to.equal(undefined);
      let e = {a: {b: 43}, c: [2, 3, 4], d: 44};
      cur.refine('e').set(e);
      expect(storeValue().e).to.deep.equal(e);
    },

    'assoc can append a single new value to the end of an array': () => {
      expect(storeValue()).to.deep.equal(initialState);

      let c = cur.refine('c');
      c.assoc(3, 4);

      expect(storeValue().c).to.deep.equal([1, 2, 3, 4]);

      expect(() => c.assoc(5, '5 is greater than array length')).to.throw(RangeError);
    },

    'assoc replaces array values': () => {
      expect(storeValue()).to.deep.equal(initialState);

      let c = cur.refine('c');
      c.assoc(0, 'a');

      expect(storeValue().c).to.deep.equal(['a', 2, 3]);

      c.assoc(1, 'b', 2, 'c');
      expect(storeValue().c).to.deep.equal(['a', 'b', 'c']);
    },

    'assoc creates new object key values': () => {
      expect(storeValue()).to.deep.equal(initialState);

      let a = cur.refine('a');
      a.assoc('a', 21);
      expect(storeValue().a).to.deep.equal({a: 21, b: 42});

      a.assoc('c', 63, 'd', 84);
      expect(storeValue().a).to.deep.equal({a: 21, b: 42, c: 63, d: 84});
    },

    'assoc replaces object key values': () => {
      expect(storeValue()).to.deep.equal(initialState);

      let d = cur.refine('d');
      d.assoc('foo', 'swapped');

      expect(storeValue().d).to.deep.equal({foo: 'swapped', bar: 2, baz: {qux: 3}});

      d.assoc('bar', 'also', 'baz', 'changed');

      expect(storeValue().d).to.deep.equal({foo: 'swapped', bar: 'also', baz: 'changed'});
    },

    'push': () => {
      var c = cur.refine('c');
      c.push([4]);
      expect(storeValue().c).to.deep.equal([1, 2, 3, 4]);
      c.push([5, 6]);
      expect(storeValue().c).to.deep.equal([1, 2, 3, 4, 5, 6]);
    },

    'unshift': () => {
      var c = cur.refine('c');
      c.unshift([0]);
      expect(storeValue().c).to.deep.equal([0, 1, 2, 3]);
      c.unshift(['a', 'b']);
      expect(storeValue().c).to.deep.equal(['b', 'a', 0, 1, 2, 3]);
    },

    'splice': () => {
      var c = cur.refine('c');
      c.splice([[1, 1, 4]]);
      expect(storeValue().c).to.deep.equal([1, 4, 3]);
      c.splice([[0, 1, 6, 5], [4, 0, 2, 1]]);
      expect(storeValue().c).to.deep.equal([6, 5, 4, 3, 2, 1]);
    },

    'dissoc array': () => {
      let c = cur.refine('c');
      expect(storeValue().c).to.deep.equal([1, 2, 3]);

      c.dissoc(0);
      expect(storeValue().c).to.deep.equal([2, 3]);

      c.push([4, 5, 6]);

      c.dissoc(2);
      expect(storeValue().c).to.deep.equal([2, 3, 5, 6]);

      c.push([7, 8, 9]);
      c.dissoc(2, 3, 4);

      expect(storeValue().c).to.deep.equal([2, 3, 8, 9]);

      c.push([10, 11, 12]);
      c.dissoc(1, 3, 5);

      expect(storeValue().c).to.deep.equal([2, 8, 10, 12]);
    },

    'dissoc object': () => {
      let d = cur.refine('d');
      expect(storeValue().d).to.deep.equal({foo: 1, bar: 2, baz: {qux: 3}});

      d.dissoc('baz');
      expect(storeValue().d).to.deep.equal({foo: 1, bar: 2});

      d.dissoc('foo', 'bar');
      expect(storeValue().d).to.deep.equal({});
    },

    'merge': () => {
      var a = cur.refine('a');
      a.merge({ z: 1 });
      expect(storeValue().a).to.deep.equal({ b: 42, z: 1});
    },

    'swap': () => {
      cur.refine('a', 'b').swap(leaf => leaf/2);
      expect(storeValue().a.b).to.equal(21);
    }
  };



  describe('Cursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = Cursor.build(store.value(), store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = null;
      storeValue = null;
    });

    _.map(suite, (v, k) => it(k, v));
  });

  describe('Cursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      cur = Cursor.build(cmp);
      storeValue = () => cmp.state;
    });

    afterEach(() => {
      cur = null;
      storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });

  describe('RefCursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = RefCursor.build(store.value, store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = null;
      storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });


  describe('RefCursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      cur = RefCursor.build(cmp);
      storeValue = () => cmp.state;
    });

    afterEach(() => {
      cur = null;
      storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });

});
