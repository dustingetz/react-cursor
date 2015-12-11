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
	var rootAt = function rootAt(segments, fn) {
	  return function (value) {
	    return (0, _updateIn.updateIn)(value, segments, fn);
	  };
	};
	exports.rootAt = rootAt;

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
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNDdjODgxN2UyYmQzZDllNDdiZiIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QtY3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy9DdXJzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi91cGRhdGUtaW4vc3JjL3VwZGF0ZS1pbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFkZG9ucy11cGRhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvdXBkYXRlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL09iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlPZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2xpYi9rZXlzLmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoLmlzb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9SZWFjdEFkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlZkN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvSW1tdXRhYmxlT3B0aW1pemF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9+L29taXQta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYXJyYXktZGlmZmVyZW5jZS9kaWZmZXJlbmNlLmpzIl0sIm5hbWVz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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBOztBQUVBLEVBQUMiLCJmaWxlIjoicmVhY3QtY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RDdXJzb3JcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3RDdXJzb3JcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc3RhdGljL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjQ3Yzg4MTdlMmJkM2Q5ZTQ3YmZcbiAqKi8iLCJpbXBvcnQgQ3Vyc29yIGZyb20gJy4vQ3Vyc29yJztcbmltcG9ydCBSZWZDdXJzb3IgZnJvbSAnLi9SZWZDdXJzb3InO1xuaW1wb3J0IEltbXV0YWJsZU9wdGltaXphdGlvbnMgZnJvbSAnLi9JbW11dGFibGVPcHRpbWl6YXRpb25zJztcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEN1cnNvcjogQ3Vyc29yLFxuICBJbW11dGFibGVPcHRpbWl6YXRpb25zOiBJbW11dGFibGVPcHRpbWl6YXRpb25zLFxuICBSZWZDdXJzb3I6IFJlZkN1cnNvclxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QtY3Vyc29yLmpzXG4gKiovIiwiaW1wb3J0IHttZXJnZSwgcHVzaCwgdW5zaGlmdCwgc3BsaWNlfSBmcm9tICd1cGRhdGUtaW4nO1xuaW1wb3J0IHttZW1vaXplZCwgZ2V0SW4sIGhhc2hSZWNvcmQsIHJlZlRvSGFzaCwgZGVlcEZyZWV6ZSwgcm9vdEF0fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHttYWtlU3dhcEZyb21SZWFjdCwgbWFrZVZhbHVlRnJvbVJlYWN0LCBpc1JlYWN0Q21wfSBmcm9tICcuL1JlYWN0QWRhcHRlcic7XG5cblxubGV0IGRlYnVnID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxuXG5sZXQgbWFrZVJlZmluZWRTd2FwID0gbWVtb2l6ZWQoXG4gIChzd2FwRm4sIHBhdGhzKSA9PiByZWZUb0hhc2goc3dhcEZuKSArIGhhc2hSZWNvcmQocGF0aHMpLFxuICAoc3dhcEZuLCBwYXRocykgPT4gKGYpID0+IHN3YXBGbihyb290QXQocGF0aHMsIGYpKSk7XG5cblxuY2xhc3MgQ3Vyc29yIHtcbiAgY29uc3RydWN0b3IgKHZhbHVlLCBzd2FwRm4pIHtcbiAgICB0aGlzLnZhbHVlID0gKCkgPT4gdmFsdWU7XG4gICAgdGhpcy5yZWZpbmUgPSAoLi4ubW9yZVBhdGhzKSA9PiBOZXdDdXJzb3IoZ2V0SW4odmFsdWUsIG1vcmVQYXRocyksIG1ha2VSZWZpbmVkU3dhcChzd2FwRm4sIG1vcmVQYXRocykpO1xuICAgIHRoaXMuc3dhcCA9IChmLCAuLi5hcmdzKSA9PiBzd2FwRm4oKHYpID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpO1xuXG4gICAgdGhpcy5zZXQgPSAodmFsKSA9PiB0aGlzLnN3YXAodiA9PiB2YWwpO1xuICAgIHRoaXMubWVyZ2UgPSAodmFsKSA9PiB0aGlzLnN3YXAobWVyZ2UsIHZhbCk7XG4gICAgdGhpcy5wdXNoID0gKHhzKSA9PiB0aGlzLnN3YXAocHVzaCwgeHMpO1xuICAgIHRoaXMudW5zaGlmdCA9ICh4cykgPT4gdGhpcy5zd2FwKHVuc2hpZnQsIHhzKTtcbiAgICB0aGlzLnNwbGljZSA9ICh4cykgPT4gdGhpcy5zd2FwKHNwbGljZSwgeHMpO1xuXG4gICAgZGVidWcgJiYgZGVlcEZyZWV6ZSh2YWx1ZSk7XG4gIH1cbn1cblxuXG5sZXQgTmV3Q3Vyc29yID0gbWVtb2l6ZWQoXG4gICAgKHZhbHVlLCBzd2FwKSA9PiByZWZUb0hhc2goc3dhcCkgKyBoYXNoUmVjb3JkKHZhbHVlKSxcbiAgICAodmFsdWUsIHN3YXApID0+IG5ldyBDdXJzb3IodmFsdWUsIHN3YXApKTtcblxuXG5DdXJzb3IuYnVpbGQgPSAodmFsdWUsIHN3YXApID0+IGlzUmVhY3RDbXAodmFsdWUpXG4gICAgPyBOZXdDdXJzb3IobWFrZVZhbHVlRnJvbVJlYWN0KHZhbHVlKSwgbWFrZVN3YXBGcm9tUmVhY3QodmFsdWUpKVxuICAgIDogTmV3Q3Vyc29yKHZhbHVlLCBzd2FwKTtcblxuXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9DdXJzb3IuanNcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7ZGVmYXVsdCBhcyBwZXJzaXN0ZW50VXBkYXRlfSBmcm9tICdyZWFjdC1hZGRvbnMtdXBkYXRlJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSAoYSwgYikge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhLCB7JG1lcmdlOiBifSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoIChhcywgYnMpIHtcbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYXMsIHskcHVzaDogYnN9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2hpZnQgKGFzLCBicykge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhcywgeyR1bnNoaWZ0OiBic30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaWNlIChhcywgc3BsaWNlcykge1xuICAvLyBwZXJzaXN0ZW50VXBkYXRlKFsxMiwgMTcsIDE1XSwgeyRzcGxpY2U6IFtbMSwgMSwgMTMsIDE0XV19KSA9PiBbMTIsIDEzLCAxNCwgMTVdXG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGFzLCB7JHNwbGljZTogc3BsaWNlc30pO1xufVxuXG5cbi8qKlxuICogVGhpbiB3cmFwcGVyIG92ZXIgcmVhY3QtYWRkb25zLXVwZGF0ZSB0byBhcHBseSBhIGZ1bmN0aW9uIGF0IHBhdGhcbiAqIHByZXNlcnZpbmcgb3RoZXIgcmVmZXJlbmNlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUluIChyb290VmFsLCBwYXRocywgZiwgLi4uYXJncykge1xuICBsZXQgZmYgPSAodikgPT4gZi5hcHBseShudWxsLCBbdl0uY29uY2F0KGFyZ3MpKTtcblxuICB2YXIgbmV3Um9vdFZhbDtcbiAgaWYgKHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBjb21tYW5kID0gcm9vdEF0KHBhdGhzLCB7JGFwcGx5OiBmZn0pO1xuICAgIG5ld1Jvb3RWYWwgPSBwZXJzaXN0ZW50VXBkYXRlKHJvb3RWYWwsIGNvbW1hbmQpO1xuICB9XG4gIGVsc2UgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgIG5ld1Jvb3RWYWwgPSBmZihyb290VmFsKTtcbiAgfVxuXG4gIC8vIHdvdWxkIGJlIGJldHRlciB0byBkbyB0aGlzIHZhbEVxIGNoZWNrIG9uIGp1c3QgdGhlIGxlYWZcbiAgcmV0dXJuIGlzRXF1YWwocm9vdFZhbCwgbmV3Um9vdFZhbClcbiAgICAgID8gcm9vdFZhbCAvLyBwcmVzZXJ2ZSA9PT0gaWYgc2FtZSB2YWx1ZVxuICAgICAgOiBuZXdSb290VmFsO1xufVxuXG5cblxuLy8gSGVscGVyIG1ldGhvZHMgZm9yIGZvcm1pbmcgcmVhY3QtYWRkb25zLXVwZGF0ZSBjb21tYW5kcy5cblxuLyoqXG4gKiBAcGFyYW0gbGVhZlZhbCBlLmcuIHskYXBwbHk6IGZ9XG4gKiBAcGFyYW0gcGF0aHMgZS5nLiBbJ3gnLCAneScsICd6J11cbiAqIEByZXR1cm5zIGUuZy4ge3g6IHt5OiB7ejogeyRhcHBseTogZn19fVxuICovXG5mdW5jdGlvbiByb290QXQgKHBhdGhzLCBsZWFmVmFsKSB7XG4gIHJldHVybiBwYXRocy5yZWR1Y2VSaWdodCh1bkRlcmVmLCBsZWFmVmFsKVxufVxuXG5cbi8qKlxuICogQHBhcmFtIG9iaiBlLmcgeyRhcHBseTogZn1cbiAqIEBwYXJhbSBrZXkgZS5nLiAnZm9vJ1xuICogQHJldHVybnMgZS5nLiB7Zm9vOiB7JGFwcGx5OiBmfX1cbiAqL1xuZnVuY3Rpb24gdW5EZXJlZihvYmosIGtleSkgeyAvLyBha2EgdW4tZ2V0XG4gIHZhciBuZXh0T2JqID0ge307XG4gIG5leHRPYmpba2V5XSA9IG9iajtcbiAgcmV0dXJuIG5leHRPYmo7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi91cGRhdGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHVwZGF0ZVxuICovXG5cbi8qIGdsb2JhbCBoYXNPd25Qcm9wZXJ0eTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9ICh7fSkuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4geC5jb25jYXQoKTtcbiAgfSBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBhc3NpZ24obmV3IHguY29uc3RydWN0b3IoKSwgeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbn1cblxudmFyIENPTU1BTkRfUFVTSCA9IGtleU9mKHsgJHB1c2g6IG51bGwgfSk7XG52YXIgQ09NTUFORF9VTlNISUZUID0ga2V5T2YoeyAkdW5zaGlmdDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NQTElDRSA9IGtleU9mKHsgJHNwbGljZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NFVCA9IGtleU9mKHsgJHNldDogbnVsbCB9KTtcbnZhciBDT01NQU5EX01FUkdFID0ga2V5T2YoeyAkbWVyZ2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9BUFBMWSA9IGtleU9mKHsgJGFwcGx5OiBudWxsIH0pO1xuXG52YXIgQUxMX0NPTU1BTkRTX0xJU1QgPSBbQ09NTUFORF9QVVNILCBDT01NQU5EX1VOU0hJRlQsIENPTU1BTkRfU1BMSUNFLCBDT01NQU5EX1NFVCwgQ09NTUFORF9NRVJHRSwgQ09NTUFORF9BUFBMWV07XG5cbnZhciBBTExfQ09NTUFORFNfU0VUID0ge307XG5cbkFMTF9DT01NQU5EU19MSVNULmZvckVhY2goZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgQUxMX0NPTU1BTkRTX1NFVFtjb21tYW5kXSA9IHRydWU7XG59KTtcblxuZnVuY3Rpb24gaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBjb21tYW5kKSB7XG4gICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgdGFyZ2V0IG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuJywgY29tbWFuZCwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHNwZWNWYWx1ZSA9IHNwZWNbY29tbWFuZF07XG4gICFBcnJheS5pc0FycmF5KHNwZWNWYWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVyIGluIGFuIGFycmF5PycsIGNvbW1hbmQsIHNwZWNWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodmFsdWUsIHNwZWMpIHtcbiAgISh0eXBlb2Ygc3BlYyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBZb3UgcHJvdmlkZWQgYSBrZXkgcGF0aCB0byB1cGRhdGUoKSB0aGF0IGRpZCBub3QgY29udGFpbiBvbmUgJyArICdvZiAlcy4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSB7JXM6IC4uLn0/JywgQUxMX0NPTU1BTkRTX0xJU1Quam9pbignLCAnKSwgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NFVCkpIHtcbiAgICAhKE9iamVjdC5rZXlzKHNwZWMpLmxlbmd0aCA9PT0gMSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGggJXMnLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHNwZWNbQ09NTUFORF9TRVRdO1xuICB9XG5cbiAgdmFyIG5leHRWYWx1ZSA9IHNoYWxsb3dDb3B5KHZhbHVlKTtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX01FUkdFKSkge1xuICAgIHZhciBtZXJnZU9iaiA9IHNwZWNbQ09NTUFORF9NRVJHRV07XG4gICAgIShtZXJnZU9iaiAmJiB0eXBlb2YgbWVyZ2VPYmogPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHNwZWMgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG1lcmdlT2JqKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIShuZXh0VmFsdWUgJiYgdHlwZW9mIG5leHRWYWx1ZSA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgdGFyZ2V0IG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBuZXh0VmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBhc3NpZ24obmV4dFZhbHVlLCBzcGVjW0NPTU1BTkRfTUVSR0VdKTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfUFVTSCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfUFVTSCk7XG4gICAgc3BlY1tDT01NQU5EX1BVU0hdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9VTlNISUZUKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9VTlNISUZUKTtcbiAgICBzcGVjW0NPTU1BTkRfVU5TSElGVF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnVuc2hpZnQoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NQTElDRSkpIHtcbiAgICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgJXMgdGFyZ2V0IHRvIGJlIGFuIGFycmF5OyBnb3QgJXMnLCBDT01NQU5EX1NQTElDRSwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhQXJyYXkuaXNBcnJheShzcGVjW0NPTU1BTkRfU1BMSUNFXSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgc3BlY1tDT01NQU5EX1NQTElDRV0uZm9yRWFjaChmdW5jdGlvbiAoYXJncykge1xuICAgICAgIUFycmF5LmlzQXJyYXkoYXJncykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICBuZXh0VmFsdWUuc3BsaWNlLmFwcGx5KG5leHRWYWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX0FQUExZKSkge1xuICAgICEodHlwZW9mIHNwZWNbQ09NTUFORF9BUFBMWV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGEgZnVuY3Rpb247IGdvdCAlcy4nLCBDT01NQU5EX0FQUExZLCBzcGVjW0NPTU1BTkRfQVBQTFldKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgbmV4dFZhbHVlID0gc3BlY1tDT01NQU5EX0FQUExZXShuZXh0VmFsdWUpO1xuICB9XG5cbiAgZm9yICh2YXIgayBpbiBzcGVjKSB7XG4gICAgaWYgKCEoQUxMX0NPTU1BTkRTX1NFVC5oYXNPd25Qcm9wZXJ0eShrKSAmJiBBTExfQ09NTUFORFNfU0VUW2tdKSkge1xuICAgICAgbmV4dFZhbHVlW2tdID0gdXBkYXRlKHZhbHVlW2tdLCBzcGVjW2tdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlPZlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIChvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2tleU9mLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ0ludmFyaWFudCBWaW9sYXRpb246ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMuanMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vbGliL2lzX2FyZ3VtZW50cy5qcycpO1xuXG52YXIgZGVlcEVxdWFsID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgIT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cGVjdGVkICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICB2YXIgaSwga2V5O1xuICBpZiAoaXNVbmRlZmluZWRPck51bGwoYSkgfHwgaXNVbmRlZmluZWRPck51bGwoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG4gIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG4gIGlmIChpc0FyZ3VtZW50cyhhKSkge1xuICAgIGlmICghaXNBcmd1bWVudHMoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuICB9XG4gIGlmIChpc0J1ZmZlcihhKSkge1xuICAgIGlmICghaXNCdWZmZXIoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0cnkge1xuICAgIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICAgIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoLmlzb2JqZWN0JztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuaW1wb3J0IHt1cGRhdGVJbn0gZnJvbSAndXBkYXRlLWluJztcblxuXG5leHBvcnQgZnVuY3Rpb24gZmluZChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsaXN0ID0gT2JqZWN0KGFycmF5KTtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgdmFyIHZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW4odHJlZSwgcGF0aHMpIHsgLy8gdGhpcyBpcyBnZXQtaW4gaW4gY2xvanVyZVxuICByZXR1cm4gcmVkdWNlKHBhdGhzLCBnZXQsIHRyZWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG9iaiwga2V5KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KGtleSBpbiBvYmosIGBCYWQgY3Vyc29yIHJlZmluZTogJyR7a2V5fScgbm90IGZvdW5kIGluIGAsIG9iaik7XG4gIHJldHVybiBvYmpba2V5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWwoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnNsaWNlKDAsIGFycmF5Lmxlbmd0aCAtIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGFycmF5LCBmLCBtemVybykge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGYsIG16ZXJvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4obGlzdE9mTGlzdHMpIHtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgbGlzdE9mTGlzdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFpcnMob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgfVxuICByZXR1cm4gcGFpcnM7XG59O1xuXG4vKipcbiAqIEhhc2ggb2YgbnVsbCBpcyBudWxsLCBoYXNoIG9mIHVuZGVmaW5lZCBpcyB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gIHZhciBoYXNoID0gMCwgaSwgY2gsIGw7XG4gIGlmIChzdHIgPT09IHVuZGVmaW5lZCB8fCBzdHIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBoYXNoO1xuICB9XG4gIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaCAgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cbiAgcmV0dXJuIGhhc2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoUmVjb3JkKHJlY29yZCkge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIHRoaW5nIHRvIHVzZSBhcyBhIG1lbW9pemUgcmVzb2x2ZXIgaGFzaCBmb3IgcmVmZXJlbmNlIHR5cGVzLlxuICovXG52YXIgcmVmc0NhY2hlID0ge307IC8vIHsgaWQ6IGNtcCB9XG52YXIgY2FjaGVJZEluZGV4ID0gMDtcbmV4cG9ydCBmdW5jdGlvbiByZWZUb0hhc2ggKGNtcCkge1xuICAvLyBzZWFyY2ggdGhlIGNtcFVuaXF1ZU1hcCBieSByZWZlcmVuY2UgLSBoYXZlIHdlIHNlZW4gaXQgYmVmb3JlP1xuICAvLyBpZiBzbywgdXNlIHRoZSBhc3NpZ25lZCBpZCBhcyB0aGUgaGFzaFxuICAvLyBpZiBub3QsIGFkZCB0byBjYWNoZSBhbmQgaW5jcmVtZW50IGNhY2hlSWRJbmRleCBhcyBhIG5ldyBJRCB0byBoYXNoIG9uXG5cbiAgdmFyIGNtcHNXaXRoVWlkID0gcGFpcnMocmVmc0NhY2hlKTtcbiAgdmFyIGNtcEZvdW5kID0gZmluZChjbXBzV2l0aFVpZCwgZnVuY3Rpb24gKGNtcEFuZElkKSB7IHJldHVybiBjbXBBbmRJZFsxXSA9PT0gY21wOyB9KTtcbiAgaWYgKGNtcEZvdW5kKSB7XG4gICAgcmV0dXJuIGNtcEZvdW5kWzBdOyAvLyByZXR1cm4gdGhlIHVpZFxuICB9XG4gIGVsc2Uge1xuICAgIHZhciB1aWQgPSAoY2FjaGVJZEluZGV4KyspLnRvU3RyaW5nKCk7XG4gICAgcmVmc0NhY2hlW3VpZF0gPSBjbXA7XG4gICAgcmV0dXJuIHVpZDtcbiAgfVxufVxuXG5sZXQgaWRlbnRpdHkgPSB4ID0+IHg7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZW1vaXplZCAoaGFzaGVyID0gaWRlbnRpdHksIGYpIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIC8vIGhhc2hlciBnZXRzIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBmLCB0byBjcmVhdGUgdGhlIGhhc2hLZXlcbiAgICBjb25zdCBoYXNoS2V5ID0gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBoYXNoS2V5KVxuICAgICAgICA/IGNhY2hlW2hhc2hLZXldXG4gICAgICAgIDogKGNhY2hlW2hhc2hLZXldID0gZi5hcHBseSh0aGlzLCBhcmdzKSk7XG4gIH07XG59XG5cblxuLy8gY29weSBmcm9tIE1ETiBleGFtcGxlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvZnJlZXplI0V4YW1wbGVzXG5leHBvcnQgZnVuY3Rpb24gZGVlcEZyZWV6ZShvYmopIHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuZnJlZXplICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgcHJvcGVydHkgbmFtZXMgZGVmaW5lZCBvbiBvYmpcbiAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cbiAgLy8gRnJlZXplIHByb3BlcnRpZXMgYmVmb3JlIGZyZWV6aW5nIHNlbGZcbiAgcHJvcE5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBwcm9wID0gb2JqW25hbWVdO1xuXG4gICAgLy8gRnJlZXplIHByb3AgaWYgaXQgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBwcm9wID09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4ocHJvcCkpIHtcbiAgICAgIGRlZXBGcmVlemUocHJvcCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBGcmVlemUgc2VsZlxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShvYmopO1xufVxuXG5leHBvcnQgY29uc3QgdmFsRXEgPSAoYSwgYikgPT4gaXNFcXVhbChhLCBiKTtcbmV4cG9ydCBjb25zdCByZWZFcSA9IChhLCBiKSA9PiBhID09PSBiO1xuXG5leHBvcnQgbGV0IHJvb3RBdCA9IChzZWdtZW50cywgZm4pID0+ICh2YWx1ZSkgPT4gdXBkYXRlSW4odmFsdWUsIHNlZ21lbnRzLCBmbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC5pc29iamVjdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge21lbW9pemVkLCByZWZUb0hhc2h9IGZyb20gJy4vdXRpbCc7XG5cblxuLy8gVG8gc3VwcG9ydCBiaW5kaW5nIGN1cnNvcnMgdG8gcmVhY3Qgc3RhdGUsIHdlIG5lZWQgY21wLnNldFN0YXRlIGFzIGEgZnVuY3Rpb24sIGFuZCB0aGUgZnVuY3Rpb25cbi8vIG5lZWRzIHRvIGJlID09PSBpZiBpdCBjb21lcyBmcm9tIHRoZSBzYW1lIHJlYWN0IGNvbXBvbmVudC4gU2luY2Vcbi8vIGBjbXAuc2V0U3RhdGUuYmluZChjbXApICE9PSBjbXAuc2V0U3RhdGUuYmluZChjbXApYCxcbi8vIHdlIG5lZWQgdG8gbWVtb2l6ZSBiYXNlZCBvbiB0aGUgY21wIHJlZmVyZW5jZS5cbmV4cG9ydCBsZXQgbWFrZVN3YXBGcm9tUmVhY3QgPSBtZW1vaXplZChyZWZUb0hhc2gsIGNtcCA9PiBjbXAuc2V0U3RhdGUuYmluZChjbXApKTtcbmV4cG9ydCBsZXQgbWFrZURlcmVmRnJvbVJlYWN0ID0gbWVtb2l6ZWQocmVmVG9IYXNoLCBjbXAgPT4gKCkgPT4gY21wLnN0YXRlKTtcbmV4cG9ydCBsZXQgbWFrZVZhbHVlRnJvbVJlYWN0ID0gY21wID0+IGNtcC5zdGF0ZTtcbmV4cG9ydCBsZXQgaXNSZWFjdENtcCA9IChhKSA9PiB0eXBlb2YgYS5fX3Byb3RvX18ucmVuZGVyID09PSBcImZ1bmN0aW9uXCI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9SZWFjdEFkYXB0ZXIuanNcbiAqKi8iLCJpbXBvcnQge21lbW9pemVkLCByZWZUb0hhc2gsIGhhc2hSZWNvcmQsIGdldEluLCByb290QXR9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge21lcmdlLCBwdXNoLCB1bnNoaWZ0LCBzcGxpY2V9IGZyb20gJ3VwZGF0ZS1pbic7XG5pbXBvcnQge21ha2VEZXJlZkZyb21SZWFjdCwgbWFrZVN3YXBGcm9tUmVhY3QsIGlzUmVhY3RDbXB9IGZyb20gJy4vUmVhY3RBZGFwdGVyJztcblxuXG5sZXQgbWFrZVJlZmluZWRTd2FwID0gbWVtb2l6ZWQoXG4gIChzd2FwRm4sIHBhdGhzKSA9PiByZWZUb0hhc2goc3dhcEZuKSArIGhhc2hSZWNvcmQocGF0aHMpLFxuICAoc3dhcEZuLCBwYXRocykgPT4gKGYpID0+IHN3YXBGbihyb290QXQocGF0aHMsIGYpKSk7XG5cblxubGV0IG1ha2VSZWZpbmVkRGVyZWYgPSBtZW1vaXplZChcbiAgKGRlcmVmLCBwYXRocykgPT4gcmVmVG9IYXNoKGRlcmVmKSArIGhhc2hSZWNvcmQocGF0aHMpLFxuICAoZGVyZWYsIHBhdGhzKSA9PiAoKSA9PiBnZXRJbihkZXJlZigpLCBwYXRocykpO1xuXG5cbmNsYXNzIFJlZkN1cnNvciB7XG4gIGNvbnN0cnVjdG9yIChkZXJlZiwgc3dhcEZuKSB7XG4gICAgdGhpcy52YWx1ZSA9IGRlcmVmO1xuICAgIHRoaXMucmVmaW5lID0gKC4uLm1vcmVQYXRocykgPT4gTmV3UmVmQ3Vyc29yKG1ha2VSZWZpbmVkRGVyZWYoZGVyZWYsIG1vcmVQYXRocyksIG1ha2VSZWZpbmVkU3dhcChzd2FwRm4sIG1vcmVQYXRocykpO1xuICAgIHRoaXMuc3dhcCA9IChmLCAuLi5hcmdzKSA9PiBzd2FwRm4oKHYpID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpO1xuXG4gICAgdGhpcy5zZXQgPSAodmFsKSA9PiB0aGlzLnN3YXAodiA9PiB2YWwpO1xuICAgIHRoaXMubWVyZ2UgPSAodmFsKSA9PiB0aGlzLnN3YXAobWVyZ2UsIHZhbCk7XG4gICAgdGhpcy5wdXNoID0gKHhzKSA9PiB0aGlzLnN3YXAocHVzaCwgeHMpO1xuICAgIHRoaXMudW5zaGlmdCA9ICh4cykgPT4gdGhpcy5zd2FwKHVuc2hpZnQsIHhzKTtcbiAgICB0aGlzLnNwbGljZSA9ICh4cykgPT4gdGhpcy5zd2FwKHNwbGljZSwgeHMpO1xuXG4gICAgLy8gUmVmQ3Vyc29ycyBkb24ndCBvd24gYSB2YWx1ZSwgc28gdGhleSBhcmVuJ3QgcmVzcG9uc2libGUgZm9yIGZyZWV6aW5nIGl0LlxuICB9XG59XG5cblxubGV0IE5ld1JlZkN1cnNvciA9IG1lbW9pemVkKFxuICAgIChkZXJlZiwgc3dhcCkgPT4gcmVmVG9IYXNoKGRlcmVmKSArIHJlZlRvSGFzaChzd2FwKSxcbiAgICAoZGVyZWYsIHN3YXApID0+IG5ldyBSZWZDdXJzb3IoZGVyZWYsIHN3YXApKTtcblxuXG5SZWZDdXJzb3IuYnVpbGQgPSAoZGVyZWYsIHN3YXApID0+IGlzUmVhY3RDbXAoZGVyZWYpXG4gICAgPyBOZXdSZWZDdXJzb3IobWFrZURlcmVmRnJvbVJlYWN0KGRlcmVmKSwgbWFrZVN3YXBGcm9tUmVhY3QoZGVyZWYpKVxuICAgIDogTmV3UmVmQ3Vyc29yKGRlcmVmLCBzd2FwKTtcblxuXG5leHBvcnQgZGVmYXVsdCBSZWZDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9SZWZDdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQgb21pdCBmcm9tICdvbWl0LWtleXMnO1xuaW1wb3J0IHt2YWxFcSwgcmVmRXF9IGZyb20gJy4vdXRpbCc7XG5cblxuZnVuY3Rpb24gSW1tdXRhYmxlT3B0aW1pemF0aW9ucyAocmVmRmllbGRzLCBpZ25vcmVkRmllbGRzLypvcHRpb25hbCovKSB7XG4gIHZhciBub1ZhbHVlQ2hlY2tGaWVsZHMgPSByZWZGaWVsZHMuY29uY2F0KGlnbm9yZWRGaWVsZHMgfHwgW10pO1xuICByZXR1cm4ge1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuXG4gICAgICB2YXIgdmFsdWVzQ2hhbmdlZCA9ICF2YWxFcShcbiAgICAgICAgb21pdChuZXh0UHJvcHMsIG5vVmFsdWVDaGVja0ZpZWxkcyksXG4gICAgICAgIG9taXQodGhpcy5wcm9wcywgbm9WYWx1ZUNoZWNrRmllbGRzKSk7XG5cbiAgICAgIHZhciByZWZzQ2hhbmdlZCA9ICFyZWZGaWVsZHMuZXZlcnkoKGZpZWxkKSA9PiB7XG4gICAgICAgIHJldHVybiByZWZFcSh0aGlzLnByb3BzW2ZpZWxkXSwgbmV4dFByb3BzW2ZpZWxkXSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHZhbHVlc0NoYW5nZWQgfHwgcmVmc0NoYW5nZWQ7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBJbW11dGFibGVPcHRpbWl6YXRpb25zO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvSW1tdXRhYmxlT3B0aW1pemF0aW9ucy5qc1xuICoqLyIsIi8qIVxuICogb21pdC1rZXkgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L29taXQta2V5PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb24gU2NobGlua2VydCwgY29udHJpYnV0b3JzLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdpc29iamVjdCcpO1xudmFyIGRpZmZlcmVuY2UgPSByZXF1aXJlKCdhcnJheS1kaWZmZXJlbmNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb21pdChvYmosIGtleXMpIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgdmFyIHByb3BzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgdmFyIGxlbiA9IHByb3BzLmxlbmd0aDtcblxuICBrZXlzID0gQXJyYXkuaXNBcnJheShrZXlzKSA/IGtleXMgOiBba2V5c107XG4gIHZhciBkaWZmID0gZGlmZmVyZW5jZShwcm9wcywga2V5cyk7XG4gIHZhciBvID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBrZXkgPSBkaWZmW2ldO1xuXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBvW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG87XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L29taXQta2V5cy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiFcbiAqIGlzb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pc29iamVjdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSm9uIFNjaGxpbmtlcnQsIGNvbnRyaWJ1dG9ycy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBpcyB0aGUgdmFsdWUgYW4gb2JqZWN0LCBhbmQgbm90IGFuIGFycmF5P1xuICpcbiAqIEBwYXJhbSAgeyp9IGB2YWx1ZWBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc09iamVjdChvKSB7XG4gIHJldHVybiBvICE9IG51bGwgJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnXG4gICAgJiYgIUFycmF5LmlzQXJyYXkobyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lzb2JqZWN0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbihnbG9iYWwpIHtcblxuXHR2YXIgaW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IGZ1bmN0aW9uKGVsZW0pIHtcblx0XHR2YXIgaWR4LCBsZW47XG5cblx0XHRpZiAodGhpcyA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiaW5kZXhPZiBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdFx0fVxuXG5cdFx0Zm9yIChpZHggPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaWR4IDwgbGVuOyArK2lkeCkge1xuXHRcdFx0aWYgKHRoaXNbaWR4XSA9PT0gZWxlbSkge1xuXHRcdFx0XHRyZXR1cm4gaWR4O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAtMTtcblx0fTtcblxuXHRmdW5jdGlvbiBkaWZmZXJlbmNlKGEsIGIpIHtcblx0XHR2YXIgaWR4LCBsZW47XG5cdFx0dmFyIHJlcyA9IFtdO1xuXG5cdFx0Zm9yIChpZHggPSAwLCBsZW4gPSBhLmxlbmd0aDsgaWR4IDwgbGVuOyArK2lkeCkge1xuXHRcdFx0aWYgKGluZGV4T2YuY2FsbChiLCBhW2lkeF0pID09PSAtMSkge1xuXHRcdFx0XHRyZXMucHVzaChhW2lkeF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGIubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGEsIGJbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGJbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXM7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBkaWZmZXJlbmNlO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGdsb2JhbC5kaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcblx0fVxuXG59KHRoaXMpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FycmF5LWRpZmZlcmVuY2UvZGlmZmVyZW5jZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9