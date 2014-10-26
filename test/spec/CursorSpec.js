var React = require('react');
var Cursor = require('../../src/Cursor');

'use strict';

function buildStatefulComponent(initialState) {
  return React.createClass({
    getInitialState: function () {
      return initialState;
    },
    render: function () {
      return React.DOM.pre({}, JSON.stringify(this.state));
    }
  });
}

describe('Cursor', function() {
  it('Can load the library in the unit tests', function() {
    //expect(Cursor).toBeDefined(); -- why doesn't this work?
    expect(Cursor.debug).to.equal(false);
  });

  it("can we make an instance of a react cmp and get at the state", function () {
    var MyCmp = buildStatefulComponent({ a: 42 });
    var cmp = React.addons.TestUtils.renderIntoDocument(MyCmp({}));
    expect(cmp.state.a).to.equal(42);
    // expect(label.refs.p).toBeDefined();
    // expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
  });

  it('Cursors to the same component are ===', function () {
    var MyCmp = buildStatefulComponent({ a: 42 });
    var cmp = React.addons.TestUtils.renderIntoDocument(MyCmp({}));

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
    var MyCmp = buildStatefulComponent({ a: 42 });
    var cmp = React.addons.TestUtils.renderIntoDocument(MyCmp({}));
    var c = Cursor.build(cmp);
    expect(c.value.a).to.equal(42);
    expect(c.refine('a').value).to.equal(42);
  });

});
