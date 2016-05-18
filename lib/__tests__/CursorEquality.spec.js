'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactCursor = require('../react-cursor');

var _CursorTestUtil = require('./CursorTestUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cursor equality', function () {
  it('sanity check that two equal js objects are not ===', function () {
    var a = { b: 42 };
    var b = { b: 42 };
    expect(a === b).to.equal(false);
    expect(_lodash2.default.isEqual(a, b)).to.equal(true);
  });

  var cur = void 0,
      cur2 = void 0,
      storeValue = void 0;
  var initialState = { a: { b: 42 } };

  var suite = {
    'cursors built from same constructor arguments are ===': function cursorsBuiltFromSameConstructorArgumentsAre() {
      expect(cur).to.equal(cur2);
      expect(cur.refine('a')).to.equal(cur2.refine('a'));
    },
    'refining the same cursor twice ===': function refiningTheSameCursorTwice() {
      expect(cur.refine('a')).to.equal(cur.refine('a'));
    },
    'if an update results in equal value, preserve ===': function ifAnUpdateResultsInEqualValuePreserve() {
      var a = cur.refine('a');
      var prevLeafVal = a.value();
      var nextLeafVal = { b: 42 };

      a.swap(function (v) {
        return nextLeafVal;
      });

      // the store preserves ===
      expect(storeValue().a).to.deep.equal(nextLeafVal);
      expect(storeValue().a).to.not.equal(nextLeafVal);
      console.log(cur.value(), cur.refine('a').value(), prevLeafVal);
      expect(storeValue().a).to.equal(prevLeafVal);

      // cursor preserves ===
      //let aa = Cursor.build(storeValue(), store.swap).refine('a');
      //expect(valEq(aa.value(), nextLeafVal)).to.equal(true); // cur valEq nextVal
      //expect(refEq(aa.value(), nextLeafVal)).to.equal(false); // cur not refEq nextVal
      //expect(refEq(aa.value(), prevLeafVal)).to.equal(true); // cur refEq prevVal
    }
  };

  describe('Cursor with store', function () {
    beforeEach(function () {
      var store = new _CursorTestUtil.Store(initialState);
      cur = _reactCursor.Cursor.build(store.value(), store.swap);
      cur2 = _reactCursor.Cursor.build(store.value(), store.swap);
      storeValue = function storeValue() {
        return store.value();
      };
    });

    afterEach(function () {
      cur = cur2 = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      return it(k, v);
    });
  });

  describe('Cursor with react state', function () {
    beforeEach(function () {
      var cmp = (0, _CursorTestUtil.renderComponentWithState)(initialState);
      cur = _reactCursor.Cursor.build(cmp);
      cur2 = _reactCursor.Cursor.build(cmp);
      storeValue = function storeValue() {
        return cmp.state;
      };
    });

    afterEach(function () {
      cur = cur2 = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });

  describe('RefCursor with store', function () {
    beforeEach(function () {
      var store = new _CursorTestUtil.Store(initialState);
      cur = _reactCursor.RefCursor.build(store.value, store.swap);
      cur2 = _reactCursor.RefCursor.build(store.value, store.swap);
      storeValue = function storeValue() {
        return store.value();
      };
    });

    afterEach(function () {
      cur = cur2 = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });

  describe('RefCursor with react state', function () {
    beforeEach(function () {
      var cmp = (0, _CursorTestUtil.renderComponentWithState)(initialState);
      cur = _reactCursor.RefCursor.build(cmp);
      cur2 = _reactCursor.RefCursor.build(cmp);
      storeValue = function storeValue() {
        return cmp.state;
      };
    });

    afterEach(function () {
      cur = cur2 = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });
});