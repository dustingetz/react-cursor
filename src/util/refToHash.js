/**
 * Generate a unique thing to use as a memoize resolver hash for reference types.
 */
let refsCache = new WeakMap();
var cacheIdIndex = 0;
export default function refToHash (o) {
  let cachedUid = refsCache.get(o);
  let uid =  cachedUid || (cacheIdIndex++).toString();
  !cachedUid && refsCache.set(o, uid);
  return uid;
};
