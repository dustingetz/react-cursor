'use strict';

var _reactCursor = require('../react-cursor');

var _CursorTestUtil = require('./CursorTestUtil');

describe('Cursor constructors', function () {
  it("can we make an instance of a react cmp and get at the state", function () {
    var cmp = (0, _CursorTestUtil.renderComponentWithState)({ a: 42 });
    expect(cmp.state.a).to.equal(42);
  });

  it('Can build cursor from a react component reference', function () {
    var cmp = (0, _CursorTestUtil.renderComponentWithState)({ a: 42 });
    var c = _reactCursor.Cursor.build(cmp);
    expect(c.value()).to.equal(cmp.state);
  });

  it('Can build cursor decoupled from react component (rootValue/rootSwap)', function () {
    var store = new _CursorTestUtil.Store({ a: 42 });
    var c = _reactCursor.Cursor.build(store.value(), store.swap);
    expect(c.value()).to.equal(store.value());
  });
});