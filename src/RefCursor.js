import {getIn, flatten} from './util';
import {updateIn, merge, push, unshift, splice} from 'update-in';


class RefCursor {
  constructor (rootDeref, rootSwap, paths) {
    this.value = () => getIn(rootDeref(), paths);
    this.refine = (...morePaths) => build(rootDeref, rootSwap, paths.concat(morePaths));
    this.swap = (f, ...args) => rootSwap(rootValue => updateIn(rootValue, paths, v => f.apply(null, [v].concat(args))));

    this.set = (val) => this.swap(v => val);
    this.merge = (val) => this.swap(merge, val);
    this.push = (xs) => this.swap(push, xs);
    this.unshift = (xs) => this.swap(unshift, xs);
    this.splice = (xs) => this.swap(splice, xs);
  }
}


/**
 * RefCursors have no memoization as they do not expose any notion of value equality.
 */
function build (rootDeref, rootSwap, path) {
  path = path === undefined ? [] : path;
  return new RefCursor(rootDeref, rootSwap, path);
}

RefCursor.build = build;

export default RefCursor;
