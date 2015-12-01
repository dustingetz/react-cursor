import {updateIn, merge, push, unshift, splice} from 'update-in';
import {memoized, getIn, hashRecord, refToHash, flatten, deepFreeze} from './util';
import {makeDerefFromReact, makeSwapFromReact, makeValueFromReact, isReactCmp} from './ReactAdapter';


let debug = process.env.NODE_ENV !== 'production';

class Cursor {
  constructor (rootValue, rootSwap, paths, leafValue) {
    this.value = () => leafValue;
    this.refine = (...morePaths) => NewCursor(rootValue, rootSwap, paths.concat(morePaths), getIn(this.value(), morePaths));
    this.swap = (f, ...args) => rootSwap(rootValue => updateIn(rootValue, paths, v => f.apply(null, [v].concat(args))));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);

    debug && deepFreeze(leafValue);
  }
}


let NewCursor_ = (rootValue, rootSwap, paths = []) => new Cursor(rootValue, rootSwap, paths, rootValue);

// reuse the same cursor instance for same {value swap paths},
let hasher = (rootValue, rootSwap, paths, leafValue) => refToHash(rootSwap) + hashRecord(leafValue) + hashRecord(paths);
let NewCursor = memoized(hasher, NewCursor_);


Cursor.build = (value, swap) => {
  return isReactCmp(value)
      ? NewCursor(makeValueFromReact(value), makeSwapFromReact(value))
      : NewCursor(value, swap);
};

export default Cursor;
