'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _updateIn = require('update-in');

var _CursorOperations2 = require('./CursorOperations');

var _CursorOperations3 = _interopRequireDefault(_CursorOperations2);

var _memoized = require('./util/memoized');

var _memoized2 = _interopRequireDefault(_memoized);

var _associative = require('./util/associative');

var _hashRecord = require('./util/hashRecord');

var _hashRecord2 = _interopRequireDefault(_hashRecord);

var _refToHash = require('./util/refToHash');

var _refToHash2 = _interopRequireDefault(_refToHash);

var _ReactAdapter = require('./ReactAdapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makeRefinedSwap = (0, _memoized2.default)(function (swapFn, paths) {
  return (0, _refToHash2.default)(swapFn) + (0, _hashRecord2.default)(paths);
}, function (swapFn, paths) {
  return function (f) {
    return swapFn((0, _associative.rootAt)(paths, f));
  };
});

var makeRefinedDeref = (0, _memoized2.default)(function (deref, paths) {
  return (0, _refToHash2.default)(deref) + (0, _hashRecord2.default)(paths);
}, function (deref, paths) {
  return function () {
    return (0, _associative.getIn)(deref(), paths);
  };
});

var RefCursor = function (_CursorOperations) {
  _inherits(RefCursor, _CursorOperations);

  function RefCursor(deref, swapFn) {
    _classCallCheck(this, RefCursor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RefCursor).call(this));

    _this.value = deref;
    _this.refine = function () {
      for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
        morePaths[_key] = arguments[_key];
      }

      return NewRefCursor(makeRefinedDeref(deref, morePaths), makeRefinedSwap(swapFn, morePaths));
    };
    _this.swap = function (f) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return swapFn(function (v) {
        return f.apply(null, [v].concat(args));
      });
    };

    // RefCursors don't own a value, so they aren't responsible for freezing it.
    return _this;
  }

  return RefCursor;
}(_CursorOperations3.default);

var NewRefCursor = (0, _memoized2.default)(function (deref, swap) {
  return (0, _refToHash2.default)(deref) + (0, _refToHash2.default)(swap);
}, function (deref, swap) {
  return new RefCursor(deref, swap);
});

RefCursor.build = function (deref, swap) {
  return (0, _ReactAdapter.isReactCmp)(deref) ? NewRefCursor((0, _ReactAdapter.makeDerefFromReact)(deref), (0, _ReactAdapter.makeSwapFromReact)(deref)) : NewRefCursor(deref, swap);
};

exports.default = RefCursor;