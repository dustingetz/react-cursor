/** @jsx React.DOM */
var union   = require('lodash-node/modern/arrays/range');
var React  = require('react/addons');
var Cursor = require('../../../../src/react-cursor').Cursor;
var ImmutableOptimizations = require('../../../../src/react-cursor').ImmutableOptimizations;

'use strict';

var App = React.createClass({
  getInitialState: function () {
    return {
      very: {
        deeply: {
          nested: {
            counts: _.range(400).map(function () { return 0; })
          }
        }
      }
    };
  },

  componentWillMount: function () {
    window.App = this;
  },

  render: function () {
    var cursor = Cursor.build(this);
    var counts = cursor.refine('very', 'deeply', 'nested', 'counts');
    var contents = counts.value.map(function (count, index) {
      return (<Clicker key={index} cursor={counts.refine(index)} />);
    }.bind(this));

    return (
      <div className="App">
        <div>{contents}</div>
        <pre>{JSON.stringify(cursor.value, undefined, 2)}</pre>
      </div>
    );
  }
});

var Clicker = React.createClass({
  mixins: [ImmutableOptimizations(['cursor'])],

  render: function () {
    console.log('rendering clicker ', this.props.key);
    return (
      <div>
        <input type="text" value={this.props.cursor.value} onChange={this.onInputChange} />
        <span>{this.props.cursor.value}</span>
        <button onClick={this.inc2}>+2</button>
        <button onClick={this.inc10}>+10</button>
      </div>
    );
  },

  onInputChange: function (e) {
    var nextValue = parseInt(e.target.value, 10);
    if (isNaN(nextValue)) nextValue = '';
    this.props.cursor.transact(nextValue);
  },

  inc2: function () {
    this.props.cursor.transact(this.props.cursor.pendingValue() + 1);
    this.props.cursor.transact(this.props.cursor.pendingValue() + 1);
  },

  inc10: function () {
    this.props.cursor.transact(this.props.cursor.pendingValue() + 10);
  }
});



function entrypoint(rootEl) {
  React.renderComponent(<App />, rootEl);

  // In lieu of unit tests:
  var c1 = window.c1 = Cursor.build(window.App);
  var c2 = window.c2 = Cursor.build(window.App);
  console.assert(c1.value === c2.value);
  console.assert(c1.transact === c2.transact);
  console.assert(c1 === c2);

  var c10 = c1.refine('very', 'deeply', 'nested', 'counts', '0');
  var c20 = c2.refine('very', 'deeply', 'nested', 'counts', '0');
  console.assert(c10.value === c20.value);
  console.assert(c10.transact === c20.transact);
  console.assert(c10 === c20);

  var c20b = c2.refine('very', 'deeply', 'nested', 'counts', '0');
  console.assert(c20b.value === c20.value);
  console.assert(c20b.transact === c20.transact);
  console.assert(c20b === c20);
}

window.entrypoint = entrypoint;

