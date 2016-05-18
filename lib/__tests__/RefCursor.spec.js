'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactCursor = require('../react-cursor');

var _CursorTestUtil = require('./CursorTestUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RefCursors are not immutable', function () {

  var cur = void 0,
      storeValue = void 0;
  var initialState = { a: { b: 42 } };

  var suite = {
    'updating cursor does change ref cursor\'s value': function updatingCursorDoesChangeRefCursorSValue() {
      var prevCurValue = cur.value();
      cur.refine('a', 'b').swap(function (v) {
        return 43;
      });
      expect(_lodash2.default.isEqual(storeValue(), prevCurValue)).to.equal(false);
      expect(cur.value() === prevCurValue).to.equal(false);
    }
  };

  describe('RefCursor with store', function () {
    beforeEach(function () {
      var store = new _CursorTestUtil.Store(initialState);
      cur = _reactCursor.RefCursor.build(store.value, store.swap);
      storeValue = function storeValue() {
        return store.value();
      };
    });

    afterEach(function () {
      cur = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      return it(k, v);
    });
  });

  describe('RefCursor with react state', function () {
    beforeEach(function () {
      var cmp = (0, _CursorTestUtil.renderComponentWithState)(initialState);
      storeValue = function storeValue() {
        return cmp.state;
      };
      cur = _reactCursor.RefCursor.build(cmp);
    });

    afterEach(function () {
      cur = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });
});