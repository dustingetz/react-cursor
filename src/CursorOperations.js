import {merge, push, unshift, splice} from 'update-in';

export default class CursorOperations {
  set (val) { return this.swap(_ => val); }
  merge (val) { return this.swap(merge, val); }
  push (xs) { return this.swap(push, xs); }
  unshift (xs) { return this.swap(unshift, xs); }
  splice (xs) { return this.swap(splice, xs); }
};
