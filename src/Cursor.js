import {updateIn, merge, push, unshift, splice} from 'update-in';
import {memoizeFactory, getRefAtPath, hashRecord, refToHash, flatten, deepFreeze} from './util';


class Cursor {
  constructor (rootValue, rootSwap, paths, leafValue) {
    this.value = () => leafValue;
    this.refine = (...morePaths) => internalBuild(rootValue, rootSwap, paths.concat(morePaths), getRefAtPath(this.value(), morePaths));
    this.swap = (f, ...args) => rootSwap(rootValue => updateIn(rootValue, paths, v => f.apply(null, [v].concat(args))));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);

    if (Cursor.debug && typeof Object.freeze === 'function') {
      deepFreeze(this);
      deepFreeze(leafValue);
    }
  }
}


// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
var cursorBuildMemoizer = memoizeFactory((rootValue, rootSwap, path, leafValue) => {
  path = path === undefined ? [] : path;
  leafValue = leafValue || getRefAtPath(rootValue, path);
  // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
  // this.props and nextProps have different subtree values, and refining memoizer must account for that
  return refToHash(rootSwap) + hashRecord(leafValue) + hashRecord(path);
});

var internalBuild = cursorBuildMemoizer((rootValue, rootSwap, path, leafValue) => {
  path = path === undefined ? [] : path;
  leafValue = leafValue || getRefAtPath(rootValue, path);
  return new Cursor(rootValue, rootSwap, path, leafValue);
});


// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Otherwise, this test fails:
// "Cursors to the same component are ===". Since `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
var reactCmpMemoizer = memoizeFactory((cmp) => refToHash(cmp));
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
