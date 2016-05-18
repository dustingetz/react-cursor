'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepFreeze;

var _lodash = require('lodash.isobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
function deepFreeze(obj) {
  if (typeof Object.freeze !== 'function') {
    return obj;
  }

  if (!(0, _lodash2.default)(obj)) {
    return obj;
  }

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function (name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (!!prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) == 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}