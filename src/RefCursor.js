import {memoized, refToHash, hashRecord, getIn, flatten} from './util';
import {updateIn, merge, push, unshift, splice} from 'update-in';
import {makeDerefFromReact, makeSwapFromReact, isReactCmp} from './ReactAdapter';


class RefCursor {
  constructor (rootDeref, rootSwap, paths) {
    this.value = () => getIn(rootDeref(), paths);
    this.refine = (...morePaths) => NewRefCursor(rootDeref, rootSwap, paths.concat(morePaths));
    this.swap = (f, ...args) => rootSwap(rootValue => updateIn(rootValue, paths, v => f.apply(null, [v].concat(args))));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);

    // RefCursors don't own a value, so they aren't responsible for freezing it.
  }
}


let NewRefCursor_ = (rootDeref, rootSwap, paths = []) => new RefCursor(rootDeref, rootSwap, paths);

// reuse the same cursor instance for same {deref swap paths}
let hasher = (rootDeref, rootSwap, paths) => refToHash(rootDeref) + refToHash(rootSwap) + hashRecord(paths);
let NewRefCursor = memoized(hasher, NewRefCursor_);


RefCursor.build = (deref, swap) => {
  return isReactCmp(deref)
      ? NewRefCursor(makeDerefFromReact(deref), makeSwapFromReact(deref))
      : NewRefCursor(deref, swap);
};

export default RefCursor;
