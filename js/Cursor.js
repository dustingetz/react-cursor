define(['react', 'util'], function (React, util) {
  'use strict';

  function Cursor(cmp, state, pendingGetter, path, commit, partialMemoized) {
    // Please treat values as read-only
    this.value = util.getRefAtPath(state, path); // value to put in the DOM, use from render()

    // Please treat pending values as read-only
    this.pendingValue = function () {
      return util.getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
    };

    // Cursors sharing a path also share an onChange handler - so that we can do meaningful reference equality
    // comparisons for onChange handlers passes as react props in shouldComponentUpdate
    this.onChange = partialMemoized(onChange, cmp, state, pendingGetter, path, commit, partialMemoized);

    this.refine = function (/* one or more paths through the tree */) {
      var nextPath = [].concat(path, util.flatten(arguments));
      return new Cursor(state, pendingGetter, nextPath, commit, partialMemoized);
    };
  }

  function onChange(cmp, state, pendingGetter, path, commit, partialMemoized, nextValue) {
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
    commit(nextState);
    return new Cursor(cmp, state, pendingGetter, path, commit, partialMemoized);
  }


  // build is memoized at global scope
  var cursorBuildMemoizer = util.memoizeFactory(function cursorBuildHasher (cmp) {
    // build should memoize globally on: cmp ref, and cmp.state value
    return util.refToHash(cmp) + util.hashRecord(cmp.state);
    // I think we want to clamp this to cachesize === 2, because we only
    // care about this.state and nextState.
  });


  // Maintain a per-cursor cache of partially applied onChange functions - paths are not global,
  // they are specific to an initial call to Cursor.build
  //
  // If we want two cursor.build calls to have the same change handlers, we have to memozie on the cmp too,
  // then it can be global
  //
  var onChangeMemoizer = util.memoizeFactory(function memoHasher(onChange, cmp, state, pendingGetter, path, commit) {
    /**
     * Given all of the arguments of a memoized onChange function, the only discriminator is the path.
     * An onChange closing over different state values but having the same path is effectively the same
     * onChange for the purposes of effecting change in a reference-equality-sensitive manner.
     */
    return util.refToHash(cmp) + util.hashRecord(path);
  });

  Cursor.build = cursorBuildMemoizer(function (cmp) {
    function pendingGetter () { return cmp._pendingState || cmp.state; }
    return new Cursor(cmp, cmp.state, pendingGetter, [], cmp.setState.bind(cmp), onChangeMemoizer(_.partial));
  });



  return Cursor;
});
