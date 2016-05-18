'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactCursor = require('../react-cursor');

var _CursorTestUtil = require('./CursorTestUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Value cursors are immutable', function () {

  var cur = void 0,
      storeValue = void 0;
  var initialState = { a: { b: 42 } };

  var suite = {
    'updating cursor does not change value cursor\'s value': function updatingCursorDoesNotChangeValueCursorSValue() {
      var prevCurValue = cur.value();
      cur.refine('a', 'b').swap(function (v) {
        return 43;
      });
      expect(_lodash2.default.isEqual(storeValue(), prevCurValue)).to.equal(false);
      expect(cur.value() === prevCurValue).to.equal(true);
    },
    'cannot mutate cursor\'s value by assoc': function cannotMutateCursorSValueByAssoc() {
      expect(function () {
        return cur.value().b = 43;
      }).to.throw(Error);
      expect(cur.value() === initialState).to.equal(true);
      expect(storeValue() === initialState).to.equal(true);
    },
    'cannot mutate cursor\'s value by delete': function cannotMutateCursorSValueByDelete() {
      expect(function () {
        return delete cur.value().a;
      }).to.throw(Error);
      expect(cur.value() === initialState).to.equal(true);
      expect(storeValue() === initialState).to.equal(true);
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
      cur = storeValue = null;
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
      cur = storeValue = null;
    });

    _lodash2.default.map(suite, function (v, k) {
      it(k, v);
    });
  });
});