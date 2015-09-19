var _      = require('underscore');
var React  = require('react/addons');
var Cursor = require('../../..').Cursor;
var ImmutableOptimizations = require('../../..').ImmutableOptimizations;
require('./App.less');

'use strict';

var App = React.createClass({
  render: function () {
    var counts = this.props.cursor.refine('very', 'deeply', 'nested', 'counts');
    var contents = counts.value.map(function (count, index) {
      return (
        <Clicker
          key={index}
          cursor={counts.refine(index)}
        />
      )
    }.bind(this));

    return (
      <div className="App">
        <div>{contents}</div>
        <pre>{JSON.stringify(this.props.cursor.value, undefined, 2)}</pre>
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
    this.props.cursor.set(nextValue);
  },

  inc2: function () {
    this.props.cursor.set(function (s) { return s + 1; });
    this.props.cursor.set(function (s) { return s + 1; });
  },

  inc10: function () {
    this.props.cursor.set(function (s) { return s + 10; });
  }
});

module.exports = App;
