/* global describe, it, expect */
import _ from 'lodash';
import {Cursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';
import {valEq, refEq} from '../util';


describe('Cursor operations', () => {
  var cur, storeValue;
  var initialState = {a: {b: 42}, c: [1, 2, 3]};


  var suite = {

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

  describe('backed by store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = Cursor.build(store.value(), store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = null;
      storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });


  describe('backed by react state', () => {
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

});
