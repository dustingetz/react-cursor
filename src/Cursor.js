import {updateIn, merge, push, unshift, splice} from 'update-in';
import {memoized, getIn, hashRecord, refToHash, flatten, deepFreeze} from './util';


class Cursor {
  constructor (rootValue, rootSwap, paths, leafValue) {
    this.value = () => leafValue;
    this.refine = (...morePaths) => internalBuild(rootValue, rootSwap, paths.concat(morePaths), getIn(this.value(), morePaths));
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


let NewCursor = (rootValue, rootSwap, path, leafValue) => new Cursor(rootValue, rootSwap, path, leafValue);

// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
let internalBuildHasher = (rootValue, rootSwap, path, leafValue) => refToHash(rootSwap) + hashRecord(leafValue) + hashRecord(path);
let internalBuild = memoized(internalBuildHasher, NewCursor);


// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Since
// `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
let makeSwapFromReact = memoized(refToHash, cmp => cmp.setState.bind(cmp));


Cursor.build = (rootValue, rootSwap) => {
  var isReactCmp = typeof rootValue.__proto__.render === "function";
  if (isReactCmp) {
    let cmp = rootValue;
    return internalBuild(cmp.state, makeSwapFromReact(cmp), [], cmp.state);
  }
  return internalBuild(rootValue, rootSwap, [], rootValue);
}

Cursor.debug = process.env.NODE_ENV !== 'production';

export default Cursor;
