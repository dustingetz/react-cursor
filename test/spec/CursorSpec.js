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
    var cmp = MyCmp({});
    React.addons.TestUtils.renderIntoDocument(cmp);
    //expect(true).toBe(true);
    // expect(label.refs.p).toBeDefined();
    // expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
  });

});
