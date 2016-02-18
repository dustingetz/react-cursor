import {merge, push, unshift, splice, assoc, dissoc} from 'update-in';

export default class CursorOperations {
  set (val) { return this.swap(_ => val); }
  merge (val) { return this.swap(merge, val); }
  push (xs) { return this.swap(push, xs); }
  unshift (xs) { return this.swap(unshift, xs); }
  splice (xs) { return this.swap(splice, xs); }
  assoc (...kvs) { return this.swap.apply(this, [assoc].concat(kvs)); }
  dissoc (...keys) { return this.swap.apply(this, [dissoc].concat(keys)); }
};
