import React from 'react';
import { ImmutableOptimizations } from 'react-cursor';
import '!style!css!less!./App.less';


var App = React.createClass({
  render: function () {
    var counts = this.props.cursor.refine('very', 'deeply', 'nested', 'counts');
    var contents = counts.value().map(function (count, index) {
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
        <pre>{JSON.stringify(this.props.cursor.value(), undefined, 2)}</pre>
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
        <input type="text" value={this.props.cursor.value()} onChange={this.onInputChange} />
        <span>{this.props.cursor.value()}</span>
        <button onClick={this.inc2}>+2</button>
        <button onClick={this.inc10}>+10</button>
      </div>
    );
  },

  onInputChange: function (e) {
    var nextValue = parseInt(e.target.value, 10);
    if (isNaN(nextValue)) nextValue = '';
    this.props.cursor.swap(() => nextValue);
  },

  inc2: function () {
    this.props.cursor.swap(s => s+1);
    this.props.cursor.swap(s => s+1);
  },

  inc10: function () {
    this.props.cursor.swap(s => s+10);
  }
});

export default App;
