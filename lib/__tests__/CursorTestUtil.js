'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = undefined;
exports.renderComponentWithState = renderComponentWithState;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function renderComponentWithState(initialState) {
  var descriptor = _react2.default.createClass({
    displayName: 'descriptor',

    getInitialState: function getInitialState() {
      return initialState;
    },
    render: function render() {
      return _react2.default.DOM.pre({}, JSON.stringify(this.state));
    }
  });

  var TestComponent = _react2.default.createFactory(descriptor);
  return _reactAddonsTestUtils2.default.renderIntoDocument(TestComponent({}));
}

var Store = exports.Store = function Store(initialVal) {
  var _this = this;

  _classCallCheck(this, Store);

  this._ref = initialVal;

  // auto-bind store methods
  this.value = function () {
    return _this._ref;
  };
  this.swap = function (f) {
    _this._ref = f(_this._ref);
  };
};