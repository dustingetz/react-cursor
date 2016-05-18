'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIn = exports.rootAt = undefined;

var _updateIn = require('update-in');

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = process.env.NODE_ENV !== 'production';

var rootAt = exports.rootAt = function rootAt(segments, fn) {
  return function (value) {
    return (0, _updateIn.updateIn)(value, segments, fn);
  };
};

var get = function get(obj, key) {
  if (debug && !(key in obj)) {
    console.warn('Refining cursor to non-existent key: \'' + key + '\' not found in ', obj);
  }
  return obj[key];
};

var getIn = exports.getIn = function getIn(tree, paths) {
  return (0, _lodash2.default)(paths, get, tree);
};