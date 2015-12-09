import {merge, push, unshift, splice} from 'update-in';
import {memoized, getIn, hashRecord, refToHash, deepFreeze, rootAt} from './util';
import {makeSwapFromReact, makeValueFromReact, isReactCmp} from './ReactAdapter';


let debug = process.env.NODE_ENV !== 'production';

let makeRefinedSwap = memoized(
  (swapFn, paths) => refToHash(swapFn) + hashRecord(paths),
  (swapFn, paths) => (f) => swapFn(rootAt(paths, f))
);

class Cursor {
  constructor (value, swapFn) {
    this.value = () => value;
    this.refine = (...morePaths) => NewCursor(getIn(value, morePaths), makeRefinedSwap(swapFn, morePaths));
    this.swap = (f, ...args) => swapFn((v) => f.apply(null, [v].concat(args)));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);

    debug && deepFreeze(value);
  }
}


let NewCursor_ = (value, swap) => new Cursor(value, swap);

// reuse the same cursor instance for same {value swap},
let hasher = (value, swap) => refToHash(swap) + hashRecord(value);
let NewCursor = memoized(hasher, NewCursor_);


Cursor.build = (value, swap) => {
  return isReactCmp(value)
      ? NewCursor(makeValueFromReact(value), makeSwapFromReact(value))
      : NewCursor(value, swap);
};

export default Cursor;
