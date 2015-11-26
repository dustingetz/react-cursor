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
    return internalBuild(rootValue, rootSwap, nextPath, nextValue); // memoized
  };

  if (Cursor.debug && typeof Object.freeze === 'function') {
    util.deepFreeze(this);
    util.deepFreeze(leafValue);
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

var internalBuild = cursorBuildMemoizer((rootValue, rootSwap, path, leafValue) => {
  path = path === undefined ? [] : path;
  leafValue = leafValue || util.getRefAtPath(rootValue, path);
  return new Cursor(rootValue, rootSwap, path, leafValue);
});


// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Otherwise, this test fails:
// "Cursors to the same component are ===". Since `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
var reactCmpMemoizer = util.memoizeFactory((cmp) => util.refToHash(cmp));
var memoizedReactStateSwapper = reactCmpMemoizer((cmp) => cmp.setState.bind(cmp));

function build (rootValue, rootSwap) {
  var isReactCmp = typeof rootValue.__proto__.render === "function";
  if (isReactCmp) {
    var cmp = rootValue;
    return internalBuild(cmp.state, memoizedReactStateSwapper(cmp));
  }
  return internalBuild(rootValue, rootSwap);
}


Cursor.build = build;

Cursor.debug = process.env.NODE_ENV !== 'production';

export default Cursor;
