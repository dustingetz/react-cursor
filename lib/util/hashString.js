"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashString;
/**
 * Hash of null is null, hash of undefined is undefined
 */
function hashString(str) {
  var hash = 0,
      i,
      ch,
      l;
  if (str === undefined || str === null) {
    return str;
  }
  if (str.length === 0) {
    return hash;
  }
  for (i = 0, l = str.length; i < l; i++) {
    ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}