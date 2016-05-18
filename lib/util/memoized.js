'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoized;

var _lodash = require('lodash.identity');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function memoized() {
  var _this = this;

  var hasher = arguments.length <= 0 || arguments[0] === undefined ? _lodash2.default : arguments[0];
  var f = arguments[1];

  var cache = {};
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // hasher gets the same arguments as f, to create the hashKey
    var hashKey = hasher.apply(_this, args);
    return hasOwnProperty.call(cache, hashKey) ? cache[hashKey] : cache[hashKey] = f.apply(_this, args);
  };
};