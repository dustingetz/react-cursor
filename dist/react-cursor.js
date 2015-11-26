/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Cursor = __webpack_require__(1);
	
	var _Cursor2 = _interopRequireDefault(_Cursor);
	
	var _RefCursor = __webpack_require__(18);
	
	var _RefCursor2 = _interopRequireDefault(_RefCursor);
	
	var _ImmutableOptimizations = __webpack_require__(19);
	
	var _ImmutableOptimizations2 = _interopRequireDefault(_ImmutableOptimizations);
	
	exports['default'] = {
	  Cursor: _Cursor2['default'],
	  ImmutableOptimizations: _ImmutableOptimizations2['default'],
	  RefCursor: _RefCursor2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _update = __webpack_require__(11);
	
	var _update2 = _interopRequireDefault(_update);
	
	function Cursor(rootValue, rootSwap, path, leafValue) {
	  this.value = function () {
	    return leafValue;
	  };
	
	  ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach((function (command) {
	    this[command] = _update2['default'].bind(this, rootSwap, path, '$' + command);
	  }).bind(this));
	
	  this.refine = function () /* one or more paths through the tree */{
	    // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
	    // this.props and nextProps have different subtree values, and refining memoizer must account for that
	
	    var nextPath = [].concat(path, _util2['default'].flatten(arguments));
	    var nextValue = _util2['default'].getRefAtPath(this.value(), _util2['default'].flatten(arguments));
	    return build(rootValue, rootSwap, nextPath, nextValue); // memoized
	  };
	}
	
	// If we build two cursors for the same path on the same React component,
	// and those React components have equal state, reuse the same cursor instance,
	// so we can use === to compare them.
	var cursorBuildMemoizer = _util2['default'].memoizeFactory(function (rootValue, rootSwap, path, leafValue) {
	  path = path === undefined ? [] : path;
	  leafValue = leafValue || _util2['default'].getRefAtPath(rootValue, path);
	  return _util2['default'].refToHash(rootSwap) + _util2['default'].hashRecord(leafValue) + _util2['default'].hashRecord(path);
	});
	
	var build = cursorBuildMemoizer(function (rootValue, rootSwap, path, leafValue) {
	  path = path === undefined ? [] : path;
	  leafValue = leafValue || _util2['default'].getRefAtPath(rootValue, path);
	  return new Cursor(rootValue, rootSwap, path, leafValue);
	});
	
	Cursor.build = build;
	
	Cursor.debug = false;
	
	exports['default'] = Cursor;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deepEqual = __webpack_require__(3);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _arrayUnion = __webpack_require__(6);
	
	var _arrayUnion2 = _interopRequireDefault(_arrayUnion);
	
	var _omitKeys = __webpack_require__(8);
	
	var _omitKeys2 = _interopRequireDefault(_omitKeys);
	
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
	
	function hashRecord(record) {
	  return hashString(JSON.stringify(record));
	}
	
	/**
	 * Generate a unique thing to use as a memoize resolver hash for reference types.
	 */
	var refsCache = {}; // { id: cmp }
	var cacheIdIndex = 0;
	function refToHash(cmp) {
	  // search the cmpUniqueMap by reference - have we seen it before?
	  // if so, use the assigned id as the hash
	  // if not, add to cache and increment cacheIdIndex as a new ID to hash on
	
	  var cmpsWithUid = pairs(refsCache);
	  var cmpFound = find(cmpsWithUid, function (cmpAndId) {
	    return cmpAndId[1] === cmp;
	  });
	  if (cmpFound) {
	    return cmpFound[0]; // return the uid
	  } else {
	      var uid = (cacheIdIndex++).toString();
	      refsCache[uid] = cmp;
	      return uid;
	    }
	}
	
	function memoizeFactory(resolver) {
	  var cache = {};
	  function memoize(func) {
	    return function () {
	      var key = resolver ? resolver.apply(this, arguments) : arguments[0];
	      return hasOwnProperty.call(cache, key) ? cache[key] : cache[key] = func.apply(this, arguments);
	    };
	  }
	  return memoize;
	}
	
	exports['default'] = {
	  getRefAtPath: getRefAtPath,
	  deref: deref,
	  unDeref: unDeref,
	  initial: initial,
	  last: last,
	  reduce: reduce,
	  flatten: flatten,
	  pairs: pairs,
	  hashString: hashString,
	  hashRecord: hashRecord,
	  refToHash: refToHash,
	  memoizeFactory: memoizeFactory,
	  isEqual: _deepEqual2['default'],
	  union: _arrayUnion2['default'],
	  omit: _omitKeys2['default'],
	  find: find
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(4);
	var isArguments = __webpack_require__(5);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var arrayUniq = __webpack_require__(7);
	
	module.exports = function () {
		return arrayUniq([].concat.apply([], arguments));
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// there's 3 implementations written in increasing order of efficiency
	
	// 1 - no Set type is defined
	function uniqNoSet(arr) {
		var ret = [];
	
		for (var i = 0; i < arr.length; i++) {
			if (ret.indexOf(arr[i]) === -1) {
				ret.push(arr[i]);
			}
		}
	
		return ret;
	}
	
	// 2 - a simple Set type is defined
	function uniqSet(arr) {
		var seen = new Set();
		return arr.filter(function (el) {
			if (!seen.has(el)) {
				seen.add(el);
				return true;
			}
		});
	}
	
	// 3 - a standard Set type is defined and it has a forEach method
	function uniqSetWithForEach(arr) {
		var ret = [];
	
		(new Set(arr)).forEach(function (el) {
			ret.push(el);
		});
	
		return ret;
	}
	
	// V8 currently has a broken implementation
	// https://github.com/joyent/node/issues/8449
	function doesForEachActuallyWork() {
		var ret = false;
	
		(new Set([true])).forEach(function (el) {
			ret = el;
		});
	
		return ret === true;
	}
	
	if ('Set' in global) {
		if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
			module.exports = uniqSetWithForEach;
		} else {
			module.exports = uniqSet;
		}
	} else {
		module.exports = uniqNoSet;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * omit-key <https://github.com/jonschlinkert/omit-key>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(9);
	var difference = __webpack_require__(10);
	
	module.exports = function omit(obj, keys) {
	  if (!isObject(obj)) {
	    return {};
	  }
	
	  var props = Object.keys(obj);
	  var len = props.length;
	
	  keys = Array.isArray(keys) ? keys : [keys];
	  var diff = difference(props, keys);
	  var o = {};
	
	  for (var i = 0; i < len; i++) {
	    var key = diff[i];
	
	    if (obj.hasOwnProperty(key)) {
	      o[key] = obj[key];
	    }
	  }
	  return o;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	/**
	 * is the value an object, and not an array?
	 *
	 * @param  {*} `value`
	 * @return {Boolean}
	 */
	
	module.exports = function isObject(o) {
	  return o != null && typeof o === 'object'
	    && !Array.isArray(o);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function(global) {
	
		var indexOf = Array.prototype.indexOf || function(elem) {
			var idx, len;
	
			if (this == null) {
				throw new TypeError("indexOf called on null or undefined");
			}
	
			for (idx = 0, len = this.length; idx < len; ++idx) {
				if (this[idx] === elem) {
					return idx;
				}
			}
	
			return -1;
		};
	
		function difference(a, b) {
			var idx, len;
			var res = [];
	
			for (idx = 0, len = a.length; idx < len; ++idx) {
				if (indexOf.call(b, a[idx]) === -1) {
					res.push(a[idx]);
				}
			}
			for (idx = 0, len = b.length; idx < len; ++idx) {
				if (indexOf.call(a, b[idx]) === -1) {
					res.push(b[idx]);
				}
			}
			return res;
		}
	
		if (typeof module === "object" && module.exports) {
			module.exports = difference;
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return difference;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			global.difference = difference;
		}
	
	}(this));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _reactAddonsUpdate = __webpack_require__(12);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function update(rootSwap, path, operation, leafUpdate) {
	  // Backwards compatibility with non-function values of nextUpdate
	  if (typeof leafUpdate !== "function") {
	    var prevValue = leafUpdate;
	    leafUpdate = function () {
	      return prevValue;
	    };
	  }
	
	  rootSwap(function (rootVal) {
	    var nextState;
	
	    if (path.length > 0) {
	      nextState = (0, _reactAddonsUpdate2['default'])(rootVal, path.concat(operation).reduceRight(_util2['default'].unDeref, leafUpdate(_util2['default'].getRefAtPath(rootVal, path))));
	    } else if (path.length === 0) {
	      nextState = leafUpdate(rootVal);
	    }
	
	    return nextState;
	  });
	}
	
	exports['default'] = update;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */
	
	/* global hasOwnProperty:true */
	
	'use strict';
	
	var assign = __webpack_require__(15);
	var keyOf = __webpack_require__(16);
	var invariant = __webpack_require__(17);
	var hasOwnProperty = ({}).hasOwnProperty;
	
	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}
	
	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });
	
	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];
	
	var ALL_COMMANDS_SET = {};
	
	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});
	
	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
	}
	
	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;
	
	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;
	
	    return spec[COMMAND_SET];
	  }
	
	  var nextValue = shallowCopy(value);
	
	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }
	
	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }
	
	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }
	
	  return nextValue;
	}
	
	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	
	'use strict';
	
	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }
	
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }
	
	    var from = Object(nextSource);
	
	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.
	
	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }
	
	  return to;
	}
	
	module.exports = assign;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */
	
	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";
	
	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};
	
	module.exports = keyOf;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _update = __webpack_require__(11);
	
	var _update2 = _interopRequireDefault(_update);
	
	var RefCursor = (function () {
	  /**
	   * rootDeref and rootSwap together comprise the notion of an atom
	   */
	
	  function RefCursor(rootDeref, rootSwap, paths) {
	    _classCallCheck(this, RefCursor);
	
	    this.rootDeref = rootDeref;
	    this.rootSwap = rootSwap;
	    this.paths = paths;
	
	    // These effects (swap and reset) write through to the underlying atom.
	    // So these effects are seen in all cursors bound to this atom, at all
	    // levels of refinement. Value is always read out of the atom so it is never stale.
	    ['push', 'unshift', 'splice', 'set', 'merge', 'apply'].forEach((function (command) {
	      this[command] = _update2['default'].bind(this, rootSwap, paths, '$' + command);
	    }).bind(this));
	  }
	
	  /**
	   * RefCursors have no memoization as they do not expose any notion of value equality.
	   */
	
	  /**
	   * For RefCursors, value is a function since the latest value must be
	   * read from the atom reference. It's called deref to emphasize the difference.
	   */
	
	  _createClass(RefCursor, [{
	    key: 'value',
	    value: function value() {
	      return _util2['default'].getRefAtPath(this.rootDeref(), this.paths);
	    }
	  }, {
	    key: 'refine',
	    value: function refine() /* one or more paths through the tree */{
	      var nextPaths = [].concat(this.paths, _util2['default'].flatten(arguments));
	      return build(this.rootDeref, this.rootSwap, nextPaths);
	    }
	  }]);
	
	  return RefCursor;
	})();
	
	function build(rootDeref, rootSwap, path) {
	  path = path === undefined ? [] : path;
	  return new RefCursor(rootDeref, rootSwap, path);
	}
	
	RefCursor.build = build;
	
	exports['default'] = RefCursor;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function ImmutableOptimizations(refFields, ignoredFields /*optional*/) {
	  var noValueCheckFields = refFields.concat(ignoredFields || []);
	  return {
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	      var currentProps = this.props;
	
	      var valuesChanged = !_util2['default'].isEqual(_util2['default'].omit(nextProps, noValueCheckFields), _util2['default'].omit(currentProps, noValueCheckFields));
	
	      var refsChanged = !refFields.every(function (field) {
	        return currentProps[field] === nextProps[field];
	      });
	
	      return valuesChanged || refsChanged;
	    }
	  };
	}
	
	exports['default'] = ImmutableOptimizations;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDYwMzI3MTQ2YzYzMjI2MmM4YmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9hcnJheS11bmlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2FycmF5LXVuaXEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9vbWl0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pc29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2FycmF5LWRpZmZlcmVuY2UvZGlmZmVyZW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXBkYXRlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtYWRkb25zLXVwZGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi91cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2tleU9mLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL3NyYy9SZWZDdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ltbXV0YWJsZU9wdGltaXphdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMEJBQXlCLDhCQUE4QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QyxnQkFBZ0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JELE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBLDRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQ2hEaUIsQ0FBUTs7OzttQ0FDTixFQUFVOzs7O0tBR3ZCLFNBQVM7Ozs7O0FBSUQsWUFKUixTQUFTLENBSUEsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7MkJBSnJDLFNBQVM7O0FBS1gsU0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDM0IsU0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Ozs7O0FBS25CLE1BQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVSxPQUFPLEVBQUU7QUFDaEYsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG9CQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUM7TUFDbkUsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNmOzs7Ozs7Ozs7OztnQkFmRyxTQUFTOztZQXNCUCxpQkFBRztBQUNQLGNBQU8sa0JBQUssWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDeEQ7OztZQUVNLDBEQUEyQztBQUNoRCxXQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsa0JBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsY0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQ3hEOzs7VUE3QkcsU0FBUzs7O0FBb0NmLFVBQVMsS0FBSyxDQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQ3pDLE9BQUksR0FBRyxJQUFJLEtBQUssU0FBUyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDdEMsVUFBTyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ2pEOztBQUVELFVBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztzQkFFVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7aUNDL0NQLENBQVE7Ozs7QUFHekIsVUFBUyxzQkFBc0IsQ0FBRSxTQUFTLEVBQUUsYUFBYSxlQUFjO0FBQ3JFLE9BQUksa0JBQWtCLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUM7QUFDL0QsVUFBTztBQUNMLDBCQUFxQixFQUFFLCtCQUFVLFNBQVMsRUFBRTtBQUMxQyxXQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUU5QixXQUFJLGFBQWEsR0FBRyxDQUFDLGtCQUFLLE9BQU8sQ0FDL0Isa0JBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxrQkFBSyxJQUFJLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7QUFFL0MsV0FBSSxXQUFXLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQ2xELGdCQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDOztBQUVILGNBQU8sYUFBYSxJQUFJLFdBQVcsQ0FBQztNQUNyQztJQUNGLENBQUM7RUFDSDs7c0JBRWMsc0JBQXNCIiwiZmlsZSI6InJlYWN0LWN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NjAzMjcxNDZjNjMyMjYyYzhiYVxuICoqLyIsImltcG9ydCBDdXJzb3IgZnJvbSAnLi9DdXJzb3InO1xuaW1wb3J0IFJlZkN1cnNvciBmcm9tICcuL1JlZkN1cnNvcic7XG5pbXBvcnQgSW1tdXRhYmxlT3B0aW1pemF0aW9ucyBmcm9tICcuL0ltbXV0YWJsZU9wdGltaXphdGlvbnMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ3Vyc29yOiBDdXJzb3IsXG4gIEltbXV0YWJsZU9wdGltaXphdGlvbnM6IEltbXV0YWJsZU9wdGltaXphdGlvbnMsXG4gIFJlZkN1cnNvcjogUmVmQ3Vyc29yXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC1jdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICcuL3VwZGF0ZSc7XG5cblxuZnVuY3Rpb24gQ3Vyc29yKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkge1xuICB0aGlzLnZhbHVlID0gKCkgPT4gbGVhZlZhbHVlO1xuXG4gIFsncHVzaCcsICd1bnNoaWZ0JywgJ3NwbGljZScsICdzZXQnLCAnbWVyZ2UnLCAnYXBwbHknXS5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICAgdGhpc1tjb21tYW5kXSA9IHVwZGF0ZS5iaW5kKHRoaXMsIHJvb3RTd2FwLCBwYXRoLCAnJCcgKyBjb21tYW5kKTtcbiAgfS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLnJlZmluZSA9IGZ1bmN0aW9uICgvKiBvbmUgb3IgbW9yZSBwYXRocyB0aHJvdWdoIHRoZSB0cmVlICovKSB7XG4gICAgLy8gV2hlbiByZWZpbmluZyBpbnNpZGUgYSBsaWZlY3ljbGUgbWV0aG9kLCBzYW1lIGNtcChzd2FwcGVyKSBhbmQgc2FtZSBwYXRoIGlzbid0IGVub3VnaC5cbiAgICAvLyB0aGlzLnByb3BzIGFuZCBuZXh0UHJvcHMgaGF2ZSBkaWZmZXJlbnQgc3VidHJlZSB2YWx1ZXMsIGFuZCByZWZpbmluZyBtZW1vaXplciBtdXN0IGFjY291bnQgZm9yIHRoYXRcblxuICAgIHZhciBuZXh0UGF0aCA9IFtdLmNvbmNhdChwYXRoLCB1dGlsLmZsYXR0ZW4oYXJndW1lbnRzKSk7XG4gICAgdmFyIG5leHRWYWx1ZSA9IHV0aWwuZ2V0UmVmQXRQYXRoKHRoaXMudmFsdWUoKSwgdXRpbC5mbGF0dGVuKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiBidWlsZChyb290VmFsdWUsIHJvb3RTd2FwLCBuZXh0UGF0aCwgbmV4dFZhbHVlKTsgLy8gbWVtb2l6ZWRcbiAgfTtcbn1cblxuXG4vLyBJZiB3ZSBidWlsZCB0d28gY3Vyc29ycyBmb3IgdGhlIHNhbWUgcGF0aCBvbiB0aGUgc2FtZSBSZWFjdCBjb21wb25lbnQsXG4vLyBhbmQgdGhvc2UgUmVhY3QgY29tcG9uZW50cyBoYXZlIGVxdWFsIHN0YXRlLCByZXVzZSB0aGUgc2FtZSBjdXJzb3IgaW5zdGFuY2UsXG4vLyBzbyB3ZSBjYW4gdXNlID09PSB0byBjb21wYXJlIHRoZW0uXG52YXIgY3Vyc29yQnVpbGRNZW1vaXplciA9IHV0aWwubWVtb2l6ZUZhY3RvcnkoKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkgPT4ge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICBsZWFmVmFsdWUgPSBsZWFmVmFsdWUgfHwgdXRpbC5nZXRSZWZBdFBhdGgocm9vdFZhbHVlLCBwYXRoKTtcbiAgcmV0dXJuIHV0aWwucmVmVG9IYXNoKHJvb3RTd2FwKSArIHV0aWwuaGFzaFJlY29yZChsZWFmVmFsdWUpICsgdXRpbC5oYXNoUmVjb3JkKHBhdGgpO1xufSk7XG5cbnZhciBidWlsZCA9IGN1cnNvckJ1aWxkTWVtb2l6ZXIoKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkgPT4ge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICBsZWFmVmFsdWUgPSBsZWFmVmFsdWUgfHwgdXRpbC5nZXRSZWZBdFBhdGgocm9vdFZhbHVlLCBwYXRoKTtcbiAgcmV0dXJuIG5ldyBDdXJzb3Iocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aCwgbGVhZlZhbHVlKTtcbn0pO1xuXG5cblxuQ3Vyc29yLmJ1aWxkID0gYnVpbGQ7XG5cbkN1cnNvci5kZWJ1ZyA9IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9DdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQgaXNFcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcbmltcG9ydCB1bmlvbiBmcm9tICdhcnJheS11bmlvbic7XG5pbXBvcnQgb21pdCBmcm9tICdvbWl0LWtleXMnO1xuXG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIHByZWRpY2F0ZSkge1xuICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICB2YXIgbGlzdCA9IE9iamVjdChhcnJheSk7XG4gIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gIHZhciB2YWx1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0UmVmQXRQYXRoKHRyZWUsIHBhdGhzKSB7XG4gIHJldHVybiByZWR1Y2UocGF0aHMsIGRlcmVmLCB0cmVlKTtcbn1cblxuZnVuY3Rpb24gZGVyZWYob2JqLCBrZXkpIHtcbiAgcmV0dXJuIG9ialtrZXldO1xufVxuXG5mdW5jdGlvbiB1bkRlcmVmKG9iaiwga2V5KSB7XG4gIHZhciBuZXh0T2JqID0ge307XG4gIG5leHRPYmpba2V5XSA9IG9iajtcbiAgcmV0dXJuIG5leHRPYmo7XG59XG5cbmZ1bmN0aW9uIGluaXRpYWwoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnNsaWNlKDAsIGFycmF5Lmxlbmd0aCAtIDEpO1xufVxuXG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn1cblxuZnVuY3Rpb24gcmVkdWNlKGFycmF5LCBmLCBtemVybykge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGYsIG16ZXJvKTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihsaXN0T2ZMaXN0cykge1xuICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBsaXN0T2ZMaXN0cyk7XG59XG5cbmZ1bmN0aW9uIHBhaXJzKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufTtcblxuLyoqXG4gKiBIYXNoIG9mIG51bGwgaXMgbnVsbCwgaGFzaCBvZiB1bmRlZmluZWQgaXMgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gIHZhciBoYXNoID0gMCwgaSwgY2gsIGw7XG4gIGlmIChzdHIgPT09IHVuZGVmaW5lZCB8fCBzdHIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBoYXNoO1xuICB9XG4gIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaCAgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cbiAgcmV0dXJuIGhhc2g7XG59XG5cbmZ1bmN0aW9uIGhhc2hSZWNvcmQocmVjb3JkKSB7XG4gICAgcmV0dXJuIGhhc2hTdHJpbmcoSlNPTi5zdHJpbmdpZnkocmVjb3JkKSk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSB1bmlxdWUgdGhpbmcgdG8gdXNlIGFzIGEgbWVtb2l6ZSByZXNvbHZlciBoYXNoIGZvciByZWZlcmVuY2UgdHlwZXMuXG4gKi9cbnZhciByZWZzQ2FjaGUgPSB7fTsgLy8geyBpZDogY21wIH1cbnZhciBjYWNoZUlkSW5kZXggPSAwO1xuZnVuY3Rpb24gcmVmVG9IYXNoIChjbXApIHtcbiAgLy8gc2VhcmNoIHRoZSBjbXBVbmlxdWVNYXAgYnkgcmVmZXJlbmNlIC0gaGF2ZSB3ZSBzZWVuIGl0IGJlZm9yZT9cbiAgLy8gaWYgc28sIHVzZSB0aGUgYXNzaWduZWQgaWQgYXMgdGhlIGhhc2hcbiAgLy8gaWYgbm90LCBhZGQgdG8gY2FjaGUgYW5kIGluY3JlbWVudCBjYWNoZUlkSW5kZXggYXMgYSBuZXcgSUQgdG8gaGFzaCBvblxuXG4gIHZhciBjbXBzV2l0aFVpZCA9IHBhaXJzKHJlZnNDYWNoZSk7XG4gIHZhciBjbXBGb3VuZCA9IGZpbmQoY21wc1dpdGhVaWQsIGZ1bmN0aW9uIChjbXBBbmRJZCkgeyByZXR1cm4gY21wQW5kSWRbMV0gPT09IGNtcDsgfSk7XG4gIGlmIChjbXBGb3VuZCkge1xuICAgIHJldHVybiBjbXBGb3VuZFswXTsgLy8gcmV0dXJuIHRoZSB1aWRcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgdWlkID0gKGNhY2hlSWRJbmRleCsrKS50b1N0cmluZygpO1xuICAgIHJlZnNDYWNoZVt1aWRdID0gY21wO1xuICAgIHJldHVybiB1aWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVtb2l6ZUZhY3RvcnkgKHJlc29sdmVyKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICBmdW5jdGlvbiBtZW1vaXplKGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBrZXkpXG4gICAgICAgID8gY2FjaGVba2V5XVxuICAgICAgICA6IChjYWNoZVtrZXldID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBtZW1vaXplO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFJlZkF0UGF0aDogZ2V0UmVmQXRQYXRoLFxuICBkZXJlZjogZGVyZWYsXG4gIHVuRGVyZWY6IHVuRGVyZWYsXG4gIGluaXRpYWw6IGluaXRpYWwsXG4gIGxhc3Q6IGxhc3QsXG4gIHJlZHVjZTogcmVkdWNlLFxuICBmbGF0dGVuOiBmbGF0dGVuLFxuICBwYWlyczogcGFpcnMsXG4gIGhhc2hTdHJpbmc6IGhhc2hTdHJpbmcsXG4gIGhhc2hSZWNvcmQ6IGhhc2hSZWNvcmQsXG4gIHJlZlRvSGFzaDogcmVmVG9IYXNoLFxuICBtZW1vaXplRmFjdG9yeTogbWVtb2l6ZUZhY3RvcnksXG4gIGlzRXF1YWw6IGlzRXF1YWwsXG4gIHVuaW9uOiB1bmlvbixcbiAgb21pdDogb21pdCxcbiAgZmluZDogZmluZFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJ2YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICh0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGVlcC1lcXVhbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2xpYi9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhcnJheVVuaXEgPSByZXF1aXJlKCdhcnJheS11bmlxJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gYXJyYXlVbmlxKFtdLmNvbmNhdC5hcHBseShbXSwgYXJndW1lbnRzKSk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYXJyYXktdW5pb24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8vIHRoZXJlJ3MgMyBpbXBsZW1lbnRhdGlvbnMgd3JpdHRlbiBpbiBpbmNyZWFzaW5nIG9yZGVyIG9mIGVmZmljaWVuY3lcblxuLy8gMSAtIG5vIFNldCB0eXBlIGlzIGRlZmluZWRcbmZ1bmN0aW9uIHVuaXFOb1NldChhcnIpIHtcblx0dmFyIHJldCA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHJldC5pbmRleE9mKGFycltpXSkgPT09IC0xKSB7XG5cdFx0XHRyZXQucHVzaChhcnJbaV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbi8vIDIgLSBhIHNpbXBsZSBTZXQgdHlwZSBpcyBkZWZpbmVkXG5mdW5jdGlvbiB1bmlxU2V0KGFycikge1xuXHR2YXIgc2VlbiA9IG5ldyBTZXQoKTtcblx0cmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG5cdFx0aWYgKCFzZWVuLmhhcyhlbCkpIHtcblx0XHRcdHNlZW4uYWRkKGVsKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIDMgLSBhIHN0YW5kYXJkIFNldCB0eXBlIGlzIGRlZmluZWQgYW5kIGl0IGhhcyBhIGZvckVhY2ggbWV0aG9kXG5mdW5jdGlvbiB1bmlxU2V0V2l0aEZvckVhY2goYXJyKSB7XG5cdHZhciByZXQgPSBbXTtcblxuXHQobmV3IFNldChhcnIpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHRcdHJldC5wdXNoKGVsKTtcblx0fSk7XG5cblx0cmV0dXJuIHJldDtcbn1cblxuLy8gVjggY3VycmVudGx5IGhhcyBhIGJyb2tlbiBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy84NDQ5XG5mdW5jdGlvbiBkb2VzRm9yRWFjaEFjdHVhbGx5V29yaygpIHtcblx0dmFyIHJldCA9IGZhbHNlO1xuXG5cdChuZXcgU2V0KFt0cnVlXSkpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cdFx0cmV0ID0gZWw7XG5cdH0pO1xuXG5cdHJldHVybiByZXQgPT09IHRydWU7XG59XG5cbmlmICgnU2V0JyBpbiBnbG9iYWwpIHtcblx0aWYgKHR5cGVvZiBTZXQucHJvdG90eXBlLmZvckVhY2ggPT09ICdmdW5jdGlvbicgJiYgZG9lc0ZvckVhY2hBY3R1YWxseVdvcmsoKSkge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gdW5pcVNldFdpdGhGb3JFYWNoO1xuXHR9IGVsc2Uge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gdW5pcVNldDtcblx0fVxufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSB1bmlxTm9TZXQ7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hcnJheS11bmlxL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gKiBvbWl0LWtleSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvb21pdC1rZXk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG52YXIgZGlmZmVyZW5jZSA9IHJlcXVpcmUoJ2FycmF5LWRpZmZlcmVuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbWl0KG9iaiwga2V5cykge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuXG4gIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtrZXlzXTtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlKHByb3BzLCBrZXlzKTtcbiAgdmFyIG8gPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGRpZmZbaV07XG5cbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG9ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb21pdC1rZXlzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gKiBpc29iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXNvYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogaXMgdGhlIHZhbHVlIGFuIG9iamVjdCwgYW5kIG5vdCBhbiBhcnJheT9cbiAqXG4gKiBAcGFyYW0gIHsqfSBgdmFsdWVgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3Qobykge1xuICByZXR1cm4gbyAhPSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0J1xuICAgICYmICFBcnJheS5pc0FycmF5KG8pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pc29iamVjdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbihnbG9iYWwpIHtcblxuXHR2YXIgaW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IGZ1bmN0aW9uKGVsZW0pIHtcblx0XHR2YXIgaWR4LCBsZW47XG5cblx0XHRpZiAodGhpcyA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiaW5kZXhPZiBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdFx0fVxuXG5cdFx0Zm9yIChpZHggPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaWR4IDwgbGVuOyArK2lkeCkge1xuXHRcdFx0aWYgKHRoaXNbaWR4XSA9PT0gZWxlbSkge1xuXHRcdFx0XHRyZXR1cm4gaWR4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fTtcblxuXHRmdW5jdGlvbiBkaWZmZXJlbmNlKGEsIGIpIHtcblx0XHR2YXIgaWR4LCBsZW47XG5cdFx0dmFyIHJlcyA9IFtdO1xuXG5cdFx0Zm9yIChpZHggPSAwLCBsZW4gPSBhLmxlbmd0aDsgaWR4IDwgbGVuOyArK2lkeCkge1xuXHRcdFx0aWYgKGluZGV4T2YuY2FsbChiLCBhW2lkeF0pID09PSAtMSkge1xuXHRcdFx0XHRyZXMucHVzaChhW2lkeF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGIubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGEsIGJbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGJbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBkaWZmZXJlbmNlO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGdsb2JhbC5kaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcblx0fVxuXG59KHRoaXMpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FycmF5LWRpZmZlcmVuY2UvZGlmZmVyZW5jZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge2RlZmF1bHQgYXMgcGVyc2lzdGVudFVwZGF0ZX0gZnJvbSAncmVhY3QtYWRkb25zLXVwZGF0ZSc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xuXG5cbmZ1bmN0aW9uIHVwZGF0ZShyb290U3dhcCwgcGF0aCwgb3BlcmF0aW9uLCBsZWFmVXBkYXRlKSB7XG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWZ1bmN0aW9uIHZhbHVlcyBvZiBuZXh0VXBkYXRlXG4gIGlmICh0eXBlb2YgbGVhZlVwZGF0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIHByZXZWYWx1ZSA9IGxlYWZVcGRhdGU7XG4gICAgbGVhZlVwZGF0ZSA9IGZ1bmN0aW9uICggKSB7IHJldHVybiBwcmV2VmFsdWU7IH07XG4gIH1cblxuICByb290U3dhcChmdW5jdGlvbiAocm9vdFZhbCkge1xuICAgIHZhciBuZXh0U3RhdGU7XG5cbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICBuZXh0U3RhdGUgPSBwZXJzaXN0ZW50VXBkYXRlKFxuICAgICAgICAgIHJvb3RWYWwsXG4gICAgICAgICAgcGF0aC5jb25jYXQob3BlcmF0aW9uKS5yZWR1Y2VSaWdodChcbiAgICAgICAgICAgICAgdXRpbC51bkRlcmVmLFxuICAgICAgICAgICAgICBsZWFmVXBkYXRlKHV0aWwuZ2V0UmVmQXRQYXRoKHJvb3RWYWwsIHBhdGgpKVxuICAgICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV4dFN0YXRlID0gbGVhZlVwZGF0ZShyb290VmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXBkYXRlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvdXBkYXRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYWRkb25zLXVwZGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdXBkYXRlXG4gKi9cblxuLyogZ2xvYmFsIGhhc093blByb3BlcnR5OnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoeCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB4LmNvbmNhdCgpO1xuICB9IGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFzc2lnbihuZXcgeC5jb25zdHJ1Y3RvcigpLCB4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geDtcbiAgfVxufVxuXG52YXIgQ09NTUFORF9QVVNIID0ga2V5T2YoeyAkcHVzaDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1VOU0hJRlQgPSBrZXlPZih7ICR1bnNoaWZ0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfU1BMSUNFID0ga2V5T2YoeyAkc3BsaWNlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfU0VUID0ga2V5T2YoeyAkc2V0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfTUVSR0UgPSBrZXlPZih7ICRtZXJnZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX0FQUExZID0ga2V5T2YoeyAkYXBwbHk6IG51bGwgfSk7XG5cbnZhciBBTExfQ09NTUFORFNfTElTVCA9IFtDT01NQU5EX1BVU0gsIENPTU1BTkRfVU5TSElGVCwgQ09NTUFORF9TUExJQ0UsIENPTU1BTkRfU0VULCBDT01NQU5EX01FUkdFLCBDT01NQU5EX0FQUExZXTtcblxudmFyIEFMTF9DT01NQU5EU19TRVQgPSB7fTtcblxuQUxMX0NPTU1BTkRTX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoY29tbWFuZCkge1xuICBBTExfQ09NTUFORFNfU0VUW2NvbW1hbmRdID0gdHJ1ZTtcbn0pO1xuXG5mdW5jdGlvbiBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIGNvbW1hbmQpIHtcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB2YXIgc3BlY1ZhbHVlID0gc3BlY1tjb21tYW5kXTtcbiAgIUFycmF5LmlzQXJyYXkoc3BlY1ZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IFlvdSBwcm92aWRlZCBhIGtleSBwYXRoIHRvIHVwZGF0ZSgpIHRoYXQgZGlkIG5vdCBjb250YWluIG9uZSAnICsgJ29mICVzLiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIHslczogLi4ufT8nLCBBTExfQ09NTUFORFNfTElTVC5qb2luKCcsICcpLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGtleSBpbiBhbiBvYmplY3Qgd2l0aCAlcycsIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gc3BlY1tDT01NQU5EX1NFVF07XG4gIH1cblxuICB2YXIgbmV4dFZhbHVlID0gc2hhbGxvd0NvcHkodmFsdWUpO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfTUVSR0UpKSB7XG4gICAgdmFyIG1lcmdlT2JqID0gc3BlY1tDT01NQU5EX01FUkdFXTtcbiAgICAhKG1lcmdlT2JqICYmIHR5cGVvZiBtZXJnZU9iaiA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhKG5leHRWYWx1ZSAmJiB0eXBlb2YgbmV4dFZhbHVlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSB0YXJnZXQgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG5leHRWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGFzc2lnbihuZXh0VmFsdWUsIHNwZWNbQ09NTUFORF9NRVJHRV0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9QVVNIKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9QVVNIKTtcbiAgICBzcGVjW0NPTU1BTkRfUFVTSF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1VOU0hJRlQpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1VOU0hJRlQpO1xuICAgIHNwZWNbQ09NTUFORF9VTlNISUZUXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUudW5zaGlmdChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU1BMSUNFKSkge1xuICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICFBcnJheS5pc0FycmF5KHNwZWNbQ09NTUFORF9TUExJQ0VdKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIG5leHRWYWx1ZS5zcGxpY2UuYXBwbHkobmV4dFZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfQVBQTFkpKSB7XG4gICAgISh0eXBlb2Ygc3BlY1tDT01NQU5EX0FQUExZXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYSBmdW5jdGlvbjsgZ290ICVzLicsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBuZXh0VmFsdWUgPSBzcGVjW0NPTU1BTkRfQVBQTFldKG5leHRWYWx1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrIGluIHNwZWMpIHtcbiAgICBpZiAoIShBTExfQ09NTUFORFNfU0VULmhhc093blByb3BlcnR5KGspICYmIEFMTF9DT01NQU5EU19TRVRba10pKSB7XG4gICAgICBuZXh0VmFsdWVba10gPSB1cGRhdGUodmFsdWVba10sIHNwZWNba10pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi91cGRhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5T2ZcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvc2luZyB0aGUgYWJpbGl0eSB0byBkeW5hbWljYWxseSB1c2Uga2V5IHN0cmluZ3MgYXMgdmFsdWVzXG4gKiB0aGVtc2VsdmVzLiBQYXNzIGluIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIGtleS92YWwgcGFpciBhbmQgaXQgd2lsbCByZXR1cm5cbiAqIHlvdSB0aGUgc3RyaW5nIGtleSBvZiB0aGF0IHNpbmdsZSByZWNvcmQuIFN1cHBvc2UgeW91IHdhbnQgdG8gZ3JhYiB0aGVcbiAqIHZhbHVlIGZvciBhIGtleSAnY2xhc3NOYW1lJyBpbnNpZGUgb2YgYW4gb2JqZWN0LiBLZXkvdmFsIG1pbmlmaWNhdGlvbiBtYXlcbiAqIGhhdmUgYWxpYXNlZCB0aGF0IGtleSB0byBiZSAneGExMicuIGtleU9mKHtjbGFzc05hbWU6IG51bGx9KSB3aWxsIHJldHVyblxuICogJ3hhMTInIGluIHRoYXQgY2FzZS4gUmVzb2x2ZSBrZXlzIHlvdSB3YW50IHRvIHVzZSBvbmNlIGF0IHN0YXJ0dXAgdGltZSwgdGhlblxuICogcmV1c2UgdGhvc2UgcmVzb2x1dGlvbnMuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga2V5T2YgPSBmdW5jdGlvbiAob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignSW52YXJpYW50IFZpb2xhdGlvbjogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB1dGlsIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJy4vdXBkYXRlJztcblxuXG5jbGFzcyBSZWZDdXJzb3Ige1xuICAvKipcbiAgICogcm9vdERlcmVmIGFuZCByb290U3dhcCB0b2dldGhlciBjb21wcmlzZSB0aGUgbm90aW9uIG9mIGFuIGF0b21cbiAgICovXG4gIGNvbnN0cnVjdG9yIChyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRocykge1xuICAgIHRoaXMucm9vdERlcmVmID0gcm9vdERlcmVmO1xuICAgIHRoaXMucm9vdFN3YXAgPSByb290U3dhcDtcbiAgICB0aGlzLnBhdGhzID0gcGF0aHM7XG5cbiAgICAvLyBUaGVzZSBlZmZlY3RzIChzd2FwIGFuZCByZXNldCkgd3JpdGUgdGhyb3VnaCB0byB0aGUgdW5kZXJseWluZyBhdG9tLlxuICAgIC8vIFNvIHRoZXNlIGVmZmVjdHMgYXJlIHNlZW4gaW4gYWxsIGN1cnNvcnMgYm91bmQgdG8gdGhpcyBhdG9tLCBhdCBhbGxcbiAgICAvLyBsZXZlbHMgb2YgcmVmaW5lbWVudC4gVmFsdWUgaXMgYWx3YXlzIHJlYWQgb3V0IG9mIHRoZSBhdG9tIHNvIGl0IGlzIG5ldmVyIHN0YWxlLlxuICAgIFsncHVzaCcsICd1bnNoaWZ0JywgJ3NwbGljZScsICdzZXQnLCAnbWVyZ2UnLCAnYXBwbHknXS5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICAgICB0aGlzW2NvbW1hbmRdID0gdXBkYXRlLmJpbmQodGhpcywgcm9vdFN3YXAsIHBhdGhzLCAnJCcgKyBjb21tYW5kKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cblxuICAvKipcbiAgICogRm9yIFJlZkN1cnNvcnMsIHZhbHVlIGlzIGEgZnVuY3Rpb24gc2luY2UgdGhlIGxhdGVzdCB2YWx1ZSBtdXN0IGJlXG4gICAqIHJlYWQgZnJvbSB0aGUgYXRvbSByZWZlcmVuY2UuIEl0J3MgY2FsbGVkIGRlcmVmIHRvIGVtcGhhc2l6ZSB0aGUgZGlmZmVyZW5jZS5cbiAgICovXG4gIHZhbHVlICgpIHtcbiAgICByZXR1cm4gdXRpbC5nZXRSZWZBdFBhdGgodGhpcy5yb290RGVyZWYoKSwgdGhpcy5wYXRocyk7XG4gIH1cblxuICByZWZpbmUgKC8qIG9uZSBvciBtb3JlIHBhdGhzIHRocm91Z2ggdGhlIHRyZWUgKi8pIHtcbiAgICB2YXIgbmV4dFBhdGhzID0gW10uY29uY2F0KHRoaXMucGF0aHMsIHV0aWwuZmxhdHRlbihhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gYnVpbGQodGhpcy5yb290RGVyZWYsIHRoaXMucm9vdFN3YXAsIG5leHRQYXRocyk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFJlZkN1cnNvcnMgaGF2ZSBubyBtZW1vaXphdGlvbiBhcyB0aGV5IGRvIG5vdCBleHBvc2UgYW55IG5vdGlvbiBvZiB2YWx1ZSBlcXVhbGl0eS5cbiAqL1xuZnVuY3Rpb24gYnVpbGQgKHJvb3REZXJlZiwgcm9vdFN3YXAsIHBhdGgpIHtcbiAgcGF0aCA9IHBhdGggPT09IHVuZGVmaW5lZCA/IFtdIDogcGF0aDtcbiAgcmV0dXJuIG5ldyBSZWZDdXJzb3Iocm9vdERlcmVmLCByb290U3dhcCwgcGF0aCk7XG59XG5cblJlZkN1cnNvci5idWlsZCA9IGJ1aWxkO1xuXG5leHBvcnQgZGVmYXVsdCBSZWZDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9SZWZDdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xuXG5cbmZ1bmN0aW9uIEltbXV0YWJsZU9wdGltaXphdGlvbnMgKHJlZkZpZWxkcywgaWdub3JlZEZpZWxkcy8qb3B0aW9uYWwqLykge1xuICB2YXIgbm9WYWx1ZUNoZWNrRmllbGRzID0gcmVmRmllbGRzLmNvbmNhdChpZ25vcmVkRmllbGRzIHx8IFtdKTtcbiAgcmV0dXJuIHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcbiAgICAgIHZhciBjdXJyZW50UHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICB2YXIgdmFsdWVzQ2hhbmdlZCA9ICF1dGlsLmlzRXF1YWwoXG4gICAgICAgIHV0aWwub21pdChuZXh0UHJvcHMsIG5vVmFsdWVDaGVja0ZpZWxkcyksXG4gICAgICAgIHV0aWwub21pdChjdXJyZW50UHJvcHMsIG5vVmFsdWVDaGVja0ZpZWxkcykpO1xuXG4gICAgICB2YXIgcmVmc0NoYW5nZWQgPSAhcmVmRmllbGRzLmV2ZXJ5KGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3BzW2ZpZWxkXSA9PT0gbmV4dFByb3BzW2ZpZWxkXTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzQ2hhbmdlZCB8fCByZWZzQ2hhbmdlZDtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZU9wdGltaXphdGlvbnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==