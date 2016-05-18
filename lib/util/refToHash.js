"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refToHash;
/**
 * Generate a unique thing to use as a memoize resolver hash for reference types.
 */
var refsCache = new WeakMap();
var cacheIdIndex = 0;
function refToHash(o) {
  var cachedUid = refsCache.get(o);
  var uid = cachedUid || (cacheIdIndex++).toString();
  !cachedUid && refsCache.set(o, uid);
  return uid;
};