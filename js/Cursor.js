define(['react', 'util'], function (React, util) {
  'use strict';

  function Cursor(cmp, state, pendingGetter, path, partialMemoized) {
    // Please treat values as read-only
    this.value = util.getRefAtPath(state, path); // value to put in the DOM, use from render()

    // Please treat pending values as read-only
    this.pendingValue = function () {
      return util.getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
    };

    // Cursors sharing a path also share an onChange handler - so that we can do meaningful reference equality
    // comparisons for onChange handlers passes as react props in shouldComponentUpdate
    this.onChange = partialMemoized(onChange, cmp, state, pendingGetter, path, partialMemoized);

    this.refine = function (/* one or more paths through the tree */) {
      var nextPath = [].concat(path, util.flatten(arguments));
      return new Cursor(cmp, state, pendingGetter, nextPath, partialMemoized);
    };
  }

  function onChange(cmp, state, pendingGetter, path, partialMemoized, nextValue) {
    var nextState;

    if (path.length > 0) {
      nextState = React.addons.update(
        pendingGetter(),
        path.concat('$set').reduceRight(util.unDeref, nextValue)
      );
    }
    else if (path.length === 0) {
      nextState = nextValue;
    }
    cmp.setState(nextState);
    return new Cursor(cmp, state, pendingGetter, path, partialMemoized);
  }

  // If we build two cursors on the same React component, and those React components have equal state,
  // reuse the cursor reference, so we can use === to compare them.
  var cursorBuildMemoizer = util.memoizeFactory(function (cmp) {
    return util.refToHash(cmp) + util.hashRecord(cmp.state);
    // I think we want to clamp this to cachesize === 2, because we only
    // care about this.state and nextState.
  });

  // We want two cursors of the same path to share the same reference.
  // If we call cursor.build twice, the onChange handlers should still share the same reference.
  // So we have a global cache of partially applied onChange functions, so we can reuse onChange functions
  // if both the paths are the same, and they are attached to the same React component.
  // Note we don't care about the state of the React component for onChange handlers.
  var onChangeMemoizer = util.memoizeFactory(function (onChange, cmp, state, pendingGetter, path) {
    return util.refToHash(cmp) + util.hashRecord(path);
  });

  Cursor.build = cursorBuildMemoizer(function (cmp) {
    function pendingGetter () { return cmp._pendingState || cmp.state; }
    return new Cursor(cmp, cmp.state, pendingGetter, [], onChangeMemoizer(_.partial));
  });


  return Cursor;
});
