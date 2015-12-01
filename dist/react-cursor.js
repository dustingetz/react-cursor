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
	
	var _RefCursor = __webpack_require__(15);
	
	var _RefCursor2 = _interopRequireDefault(_RefCursor);
	
	var _ImmutableOptimizations = __webpack_require__(16);
	
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

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _updateIn = __webpack_require__(3);
	
	var _util = __webpack_require__(12);
	
	var _ReactAdapter = __webpack_require__(14);
	
	var debug = process.env.NODE_ENV !== 'production';
	
	var Cursor = function Cursor(rootValue, rootSwap, paths, leafValue) {
	  var _this = this;
	
	  _classCallCheck(this, Cursor);
	
	  this.value = function () {
	    return leafValue;
	  };
	  this.refine = function () {
	    for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
	      morePaths[_key] = arguments[_key];
	    }
	
	    return NewCursor(rootValue, rootSwap, paths.concat(morePaths), (0, _util.getIn)(_this.value(), morePaths));
	  };
	  this.swap = function (f) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    return rootSwap(function (rootValue) {
	      return (0, _updateIn.updateIn)(rootValue, paths, function (v) {
	        return f.apply(null, [v].concat(args));
	      });
	    });
	  };
	
	  this.set = function (val) {
	    return _this.swap(function (v) {
	      return val;
	    });
	  };
	  this.merge = function (val) {
	    return _this.swap(_updateIn.merge, val);
	  };
	  this.push = function (xs) {
	    return _this.swap(_updateIn.push, xs);
	  };
	  this.unshift = function (xs) {
	    return _this.swap(_updateIn.unshift, xs);
	  };
	  this.splice = function (xs) {
	    return _this.swap(_updateIn.splice, xs);
	  };
	
	  debug && (0, _util.deepFreeze)(leafValue);
	};
	
	var NewCursor_ = function NewCursor_(rootValue, rootSwap, paths, leafValue) {
	  return new Cursor(rootValue, rootSwap, paths, leafValue);
	};
	
	// reuse the same cursor instance for same {value swap paths},
	var hasher = function hasher(rootValue, rootSwap, paths, leafValue) {
	  return (0, _util.refToHash)(rootSwap) + (0, _util.hashRecord)(leafValue) + (0, _util.hashRecord)(paths);
	};
	var NewCursor = (0, _util.memoized)(hasher, NewCursor_);
	
	Cursor.build = function (value, swap) {
	  return (0, _ReactAdapter.isReactCmp)(value) ? NewCursor((0, _ReactAdapter.makeValueFromReact)(value), (0, _ReactAdapter.makeSwapFromReact)(value), [], (0, _ReactAdapter.makeValueFromReact)(value)) : NewCursor(value, swap, [], value);
	};
	
	exports['default'] = Cursor;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.merge = merge;
	exports.push = push;
	exports.unshift = unshift;
	exports.splice = splice;
	exports.updateIn = updateIn;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _reactAddonsUpdate = __webpack_require__(4);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	var _deepEqual = __webpack_require__(9);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	function merge(a, b) {
	  return (0, _reactAddonsUpdate2['default'])(a, { $merge: b });
	}
	
	function push(as, bs) {
	  return (0, _reactAddonsUpdate2['default'])(as, { $push: bs });
	}
	
	function unshift(as, bs) {
	  return (0, _reactAddonsUpdate2['default'])(as, { $unshift: bs });
	}
	
	function splice(as, splices) {
	  // persistentUpdate([12, 17, 15], {$splice: [[1, 1, 13, 14]]}) => [12, 13, 14, 15]
	  return (0, _reactAddonsUpdate2['default'])(as, { $splice: splices });
	}
	
	/**
	 * Thin wrapper over react-addons-update to apply a function at path
	 * preserving other references.
	 */
	
	function updateIn(rootVal, paths, f) {
	  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    args[_key - 3] = arguments[_key];
	  }
	
	  var ff = function ff(v) {
	    return f.apply(null, [v].concat(args));
	  };
	
	  var newRootVal;
	  if (paths.length > 0) {
	    var command = rootAt(paths, { $apply: ff });
	    newRootVal = (0, _reactAddonsUpdate2['default'])(rootVal, command);
	  } else if (paths.length === 0) {
	    newRootVal = ff(rootVal);
	  }
	
	  // would be better to do this valEq check on just the leaf
	  return (0, _deepEqual2['default'])(rootVal, newRootVal) ? rootVal // preserve === if same value
	  : newRootVal;
	}
	
	// Helper methods for forming react-addons-update commands.
	
	/**
	 * @param leafVal e.g. {$apply: f}
	 * @param paths e.g. ['x', 'y', 'z']
	 * @returns e.g. {x: {y: {z: {$apply: f}}}
	 */
	function rootAt(paths, leafVal) {
	  return paths.reduceRight(unDeref, leafVal);
	}
	
	/**
	 * @param obj e.g {$apply: f}
	 * @param key e.g. 'foo'
	 * @returns e.g. {foo: {$apply: f}}
	 */
	function unDeref(obj, key) {
	  // aka un-get
	  var nextObj = {};
	  nextObj[key] = obj;
	  return nextObj;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
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
	
	var assign = __webpack_require__(6);
	var keyOf = __webpack_require__(7);
	var invariant = __webpack_require__(8);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(10);
	var isArguments = __webpack_require__(11);
	
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.find = find;
	exports.getIn = getIn;
	exports.get = get;
	exports.initial = initial;
	exports.reduce = reduce;
	exports.flatten = flatten;
	exports.pairs = pairs;
	exports.hashString = hashString;
	exports.hashRecord = hashRecord;
	exports.refToHash = refToHash;
	exports.memoized = memoized;
	exports.deepFreeze = deepFreeze;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodashIsobject = __webpack_require__(13);
	
	var _lodashIsobject2 = _interopRequireDefault(_lodashIsobject);
	
	var _deepEqual = __webpack_require__(9);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
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
	
	function getIn(tree, paths) {
	  // this is get-in in clojure
	  return reduce(paths, get, tree);
	}
	
	function get(obj, key) {
	  console.assert(key in obj, 'Bad cursor refine: path ' + key + ' not found in ', obj);
	  return obj[key];
	}
	
	function initial(array) {
	  return array.slice(0, array.length - 1);
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
	}
	
	;
	
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
	
	var identity = function identity(x) {
	  return x;
	};
	
	function memoized(hasher, f) {
	  var _this = this;
	
	  if (hasher === undefined) hasher = identity;
	
	  var cache = {};
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    // hasher gets the same arguments as f, to create the hashKey
	    var hashKey = hasher.apply(_this, args);
	    return hasOwnProperty.call(cache, hashKey) ? cache[hashKey] : cache[hashKey] = f.apply(_this, args);
	  };
	}
	
	// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
	
	function deepFreeze(obj) {
	  if (typeof Object.freeze !== 'function') {
	    return obj;
	  }
	
	  if (!(0, _lodashIsobject2['default'])(obj)) {
	    return obj;
	  }
	
	  // Retrieve the property names defined on obj
	  var propNames = Object.getOwnPropertyNames(obj);
	
	  // Freeze properties before freezing self
	  propNames.forEach(function (name) {
	    var prop = obj[name];
	
	    // Freeze prop if it is an object
	    if (typeof prop == 'object' && !Object.isFrozen(prop)) {
	      deepFreeze(prop);
	    }
	  });
	
	  // Freeze self
	  return Object.freeze(obj);
	}
	
	var valEq = function valEq(a, b) {
	  return (0, _deepEqual2['default'])(a, b);
	};
	exports.valEq = valEq;
	var refEq = function refEq(a, b) {
	  return a === b;
	};
	exports.refEq = refEq;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(12);
	
	// To support binding cursors to react state, we need cmp.setState as a function, and the function
	// needs to be === if it comes from the same react component. Since
	// `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
	// we need to memoize based on the cmp reference.
	var makeSwapFromReact = (0, _util.memoized)(_util.refToHash, function (cmp) {
	  return cmp.setState.bind(cmp);
	});
	exports.makeSwapFromReact = makeSwapFromReact;
	var makeDerefFromReact = (0, _util.memoized)(_util.refToHash, function (cmp) {
	  return function () {
	    return cmp.state;
	  };
	});
	exports.makeDerefFromReact = makeDerefFromReact;
	var makeValueFromReact = function makeValueFromReact(cmp) {
	  return cmp.state;
	};
	exports.makeValueFromReact = makeValueFromReact;
	var isReactCmp = function isReactCmp(a) {
	  return typeof a.__proto__.render === "function";
	};
	exports.isReactCmp = isReactCmp;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _util = __webpack_require__(12);
	
	var _updateIn = __webpack_require__(3);
	
	var _ReactAdapter = __webpack_require__(14);
	
	var RefCursor = function RefCursor(rootDeref, rootSwap, paths) {
	  var _this = this;
	
	  _classCallCheck(this, RefCursor);
	
	  this.value = function () {
	    return (0, _util.getIn)(rootDeref(), paths);
	  };
	  this.refine = function () {
	    for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
	      morePaths[_key] = arguments[_key];
	    }
	
	    return NewRefCursor(rootDeref, rootSwap, paths.concat(morePaths));
	  };
	  this.swap = function (f) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    return rootSwap(function (rootValue) {
	      return (0, _updateIn.updateIn)(rootValue, paths, function (v) {
	        return f.apply(null, [v].concat(args));
	      });
	    });
	  };
	
	  this.set = function (val) {
	    return _this.swap(function (v) {
	      return val;
	    });
	  };
	  this.merge = function (val) {
	    return _this.swap(_updateIn.merge, val);
	  };
	  this.push = function (xs) {
	    return _this.swap(_updateIn.push, xs);
	  };
	  this.unshift = function (xs) {
	    return _this.swap(_updateIn.unshift, xs);
	  };
	  this.splice = function (xs) {
	    return _this.swap(_updateIn.splice, xs);
	  };
	
	  // RefCursors don't own a value, so they aren't responsible for freezing it.
	};
	
	var NewRefCursor_ = function NewRefCursor_(rootDeref, rootSwap) {
	  var paths = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	  return new RefCursor(rootDeref, rootSwap, paths);
	};
	
	// reuse the same cursor instance for same {deref swap paths}
	var hasher = function hasher(rootDeref, rootSwap, paths) {
	  return (0, _util.refToHash)(rootDeref) + (0, _util.refToHash)(rootSwap) + (0, _util.hashRecord)(paths);
	};
	var NewRefCursor = (0, _util.memoized)(hasher, NewRefCursor_);
	
	RefCursor.build = function (deref, swap) {
	  return (0, _ReactAdapter.isReactCmp)(deref) ? NewRefCursor((0, _ReactAdapter.makeDerefFromReact)(deref), (0, _ReactAdapter.makeSwapFromReact)(deref)) : NewRefCursor(deref, swap);
	};
	
	exports['default'] = RefCursor;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _omitKeys = __webpack_require__(17);
	
	var _omitKeys2 = _interopRequireDefault(_omitKeys);
	
	var _util = __webpack_require__(12);
	
	function ImmutableOptimizations(refFields, ignoredFields /*optional*/) {
	  var noValueCheckFields = refFields.concat(ignoredFields || []);
	  return {
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	      var _this = this;
	
	      var valuesChanged = !(0, _util.valEq)((0, _omitKeys2['default'])(nextProps, noValueCheckFields), (0, _omitKeys2['default'])(this.props, noValueCheckFields));
	
	      var refsChanged = !refFields.every(function (field) {
	        return (0, _util.refEq)(_this.props[field], nextProps[field]);
	      });
	
	      return valuesChanged || refsChanged;
	    }
	  };
	}
	
	exports['default'] = ImmutableOptimizations;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * omit-key <https://github.com/jonschlinkert/omit-key>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(18);
	var difference = __webpack_require__(19);
	
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
/* 18 */
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
/* 19 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODFmZmViM2MxN2EyNGU0ZDhhNjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC5pc29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVhY3RBZGFwdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9SZWZDdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ltbXV0YWJsZU9wdGltaXphdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9vbWl0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pc29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2FycmF5LWRpZmZlcmVuY2UvZGlmZmVyZW5jZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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b3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc3RhdGljL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODFmZmViM2MxN2EyNGU0ZDhhNjFcbiAqKi8iLCJpbXBvcnQgQ3Vyc29yIGZyb20gJy4vQ3Vyc29yJztcbmltcG9ydCBSZWZDdXJzb3IgZnJvbSAnLi9SZWZDdXJzb3InO1xuaW1wb3J0IEltbXV0YWJsZU9wdGltaXphdGlvbnMgZnJvbSAnLi9JbW11dGFibGVPcHRpbWl6YXRpb25zJztcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEN1cnNvcjogQ3Vyc29yLFxuICBJbW11dGFibGVPcHRpbWl6YXRpb25zOiBJbW11dGFibGVPcHRpbWl6YXRpb25zLFxuICBSZWZDdXJzb3I6IFJlZkN1cnNvclxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QtY3Vyc29yLmpzXG4gKiovIiwiaW1wb3J0IHt1cGRhdGVJbiwgbWVyZ2UsIHB1c2gsIHVuc2hpZnQsIHNwbGljZX0gZnJvbSAndXBkYXRlLWluJztcbmltcG9ydCB7bWVtb2l6ZWQsIGdldEluLCBoYXNoUmVjb3JkLCByZWZUb0hhc2gsIGZsYXR0ZW4sIGRlZXBGcmVlemV9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge21ha2VEZXJlZkZyb21SZWFjdCwgbWFrZVN3YXBGcm9tUmVhY3QsIG1ha2VWYWx1ZUZyb21SZWFjdCwgaXNSZWFjdENtcH0gZnJvbSAnLi9SZWFjdEFkYXB0ZXInO1xuXG5cbmxldCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbmNsYXNzIEN1cnNvciB7XG4gIGNvbnN0cnVjdG9yIChyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRocywgbGVhZlZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9ICgpID0+IGxlYWZWYWx1ZTtcbiAgICB0aGlzLnJlZmluZSA9ICguLi5tb3JlUGF0aHMpID0+IE5ld0N1cnNvcihyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRocy5jb25jYXQobW9yZVBhdGhzKSwgZ2V0SW4odGhpcy52YWx1ZSgpLCBtb3JlUGF0aHMpKTtcbiAgICB0aGlzLnN3YXAgPSAoZiwgLi4uYXJncykgPT4gcm9vdFN3YXAocm9vdFZhbHVlID0+IHVwZGF0ZUluKHJvb3RWYWx1ZSwgcGF0aHMsIHYgPT4gZi5hcHBseShudWxsLCBbdl0uY29uY2F0KGFyZ3MpKSkpO1xuXG4gICAgdGhpcy5zZXQgPSAodmFsKSA9PiB0aGlzLnN3YXAodiA9PiB2YWwpO1xuICAgIHRoaXMubWVyZ2UgPSAodmFsKSA9PiB0aGlzLnN3YXAobWVyZ2UsIHZhbCk7XG4gICAgdGhpcy5wdXNoID0gKHhzKSA9PiB0aGlzLnN3YXAocHVzaCwgeHMpO1xuICAgIHRoaXMudW5zaGlmdCA9ICh4cykgPT4gdGhpcy5zd2FwKHVuc2hpZnQsIHhzKTtcbiAgICB0aGlzLnNwbGljZSA9ICh4cykgPT4gdGhpcy5zd2FwKHNwbGljZSwgeHMpO1xuXG4gICAgZGVidWcgJiYgZGVlcEZyZWV6ZShsZWFmVmFsdWUpO1xuICB9XG59XG5cblxubGV0IE5ld0N1cnNvcl8gPSAocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aHMsIGxlYWZWYWx1ZSkgPT4gbmV3IEN1cnNvcihyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRocywgbGVhZlZhbHVlKTtcblxuLy8gcmV1c2UgdGhlIHNhbWUgY3Vyc29yIGluc3RhbmNlIGZvciBzYW1lIHt2YWx1ZSBzd2FwIHBhdGhzfSxcbmxldCBoYXNoZXIgPSAocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aHMsIGxlYWZWYWx1ZSkgPT4gcmVmVG9IYXNoKHJvb3RTd2FwKSArIGhhc2hSZWNvcmQobGVhZlZhbHVlKSArIGhhc2hSZWNvcmQocGF0aHMpO1xubGV0IE5ld0N1cnNvciA9IG1lbW9pemVkKGhhc2hlciwgTmV3Q3Vyc29yXyk7XG5cblxuQ3Vyc29yLmJ1aWxkID0gKHZhbHVlLCBzd2FwKSA9PiB7XG4gIHJldHVybiBpc1JlYWN0Q21wKHZhbHVlKVxuICAgICAgPyBOZXdDdXJzb3IobWFrZVZhbHVlRnJvbVJlYWN0KHZhbHVlKSwgbWFrZVN3YXBGcm9tUmVhY3QodmFsdWUpLCBbXSwgbWFrZVZhbHVlRnJvbVJlYWN0KHZhbHVlKSlcbiAgICAgIDogTmV3Q3Vyc29yKHZhbHVlLCBzd2FwLCBbXSwgdmFsdWUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ3Vyc29yLmpzXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge2RlZmF1bHQgYXMgcGVyc2lzdGVudFVwZGF0ZX0gZnJvbSAncmVhY3QtYWRkb25zLXVwZGF0ZSc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UgKGEsIGIpIHtcbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYSwgeyRtZXJnZTogYn0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaCAoYXMsIGJzKSB7XG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGFzLCB7JHB1c2g6IGJzfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNoaWZ0IChhcywgYnMpIHtcbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYXMsIHskdW5zaGlmdDogYnN9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGljZSAoYXMsIHNwbGljZXMpIHtcbiAgLy8gcGVyc2lzdGVudFVwZGF0ZShbMTIsIDE3LCAxNV0sIHskc3BsaWNlOiBbWzEsIDEsIDEzLCAxNF1dfSkgPT4gWzEyLCAxMywgMTQsIDE1XVxuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhcywgeyRzcGxpY2U6IHNwbGljZXN9KTtcbn1cblxuXG4vKipcbiAqIFRoaW4gd3JhcHBlciBvdmVyIHJlYWN0LWFkZG9ucy11cGRhdGUgdG8gYXBwbHkgYSBmdW5jdGlvbiBhdCBwYXRoXG4gKiBwcmVzZXJ2aW5nIG90aGVyIHJlZmVyZW5jZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVJbiAocm9vdFZhbCwgcGF0aHMsIGYsIC4uLmFyZ3MpIHtcbiAgbGV0IGZmID0gKHYpID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSk7XG5cbiAgdmFyIG5ld1Jvb3RWYWw7XG4gIGlmIChwYXRocy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgY29tbWFuZCA9IHJvb3RBdChwYXRocywgeyRhcHBseTogZmZ9KTtcbiAgICBuZXdSb290VmFsID0gcGVyc2lzdGVudFVwZGF0ZShyb290VmFsLCBjb21tYW5kKTtcbiAgfVxuICBlbHNlIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICBuZXdSb290VmFsID0gZmYocm9vdFZhbCk7XG4gIH1cblxuICAvLyB3b3VsZCBiZSBiZXR0ZXIgdG8gZG8gdGhpcyB2YWxFcSBjaGVjayBvbiBqdXN0IHRoZSBsZWFmXG4gIHJldHVybiBpc0VxdWFsKHJvb3RWYWwsIG5ld1Jvb3RWYWwpXG4gICAgICA/IHJvb3RWYWwgLy8gcHJlc2VydmUgPT09IGlmIHNhbWUgdmFsdWVcbiAgICAgIDogbmV3Um9vdFZhbDtcbn1cblxuXG5cbi8vIEhlbHBlciBtZXRob2RzIGZvciBmb3JtaW5nIHJlYWN0LWFkZG9ucy11cGRhdGUgY29tbWFuZHMuXG5cbi8qKlxuICogQHBhcmFtIGxlYWZWYWwgZS5nLiB7JGFwcGx5OiBmfVxuICogQHBhcmFtIHBhdGhzIGUuZy4gWyd4JywgJ3knLCAneiddXG4gKiBAcmV0dXJucyBlLmcuIHt4OiB7eToge3o6IHskYXBwbHk6IGZ9fX1cbiAqL1xuZnVuY3Rpb24gcm9vdEF0IChwYXRocywgbGVhZlZhbCkge1xuICByZXR1cm4gcGF0aHMucmVkdWNlUmlnaHQodW5EZXJlZiwgbGVhZlZhbClcbn1cblxuXG4vKipcbiAqIEBwYXJhbSBvYmogZS5nIHskYXBwbHk6IGZ9XG4gKiBAcGFyYW0ga2V5IGUuZy4gJ2ZvbydcbiAqIEByZXR1cm5zIGUuZy4ge2ZvbzogeyRhcHBseTogZn19XG4gKi9cbmZ1bmN0aW9uIHVuRGVyZWYob2JqLCBrZXkpIHsgLy8gYWthIHVuLWdldFxuICB2YXIgbmV4dE9iaiA9IHt9O1xuICBuZXh0T2JqW2tleV0gPSBvYmo7XG4gIHJldHVybiBuZXh0T2JqO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L3VwZGF0ZS1pbi9zcmMvdXBkYXRlLWluLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdyZWFjdC9saWIvdXBkYXRlJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYWRkb25zLXVwZGF0ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB1cGRhdGVcbiAqL1xuXG4vKiBnbG9iYWwgaGFzT3duUHJvcGVydHk6dHJ1ZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuL09iamVjdC5hc3NpZ24nKTtcbnZhciBrZXlPZiA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU9mJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgaGFzT3duUHJvcGVydHkgPSAoe30pLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBzaGFsbG93Q29weSh4KSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIHguY29uY2F0KCk7XG4gIH0gZWxzZSBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYXNzaWduKG5ldyB4LmNvbnN0cnVjdG9yKCksIHgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4O1xuICB9XG59XG5cbnZhciBDT01NQU5EX1BVU0ggPSBrZXlPZih7ICRwdXNoOiBudWxsIH0pO1xudmFyIENPTU1BTkRfVU5TSElGVCA9IGtleU9mKHsgJHVuc2hpZnQ6IG51bGwgfSk7XG52YXIgQ09NTUFORF9TUExJQ0UgPSBrZXlPZih7ICRzcGxpY2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9TRVQgPSBrZXlPZih7ICRzZXQ6IG51bGwgfSk7XG52YXIgQ09NTUFORF9NRVJHRSA9IGtleU9mKHsgJG1lcmdlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfQVBQTFkgPSBrZXlPZih7ICRhcHBseTogbnVsbCB9KTtcblxudmFyIEFMTF9DT01NQU5EU19MSVNUID0gW0NPTU1BTkRfUFVTSCwgQ09NTUFORF9VTlNISUZULCBDT01NQU5EX1NQTElDRSwgQ09NTUFORF9TRVQsIENPTU1BTkRfTUVSR0UsIENPTU1BTkRfQVBQTFldO1xuXG52YXIgQUxMX0NPTU1BTkRTX1NFVCA9IHt9O1xuXG5BTExfQ09NTUFORFNfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gIEFMTF9DT01NQU5EU19TRVRbY29tbWFuZF0gPSB0cnVlO1xufSk7XG5cbmZ1bmN0aW9uIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgY29tbWFuZCkge1xuICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHRhcmdldCBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLicsIGNvbW1hbmQsIHZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gIHZhciBzcGVjVmFsdWUgPSBzcGVjW2NvbW1hbmRdO1xuICAhQXJyYXkuaXNBcnJheShzcGVjVmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlciBpbiBhbiBhcnJheT8nLCBjb21tYW5kLCBzcGVjVmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKHZhbHVlLCBzcGVjKSB7XG4gICEodHlwZW9mIHNwZWMgPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogWW91IHByb3ZpZGVkIGEga2V5IHBhdGggdG8gdXBkYXRlKCkgdGhhdCBkaWQgbm90IGNvbnRhaW4gb25lICcgKyAnb2YgJXMuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgeyVzOiAuLi59PycsIEFMTF9DT01NQU5EU19MSVNULmpvaW4oJywgJyksIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9TRVQpKSB7XG4gICAgIShPYmplY3Qua2V5cyhzcGVjKS5sZW5ndGggPT09IDEpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Nhbm5vdCBoYXZlIG1vcmUgdGhhbiBvbmUga2V5IGluIGFuIG9iamVjdCB3aXRoICVzJywgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiBzcGVjW0NPTU1BTkRfU0VUXTtcbiAgfVxuXG4gIHZhciBuZXh0VmFsdWUgPSBzaGFsbG93Q29weSh2YWx1ZSk7XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9NRVJHRSkpIHtcbiAgICB2YXIgbWVyZ2VPYmogPSBzcGVjW0NPTU1BTkRfTUVSR0VdO1xuICAgICEobWVyZ2VPYmogJiYgdHlwZW9mIG1lcmdlT2JqID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSBzcGVjIG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBtZXJnZU9iaikgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICEobmV4dFZhbHVlICYmIHR5cGVvZiBuZXh0VmFsdWUgPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHRhcmdldCBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbmV4dFZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgYXNzaWduKG5leHRWYWx1ZSwgc3BlY1tDT01NQU5EX01FUkdFXSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1BVU0gpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1BVU0gpO1xuICAgIHNwZWNbQ09NTUFORF9QVVNIXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfVU5TSElGVCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfVU5TSElGVCk7XG4gICAgc3BlY1tDT01NQU5EX1VOU0hJRlRdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS51bnNoaWZ0KGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9TUExJQ0UpKSB7XG4gICAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkICVzIHRhcmdldCB0byBiZSBhbiBhcnJheTsgZ290ICVzJywgQ09NTUFORF9TUExJQ0UsIHZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIUFycmF5LmlzQXJyYXkoc3BlY1tDT01NQU5EX1NQTElDRV0pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5IG9mIGFycmF5czsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXJzIGluIGFuIGFycmF5PycsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIHNwZWNbQ09NTUFORF9TUExJQ0VdLmZvckVhY2goZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICFBcnJheS5pc0FycmF5KGFyZ3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5IG9mIGFycmF5czsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXJzIGluIGFuIGFycmF5PycsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgbmV4dFZhbHVlLnNwbGljZS5hcHBseShuZXh0VmFsdWUsIGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9BUFBMWSkpIHtcbiAgICAhKHR5cGVvZiBzcGVjW0NPTU1BTkRfQVBQTFldID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhIGZ1bmN0aW9uOyBnb3QgJXMuJywgQ09NTUFORF9BUFBMWSwgc3BlY1tDT01NQU5EX0FQUExZXSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIG5leHRWYWx1ZSA9IHNwZWNbQ09NTUFORF9BUFBMWV0obmV4dFZhbHVlKTtcbiAgfVxuXG4gIGZvciAodmFyIGsgaW4gc3BlYykge1xuICAgIGlmICghKEFMTF9DT01NQU5EU19TRVQuaGFzT3duUHJvcGVydHkoaykgJiYgQUxMX0NPTU1BTkRTX1NFVFtrXSkpIHtcbiAgICAgIG5leHRWYWx1ZVtrXSA9IHVwZGF0ZSh2YWx1ZVtrXSwgc3BlY1trXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3VwZGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5T2ZcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvc2luZyB0aGUgYWJpbGl0eSB0byBkeW5hbWljYWxseSB1c2Uga2V5IHN0cmluZ3MgYXMgdmFsdWVzXG4gKiB0aGVtc2VsdmVzLiBQYXNzIGluIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIGtleS92YWwgcGFpciBhbmQgaXQgd2lsbCByZXR1cm5cbiAqIHlvdSB0aGUgc3RyaW5nIGtleSBvZiB0aGF0IHNpbmdsZSByZWNvcmQuIFN1cHBvc2UgeW91IHdhbnQgdG8gZ3JhYiB0aGVcbiAqIHZhbHVlIGZvciBhIGtleSAnY2xhc3NOYW1lJyBpbnNpZGUgb2YgYW4gb2JqZWN0LiBLZXkvdmFsIG1pbmlmaWNhdGlvbiBtYXlcbiAqIGhhdmUgYWxpYXNlZCB0aGF0IGtleSB0byBiZSAneGExMicuIGtleU9mKHtjbGFzc05hbWU6IG51bGx9KSB3aWxsIHJldHVyblxuICogJ3hhMTInIGluIHRoYXQgY2FzZS4gUmVzb2x2ZSBrZXlzIHlvdSB3YW50IHRvIHVzZSBvbmNlIGF0IHN0YXJ0dXAgdGltZSwgdGhlblxuICogcmV1c2UgdGhvc2UgcmVzb2x1dGlvbnMuXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIga2V5T2YgPSBmdW5jdGlvbiAob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuL2xpYi9rZXlzLmpzJyk7XG52YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2xpYi9pc19hcmd1bWVudHMuanMnKTtcblxudmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge307XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICh0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkT3JOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcbiAgdmFyIGksIGtleTtcbiAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuICAvLyAgIENvbnZlcnRpbmcgdG8gYXJyYXkgc29sdmVzIHRoZSBwcm9ibGVtLlxuICBpZiAoaXNBcmd1bWVudHMoYSkpIHtcbiAgICBpZiAoIWlzQXJndW1lbnRzKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcbiAgfVxuICBpZiAoaXNCdWZmZXIoYSkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAgICBrYiA9IG9iamVjdEtleXMoYik7XG4gIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgb3B0cykpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGVlcC1lcXVhbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2xpYi9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID0gKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKVxufSkoKSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA/IHN1cHBvcnRlZCA6IHVuc3VwcG9ydGVkO1xuXG5leHBvcnRzLnN1cHBvcnRlZCA9IHN1cHBvcnRlZDtcbmZ1bmN0aW9uIHN1cHBvcnRlZChvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufTtcblxuZXhwb3J0cy51bnN1cHBvcnRlZCA9IHVuc3VwcG9ydGVkO1xuZnVuY3Rpb24gdW5zdXBwb3J0ZWQob2JqZWN0KXtcbiAgcmV0dXJuIG9iamVjdCAmJlxuICAgIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2Ygb2JqZWN0Lmxlbmd0aCA9PSAnbnVtYmVyJyAmJlxuICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdjYWxsZWUnKSAmJlxuICAgICFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCAnY2FsbGVlJykgfHxcbiAgICBmYWxzZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC5pc29iamVjdCc7XG5pbXBvcnQgaXNFcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsaXN0ID0gT2JqZWN0KGFycmF5KTtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgdmFyIHZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW4odHJlZSwgcGF0aHMpIHsgLy8gdGhpcyBpcyBnZXQtaW4gaW4gY2xvanVyZVxuICByZXR1cm4gcmVkdWNlKHBhdGhzLCBnZXQsIHRyZWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG9iaiwga2V5KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KGtleSBpbiBvYmosIGBCYWQgY3Vyc29yIHJlZmluZTogcGF0aCAke2tleX0gbm90IGZvdW5kIGluIGAsIG9iaik7XG4gIHJldHVybiBvYmpba2V5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWwoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnNsaWNlKDAsIGFycmF5Lmxlbmd0aCAtIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGFycmF5LCBmLCBtemVybykge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGYsIG16ZXJvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4obGlzdE9mTGlzdHMpIHtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgbGlzdE9mTGlzdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFpcnMob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgfVxuICByZXR1cm4gcGFpcnM7XG59O1xuXG4vKipcbiAqIEhhc2ggb2YgbnVsbCBpcyBudWxsLCBoYXNoIG9mIHVuZGVmaW5lZCBpcyB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gIHZhciBoYXNoID0gMCwgaSwgY2gsIGw7XG4gIGlmIChzdHIgPT09IHVuZGVmaW5lZCB8fCBzdHIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBoYXNoO1xuICB9XG4gIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaCAgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cbiAgcmV0dXJuIGhhc2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoUmVjb3JkKHJlY29yZCkge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIHRoaW5nIHRvIHVzZSBhcyBhIG1lbW9pemUgcmVzb2x2ZXIgaGFzaCBmb3IgcmVmZXJlbmNlIHR5cGVzLlxuICovXG52YXIgcmVmc0NhY2hlID0ge307IC8vIHsgaWQ6IGNtcCB9XG52YXIgY2FjaGVJZEluZGV4ID0gMDtcbmV4cG9ydCBmdW5jdGlvbiByZWZUb0hhc2ggKGNtcCkge1xuICAvLyBzZWFyY2ggdGhlIGNtcFVuaXF1ZU1hcCBieSByZWZlcmVuY2UgLSBoYXZlIHdlIHNlZW4gaXQgYmVmb3JlP1xuICAvLyBpZiBzbywgdXNlIHRoZSBhc3NpZ25lZCBpZCBhcyB0aGUgaGFzaFxuICAvLyBpZiBub3QsIGFkZCB0byBjYWNoZSBhbmQgaW5jcmVtZW50IGNhY2hlSWRJbmRleCBhcyBhIG5ldyBJRCB0byBoYXNoIG9uXG5cbiAgdmFyIGNtcHNXaXRoVWlkID0gcGFpcnMocmVmc0NhY2hlKTtcbiAgdmFyIGNtcEZvdW5kID0gZmluZChjbXBzV2l0aFVpZCwgZnVuY3Rpb24gKGNtcEFuZElkKSB7IHJldHVybiBjbXBBbmRJZFsxXSA9PT0gY21wOyB9KTtcbiAgaWYgKGNtcEZvdW5kKSB7XG4gICAgcmV0dXJuIGNtcEZvdW5kWzBdOyAvLyByZXR1cm4gdGhlIHVpZFxuICB9XG4gIGVsc2Uge1xuICAgIHZhciB1aWQgPSAoY2FjaGVJZEluZGV4KyspLnRvU3RyaW5nKCk7XG4gICAgcmVmc0NhY2hlW3VpZF0gPSBjbXA7XG4gICAgcmV0dXJuIHVpZDtcbiAgfVxufVxuXG5sZXQgaWRlbnRpdHkgPSB4ID0+IHg7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZW1vaXplZCAoaGFzaGVyID0gaWRlbnRpdHksIGYpIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIC8vIGhhc2hlciBnZXRzIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBmLCB0byBjcmVhdGUgdGhlIGhhc2hLZXlcbiAgICBjb25zdCBoYXNoS2V5ID0gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBoYXNoS2V5KVxuICAgICAgICA/IGNhY2hlW2hhc2hLZXldXG4gICAgICAgIDogKGNhY2hlW2hhc2hLZXldID0gZi5hcHBseSh0aGlzLCBhcmdzKSk7XG4gIH07XG59XG5cblxuLy8gY29weSBmcm9tIE1ETiBleGFtcGxlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvZnJlZXplI0V4YW1wbGVzXG5leHBvcnQgZnVuY3Rpb24gZGVlcEZyZWV6ZShvYmopIHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuZnJlZXplICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgcHJvcGVydHkgbmFtZXMgZGVmaW5lZCBvbiBvYmpcbiAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cbiAgLy8gRnJlZXplIHByb3BlcnRpZXMgYmVmb3JlIGZyZWV6aW5nIHNlbGZcbiAgcHJvcE5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBwcm9wID0gb2JqW25hbWVdO1xuXG4gICAgLy8gRnJlZXplIHByb3AgaWYgaXQgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBwcm9wID09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4ocHJvcCkpIHtcbiAgICAgIGRlZXBGcmVlemUocHJvcCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBGcmVlemUgc2VsZlxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShvYmopO1xufVxuXG5leHBvcnQgY29uc3QgdmFsRXEgPSAoYSwgYikgPT4gaXNFcXVhbChhLCBiKTtcbmV4cG9ydCBjb25zdCByZWZFcSA9IChhLCBiKSA9PiBhID09PSBiO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2guaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHttZW1vaXplZCwgcmVmVG9IYXNofSBmcm9tICcuL3V0aWwnO1xuXG5cbi8vIFRvIHN1cHBvcnQgYmluZGluZyBjdXJzb3JzIHRvIHJlYWN0IHN0YXRlLCB3ZSBuZWVkIGNtcC5zZXRTdGF0ZSBhcyBhIGZ1bmN0aW9uLCBhbmQgdGhlIGZ1bmN0aW9uXG4vLyBuZWVkcyB0byBiZSA9PT0gaWYgaXQgY29tZXMgZnJvbSB0aGUgc2FtZSByZWFjdCBjb21wb25lbnQuIFNpbmNlXG4vLyBgY21wLnNldFN0YXRlLmJpbmQoY21wKSAhPT0gY21wLnNldFN0YXRlLmJpbmQoY21wKWAsXG4vLyB3ZSBuZWVkIHRvIG1lbW9pemUgYmFzZWQgb24gdGhlIGNtcCByZWZlcmVuY2UuXG5leHBvcnQgbGV0IG1ha2VTd2FwRnJvbVJlYWN0ID0gbWVtb2l6ZWQocmVmVG9IYXNoLCBjbXAgPT4gY21wLnNldFN0YXRlLmJpbmQoY21wKSk7XG5leHBvcnQgbGV0IG1ha2VEZXJlZkZyb21SZWFjdCA9IG1lbW9pemVkKHJlZlRvSGFzaCwgY21wID0+ICgpID0+IGNtcC5zdGF0ZSk7XG5leHBvcnQgbGV0IG1ha2VWYWx1ZUZyb21SZWFjdCA9IGNtcCA9PiBjbXAuc3RhdGU7XG5leHBvcnQgbGV0IGlzUmVhY3RDbXAgPSAoYSkgPT4gdHlwZW9mIGEuX19wcm90b19fLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUmVhY3RBZGFwdGVyLmpzXG4gKiovIiwiaW1wb3J0IHttZW1vaXplZCwgcmVmVG9IYXNoLCBoYXNoUmVjb3JkLCBnZXRJbiwgZmxhdHRlbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7dXBkYXRlSW4sIG1lcmdlLCBwdXNoLCB1bnNoaWZ0LCBzcGxpY2V9IGZyb20gJ3VwZGF0ZS1pbic7XG5pbXBvcnQge21ha2VEZXJlZkZyb21SZWFjdCwgbWFrZVN3YXBGcm9tUmVhY3QsIGlzUmVhY3RDbXB9IGZyb20gJy4vUmVhY3RBZGFwdGVyJztcblxuXG5jbGFzcyBSZWZDdXJzb3Ige1xuICBjb25zdHJ1Y3RvciAocm9vdERlcmVmLCByb290U3dhcCwgcGF0aHMpIHtcbiAgICB0aGlzLnZhbHVlID0gKCkgPT4gZ2V0SW4ocm9vdERlcmVmKCksIHBhdGhzKTtcbiAgICB0aGlzLnJlZmluZSA9ICguLi5tb3JlUGF0aHMpID0+IE5ld1JlZkN1cnNvcihyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRocy5jb25jYXQobW9yZVBhdGhzKSk7XG4gICAgdGhpcy5zd2FwID0gKGYsIC4uLmFyZ3MpID0+IHJvb3RTd2FwKHJvb3RWYWx1ZSA9PiB1cGRhdGVJbihyb290VmFsdWUsIHBhdGhzLCB2ID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpKTtcblxuICAgIHRoaXMuc2V0ID0gKHZhbCkgPT4gdGhpcy5zd2FwKHYgPT4gdmFsKTtcbiAgICB0aGlzLm1lcmdlID0gKHZhbCkgPT4gdGhpcy5zd2FwKG1lcmdlLCB2YWwpO1xuICAgIHRoaXMucHVzaCA9ICh4cykgPT4gdGhpcy5zd2FwKHB1c2gsIHhzKTtcbiAgICB0aGlzLnVuc2hpZnQgPSAoeHMpID0+IHRoaXMuc3dhcCh1bnNoaWZ0LCB4cyk7XG4gICAgdGhpcy5zcGxpY2UgPSAoeHMpID0+IHRoaXMuc3dhcChzcGxpY2UsIHhzKTtcblxuICAgIC8vIFJlZkN1cnNvcnMgZG9uJ3Qgb3duIGEgdmFsdWUsIHNvIHRoZXkgYXJlbid0IHJlc3BvbnNpYmxlIGZvciBmcmVlemluZyBpdC5cbiAgfVxufVxuXG5cbmxldCBOZXdSZWZDdXJzb3JfID0gKHJvb3REZXJlZiwgcm9vdFN3YXAsIHBhdGhzID0gW10pID0+IG5ldyBSZWZDdXJzb3Iocm9vdERlcmVmLCByb290U3dhcCwgcGF0aHMpO1xuXG4vLyByZXVzZSB0aGUgc2FtZSBjdXJzb3IgaW5zdGFuY2UgZm9yIHNhbWUge2RlcmVmIHN3YXAgcGF0aHN9XG5sZXQgaGFzaGVyID0gKHJvb3REZXJlZiwgcm9vdFN3YXAsIHBhdGhzKSA9PiByZWZUb0hhc2gocm9vdERlcmVmKSArIHJlZlRvSGFzaChyb290U3dhcCkgKyBoYXNoUmVjb3JkKHBhdGhzKTtcbmxldCBOZXdSZWZDdXJzb3IgPSBtZW1vaXplZChoYXNoZXIsIE5ld1JlZkN1cnNvcl8pO1xuXG5cblJlZkN1cnNvci5idWlsZCA9IChkZXJlZiwgc3dhcCkgPT4ge1xuICByZXR1cm4gaXNSZWFjdENtcChkZXJlZilcbiAgICAgID8gTmV3UmVmQ3Vyc29yKG1ha2VEZXJlZkZyb21SZWFjdChkZXJlZiksIG1ha2VTd2FwRnJvbVJlYWN0KGRlcmVmKSlcbiAgICAgIDogTmV3UmVmQ3Vyc29yKGRlcmVmLCBzd2FwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlZkN1cnNvcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1JlZkN1cnNvci5qc1xuICoqLyIsImltcG9ydCBvbWl0IGZyb20gJ29taXQta2V5cyc7XG5pbXBvcnQge3ZhbEVxLCByZWZFcX0gZnJvbSAnLi91dGlsJztcblxuXG5mdW5jdGlvbiBJbW11dGFibGVPcHRpbWl6YXRpb25zIChyZWZGaWVsZHMsIGlnbm9yZWRGaWVsZHMvKm9wdGlvbmFsKi8pIHtcbiAgdmFyIG5vVmFsdWVDaGVja0ZpZWxkcyA9IHJlZkZpZWxkcy5jb25jYXQoaWdub3JlZEZpZWxkcyB8fCBbXSk7XG4gIHJldHVybiB7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG5cbiAgICAgIHZhciB2YWx1ZXNDaGFuZ2VkID0gIXZhbEVxKFxuICAgICAgICBvbWl0KG5leHRQcm9wcywgbm9WYWx1ZUNoZWNrRmllbGRzKSxcbiAgICAgICAgb21pdCh0aGlzLnByb3BzLCBub1ZhbHVlQ2hlY2tGaWVsZHMpKTtcblxuICAgICAgdmFyIHJlZnNDaGFuZ2VkID0gIXJlZkZpZWxkcy5ldmVyeSgoZmllbGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZkVxKHRoaXMucHJvcHNbZmllbGRdLCBuZXh0UHJvcHNbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzQ2hhbmdlZCB8fCByZWZzQ2hhbmdlZDtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZU9wdGltaXphdGlvbnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzXG4gKiovIiwiLyohXG4gKiBvbWl0LWtleSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvb21pdC1rZXk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG52YXIgZGlmZmVyZW5jZSA9IHJlcXVpcmUoJ2FycmF5LWRpZmZlcmVuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbWl0KG9iaiwga2V5cykge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuXG4gIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtrZXlzXTtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlKHByb3BzLCBrZXlzKTtcbiAgdmFyIG8gPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGRpZmZbaV07XG5cbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG9ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb21pdC1rZXlzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaXNvYmplY3QgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb24gU2NobGlua2VydCwgY29udHJpYnV0b3JzLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGlzIHRoZSB2YWx1ZSBhbiBvYmplY3QsIGFuZCBub3QgYW4gYXJyYXk/XG4gKlxuICogQHBhcmFtICB7Kn0gYHZhbHVlYFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcbiAgcmV0dXJuIG8gIT0gbnVsbCAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCdcbiAgICAmJiAhQXJyYXkuaXNBcnJheShvKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG5cdHZhciBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgZnVuY3Rpb24oZWxlbSkge1xuXHRcdHZhciBpZHgsIGxlbjtcblxuXHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleE9mIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0XHR9XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAodGhpc1tpZHhdID09PSBlbGVtKSB7XG5cdFx0XHRcdHJldHVybiBpZHg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuXHRcdHZhciBpZHgsIGxlbjtcblx0XHR2YXIgcmVzID0gW107XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGIsIGFbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGFbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gYi5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmIChpbmRleE9mLmNhbGwoYSwgYltpZHhdKSA9PT0gLTEpIHtcblx0XHRcdFx0cmVzLnB1c2goYltpZHhdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpZmZlcmVuY2U7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Z2xvYmFsLmRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlO1xuXHR9XG5cbn0odGhpcykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYXJyYXktZGlmZmVyZW5jZS9kaWZmZXJlbmNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=