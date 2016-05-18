'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashRecord;

var _hashString = require('./hashString');

var _hashString2 = _interopRequireDefault(_hashString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hashRecord(record) {
  return (0, _hashString2.default)(JSON.stringify(record));
}