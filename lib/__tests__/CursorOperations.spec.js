'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactCursor = require('../react-cursor');

var _CursorTestUtil = require('./CursorTestUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cursor updates', function () {
  var cur = void 0,
      storeValue = void 0;
  var initialState = { a: { b: 42 }, c: [1, 2, 3], d: { foo: 1, bar: 2, baz: { qux: 3 } } };

  var suite = {

    'set at leaf': function setAtLeaf() {
      expect(storeValue()).to.deep.equal(initialState);
      cur.refine('a', 'b').set(43);
      expect(storeValue().a).to.deep.equal({ b: 43 });
    },

    'set at object': function setAtObject() {
      expect(storeValue()).to.deep.equal(initialState);
      cur.refine('a').set({ b: 43 });
      expect(storeValue().a).to.deep.equal({ b: 43 });
    },

    'refine and set creates key if non-existent': function refineAndSetCreatesKeyIfNonExistent() {
      expect(storeValue()).to.deep.equal(initialState);
      expect(storeValue().e).to.equal(undefined);
      var e = { a: { b: 43 }, c: [2, 3, 4], d: 44 };
      cur.refine('e').set(e);
      expect(storeValue().e).to.deep.equal(e);
    },

    'assoc can append a single new value to the end of an array': function assocCanAppendASingleNewValueToTheEndOfAnArray() {
      expect(storeValue()).to.deep.equal(initialState);

      var c = cur.refine('c');
      c.assoc(3, 4);

      expect(storeValue().c).to.deep.equal([1, 2, 3, 4]);

      expect(function () {
        return c.assoc(5, '5 is greater than array length');
      }).to.throw(RangeError);
    },

    'assoc replaces array values': function assocReplacesArrayValues() {
      expect(storeValue()).to.deep.equal(initialState);

      var c = cur.refine('c');
      c.assoc(0, 'a');

      expect(storeValue().c).to.deep.equal(['a', 2, 3]);

      c.assoc(1, 'b', 2, 'c');
      expect(storeValue().c).to.deep.equal(['a', 'b', 'c']);
    },

    'assoc creates new object key values': function assocCreatesNewObjectKeyValues() {
      expect(storeValue()).to.deep.equal(initialState);

      var a = cur.refine('a');
      a.assoc('a', 21);
      expect(storeValue().a).to.deep.equal({ a: 21, b: 42 });

      a.assoc('c', 63, 'd', 84);
      expect(storeValue().a).to.deep.equal({ a: 21, b: 42, c: 63, d: 84 });
    },

    'assoc replaces object key values': function assocReplacesObjectKeyValues() {
      expect(storeValue()).to.deep.equal(initialState);

      var d = cur.refine('d');
      d.assoc('foo', 'swapped');

      expect(storeValue().d).to.deep.equal({ foo: 'swapped', bar: 2, baz: { qux: 3 } });

      d.assoc('bar', 'also', 'baz', 'changed');

      expect(storeValue().d).to.deep.equal({ foo: 'swapped', bar: 'also', baz: 'changed' });
    },

    'push': function push() {
      var c = cur.refine('c');
      c.push([4]);
      expect(storeValue().c).to.deep.equal([1, 2, 3, 4]);
      c.push([5, 6]);
      expect(storeValue().c).to.deep.equal([1, 2, 3, 4, 5, 6]);
    },

    'unshift': function unshift() {
      var c = cur.refine('c');
      c.unshift([0]);
      expect(storeValue().c).to.deep.equal([0, 1, 2, 3]);
      c.unshift(['a', 'b']);
      expect(storeValue().c).to.deep.equal(['b', 'a', 0, 1, 2, 3]);
    },

    'splice': function splice() {
      var c = cur.refine('c');
      c.splice([[1, 1, 4]]);
      expect(storeValue().c).to.deep.equal([1, 4, 3]);
      c.splice([[0, 1, 6, 5], [4, 0, 2, 1]]);
      expect(storeValue().c).to.deep.equal([6, 5, 4, 3, 2, 1]);
    },

    'dissoc array': function dissocArray() {
      var c = cur.refine('c');
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

    'dissoc object': function dissocObject() {
      var d = cur.refine('d');
      expect(storeValue().d).to.deep.equal({ foo: 1, bar: 2, baz: { qux: 3 } });

      d.dissoc('baz');
      expect(storeValue().d).to.deep.equal({ foo: 1, bar: 2 });

      d.dissoc('foo', 'bar');
      expect(storeValue().d).to.deep.equal({});
    },

    'merge': function merge() {
      var a = cur.refine('a');
      a.merge({ z: 1 });
      expect(storeValue().a).to.deep.equal({ b: 42, z: 1 });
    },

    'swap': function swap() {
      cur.refine('a', 'b').swap(function (leaf) {
        return leaf / 2;
      });
      expect(storeValue().a.b).to.equal(21);
    }
  };

  describe('Cursor with store', function () {
    beforeEach(function () {
      var store = new _CursorTestUtil.Store(initialState);
      cur = _reactCursor.Cursor.build(store.value(), store.swap);
      storeValue = function storeValue() {
        return store.value();
      };
    });

    afterEach(function () {
      cur = null;
      storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      return it(k, v);
    });
  });

  describe('Cursor with react state', function () {
    beforeEach(function () {
      var cmp = (0, _CursorTestUtil.renderComponentWithState)(initialState);
      cur = _reactCursor.Cursor.build(cmp);
      storeValue = function storeValue() {
        return cmp.state;
      };
    });

    afterEach(function () {
      cur = null;
      storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });

  describe('RefCursor with store', function () {
    beforeEach(function () {
      var store = new _CursorTestUtil.Store(initialState);
      cur = _reactCursor.RefCursor.build(store.value, store.swap);
      storeValue = function storeValue() {
        return store.value();
      };
    });

    afterEach(function () {
      cur = null;
      storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });

  describe('RefCursor with react state', function () {
    beforeEach(function () {
      var cmp = (0, _CursorTestUtil.renderComponentWithState)(initialState);
      cur = _reactCursor.RefCursor.build(cmp);
      storeValue = function storeValue() {
        return cmp.state;
      };
    });

    afterEach(function () {
      cur = null;
      storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });
}); /* global describe, it, expect */