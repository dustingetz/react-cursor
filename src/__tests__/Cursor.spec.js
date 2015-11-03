/* global describe, it, expect */

var React = require('react');
var Cursor = require('../Cursor');

'use strict';

function renderComponentWithState(initialState) {
  var descriptor = React.createClass({
    getInitialState: function () {
      return initialState;
    },
    render: function () {
      return React.DOM.pre({}, JSON.stringify(this.state));
    }
  });

  var TestComponent = React.createFactory(descriptor);
  return React.addons.TestUtils.renderIntoDocument(TestComponent({}));
}

describe('Cursor', function () {
  it('Can load the library in the unit tests', function () {
    expect(Cursor).not.equal(undefined);
    expect(Cursor.debug).to.equal(false);
  });

  it("can we make an instance of a react cmp and get at the state", function () {
    var cmp = renderComponentWithState({ a: 42 });
    expect(cmp.state.a).to.equal(42);
    // expect(label.refs.p).toBeDefined();
    // expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
  });

  it('Cursors to the same component are ===', function () {
    var cmp = renderComponentWithState({ a: 42 });

    var c1 = Cursor.build(cmp);
    var c2 = Cursor.build(cmp);
    expect(c1).to.equal(c2);
    expect(c1.set).to.equal(c2.set);
    expect(c1.value).to.equal(c2.value);

    var c10 = c1.refine('a');
    var c20 = c2.refine('a');
    expect(c10).to.equal(c20);
    expect(c10.value).to.equal(c20.value);
    expect(c10.set).to.equal(c20.set);

    var c20b = c2.refine('a');
    expect(c20).to.equal(c20b);
    expect(c20.value).to.equal(c20b.value);
    expect(c20.set).to.equal(c20b.set);
  });

  it('cursors can refine by path', function () {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);
    expect(c.value.a).to.equal(42);
    expect(c.refine('a').value).to.equal(42);
  });

  it('method set delegates to $set operation', function () {
    var cmp = renderComponentWithState({a: 42});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.set(53);
    expect(cmp.state.a).to.equal(53);
  });

  it('method push delegates to $push operation', function () {
    var cmp = renderComponentWithState({a: [1, 2, 3]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.push([4]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4]);
    a.push([5, 6]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('method push delegates to $unshift operation', function () {
    var cmp = renderComponentWithState({a: [4, 5, 6]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.unshift([3]);
    expect(cmp.state.a).to.deep.equal([3, 4, 5, 6]);
    a.unshift([2, 1]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('method splice delegates to $splice operation', function () {
    var cmp = renderComponentWithState({a: [1, 2, 3]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.splice([[1, 1, 4]]);
    expect(cmp.state.a).to.deep.equal([1, 4, 3]);
    a.splice([[0, 1, 6, 5], [4, 0, 2, 1]]);
    expect(cmp.state.a).to.deep.equal([6, 5, 4, 3, 2, 1]);
  });

  it('method merge delegates to $merge operation', function () {
    var cmp = renderComponentWithState({a: {b: 64}});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.merge({ c: 72 });
    expect(cmp.state.a).to.deep.equal({ b: 64, c: 72});
  });

  it('method apply delegates to $apply operation', function () {
    var cmp = renderComponentWithState({a: 64 });
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.apply(function (prevState) {
      return function (x) { return x / 8 }
    });
    expect(cmp.state.a).to.equal(8);
  });

  it('should eventually throw an exception when detecting mutations to a root cursor.value', function (asyncDone) {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);

    var mutateCursorValue = function () {
      c.value = { b: 43 };
      asyncDone();
    };

    expect(mutateCursorValue).to.throw(Error);
  });

  it('should eventually throw an exception when detecting mutations to a refined cursor.value', function (asyncDone) {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);
    var r = c.refine('a');

    var mutateRefinedCursorValue = function () {
      r.value = 43;
      asyncDone();
    };

    expect(mutateRefinedCursorValue).to.throw(Error);
  });

  it('should eventually throw an exception when detecting mutations to a refined grandchild cursor value', function (asyncDone) {
    var cmp = renderComponentWithState({ a: { b: 42 } });
    var root = Cursor.build(cmp);
    var child = root.refine('a');
    var grandChild = child.refine('b');

    var mutateGrandchildValue = function () {
      grandChild.value = 43;
      asyncDone();
    };

    expect(mutateGrandchildValue).to.throw(Error);
  });

  it('should eventually throw an exception when adding new keys to a cursor value', function (asyncDone) {
    var cmp = renderComponentWithState({ a: 42 });
    var root = Cursor.build(cmp);

    var addKeyToCursorValue = function () {
      root.value.b = 43;
      asyncDone();
    };

    expect(addKeyToCursorValue).to.throw(Error);
  });

  it('should eventually throw an exception when removing keys from a cursor value', function (asyncDone) {
    var cmp = renderComponentWithState({ a: 42, b: 43 });
    var root = Cursor.build(cmp);

    var addKeyToCursorValue = function () {
      delete root.value.b;
      asyncDone();
    };

    expect(addKeyToCursorValue).to.throw(Error);
  });
});
