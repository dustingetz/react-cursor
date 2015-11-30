import isObject from 'lodash.isobject';
import isEqual from 'deep-equal';


export let clone = (xs) => xs.slice(0);

function butLast (xs) {
  let xxs = clone(xs);
  xxs.pop();
  return xxs;
}

export let apply = (f, ...args) => {
  // last arg can be a seq of more args
  args = [].concat(butLast(args), last(args));
  return f.apply(null, args);
};

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
  console.assert(key in obj, `Bad cursor refine: path ${key} not found in `, obj);
  return obj[key];
}

export function initial(array) {
  return array.slice(0, array.length - 1);
}

export function last(array) {
  return array[array.length - 1];
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
var refsCache = {}; // { id: cmp }
var cacheIdIndex = 0;
export function refToHash (cmp) {
  // search the cmpUniqueMap by reference - have we seen it before?
  // if so, use the assigned id as the hash
  // if not, add to cache and increment cacheIdIndex as a new ID to hash on

  var cmpsWithUid = pairs(refsCache);
  var cmpFound = find(cmpsWithUid, function (cmpAndId) { return cmpAndId[1] === cmp; });
  if (cmpFound) {
    return cmpFound[0]; // return the uid
  }
  else {
    var uid = (cacheIdIndex++).toString();
    refsCache[uid] = cmp;
    return uid;
  }
}

export function memoizeFactory (resolver) {
  var cache = {};
  function memoize(func) {
    return function () {
      var key = resolver ? resolver.apply(this, arguments) : arguments[0];
      return hasOwnProperty.call(cache, key)
        ? cache[key]
        : (cache[key] = func.apply(this, arguments));
    };
  }
  return memoize;
}


// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
export function deepFreeze(obj) {
  if (!isObject(obj)) {
    return obj;
  }

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}

export const valEq = (a, b) => isEqual(a, b);
export const refEq = (a, b) => a === b;
