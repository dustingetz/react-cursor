import util from './util';
import update from './update';


class RefCursor {
  /**
   * rootDeref and rootSwap together comprise the notion of an atom
   */
  constructor (rootDeref, rootSwap, paths) {
    this.rootDeref = rootDeref;
    this.rootSwap = rootSwap;
    this.paths = paths;

    // These effects (swap and reset) write through to the underlying atom.
    // So these effects are seen in all cursors bound to this atom, at all
    // levels of refinement. Value is always read out of the atom so it is never stale.
    ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach(function (command) {
      this[command] = update.bind(this, rootSwap, paths, '$' + command);
    }.bind(this));
  }


  /**
   * For RefCursors, value is a function since the latest value must be
   * read from the atom reference. It's called deref to emphasize the difference.
   */
  value () {
    return util.getRefAtPath(this.rootDeref(), this.paths);
  }

  refine (/* one or more paths through the tree */) {
    var nextPaths = [].concat(this.paths, util.flatten(arguments));
    return build(this.rootDeref, this.rootSwap, nextPaths);
  }
}


/**
 * RefCursors have no memoization as they do not expose any notion of value equality.
 */
function build (rootDeref, rootSwap, path) {
  path = path === undefined ? [] : path;
  return new RefCursor(rootDeref, rootSwap, path);
}

RefCursor.build = build;

export default RefCursor;
