import {getIn, flatten} from './util';
import {updateIn, merge, push, unshift, splice} from 'update-in';
import ReactAdapter from './ReactAdapter';


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
  }
}

// RefCursors have no memoization as they do not expose any notion of value equality.
let NewRefCursor = (rootDeref, rootSwap, path = []) => new RefCursor(rootDeref, rootSwap, path);


RefCursor.build = ReactAdapter(NewRefCursor);

export default RefCursor;
