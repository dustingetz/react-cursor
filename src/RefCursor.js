import {merge, push, unshift, splice} from 'update-in';
import CursorOperations from './CursorOperations';
import memoized from './util/memoized';
import {getIn, rootAt} from './util/associative';
import hashRecord from './util/hashRecord';
import refToHash from './util/refToHash';
import {makeDerefFromReact, makeSwapFromReact, isReactCmp} from './ReactAdapter';


let makeRefinedSwap = memoized(
  (swapFn, paths) => refToHash(swapFn) + hashRecord(paths),
  (swapFn, paths) => (f) => swapFn(rootAt(paths, f)));


let makeRefinedDeref = memoized(
  (deref, paths) => refToHash(deref) + hashRecord(paths),
  (deref, paths) => () => getIn(deref(), paths));


class RefCursor extends CursorOperations {
  constructor (deref, swapFn) {
    super();
    this.value = deref;
    this.refine = (...morePaths) => NewRefCursor(makeRefinedDeref(deref, morePaths), makeRefinedSwap(swapFn, morePaths));
    this.swap = (f, ...args) => swapFn((v) => f.apply(null, [v].concat(args)));

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
