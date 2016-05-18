'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _updateIn = require('update-in');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CursorOperations = function () {
  function CursorOperations() {
    _classCallCheck(this, CursorOperations);
  }

  _createClass(CursorOperations, [{
    key: 'set',
    value: function set(val) {
      return this.swap(function (_) {
        return val;
      });
    }
  }, {
    key: 'merge',
    value: function merge(val) {
      return this.swap(_updateIn.merge, val);
    }
  }, {
    key: 'push',
    value: function push(xs) {
      return this.swap(_updateIn.push, xs);
    }
  }, {
    key: 'unshift',
    value: function unshift(xs) {
      return this.swap(_updateIn.unshift, xs);
    }
  }, {
    key: 'splice',
    value: function splice(xs) {
      return this.swap(_updateIn.splice, xs);
    }
  }, {
    key: 'assoc',
    value: function assoc() {
      for (var _len = arguments.length, kvs = Array(_len), _key = 0; _key < _len; _key++) {
        kvs[_key] = arguments[_key];
      }

      return this.swap.apply(this, [_updateIn.assoc].concat(kvs));
    }
  }, {
    key: 'dissoc',
    value: function dissoc() {
      for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      return this.swap.apply(this, [_updateIn.dissoc].concat(keys));
    }
  }]);

  return CursorOperations;
}();

exports.default = CursorOperations;
;