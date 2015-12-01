import {updateIn, merge, push, unshift, splice} from 'update-in';
import {memoized, getIn, hashRecord, refToHash, flatten, deepFreeze} from './util';
import ReactAdapter from './ReactAdapter';


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


var NewCursor = (rootValue, rootSwap, path = [], leafValue = rootValue) => new Cursor(rootValue, rootSwap, path, leafValue);

// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
let hasher = (rootValue, rootSwap, path, leafValue) => refToHash(rootSwap) + hashRecord(leafValue) + hashRecord(path);
NewCursor = memoized(hasher, NewCursor);


Cursor.build = ReactAdapter(NewCursor);

export default Cursor;
