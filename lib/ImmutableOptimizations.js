'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ImmutableOptimizations() {
  var refFields = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var ignoredFields = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var noValueCheckFields = refFields.concat(ignoredFields);
  return {
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      var _this = this;

      var valuesChanged = !(0, _lodash4.default)((0, _lodash2.default)(nextProps, noValueCheckFields), (0, _lodash2.default)(this.props, noValueCheckFields));

      var refsChanged = !refFields.every(function (field) {
        return _this.props[field] === nextProps[field];
      });

      return valuesChanged || refsChanged;
    }
  };
}

exports.default = ImmutableOptimizations;