import isEqual from 'deep-equal';
import {updateIn} from 'update-in';


export function find(array, predicate) {
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  var list = Object(array);
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
}

export function getIn(tree, paths) { // this is get-in in clojure
  return reduce(paths, get, tree);
}

export function get(obj, key) {
  console.assert(key in obj, `Bad cursor refine: '${key}' not found in `, obj);
  return obj[key];
}

export function initial(array) {
  return array.slice(0, array.length - 1);
}

export function reduce(array, f, mzero) {
  return array.reduce(f, mzero);
}

export function flatten(listOfLists) {
  return [].concat.apply([], listOfLists);
}

export function pairs(obj) {
  var keys = Object.keys(obj);
  var length = keys.length;
  var pairs = Array(length);
  for (var i = 0; i < length; i++) {
    pairs[i] = [keys[i], obj[keys[i]]];
  }
  return pairs;
};

/**
 * Hash of null is null, hash of undefined is undefined
 */
export function hashString(str) {
  var hash = 0, i, ch, l;
  if (str === undefined || str === null) {
      return str;
  }
  if (str.length === 0) {
      return hash;
  }
  for (i = 0, l = str.length; i < l; i++) {
      ch  = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + ch;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function hashRecord(record) {
    return hashString(JSON.stringify(record));
}

/**
 * Generate a unique thing to use as a memoize resolver hash for reference types.
 */
let refsCache = new WeakMap();
var cacheIdIndex = 0;
export function refToHash (o) {
  let cachedUid = refsCache.get(o);
  let uid =  cachedUid || (cacheIdIndex++).toString();
  !cachedUid && refsCache.set(o, uid);
  return uid;
}

let identity = x => x;

export function memoized (hasher = identity, f) {
  var cache = {};
  return (...args) => {
    // hasher gets the same arguments as f, to create the hashKey
    const hashKey = hasher.apply(this, args);
    return hasOwnProperty.call(cache, hashKey)
        ? cache[hashKey]
        : (cache[hashKey] = f.apply(this, args));
  };
}

function isObject(value) {
  return !!value && typeof value == 'object';
}

// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
export function deepFreeze(obj) {
  if (typeof Object.freeze !== 'function') {
    return obj;
  }

  if (!isObject(obj)) {
    return obj;
  }

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (isObject(prop) && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}

export const valEq = (a, b) => isEqual(a, b);
export const refEq = (a, b) => a === b;

export let rootAt = (segments, fn) => (value) => updateIn(value, segments, fn);
