var React = require('react/addons');
var util = require('./util');

'use strict';

function Cursor(cmp, path, value) {
  // value to put in the DOM, use from render() and the component lifecycle methods
  this.value = value;

  this.pendingValue = function () {
    // the current value right now, use in event handlers
    return util.getRefAtPath(cmp._pendingState || cmp.state, path);
  };

  this.onChange = function (nextValue) {
    if (Cursor.debug === true) {
      console.warn("'onChange' is deprecated use 'set' instead!");
    }
    this.set(nextValue);
  };

  ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach(function (command) {
    this[command] = update.bind(this, cmp, path, '$' + command);
  }.bind(this));

  this.refine = function (/* one or more paths through the tree */) {
    // When refining inside a lifecycle method, same cmp and same path isn't enough.
    // this.props and nextProps have different subtree values, and refining memoizer must account for that

    var nextPath = [].concat(path, util.flatten(arguments));
    var nextValue = util.getRefAtPath(this.value, Array.prototype.slice.call(arguments, 0));
    return build(cmp, nextPath, nextValue); // memoized
  };
}

function update(cmp, path, operation, nextValue) {
  var nextState;

  if (path.length > 0) {
    nextState = React.addons.update(
      cmp._pendingState || cmp.state,
      path.concat(operation).reduceRight(util.unDeref, nextValue)
    );
  }
  else if (path.length === 0) {
    nextState = nextValue;
  }
  cmp.setState(nextState);
}


// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
var cursorBuildMemoizer = util.memoizeFactory(function (cmp, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(cmp.state, path);
  return util.refToHash(cmp) + util.hashRecord(value) + util.hashRecord(path);
  // I think we want to clamp this to cachesize === 2, because we only
  // care about this.state and nextState.
});

var build = cursorBuildMemoizer(function (cmp, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(cmp.state, path);
  return new Cursor(cmp, path, value);
});

Cursor.build = build;

Cursor.debug = false;

module.exports = Cursor;

