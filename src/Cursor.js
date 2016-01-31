import {merge, push, unshift, splice} from 'update-in';
import memoized from './util/memoized';
import {getIn, rootAt} from './util/associative';
import hashRecord from './util/hashRecord';
import refToHash from './util/refToHash';
import {makeSwapFromReact, makeValueFromReact, isReactCmp} from './ReactAdapter';


let debug = process.env.NODE_ENV !== 'production';


let makeRefinedSwap = memoized(
  (swapFn, paths) => refToHash(swapFn) + hashRecord(paths),
  (swapFn, paths) => (f) => swapFn(rootAt(paths, f)));


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


let NewCursor = memoized(
    (value, swap) => refToHash(swap) + hashRecord(value),
    (value, swap) => new Cursor(value, swap));


Cursor.build = (value, swap) => isReactCmp(value)
    ? NewCursor(makeValueFromReact(value), makeSwapFromReact(value))
    : NewCursor(value, swap);


export default Cursor;
