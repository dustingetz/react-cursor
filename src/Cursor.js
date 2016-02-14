import memoized from './util/memoized';
import CursorOperations from './CursorOperations';
import {getIn, rootAt} from './util/associative';
import hashRecord from './util/hashRecord';
import refToHash from './util/refToHash';
import deepFreeze from './util/deepFreeze';
import {makeSwapFromReact, makeValueFromReact, isReactCmp} from './ReactAdapter';


let debug = process.env.NODE_ENV !== 'production';


let makeRefinedSwap = memoized(
  (swapFn, paths) => refToHash(swapFn) + hashRecord(paths),
  (swapFn, paths) => (f) => swapFn(rootAt(paths, f)));


class Cursor extends CursorOperations {
  constructor (value, swapFn) {
    super();
    this.value = () => value;
    this.refine = (...morePaths) => NewCursor(getIn(value, morePaths), makeRefinedSwap(swapFn, morePaths));
    this.swap = (f, ...args) => swapFn((v) => f.apply(null, [v].concat(args)));

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
