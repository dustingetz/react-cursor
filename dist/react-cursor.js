(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactCursor"] = factory();
	else
		root["ReactCursor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
	
	var _RefCursor = __webpack_require__(14);
	
	var _RefCursor2 = _interopRequireDefault(_RefCursor);
	
	var _ImmutableOptimizations = __webpack_require__(15);
	
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
	
	var _ReactAdapter = __webpack_require__(13);
	
	var debug = process.env.NODE_ENV !== 'production';
	
	var makeRefinedSwap = (0, _util.memoized)(function (swapFn, paths) {
	  return (0, _util.refToHash)(swapFn) + (0, _util.hashRecord)(paths);
	}, function (swapFn, paths) {
	  return function (f) {
	    return swapFn((0, _util.rootAt)(paths, f));
	  };
	});
	
	var Cursor = function Cursor(value, swapFn) {
	  var _this = this;
	
	  _classCallCheck(this, Cursor);
	
	  this.value = function () {
	    return value;
	  };
	  this.refine = function () {
	    for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
	      morePaths[_key] = arguments[_key];
	    }
	
	    return NewCursor((0, _util.getIn)(value, morePaths), makeRefinedSwap(swapFn, morePaths));
	  };
	  this.swap = function (f) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    return swapFn(function (v) {
	      return f.apply(null, [v].concat(args));
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
	
	  debug && (0, _util.deepFreeze)(value);
	};
	
	var NewCursor = (0, _util.memoized)(function (value, swap) {
	  return (0, _util.refToHash)(swap) + (0, _util.hashRecord)(value);
	}, function (value, swap) {
	  return new Cursor(value, swap);
	});
	
	Cursor.build = function (value, swap) {
	  return (0, _ReactAdapter.isReactCmp)(value) ? NewCursor((0, _ReactAdapter.makeValueFromReact)(value), (0, _ReactAdapter.makeSwapFromReact)(value)) : NewCursor(value, swap);
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
	
	function invariant(condition, format, a, b, c, d, e, f) {
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
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
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
	
	var _deepEqual = __webpack_require__(9);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _updateIn = __webpack_require__(3);
	
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
	  console.assert(key in obj, 'Bad cursor refine: \'' + key + '\' not found in ', obj);
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
	var refsCache = new WeakMap();
	var cacheIdIndex = 0;
	
	function refToHash(o) {
	  var cachedUid = refsCache.get(o);
	  var uid = cachedUid || (cacheIdIndex++).toString();
	  !cachedUid && refsCache.set(o, uid);
	  return uid;
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
	
	function isObject(value) {
	  return !!value && typeof value == 'object';
	}
	
	// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
	
	function deepFreeze(obj) {
	  if (typeof Object.freeze !== 'function') {
	    return obj;
	  }
	
	  if (!isObject(obj)) {
	    return obj;
	  }
	
	  // Retrieve the property names defined on obj
	  var propNames = Object.getOwnPropertyNames(obj);
	
	  // Freeze properties before freezing self
	  propNames.forEach(function (name) {
	    var prop = obj[name];
	
	    // Freeze prop if it is an object
	    if (isObject(prop) && !Object.isFrozen(prop)) {
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
	var rootAt = function rootAt(segments, fn) {
	  return function (value) {
	    return (0, _updateIn.updateIn)(value, segments, fn);
	  };
	};
	exports.rootAt = rootAt;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _util = __webpack_require__(12);
	
	var _updateIn = __webpack_require__(3);
	
	var _ReactAdapter = __webpack_require__(13);
	
	var makeRefinedSwap = (0, _util.memoized)(function (swapFn, paths) {
	  return (0, _util.refToHash)(swapFn) + (0, _util.hashRecord)(paths);
	}, function (swapFn, paths) {
	  return function (f) {
	    return swapFn((0, _util.rootAt)(paths, f));
	  };
	});
	
	var makeRefinedDeref = (0, _util.memoized)(function (deref, paths) {
	  return (0, _util.refToHash)(deref) + (0, _util.hashRecord)(paths);
	}, function (deref, paths) {
	  return function () {
	    return (0, _util.getIn)(deref(), paths);
	  };
	});
	
	var RefCursor = function RefCursor(deref, swapFn) {
	  var _this = this;
	
	  _classCallCheck(this, RefCursor);
	
	  this.value = deref;
	  this.refine = function () {
	    for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
	      morePaths[_key] = arguments[_key];
	    }
	
	    return NewRefCursor(makeRefinedDeref(deref, morePaths), makeRefinedSwap(swapFn, morePaths));
	  };
	  this.swap = function (f) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    return swapFn(function (v) {
	      return f.apply(null, [v].concat(args));
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
	
	var NewRefCursor = (0, _util.memoized)(function (deref, swap) {
	  return (0, _util.refToHash)(deref) + (0, _util.refToHash)(swap);
	}, function (deref, swap) {
	  return new RefCursor(deref, swap);
	});
	
	RefCursor.build = function (deref, swap) {
	  return (0, _ReactAdapter.isReactCmp)(deref) ? NewRefCursor((0, _ReactAdapter.makeDerefFromReact)(deref), (0, _ReactAdapter.makeSwapFromReact)(deref)) : NewRefCursor(deref, swap);
	};
	
	exports['default'] = RefCursor;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _omitKeys = __webpack_require__(16);
	
	var _omitKeys2 = _interopRequireDefault(_omitKeys);
	
	var _util = __webpack_require__(12);
	
	function ImmutableOptimizations() {
	  var refFields = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var ignoredFields = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  var noValueCheckFields = refFields.concat(ignoredFields);
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * omit-key <https://github.com/jonschlinkert/omit-key>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(17);
	var difference = __webpack_require__(18);
	
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
/* 17 */
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
/* 18 */
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
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NTY0ZDUzNDc0NTE4ODYyMTIzMCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtY3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy9DdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qvfi9mYmpzL2xpYi9rZXlPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L34vZmJqcy9saWIvaW52YXJpYW50LmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlYWN0QWRhcHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVmQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzIiwid2VicGFjazovLy8uL34vb21pdC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vb21pdC1rZXlzL34vaXNvYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9vbWl0LWtleXMvfi9hcnJheS1kaWZmZXJl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QUFFO0FBQ0Y7QUFDQTs7QUFFQSxFQUFDIiwiZmlsZSI6InJlYWN0LWN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0Q3Vyc29yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0Q3Vyc29yXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpYy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ1NjRkNTM0NzQ1MTg4NjIxMjMwXG4gKiovIiwiaW1wb3J0IEN1cnNvciBmcm9tICcuL0N1cnNvcic7XG5pbXBvcnQgUmVmQ3Vyc29yIGZyb20gJy4vUmVmQ3Vyc29yJztcbmltcG9ydCBJbW11dGFibGVPcHRpbWl6YXRpb25zIGZyb20gJy4vSW1tdXRhYmxlT3B0aW1pemF0aW9ucyc7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBDdXJzb3I6IEN1cnNvcixcbiAgSW1tdXRhYmxlT3B0aW1pemF0aW9uczogSW1tdXRhYmxlT3B0aW1pemF0aW9ucyxcbiAgUmVmQ3Vyc29yOiBSZWZDdXJzb3Jcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0LWN1cnNvci5qc1xuICoqLyIsImltcG9ydCB7bWVyZ2UsIHB1c2gsIHVuc2hpZnQsIHNwbGljZX0gZnJvbSAndXBkYXRlLWluJztcbmltcG9ydCB7bWVtb2l6ZWQsIGdldEluLCBoYXNoUmVjb3JkLCByZWZUb0hhc2gsIGRlZXBGcmVlemUsIHJvb3RBdH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7bWFrZVN3YXBGcm9tUmVhY3QsIG1ha2VWYWx1ZUZyb21SZWFjdCwgaXNSZWFjdENtcH0gZnJvbSAnLi9SZWFjdEFkYXB0ZXInO1xuXG5cbmxldCBkZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cblxubGV0IG1ha2VSZWZpbmVkU3dhcCA9IG1lbW9pemVkKFxuICAoc3dhcEZuLCBwYXRocykgPT4gcmVmVG9IYXNoKHN3YXBGbikgKyBoYXNoUmVjb3JkKHBhdGhzKSxcbiAgKHN3YXBGbiwgcGF0aHMpID0+IChmKSA9PiBzd2FwRm4ocm9vdEF0KHBhdGhzLCBmKSkpO1xuXG5cbmNsYXNzIEN1cnNvciB7XG4gIGNvbnN0cnVjdG9yICh2YWx1ZSwgc3dhcEZuKSB7XG4gICAgdGhpcy52YWx1ZSA9ICgpID0+IHZhbHVlO1xuICAgIHRoaXMucmVmaW5lID0gKC4uLm1vcmVQYXRocykgPT4gTmV3Q3Vyc29yKGdldEluKHZhbHVlLCBtb3JlUGF0aHMpLCBtYWtlUmVmaW5lZFN3YXAoc3dhcEZuLCBtb3JlUGF0aHMpKTtcbiAgICB0aGlzLnN3YXAgPSAoZiwgLi4uYXJncykgPT4gc3dhcEZuKCh2KSA9PiBmLmFwcGx5KG51bGwsIFt2XS5jb25jYXQoYXJncykpKTtcblxuICAgIHRoaXMuc2V0ID0gKHZhbCkgPT4gdGhpcy5zd2FwKHYgPT4gdmFsKTtcbiAgICB0aGlzLm1lcmdlID0gKHZhbCkgPT4gdGhpcy5zd2FwKG1lcmdlLCB2YWwpO1xuICAgIHRoaXMucHVzaCA9ICh4cykgPT4gdGhpcy5zd2FwKHB1c2gsIHhzKTtcbiAgICB0aGlzLnVuc2hpZnQgPSAoeHMpID0+IHRoaXMuc3dhcCh1bnNoaWZ0LCB4cyk7XG4gICAgdGhpcy5zcGxpY2UgPSAoeHMpID0+IHRoaXMuc3dhcChzcGxpY2UsIHhzKTtcblxuICAgIGRlYnVnICYmIGRlZXBGcmVlemUodmFsdWUpO1xuICB9XG59XG5cblxubGV0IE5ld0N1cnNvciA9IG1lbW9pemVkKFxuICAgICh2YWx1ZSwgc3dhcCkgPT4gcmVmVG9IYXNoKHN3YXApICsgaGFzaFJlY29yZCh2YWx1ZSksXG4gICAgKHZhbHVlLCBzd2FwKSA9PiBuZXcgQ3Vyc29yKHZhbHVlLCBzd2FwKSk7XG5cblxuQ3Vyc29yLmJ1aWxkID0gKHZhbHVlLCBzd2FwKSA9PiBpc1JlYWN0Q21wKHZhbHVlKVxuICAgID8gTmV3Q3Vyc29yKG1ha2VWYWx1ZUZyb21SZWFjdCh2YWx1ZSksIG1ha2VTd2FwRnJvbVJlYWN0KHZhbHVlKSlcbiAgICA6IE5ld0N1cnNvcih2YWx1ZSwgc3dhcCk7XG5cblxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ3Vyc29yLmpzXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtkZWZhdWx0IGFzIHBlcnNpc3RlbnRVcGRhdGV9IGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnZGVlcC1lcXVhbCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlIChhLCBiKSB7XG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGEsIHskbWVyZ2U6IGJ9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2ggKGFzLCBicykge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhcywgeyRwdXNoOiBic30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zaGlmdCAoYXMsIGJzKSB7XG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGFzLCB7JHVuc2hpZnQ6IGJzfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpY2UgKGFzLCBzcGxpY2VzKSB7XG4gIC8vIHBlcnNpc3RlbnRVcGRhdGUoWzEyLCAxNywgMTVdLCB7JHNwbGljZTogW1sxLCAxLCAxMywgMTRdXX0pID0+IFsxMiwgMTMsIDE0LCAxNV1cbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYXMsIHskc3BsaWNlOiBzcGxpY2VzfSk7XG59XG5cblxuLyoqXG4gKiBUaGluIHdyYXBwZXIgb3ZlciByZWFjdC1hZGRvbnMtdXBkYXRlIHRvIGFwcGx5IGEgZnVuY3Rpb24gYXQgcGF0aFxuICogcHJlc2VydmluZyBvdGhlciByZWZlcmVuY2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW4gKHJvb3RWYWwsIHBhdGhzLCBmLCAuLi5hcmdzKSB7XG4gIGxldCBmZiA9ICh2KSA9PiBmLmFwcGx5KG51bGwsIFt2XS5jb25jYXQoYXJncykpO1xuXG4gIHZhciBuZXdSb290VmFsO1xuICBpZiAocGF0aHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGNvbW1hbmQgPSByb290QXQocGF0aHMsIHskYXBwbHk6IGZmfSk7XG4gICAgbmV3Um9vdFZhbCA9IHBlcnNpc3RlbnRVcGRhdGUocm9vdFZhbCwgY29tbWFuZCk7XG4gIH1cbiAgZWxzZSBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgbmV3Um9vdFZhbCA9IGZmKHJvb3RWYWwpO1xuICB9XG5cbiAgLy8gd291bGQgYmUgYmV0dGVyIHRvIGRvIHRoaXMgdmFsRXEgY2hlY2sgb24ganVzdCB0aGUgbGVhZlxuICByZXR1cm4gaXNFcXVhbChyb290VmFsLCBuZXdSb290VmFsKVxuICAgICAgPyByb290VmFsIC8vIHByZXNlcnZlID09PSBpZiBzYW1lIHZhbHVlXG4gICAgICA6IG5ld1Jvb3RWYWw7XG59XG5cblxuXG4vLyBIZWxwZXIgbWV0aG9kcyBmb3IgZm9ybWluZyByZWFjdC1hZGRvbnMtdXBkYXRlIGNvbW1hbmRzLlxuXG4vKipcbiAqIEBwYXJhbSBsZWFmVmFsIGUuZy4geyRhcHBseTogZn1cbiAqIEBwYXJhbSBwYXRocyBlLmcuIFsneCcsICd5JywgJ3onXVxuICogQHJldHVybnMgZS5nLiB7eDoge3k6IHt6OiB7JGFwcGx5OiBmfX19XG4gKi9cbmZ1bmN0aW9uIHJvb3RBdCAocGF0aHMsIGxlYWZWYWwpIHtcbiAgcmV0dXJuIHBhdGhzLnJlZHVjZVJpZ2h0KHVuRGVyZWYsIGxlYWZWYWwpXG59XG5cblxuLyoqXG4gKiBAcGFyYW0gb2JqIGUuZyB7JGFwcGx5OiBmfVxuICogQHBhcmFtIGtleSBlLmcuICdmb28nXG4gKiBAcmV0dXJucyBlLmcuIHtmb286IHskYXBwbHk6IGZ9fVxuICovXG5mdW5jdGlvbiB1bkRlcmVmKG9iaiwga2V5KSB7IC8vIGFrYSB1bi1nZXRcbiAgdmFyIG5leHRPYmogPSB7fTtcbiAgbmV4dE9ialtrZXldID0gb2JqO1xuICByZXR1cm4gbmV4dE9iajtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi91cGRhdGUtaW4vc3JjL3VwZGF0ZS1pbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL3VwZGF0ZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFkZG9ucy11cGRhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdXBkYXRlXG4gKi9cblxuLyogZ2xvYmFsIGhhc093blByb3BlcnR5OnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoeCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB4LmNvbmNhdCgpO1xuICB9IGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFzc2lnbihuZXcgeC5jb25zdHJ1Y3RvcigpLCB4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geDtcbiAgfVxufVxuXG52YXIgQ09NTUFORF9QVVNIID0ga2V5T2YoeyAkcHVzaDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1VOU0hJRlQgPSBrZXlPZih7ICR1bnNoaWZ0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfU1BMSUNFID0ga2V5T2YoeyAkc3BsaWNlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfU0VUID0ga2V5T2YoeyAkc2V0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfTUVSR0UgPSBrZXlPZih7ICRtZXJnZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX0FQUExZID0ga2V5T2YoeyAkYXBwbHk6IG51bGwgfSk7XG5cbnZhciBBTExfQ09NTUFORFNfTElTVCA9IFtDT01NQU5EX1BVU0gsIENPTU1BTkRfVU5TSElGVCwgQ09NTUFORF9TUExJQ0UsIENPTU1BTkRfU0VULCBDT01NQU5EX01FUkdFLCBDT01NQU5EX0FQUExZXTtcblxudmFyIEFMTF9DT01NQU5EU19TRVQgPSB7fTtcblxuQUxMX0NPTU1BTkRTX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoY29tbWFuZCkge1xuICBBTExfQ09NTUFORFNfU0VUW2NvbW1hbmRdID0gdHJ1ZTtcbn0pO1xuXG5mdW5jdGlvbiBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIGNvbW1hbmQpIHtcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB2YXIgc3BlY1ZhbHVlID0gc3BlY1tjb21tYW5kXTtcbiAgIUFycmF5LmlzQXJyYXkoc3BlY1ZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IFlvdSBwcm92aWRlZCBhIGtleSBwYXRoIHRvIHVwZGF0ZSgpIHRoYXQgZGlkIG5vdCBjb250YWluIG9uZSAnICsgJ29mICVzLiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIHslczogLi4ufT8nLCBBTExfQ09NTUFORFNfTElTVC5qb2luKCcsICcpLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGtleSBpbiBhbiBvYmplY3Qgd2l0aCAlcycsIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gc3BlY1tDT01NQU5EX1NFVF07XG4gIH1cblxuICB2YXIgbmV4dFZhbHVlID0gc2hhbGxvd0NvcHkodmFsdWUpO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfTUVSR0UpKSB7XG4gICAgdmFyIG1lcmdlT2JqID0gc3BlY1tDT01NQU5EX01FUkdFXTtcbiAgICAhKG1lcmdlT2JqICYmIHR5cGVvZiBtZXJnZU9iaiA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhKG5leHRWYWx1ZSAmJiB0eXBlb2YgbmV4dFZhbHVlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSB0YXJnZXQgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG5leHRWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGFzc2lnbihuZXh0VmFsdWUsIHNwZWNbQ09NTUFORF9NRVJHRV0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9QVVNIKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9QVVNIKTtcbiAgICBzcGVjW0NPTU1BTkRfUFVTSF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1VOU0hJRlQpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1VOU0hJRlQpO1xuICAgIHNwZWNbQ09NTUFORF9VTlNISUZUXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUudW5zaGlmdChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU1BMSUNFKSkge1xuICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICFBcnJheS5pc0FycmF5KHNwZWNbQ09NTUFORF9TUExJQ0VdKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIG5leHRWYWx1ZS5zcGxpY2UuYXBwbHkobmV4dFZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfQVBQTFkpKSB7XG4gICAgISh0eXBlb2Ygc3BlY1tDT01NQU5EX0FQUExZXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYSBmdW5jdGlvbjsgZ290ICVzLicsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBuZXh0VmFsdWUgPSBzcGVjW0NPTU1BTkRfQVBQTFldKG5leHRWYWx1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrIGluIHNwZWMpIHtcbiAgICBpZiAoIShBTExfQ09NTUFORFNfU0VULmhhc093blByb3BlcnR5KGspICYmIEFMTF9DT01NQU5EU19TRVRba10pKSB7XG4gICAgICBuZXh0VmFsdWVba10gPSB1cGRhdGUodmFsdWVba10sIHNwZWNba10pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi91cGRhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU9mXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qvfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMuanMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vbGliL2lzX2FyZ3VtZW50cy5qcycpO1xuXG52YXIgZGVlcEVxdWFsID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgIT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cGVjdGVkICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICB2YXIgaSwga2V5O1xuICBpZiAoaXNVbmRlZmluZWRPck51bGwoYSkgfHwgaXNVbmRlZmluZWRPck51bGwoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG4gIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG4gIGlmIChpc0FyZ3VtZW50cyhhKSkge1xuICAgIGlmICghaXNBcmd1bWVudHMoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuICB9XG4gIGlmIChpc0J1ZmZlcihhKSkge1xuICAgIGlmICghaXNCdWZmZXIoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0cnkge1xuICAgIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICAgIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaXNFcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcbmltcG9ydCB7dXBkYXRlSW59IGZyb20gJ3VwZGF0ZS1pbic7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQoYXJyYXksIHByZWRpY2F0ZSkge1xuICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICB2YXIgbGlzdCA9IE9iamVjdChhcnJheSk7XG4gIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gIHZhciB2YWx1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluKHRyZWUsIHBhdGhzKSB7IC8vIHRoaXMgaXMgZ2V0LWluIGluIGNsb2p1cmVcbiAgcmV0dXJuIHJlZHVjZShwYXRocywgZ2V0LCB0cmVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChvYmosIGtleSkge1xuICBjb25zb2xlLmFzc2VydChrZXkgaW4gb2JqLCBgQmFkIGN1cnNvciByZWZpbmU6ICcke2tleX0nIG5vdCBmb3VuZCBpbiBgLCBvYmopO1xuICByZXR1cm4gb2JqW2tleV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5zbGljZSgwLCBhcnJheS5sZW5ndGggLSAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShhcnJheSwgZiwgbXplcm8pIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZShmLCBtemVybyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGxpc3RPZkxpc3RzKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGxpc3RPZkxpc3RzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhaXJzKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufTtcblxuLyoqXG4gKiBIYXNoIG9mIG51bGwgaXMgbnVsbCwgaGFzaCBvZiB1bmRlZmluZWQgaXMgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoU3RyaW5nKHN0cikge1xuICB2YXIgaGFzaCA9IDAsIGksIGNoLCBsO1xuICBpZiAoc3RyID09PSB1bmRlZmluZWQgfHwgc3RyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICB9XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgfVxuICBmb3IgKGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2ggID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2g7XG4gICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG4gIHJldHVybiBoYXNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaFJlY29yZChyZWNvcmQpIHtcbiAgICByZXR1cm4gaGFzaFN0cmluZyhKU09OLnN0cmluZ2lmeShyZWNvcmQpKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHVuaXF1ZSB0aGluZyB0byB1c2UgYXMgYSBtZW1vaXplIHJlc29sdmVyIGhhc2ggZm9yIHJlZmVyZW5jZSB0eXBlcy5cbiAqL1xubGV0IHJlZnNDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG52YXIgY2FjaGVJZEluZGV4ID0gMDtcbmV4cG9ydCBmdW5jdGlvbiByZWZUb0hhc2ggKG8pIHtcbiAgbGV0IGNhY2hlZFVpZCA9IHJlZnNDYWNoZS5nZXQobyk7XG4gIGxldCB1aWQgPSAgY2FjaGVkVWlkIHx8IChjYWNoZUlkSW5kZXgrKykudG9TdHJpbmcoKTtcbiAgIWNhY2hlZFVpZCAmJiByZWZzQ2FjaGUuc2V0KG8sIHVpZCk7XG4gIHJldHVybiB1aWQ7XG59XG5cbmxldCBpZGVudGl0eSA9IHggPT4geDtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lbW9pemVkIChoYXNoZXIgPSBpZGVudGl0eSwgZikge1xuICB2YXIgY2FjaGUgPSB7fTtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgLy8gaGFzaGVyIGdldHMgdGhlIHNhbWUgYXJndW1lbnRzIGFzIGYsIHRvIGNyZWF0ZSB0aGUgaGFzaEtleVxuICAgIGNvbnN0IGhhc2hLZXkgPSBoYXNoZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGhhc2hLZXkpXG4gICAgICAgID8gY2FjaGVbaGFzaEtleV1cbiAgICAgICAgOiAoY2FjaGVbaGFzaEtleV0gPSBmLmFwcGx5KHRoaXMsIGFyZ3MpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vLyBjb3B5IGZyb20gTUROIGV4YW1wbGU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9mcmVlemUjRXhhbXBsZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRnJlZXplKG9iaikge1xuICBpZiAodHlwZW9mIE9iamVjdC5mcmVlemUgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIC8vIFJldHJpZXZlIHRoZSBwcm9wZXJ0eSBuYW1lcyBkZWZpbmVkIG9uIG9ialxuICB2YXIgcHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcblxuICAvLyBGcmVlemUgcHJvcGVydGllcyBiZWZvcmUgZnJlZXppbmcgc2VsZlxuICBwcm9wTmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHByb3AgPSBvYmpbbmFtZV07XG5cbiAgICAvLyBGcmVlemUgcHJvcCBpZiBpdCBpcyBhbiBvYmplY3RcbiAgICBpZiAoaXNPYmplY3QocHJvcCkgJiYgIU9iamVjdC5pc0Zyb3plbihwcm9wKSkge1xuICAgICAgZGVlcEZyZWV6ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEZyZWV6ZSBzZWxmXG4gIHJldHVybiBPYmplY3QuZnJlZXplKG9iaik7XG59XG5cbmV4cG9ydCBjb25zdCB2YWxFcSA9IChhLCBiKSA9PiBpc0VxdWFsKGEsIGIpO1xuZXhwb3J0IGNvbnN0IHJlZkVxID0gKGEsIGIpID0+IGEgPT09IGI7XG5cbmV4cG9ydCBsZXQgcm9vdEF0ID0gKHNlZ21lbnRzLCBmbikgPT4gKHZhbHVlKSA9PiB1cGRhdGVJbih2YWx1ZSwgc2VnbWVudHMsIGZuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCJpbXBvcnQge21lbW9pemVkLCByZWZUb0hhc2h9IGZyb20gJy4vdXRpbCc7XG5cblxuLy8gVG8gc3VwcG9ydCBiaW5kaW5nIGN1cnNvcnMgdG8gcmVhY3Qgc3RhdGUsIHdlIG5lZWQgY21wLnNldFN0YXRlIGFzIGEgZnVuY3Rpb24sIGFuZCB0aGUgZnVuY3Rpb25cbi8vIG5lZWRzIHRvIGJlID09PSBpZiBpdCBjb21lcyBmcm9tIHRoZSBzYW1lIHJlYWN0IGNvbXBvbmVudC4gU2luY2Vcbi8vIGBjbXAuc2V0U3RhdGUuYmluZChjbXApICE9PSBjbXAuc2V0U3RhdGUuYmluZChjbXApYCxcbi8vIHdlIG5lZWQgdG8gbWVtb2l6ZSBiYXNlZCBvbiB0aGUgY21wIHJlZmVyZW5jZS5cbmV4cG9ydCBsZXQgbWFrZVN3YXBGcm9tUmVhY3QgPSBtZW1vaXplZChyZWZUb0hhc2gsIGNtcCA9PiBjbXAuc2V0U3RhdGUuYmluZChjbXApKTtcbmV4cG9ydCBsZXQgbWFrZURlcmVmRnJvbVJlYWN0ID0gbWVtb2l6ZWQocmVmVG9IYXNoLCBjbXAgPT4gKCkgPT4gY21wLnN0YXRlKTtcbmV4cG9ydCBsZXQgbWFrZVZhbHVlRnJvbVJlYWN0ID0gY21wID0+IGNtcC5zdGF0ZTtcbmV4cG9ydCBsZXQgaXNSZWFjdENtcCA9IChhKSA9PiB0eXBlb2YgYS5fX3Byb3RvX18ucmVuZGVyID09PSBcImZ1bmN0aW9uXCI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9SZWFjdEFkYXB0ZXIuanNcbiAqKi8iLCJpbXBvcnQge21lbW9pemVkLCByZWZUb0hhc2gsIGhhc2hSZWNvcmQsIGdldEluLCByb290QXR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge21lcmdlLCBwdXNoLCB1bnNoaWZ0LCBzcGxpY2V9IGZyb20gJ3VwZGF0ZS1pbic7XG5pbXBvcnQge21ha2VEZXJlZkZyb21SZWFjdCwgbWFrZVN3YXBGcm9tUmVhY3QsIGlzUmVhY3RDbXB9IGZyb20gJy4vUmVhY3RBZGFwdGVyJztcblxuXG5sZXQgbWFrZVJlZmluZWRTd2FwID0gbWVtb2l6ZWQoXG4gIChzd2FwRm4sIHBhdGhzKSA9PiByZWZUb0hhc2goc3dhcEZuKSArIGhhc2hSZWNvcmQocGF0aHMpLFxuICAoc3dhcEZuLCBwYXRocykgPT4gKGYpID0+IHN3YXBGbihyb290QXQocGF0aHMsIGYpKSk7XG5cblxubGV0IG1ha2VSZWZpbmVkRGVyZWYgPSBtZW1vaXplZChcbiAgKGRlcmVmLCBwYXRocykgPT4gcmVmVG9IYXNoKGRlcmVmKSArIGhhc2hSZWNvcmQocGF0aHMpLFxuICAoZGVyZWYsIHBhdGhzKSA9PiAoKSA9PiBnZXRJbihkZXJlZigpLCBwYXRocykpO1xuXG5cbmNsYXNzIFJlZkN1cnNvciB7XG4gIGNvbnN0cnVjdG9yIChkZXJlZiwgc3dhcEZuKSB7XG4gICAgdGhpcy52YWx1ZSA9IGRlcmVmO1xuICAgIHRoaXMucmVmaW5lID0gKC4uLm1vcmVQYXRocykgPT4gTmV3UmVmQ3Vyc29yKG1ha2VSZWZpbmVkRGVyZWYoZGVyZWYsIG1vcmVQYXRocyksIG1ha2VSZWZpbmVkU3dhcChzd2FwRm4sIG1vcmVQYXRocykpO1xuICAgIHRoaXMuc3dhcCA9IChmLCAuLi5hcmdzKSA9PiBzd2FwRm4oKHYpID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpO1xuXG4gICAgdGhpcy5zZXQgPSAodmFsKSA9PiB0aGlzLnN3YXAodiA9PiB2YWwpO1xuICAgIHRoaXMubWVyZ2UgPSAodmFsKSA9PiB0aGlzLnN3YXAobWVyZ2UsIHZhbCk7XG4gICAgdGhpcy5wdXNoID0gKHhzKSA9PiB0aGlzLnN3YXAocHVzaCwgeHMpO1xuICAgIHRoaXMudW5zaGlmdCA9ICh4cykgPT4gdGhpcy5zd2FwKHVuc2hpZnQsIHhzKTtcbiAgICB0aGlzLnNwbGljZSA9ICh4cykgPT4gdGhpcy5zd2FwKHNwbGljZSwgeHMpO1xuXG4gICAgLy8gUmVmQ3Vyc29ycyBkb24ndCBvd24gYSB2YWx1ZSwgc28gdGhleSBhcmVuJ3QgcmVzcG9uc2libGUgZm9yIGZyZWV6aW5nIGl0LlxuICB9XG59XG5cblxubGV0IE5ld1JlZkN1cnNvciA9IG1lbW9pemVkKFxuICAgIChkZXJlZiwgc3dhcCkgPT4gcmVmVG9IYXNoKGRlcmVmKSArIHJlZlRvSGFzaChzd2FwKSxcbiAgICAoZGVyZWYsIHN3YXApID0+IG5ldyBSZWZDdXJzb3IoZGVyZWYsIHN3YXApKTtcblxuXG5SZWZDdXJzb3IuYnVpbGQgPSAoZGVyZWYsIHN3YXApID0+IGlzUmVhY3RDbXAoZGVyZWYpXG4gICAgPyBOZXdSZWZDdXJzb3IobWFrZURlcmVmRnJvbVJlYWN0KGRlcmVmKSwgbWFrZVN3YXBGcm9tUmVhY3QoZGVyZWYpKVxuICAgIDogTmV3UmVmQ3Vyc29yKGRlcmVmLCBzd2FwKTtcblxuXG5leHBvcnQgZGVmYXVsdCBSZWZDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9SZWZDdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQgb21pdCBmcm9tICdvbWl0LWtleXMnO1xuaW1wb3J0IHt2YWxFcSwgcmVmRXF9IGZyb20gJy4vdXRpbCc7XG5cblxuZnVuY3Rpb24gSW1tdXRhYmxlT3B0aW1pemF0aW9ucyAocmVmRmllbGRzID0gW10sIGlnbm9yZWRGaWVsZHMgPSBbXSkge1xuICB2YXIgbm9WYWx1ZUNoZWNrRmllbGRzID0gcmVmRmllbGRzLmNvbmNhdChpZ25vcmVkRmllbGRzKTtcbiAgcmV0dXJuIHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0UHJvcHMpIHtcblxuICAgICAgdmFyIHZhbHVlc0NoYW5nZWQgPSAhdmFsRXEoXG4gICAgICAgIG9taXQobmV4dFByb3BzLCBub1ZhbHVlQ2hlY2tGaWVsZHMpLFxuICAgICAgICBvbWl0KHRoaXMucHJvcHMsIG5vVmFsdWVDaGVja0ZpZWxkcykpO1xuXG4gICAgICB2YXIgcmVmc0NoYW5nZWQgPSAhcmVmRmllbGRzLmV2ZXJ5KChmaWVsZCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmRXEodGhpcy5wcm9wc1tmaWVsZF0sIG5leHRQcm9wc1tmaWVsZF0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZXNDaGFuZ2VkIHx8IHJlZnNDaGFuZ2VkO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgSW1tdXRhYmxlT3B0aW1pemF0aW9ucztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0ltbXV0YWJsZU9wdGltaXphdGlvbnMuanNcbiAqKi8iLCIvKiFcbiAqIG9taXQta2V5IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9vbWl0LWtleT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uIFNjaGxpbmtlcnQsIGNvbnRyaWJ1dG9ycy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKTtcbnZhciBkaWZmZXJlbmNlID0gcmVxdWlyZSgnYXJyYXktZGlmZmVyZW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9taXQob2JqLCBrZXlzKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHZhciBwcm9wcyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG5cbiAga2V5cyA9IEFycmF5LmlzQXJyYXkoa2V5cykgPyBrZXlzIDogW2tleXNdO1xuICB2YXIgZGlmZiA9IGRpZmZlcmVuY2UocHJvcHMsIGtleXMpO1xuICB2YXIgbyA9IHt9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIga2V5ID0gZGlmZltpXTtcblxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgb1trZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9vbWl0LWtleXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gKiBpc29iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXNvYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogaXMgdGhlIHZhbHVlIGFuIG9iamVjdCwgYW5kIG5vdCBhbiBhcnJheT9cbiAqXG4gKiBAcGFyYW0gIHsqfSBgdmFsdWVgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3Qobykge1xuICByZXR1cm4gbyAhPSBudWxsICYmIHR5cGVvZiBvID09PSAnb2JqZWN0J1xuICAgICYmICFBcnJheS5pc0FycmF5KG8pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9vbWl0LWtleXMvfi9pc29iamVjdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oZ2xvYmFsKSB7XG5cblx0dmFyIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCBmdW5jdGlvbihlbGVtKSB7XG5cdFx0dmFyIGlkeCwgbGVuO1xuXG5cdFx0aWYgKHRoaXMgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcImluZGV4T2YgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRcdH1cblxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gdGhpcy5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmICh0aGlzW2lkeF0gPT09IGVsZW0pIHtcblx0XHRcdFx0cmV0dXJuIGlkeDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH07XG5cblx0ZnVuY3Rpb24gZGlmZmVyZW5jZShhLCBiKSB7XG5cdFx0dmFyIGlkeCwgbGVuO1xuXHRcdHZhciByZXMgPSBbXTtcblxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gYS5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmIChpbmRleE9mLmNhbGwoYiwgYVtpZHhdKSA9PT0gLTEpIHtcblx0XHRcdFx0cmVzLnB1c2goYVtpZHhdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChpZHggPSAwLCBsZW4gPSBiLmxlbmd0aDsgaWR4IDwgbGVuOyArK2lkeCkge1xuXHRcdFx0aWYgKGluZGV4T2YuY2FsbChhLCBiW2lkeF0pID09PSAtMSkge1xuXHRcdFx0XHRyZXMucHVzaChiW2lkeF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZGlmZmVyZW5jZTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRnbG9iYWwuZGlmZmVyZW5jZSA9IGRpZmZlcmVuY2U7XG5cdH1cblxufSh0aGlzKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9vbWl0LWtleXMvfi9hcnJheS1kaWZmZXJlbmNlL2RpZmZlcmVuY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==