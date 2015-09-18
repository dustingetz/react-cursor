import React from 'react/addons';
import util from './util';

'use strict';

function Cursor(state, swapper, path, value) {
  // value to put in the DOM, use from render() and the component lifecycle methods
  this.value = value;

  ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach(function (command) {
    this[command] = update.bind(this, swapper, path, '$' + command);
  }.bind(this));

  this.refine = function (/* one or more paths through the tree */) {
    // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
    // this.props and nextProps have different subtree values, and refining memoizer must account for that

    var nextPath = [].concat(path, util.flatten(arguments));
    var nextValue = util.getRefAtPath(this.value, Array.prototype.slice.call(arguments, 0));
    return build(state, swapper, nextPath, nextValue); // memoized
  };
}

function update(swapper, path, operation, nextUpdate) {
  // Backwards compatibility with non-function values of nextUpdate
  if (typeof nextUpdate !== "function") {
    var prevValue = nextUpdate;
    nextUpdate = function ( ) { return prevValue; };
  }

  swapper(function (state) {
    var nextState;

    if (path.length > 0) {
      nextState = React.addons.update(
        state,
        path.concat(operation).reduceRight(
          util.unDeref,
          nextUpdate(util.getRefAtPath(state, path))
        )
      );
    } else if (path.length === 0) {
      nextState = nextUpdate(state);
    }

    return nextState;
  });
}


// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
var cursorBuildMemoizer = util.memoizeFactory(function (state, swapper, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(state, path);
  return util.refToHash(swapper) + util.hashRecord(value) + util.hashRecord(path);
});

var build = cursorBuildMemoizer(function (state, swapper, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(state, path);
  return new Cursor(state, swapper, path, value);
});



Cursor.build = build;

Cursor.debug = false;

module.exports = Cursor;
