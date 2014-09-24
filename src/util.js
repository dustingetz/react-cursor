'use strict';

var isEqual = require('deep-equal');
var union = require('array-union');
var omit = require('omit-keys');

function find(array, predicate) {
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

function getRefAtPath(tree, paths) {
  return reduce(paths, deref, tree);
}

function deref(obj, key) {
  return obj[key];
}

function unDeref(obj, key) {
  var nextObj = {};
  nextObj[key] = obj;
  return nextObj;
}

function initial(array) {
  return array.slice(0, array.length - 1);
}

function last(array) {
  return array[array.length - 1];
}

function reduce(array, f, mzero) {
  return array.reduce(f, mzero);
}

function flatten(listOfLists) {
  return [].concat.apply([], listOfLists);
}

function pairs(obj) {
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
function hashString(str) {
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

function generateUUID () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}


function hashRecord(record) {
    return hashString(JSON.stringify(record));
}

/**
 * Generate a unique thing to use as a memoize resolver hash for reference types.
 */
var refsCache = {}; // { id: cmp }
function refToHash (cmp) {
  // search the cmpUniqueMap by reference - have we seen it before?
  // if so, use the assigned id as the hash
  // if not, add to cache and generate a new ID to hash on

  var cmpsWithUid = pairs(refsCache);
  var cmpFound = find(cmpsWithUid, function (cmpAndId) { return cmpAndId[1] === cmp; });
  if (cmpFound) {
    return cmpFound[0]; // return the uid
  }
  else {
    var uid = generateUUID();
    refsCache[uid] = cmp;
    return uid;
  }
}

function memoizeFactory (resolver) {
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

module.exports = {
  getRefAtPath: getRefAtPath,
  deref: deref,
  unDeref: unDeref,
  initial: initial,
  last: last,
  reduce: reduce,
  flatten: flatten,
  pairs: pairs,
  hashString: hashString,
  generateUUID: generateUUID,
  hashRecord: hashRecord,
  refToHash: refToHash,
  memoizeFactory: memoizeFactory,
  isEqual: isEqual,
  union: union,
  omit: omit,
  find: find
};
