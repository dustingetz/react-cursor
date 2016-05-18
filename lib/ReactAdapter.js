'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReactCmp = exports.makeValueFromReact = exports.makeDerefFromReact = exports.makeSwapFromReact = undefined;

var _memoized = require('./util/memoized');

var _memoized2 = _interopRequireDefault(_memoized);

var _refToHash = require('./util/refToHash');

var _refToHash2 = _interopRequireDefault(_refToHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Since
// `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
var makeSwapFromReact = exports.makeSwapFromReact = (0, _memoized2.default)(_refToHash2.default, function (cmp) {
  return cmp.setState.bind(cmp);
});
var makeDerefFromReact = exports.makeDerefFromReact = (0, _memoized2.default)(_refToHash2.default, function (cmp) {
  return function () {
    return cmp.state;
  };
});
var makeValueFromReact = exports.makeValueFromReact = function makeValueFromReact(cmp) {
  return cmp.state;
};
var isReactCmp = exports.isReactCmp = function isReactCmp(a) {
  return typeof a.__proto__.render === "function";
};