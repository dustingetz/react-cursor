import {memoized, refToHash, hashRecord, getIn, rootAt} from './util';
import {merge, push, unshift, splice} from 'update-in';
import {makeDerefFromReact, makeSwapFromReact, isReactCmp} from './ReactAdapter';


let makeRefinedSwap = memoized(
  (swapFn, paths) => refToHash(swapFn) + hashRecord(paths),
  (swapFn, paths) => (f) => swapFn(rootAt(paths, f)));


let makeRefinedDeref = memoized(
  (deref, paths) => refToHash(deref) + hashRecord(paths),
  (deref, paths) => () => getIn(deref(), paths));


class RefCursor {
  constructor (deref, swapFn) {
    this.value = deref;
    this.refine = (...morePaths) => NewRefCursor(makeRefinedDeref(deref, morePaths), makeRefinedSwap(swapFn, morePaths));
    this.swap = (f, ...args) => swapFn((v) => f.apply(null, [v].concat(args)));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);

    // RefCursors don't own a value, so they aren't responsible for freezing it.
  }
}


let NewRefCursor = memoized(
    (deref, swap) => refToHash(deref) + refToHash(swap),
    (deref, swap) => new RefCursor(deref, swap));


RefCursor.build = (deref, swap) => isReactCmp(deref)
    ? NewRefCursor(makeDerefFromReact(deref), makeSwapFromReact(deref))
    : NewRefCursor(deref, swap);


export default RefCursor;
