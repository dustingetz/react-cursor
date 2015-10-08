/* global describe, it, expect */

var React = require('react');
var Cursor = require('../Cursor');
var clone = require('clone');

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

  describe('Interaction with ReactComponent.setState: non-function updates', function () {
    var cmp, setState, cursor;

    var testFixtures = [
    // initialValue,                    identicalOtherValue,            differentValue
       [true,                           true,                           false],
       ['foo',                          'foo',                          'bar'],
       [42,                             42,                             25],
       [[1, 2, 3],                      [1, 2, 3],                      [4, 5, 6]],
       [{ foo: { bar: { baz: 'qux'}}},  { foo: { bar: { baz: 'qux'}}},  { foo: { bar: { baz: 'zig'}}}]
    ];

    testFixtures.forEach(function (fixture) {
      var initialValue = fixture[0];
      var identicalOtherValue = fixture[1];
      var differentValue = fixture[2];

      var initialState = {a: {b: initialValue}};

      describe('When built on a component whose state is ' + JSON.stringify(initialState), function () {
        beforeEach(function () {
          cmp = renderComponentWithState(initialState);
          setState = sinon.spy(cmp, 'setState');
          cursor = Cursor.build(cmp);
        });

        afterEach(function () {
          cmp.setState.restore();
          cursor = null;
          setState = null;
          cmp = null;
        });

        it('When calling cursor.refine("a", "b").set(' + JSON.stringify(initialValue) + '), the initial value, it will not call cmp.setState', function () {
          cursor.refine('a', 'b').set(initialValue);
          expect(setState).to.not.have.been.called;
        });

        it('When calling cursor.refine("a", "b").set(' + JSON.stringify(identicalOtherValue) + '), an identical other value, it will not call cmp.setState', function () {
          cursor.refine('a', 'b').set(identicalOtherValue);
          expect(setState).to.not.have.been.called;
        });

        it('When calling cursor.refine("a", "b").set(' + JSON.stringify(differentValue) +'), a different value, it will call cmp.setState', function () {
          cursor.refine('a', 'b').set(differentValue);
          expect(setState).to.have.been.calledOnce;
        });
      });
    });
  });

  describe('Interaction with ReactComponent.setState: function updates', function () {
    var cmp, setState, cursor;

    var testFixtures = [
    // initialValue,                   [swapToSameValueButDifferentRef, label],                [swapToDifferentValue, label]
       [[1, 2, 3],                     [a => a.map(i => i),             'array map identity'], [a => a.map(i => i + 3), 'array map plus 3']],
       [{ foo: { bar: { baz: 'qux'}}}, [clone,                          'clone object'],       [o => o.swapped = true, 'object assoc :swapped true']]
    ];


    testFixtures.forEach(function (fixture) {
      var initialValue = fixture[0];

      var swapToSameValueButDifferentRef = fixture[1][0];
      var firstLabel = fixture[1][1];

      var swapToDifferentValue = fixture[2][0];
      var secondLabel = fixture[2][1];

      var initialState = {a: {b: initialValue}};

      describe('When built on a component whose state is ' + JSON.stringify(initialState), function () {
        beforeEach(function () {
          cmp = renderComponentWithState(initialState);
          setState = sinon.spy(cmp, 'setState');
          cursor = Cursor.build(cmp);
        });

        afterEach(function () {
          cmp.setState.restore();
          cursor = null;
          setState = null;
          cmp = null;
        });

        it('When calling cursor.refine("a", "b").set(' + firstLabel + '), a function producing a value equivalent to the initialValue, it will not call cmp.setState', function () {
          cursor.refine('a', 'b').set(swapToSameValueButDifferentRef);
          expect(setState).to.not.have.been.called;
        });

        it('When calling cursor.refine("a", "b").set(' + secondLabel + '), a function producing a different value, it will call cmp.setState', function () {
          cursor.refine('a', 'b').set(swapToDifferentValue);
          expect(setState).to.have.been.calledOnce;
        });
      });
    });
  });
});
