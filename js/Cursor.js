define(['react', 'util'], function (React, util) {
  'use strict';


  // If we build two cursors on the same React component, and those React components have equal state,
  // reuse the same cursor instance, so we can use === to compare them.
  var cursorBuildMemoizer = util.memoizeFactory(function (cmp, path) {
    path = path === undefined ? [] : path; // account for the default value here
    return util.refToHash(cmp) + util.hashRecord(cmp.state) + util.hashRecord(path);
    // I think we want to clamp this to cachesize === 2, because we only
    // care about this.state and nextState.
  });

  // We want two cursors of the same path to share the same reference.
  // If we call cursor.build twice, the onChange handlers should still share the same reference.
  // So we have a global cache of partially applied onChange functions, so we can reuse onChange functions
  // if both the paths are the same, and they are attached to the same React component.
  // Note we don't care about the state of the React component for onChange handlers.
  var onChangeMemoizer = util.memoizeFactory(function (onChange, cmp, path) {
    return util.refToHash(cmp) + util.hashRecord(path);
  });

  var partialMemoized = onChangeMemoizer(_.partial);

  function Cursor(cmp, path) {
    this.value = util.getRefAtPath(cmp.state, path); // value to put in the DOM, use from render()

    this.pendingValue = function () {
      return util.getRefAtPath(cmp._pendingState || cmp.state, path); // the current value right now, use in event handlers
    };

    // Cursors sharing a path also share an onChange handler - so that we can do meaningful reference equality
    // comparisons for onChange handlers passes as react props in shouldComponentUpdate
    this.onChange = partialMemoized(onChange, cmp, path);

    this.refine = function (/* one or more paths through the tree */) {
      var nextPath = [].concat(path, util.flatten(arguments));
      return Cursor.build(cmp, nextPath); // reuses refs where appropriate
    };
  }

  function onChange(cmp, path, nextValue) {
    var nextState;

    if (path.length > 0) {
      nextState = React.addons.update(
        cmp._pendingState || cmp.state,
        path.concat('$set').reduceRight(util.unDeref, nextValue)
      );
    }
    else if (path.length === 0) {
      nextState = nextValue;
    }
    cmp.setState(nextState);
    return new Cursor(cmp, path);
  }

  Cursor.build = cursorBuildMemoizer(function (cmp, path) {
    path = path === undefined ? [] : path;
    return new Cursor(cmp, path);
  });


  return Cursor;
});
