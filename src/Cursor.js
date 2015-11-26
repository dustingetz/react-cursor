import util from './util';
import update from './update';


function Cursor(rootValue, rootSwap, path, leafValue) {
  this.value = () => leafValue;

  ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach(function (command) {
    this[command] = update.bind(this, rootSwap, path, '$' + command);
  }.bind(this));

  this.refine = function (/* one or more paths through the tree */) {
    // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
    // this.props and nextProps have different subtree values, and refining memoizer must account for that

    var nextPath = [].concat(path, util.flatten(arguments));
    var nextValue = util.getRefAtPath(this.value(), util.flatten(arguments));
    return build(rootValue, rootSwap, nextPath, nextValue); // memoized
  };

  if (Cursor.debug && typeof Object.freeze === 'function') {
    util.deepFreeze(this);
    util.deepFreeze(value);
  }
}


// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
var cursorBuildMemoizer = util.memoizeFactory((rootValue, rootSwap, path, leafValue) => {
  path = path === undefined ? [] : path;
  leafValue = leafValue || util.getRefAtPath(rootValue, path);
  return util.refToHash(rootSwap) + util.hashRecord(leafValue) + util.hashRecord(path);
});

var build = cursorBuildMemoizer((rootValue, rootSwap, path, leafValue) => {
  path = path === undefined ? [] : path;
  leafValue = leafValue || util.getRefAtPath(rootValue, path);
  return new Cursor(rootValue, rootSwap, path, leafValue);
});



Cursor.build = build;

Cursor.debug = process.env.NODE_ENV !== 'production';

export default Cursor;
