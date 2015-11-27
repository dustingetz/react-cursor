import React from 'react';
import TestUtils from 'react-addons-test-utils';


export function renderComponentWithState(initialState) {
  var descriptor = React.createClass({
    getInitialState: function () {
      return initialState;
    },
    render: function () {
      return React.DOM.pre({}, JSON.stringify(this.state));
    }
  });

  var TestComponent = React.createFactory(descriptor);
  return TestUtils.renderIntoDocument(TestComponent({}));
}

export class Store {
  constructor (initialVal) {
    this._ref = initialVal;

    // auto-bind store methods
    this.value = () => this._ref;
    this.swap = (f) => { this._ref = f(this._ref); }
  }
}
