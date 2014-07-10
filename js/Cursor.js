define(['react', 'util'], function (React, util) {
  'use strict';


  function Cursor(cmp, path) {
    // value to put in the DOM, use from render() and the component lifecycle methods
    this.value = util.getRefAtPath(cmp.state, path);

    this.pendingValue = function () {
      // the current value right now, use in event handlers
      return util.getRefAtPath(cmp._pendingState || cmp.state, path);
    };

    this.onChange = _.partial(onChange, cmp, path);

    this.refine = function (/* one or more paths through the tree */) {
      var nextPath = [].concat(path, util.flatten(arguments));
      return Cursor.build(cmp, nextPath); // memoized
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
  }


  // If we build two cursors for the same path on the same React component,
  // and those React components have equal state, reuse the same cursor instance,
  // so we can use === to compare them.
  var cursorBuildMemoizer = util.memoizeFactory(function (cmp, path) {
    path = path === undefined ? [] : path; // account for the default value here
    return util.refToHash(cmp) + util.hashRecord(cmp.state) + util.hashRecord(path);
    // I think we want to clamp this to cachesize === 2, because we only
    // care about this.state and nextState.
  });

  var build = cursorBuildMemoizer(function (cmp, path) {
    path = path === undefined ? [] : path;
    return new Cursor(cmp, path);
  });


  return { build: build };
});
