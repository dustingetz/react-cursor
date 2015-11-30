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
	
	    return internalBuild(rootValue, rootSwap, paths.concat(morePaths), (0, _util.getRefAtPath)(_this.value(), morePaths));
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
	
	  if (Cursor.debug && typeof Object.freeze === 'function') {
	    (0, _util.deepFreeze)(this);
	    (0, _util.deepFreeze)(leafValue);
	  }
	}
	
	// If we build two cursors for the same path on the same React component,
	// and those React components have equal state, reuse the same cursor instance,
	// so we can use === to compare them.
	;
	
	var cursorBuildMemoizer = (0, _util.memoizeFactory)(function (rootValue, rootSwap, path, leafValue) {
	  path = path === undefined ? [] : path;
	  leafValue = leafValue || (0, _util.getRefAtPath)(rootValue, path);
	  // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
	  // this.props and nextProps have different subtree values, and refining memoizer must account for that
	  return (0, _util.refToHash)(rootSwap) + (0, _util.hashRecord)(leafValue) + (0, _util.hashRecord)(path);
	});
	
	var internalBuild = cursorBuildMemoizer(function (rootValue, rootSwap, path, leafValue) {
	  path = path === undefined ? [] : path;
	  leafValue = leafValue || (0, _util.getRefAtPath)(rootValue, path);
	  return new Cursor(rootValue, rootSwap, path, leafValue);
	});
	
	// To support binding cursors to react state, we need cmp.setState as a function, and the function
	// needs to be === if it comes from the same react component. Otherwise, this test fails:
	// "Cursors to the same component are ===". Since `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
	// we need to memoize based on the cmp reference.
	var reactCmpMemoizer = (0, _util.memoizeFactory)(function (cmp) {
	  return (0, _util.refToHash)(cmp);
	});
	var memoizedReactStateSwapper = reactCmpMemoizer(function (cmp) {
	  return cmp.setState.bind(cmp);
	});
	
	function build(rootValue, rootSwap) {
	  var isReactCmp = typeof rootValue.__proto__.render === "function";
	  if (isReactCmp) {
	    var cmp = rootValue;
	    return internalBuild(cmp.state, memoizedReactStateSwapper(cmp));
	  }
	  return internalBuild(rootValue, rootSwap);
	}
	
	Cursor.build = build;
	
	Cursor.debug = process.env.NODE_ENV !== 'production';
	
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
	exports.getRefAtPath = getRefAtPath;
	exports.deref = deref;
	exports.initial = initial;
	exports.last = last;
	exports.reduce = reduce;
	exports.flatten = flatten;
	exports.pairs = pairs;
	exports.hashString = hashString;
	exports.hashRecord = hashRecord;
	exports.refToHash = refToHash;
	exports.memoizeFactory = memoizeFactory;
	exports.deepFreeze = deepFreeze;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodashIsobject = __webpack_require__(13);
	
	var _lodashIsobject2 = _interopRequireDefault(_lodashIsobject);
	
	var _deepEqual = __webpack_require__(9);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var clone = function clone(xs) {
	  return xs.slice(0);
	};
	
	exports.clone = clone;
	function butLast(xs) {
	  var xxs = clone(xs);
	  xxs.pop();
	  return xxs;
	}
	
	var apply = function apply(f) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  // last arg can be a seq of more args
	  args = [].concat(butLast(args), last(args));
	  return f.apply(null, args);
	};
	
	exports.apply = apply;
	
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
	  // this is get-in in clojure
	  return reduce(paths, deref, tree);
	}
	
	function deref(obj, key) {
	  // aka get in clojure
	  console.assert(key in obj, '');
	  return obj[key];
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
	
	// copy from MDN example: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#Examples
	
	function deepFreeze(obj) {
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

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _util = __webpack_require__(12);
	
	var _updateIn = __webpack_require__(3);
	
	var RefCursor = function RefCursor(rootDeref, rootSwap, paths) {
	  var _this = this;
	
	  _classCallCheck(this, RefCursor);
	
	  this.value = function () {
	    return (0, _util.getRefAtPath)(rootDeref(), paths);
	  };
	  this.refine = function () {
	    for (var _len = arguments.length, morePaths = Array(_len), _key = 0; _key < _len; _key++) {
	      morePaths[_key] = arguments[_key];
	    }
	
	    return build(rootDeref, rootSwap, paths.concat(morePaths));
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
	}
	
	/**
	 * RefCursors have no memoization as they do not expose any notion of value equality.
	 */
	;
	
	function build(rootDeref, rootSwap, path) {
	  path = path === undefined ? [] : path;
	  return new RefCursor(rootDeref, rootSwap, path);
	}
	
	RefCursor.build = build;
	
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
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGNhZGMyZGJhZTdkMWFjNDVkYzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC5pc29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVmQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzIiwid2VicGFjazovLy8uL34vb21pdC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaXNvYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9hcnJheS1kaWZmZXJlbmNlL2RpZmZlcmVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7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OztBQ25CQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsV0FBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixXQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUEsRUFBQyIsImZpbGUiOiJyZWFjdC1jdXJzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc3RhdGljL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOGNhZGMyZGJhZTdkMWFjNDVkYzhcbiAqKi8iLCJpbXBvcnQgQ3Vyc29yIGZyb20gJy4vQ3Vyc29yJztcbmltcG9ydCBSZWZDdXJzb3IgZnJvbSAnLi9SZWZDdXJzb3InO1xuaW1wb3J0IEltbXV0YWJsZU9wdGltaXphdGlvbnMgZnJvbSAnLi9JbW11dGFibGVPcHRpbWl6YXRpb25zJztcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEN1cnNvcjogQ3Vyc29yLFxuICBJbW11dGFibGVPcHRpbWl6YXRpb25zOiBJbW11dGFibGVPcHRpbWl6YXRpb25zLFxuICBSZWZDdXJzb3I6IFJlZkN1cnNvclxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QtY3Vyc29yLmpzXG4gKiovIiwiaW1wb3J0IHt1cGRhdGVJbiwgbWVyZ2UsIHB1c2gsIHVuc2hpZnQsIHNwbGljZX0gZnJvbSAndXBkYXRlLWluJztcbmltcG9ydCB7bWVtb2l6ZUZhY3RvcnksIGdldFJlZkF0UGF0aCwgaGFzaFJlY29yZCwgcmVmVG9IYXNoLCBmbGF0dGVuLCBkZWVwRnJlZXplfSBmcm9tICcuL3V0aWwnO1xuXG5cbmNsYXNzIEN1cnNvciB7XG4gIGNvbnN0cnVjdG9yIChyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRocywgbGVhZlZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9ICgpID0+IGxlYWZWYWx1ZTtcbiAgICB0aGlzLnJlZmluZSA9ICguLi5tb3JlUGF0aHMpID0+IGludGVybmFsQnVpbGQocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aHMuY29uY2F0KG1vcmVQYXRocyksIGdldFJlZkF0UGF0aCh0aGlzLnZhbHVlKCksIG1vcmVQYXRocykpO1xuICAgIHRoaXMuc3dhcCA9IChmLCAuLi5hcmdzKSA9PiByb290U3dhcChyb290VmFsdWUgPT4gdXBkYXRlSW4ocm9vdFZhbHVlLCBwYXRocywgdiA9PiBmLmFwcGx5KG51bGwsIFt2XS5jb25jYXQoYXJncykpKSk7XG5cbiAgICB0aGlzLnNldCA9ICh2YWwpID0+IHRoaXMuc3dhcCh2ID0+IHZhbCk7XG4gICAgdGhpcy5tZXJnZSA9ICh2YWwpID0+IHRoaXMuc3dhcChtZXJnZSwgdmFsKTtcbiAgICB0aGlzLnB1c2ggPSAoeHMpID0+IHRoaXMuc3dhcChwdXNoLCB4cyk7XG4gICAgdGhpcy51bnNoaWZ0ID0gKHhzKSA9PiB0aGlzLnN3YXAodW5zaGlmdCwgeHMpO1xuICAgIHRoaXMuc3BsaWNlID0gKHhzKSA9PiB0aGlzLnN3YXAoc3BsaWNlLCB4cyk7XG5cbiAgICBpZiAoQ3Vyc29yLmRlYnVnICYmIHR5cGVvZiBPYmplY3QuZnJlZXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZWVwRnJlZXplKHRoaXMpO1xuICAgICAgZGVlcEZyZWV6ZShsZWFmVmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIElmIHdlIGJ1aWxkIHR3byBjdXJzb3JzIGZvciB0aGUgc2FtZSBwYXRoIG9uIHRoZSBzYW1lIFJlYWN0IGNvbXBvbmVudCxcbi8vIGFuZCB0aG9zZSBSZWFjdCBjb21wb25lbnRzIGhhdmUgZXF1YWwgc3RhdGUsIHJldXNlIHRoZSBzYW1lIGN1cnNvciBpbnN0YW5jZSxcbi8vIHNvIHdlIGNhbiB1c2UgPT09IHRvIGNvbXBhcmUgdGhlbS5cbnZhciBjdXJzb3JCdWlsZE1lbW9pemVyID0gbWVtb2l6ZUZhY3RvcnkoKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkgPT4ge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICBsZWFmVmFsdWUgPSBsZWFmVmFsdWUgfHwgZ2V0UmVmQXRQYXRoKHJvb3RWYWx1ZSwgcGF0aCk7XG4gIC8vIFdoZW4gcmVmaW5pbmcgaW5zaWRlIGEgbGlmZWN5Y2xlIG1ldGhvZCwgc2FtZSBjbXAoc3dhcHBlcikgYW5kIHNhbWUgcGF0aCBpc24ndCBlbm91Z2guXG4gIC8vIHRoaXMucHJvcHMgYW5kIG5leHRQcm9wcyBoYXZlIGRpZmZlcmVudCBzdWJ0cmVlIHZhbHVlcywgYW5kIHJlZmluaW5nIG1lbW9pemVyIG11c3QgYWNjb3VudCBmb3IgdGhhdFxuICByZXR1cm4gcmVmVG9IYXNoKHJvb3RTd2FwKSArIGhhc2hSZWNvcmQobGVhZlZhbHVlKSArIGhhc2hSZWNvcmQocGF0aCk7XG59KTtcblxudmFyIGludGVybmFsQnVpbGQgPSBjdXJzb3JCdWlsZE1lbW9pemVyKChyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRoLCBsZWFmVmFsdWUpID0+IHtcbiAgcGF0aCA9IHBhdGggPT09IHVuZGVmaW5lZCA/IFtdIDogcGF0aDtcbiAgbGVhZlZhbHVlID0gbGVhZlZhbHVlIHx8IGdldFJlZkF0UGF0aChyb290VmFsdWUsIHBhdGgpO1xuICByZXR1cm4gbmV3IEN1cnNvcihyb290VmFsdWUsIHJvb3RTd2FwLCBwYXRoLCBsZWFmVmFsdWUpO1xufSk7XG5cblxuLy8gVG8gc3VwcG9ydCBiaW5kaW5nIGN1cnNvcnMgdG8gcmVhY3Qgc3RhdGUsIHdlIG5lZWQgY21wLnNldFN0YXRlIGFzIGEgZnVuY3Rpb24sIGFuZCB0aGUgZnVuY3Rpb25cbi8vIG5lZWRzIHRvIGJlID09PSBpZiBpdCBjb21lcyBmcm9tIHRoZSBzYW1lIHJlYWN0IGNvbXBvbmVudC4gT3RoZXJ3aXNlLCB0aGlzIHRlc3QgZmFpbHM6XG4vLyBcIkN1cnNvcnMgdG8gdGhlIHNhbWUgY29tcG9uZW50IGFyZSA9PT1cIi4gU2luY2UgYGNtcC5zZXRTdGF0ZS5iaW5kKGNtcCkgIT09IGNtcC5zZXRTdGF0ZS5iaW5kKGNtcClgLFxuLy8gd2UgbmVlZCB0byBtZW1vaXplIGJhc2VkIG9uIHRoZSBjbXAgcmVmZXJlbmNlLlxudmFyIHJlYWN0Q21wTWVtb2l6ZXIgPSBtZW1vaXplRmFjdG9yeSgoY21wKSA9PiByZWZUb0hhc2goY21wKSk7XG52YXIgbWVtb2l6ZWRSZWFjdFN0YXRlU3dhcHBlciA9IHJlYWN0Q21wTWVtb2l6ZXIoKGNtcCkgPT4gY21wLnNldFN0YXRlLmJpbmQoY21wKSk7XG5cbmZ1bmN0aW9uIGJ1aWxkIChyb290VmFsdWUsIHJvb3RTd2FwKSB7XG4gIHZhciBpc1JlYWN0Q21wID0gdHlwZW9mIHJvb3RWYWx1ZS5fX3Byb3RvX18ucmVuZGVyID09PSBcImZ1bmN0aW9uXCI7XG4gIGlmIChpc1JlYWN0Q21wKSB7XG4gICAgdmFyIGNtcCA9IHJvb3RWYWx1ZTtcbiAgICByZXR1cm4gaW50ZXJuYWxCdWlsZChjbXAuc3RhdGUsIG1lbW9pemVkUmVhY3RTdGF0ZVN3YXBwZXIoY21wKSk7XG4gIH1cbiAgcmV0dXJuIGludGVybmFsQnVpbGQocm9vdFZhbHVlLCByb290U3dhcCk7XG59XG5cblxuQ3Vyc29yLmJ1aWxkID0gYnVpbGQ7XG5cbkN1cnNvci5kZWJ1ZyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IEN1cnNvcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0N1cnNvci5qc1xuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtkZWZhdWx0IGFzIHBlcnNpc3RlbnRVcGRhdGV9IGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnZGVlcC1lcXVhbCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlIChhLCBiKSB7XG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGEsIHskbWVyZ2U6IGJ9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2ggKGFzLCBicykge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhcywgeyRwdXNoOiBic30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zaGlmdCAoYXMsIGJzKSB7XG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGFzLCB7JHVuc2hpZnQ6IGJzfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpY2UgKGFzLCBzcGxpY2VzKSB7XG4gIC8vIHBlcnNpc3RlbnRVcGRhdGUoWzEyLCAxNywgMTVdLCB7JHNwbGljZTogW1sxLCAxLCAxMywgMTRdXX0pID0+IFsxMiwgMTMsIDE0LCAxNV1cbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYXMsIHskc3BsaWNlOiBzcGxpY2VzfSk7XG59XG5cblxuLyoqXG4gKiBUaGluIHdyYXBwZXIgb3ZlciByZWFjdC1hZGRvbnMtdXBkYXRlIHRvIGFwcGx5IGEgZnVuY3Rpb24gYXQgcGF0aFxuICogcHJlc2VydmluZyBvdGhlciByZWZlcmVuY2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlSW4gKHJvb3RWYWwsIHBhdGhzLCBmLCAuLi5hcmdzKSB7XG4gIGxldCBmZiA9ICh2KSA9PiBmLmFwcGx5KG51bGwsIFt2XS5jb25jYXQoYXJncykpO1xuXG4gIHZhciBuZXdSb290VmFsO1xuICBpZiAocGF0aHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGNvbW1hbmQgPSByb290QXQocGF0aHMsIHskYXBwbHk6IGZmfSk7XG4gICAgbmV3Um9vdFZhbCA9IHBlcnNpc3RlbnRVcGRhdGUocm9vdFZhbCwgY29tbWFuZCk7XG4gIH1cbiAgZWxzZSBpZiAocGF0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgbmV3Um9vdFZhbCA9IGZmKHJvb3RWYWwpO1xuICB9XG5cbiAgLy8gd291bGQgYmUgYmV0dGVyIHRvIGRvIHRoaXMgdmFsRXEgY2hlY2sgb24ganVzdCB0aGUgbGVhZlxuICByZXR1cm4gaXNFcXVhbChyb290VmFsLCBuZXdSb290VmFsKVxuICAgICAgPyByb290VmFsIC8vIHByZXNlcnZlID09PSBpZiBzYW1lIHZhbHVlXG4gICAgICA6IG5ld1Jvb3RWYWw7XG59XG5cblxuXG4vLyBIZWxwZXIgbWV0aG9kcyBmb3IgZm9ybWluZyByZWFjdC1hZGRvbnMtdXBkYXRlIGNvbW1hbmRzLlxuXG4vKipcbiAqIEBwYXJhbSBsZWFmVmFsIGUuZy4geyRhcHBseTogZn1cbiAqIEBwYXJhbSBwYXRocyBlLmcuIFsneCcsICd5JywgJ3onXVxuICogQHJldHVybnMgZS5nLiB7eDoge3k6IHt6OiB7JGFwcGx5OiBmfX19XG4gKi9cbmZ1bmN0aW9uIHJvb3RBdCAocGF0aHMsIGxlYWZWYWwpIHtcbiAgcmV0dXJuIHBhdGhzLnJlZHVjZVJpZ2h0KHVuRGVyZWYsIGxlYWZWYWwpXG59XG5cblxuLyoqXG4gKiBAcGFyYW0gb2JqIGUuZyB7JGFwcGx5OiBmfVxuICogQHBhcmFtIGtleSBlLmcuICdmb28nXG4gKiBAcmV0dXJucyBlLmcuIHtmb286IHskYXBwbHk6IGZ9fVxuICovXG5mdW5jdGlvbiB1bkRlcmVmKG9iaiwga2V5KSB7IC8vIGFrYSB1bi1nZXRcbiAgdmFyIG5leHRPYmogPSB7fTtcbiAgbmV4dE9ialtrZXldID0gb2JqO1xuICByZXR1cm4gbmV4dE9iajtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi91cGRhdGUtaW4vc3JjL3VwZGF0ZS1pbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL3VwZGF0ZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFkZG9ucy11cGRhdGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdXBkYXRlXG4gKi9cblxuLyogZ2xvYmFsIGhhc093blByb3BlcnR5OnRydWUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9PYmplY3QuYXNzaWduJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGhhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gc2hhbGxvd0NvcHkoeCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh4KSkge1xuICAgIHJldHVybiB4LmNvbmNhdCgpO1xuICB9IGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFzc2lnbihuZXcgeC5jb25zdHJ1Y3RvcigpLCB4KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geDtcbiAgfVxufVxuXG52YXIgQ09NTUFORF9QVVNIID0ga2V5T2YoeyAkcHVzaDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1VOU0hJRlQgPSBrZXlPZih7ICR1bnNoaWZ0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfU1BMSUNFID0ga2V5T2YoeyAkc3BsaWNlOiBudWxsIH0pO1xudmFyIENPTU1BTkRfU0VUID0ga2V5T2YoeyAkc2V0OiBudWxsIH0pO1xudmFyIENPTU1BTkRfTUVSR0UgPSBrZXlPZih7ICRtZXJnZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX0FQUExZID0ga2V5T2YoeyAkYXBwbHk6IG51bGwgfSk7XG5cbnZhciBBTExfQ09NTUFORFNfTElTVCA9IFtDT01NQU5EX1BVU0gsIENPTU1BTkRfVU5TSElGVCwgQ09NTUFORF9TUExJQ0UsIENPTU1BTkRfU0VULCBDT01NQU5EX01FUkdFLCBDT01NQU5EX0FQUExZXTtcblxudmFyIEFMTF9DT01NQU5EU19TRVQgPSB7fTtcblxuQUxMX0NPTU1BTkRTX0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoY29tbWFuZCkge1xuICBBTExfQ09NTUFORFNfU0VUW2NvbW1hbmRdID0gdHJ1ZTtcbn0pO1xuXG5mdW5jdGlvbiBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIGNvbW1hbmQpIHtcbiAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICB2YXIgc3BlY1ZhbHVlID0gc3BlY1tjb21tYW5kXTtcbiAgIUFycmF5LmlzQXJyYXkoc3BlY1ZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheTsgZ290ICVzLiAnICsgJ0RpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IFlvdSBwcm92aWRlZCBhIGtleSBwYXRoIHRvIHVwZGF0ZSgpIHRoYXQgZGlkIG5vdCBjb250YWluIG9uZSAnICsgJ29mICVzLiBEaWQgeW91IGZvcmdldCB0byBpbmNsdWRlIHslczogLi4ufT8nLCBBTExfQ09NTUFORFNfTElTVC5qb2luKCcsICcpLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW5ub3QgaGF2ZSBtb3JlIHRoYW4gb25lIGtleSBpbiBhbiBvYmplY3Qgd2l0aCAlcycsIENPTU1BTkRfU0VUKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gc3BlY1tDT01NQU5EX1NFVF07XG4gIH1cblxuICB2YXIgbmV4dFZhbHVlID0gc2hhbGxvd0NvcHkodmFsdWUpO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfTUVSR0UpKSB7XG4gICAgdmFyIG1lcmdlT2JqID0gc3BlY1tDT01NQU5EX01FUkdFXTtcbiAgICAhKG1lcmdlT2JqICYmIHR5cGVvZiBtZXJnZU9iaiA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhKG5leHRWYWx1ZSAmJiB0eXBlb2YgbmV4dFZhbHVlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6ICVzIGV4cGVjdHMgYSB0YXJnZXQgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG5leHRWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGFzc2lnbihuZXh0VmFsdWUsIHNwZWNbQ09NTUFORF9NRVJHRV0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9QVVNIKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9QVVNIKTtcbiAgICBzcGVjW0NPTU1BTkRfUFVTSF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1VOU0hJRlQpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1VOU0hJRlQpO1xuICAgIHNwZWNbQ09NTUFORF9VTlNISUZUXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUudW5zaGlmdChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU1BMSUNFKSkge1xuICAgICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICFBcnJheS5pc0FycmF5KHNwZWNbQ09NTUFORF9TUExJQ0VdKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVycyBpbiBhbiBhcnJheT8nLCBDT01NQU5EX1NQTElDRSwgc3BlY1tDT01NQU5EX1NQTElDRV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIG5leHRWYWx1ZS5zcGxpY2UuYXBwbHkobmV4dFZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfQVBQTFkpKSB7XG4gICAgISh0eXBlb2Ygc3BlY1tDT01NQU5EX0FQUExZXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYSBmdW5jdGlvbjsgZ290ICVzLicsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBuZXh0VmFsdWUgPSBzcGVjW0NPTU1BTkRfQVBQTFldKG5leHRWYWx1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrIGluIHNwZWMpIHtcbiAgICBpZiAoIShBTExfQ09NTUFORFNfU0VULmhhc093blByb3BlcnR5KGspICYmIEFMTF9DT01NQU5EU19TRVRba10pKSB7XG4gICAgICBuZXh0VmFsdWVba10gPSB1cGRhdGUodmFsdWVba10sIHNwZWNba10pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi91cGRhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU9mXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIva2V5T2YuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignSW52YXJpYW50IFZpb2xhdGlvbjogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAodHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbidcbiAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cbmV4cG9ydHMuc2hpbSA9IHNoaW07XG5mdW5jdGlvbiBzaGltIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGVlcC1lcXVhbC9saWIva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2guaXNvYmplY3QnO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnZGVlcC1lcXVhbCc7XG5cblxuZXhwb3J0IGxldCBjbG9uZSA9ICh4cykgPT4geHMuc2xpY2UoMCk7XG5cbmZ1bmN0aW9uIGJ1dExhc3QgKHhzKSB7XG4gIGxldCB4eHMgPSBjbG9uZSh4cyk7XG4gIHh4cy5wb3AoKTtcbiAgcmV0dXJuIHh4cztcbn1cblxuZXhwb3J0IGxldCBhcHBseSA9IChmLCAuLi5hcmdzKSA9PiB7XG4gIC8vIGxhc3QgYXJnIGNhbiBiZSBhIHNlcSBvZiBtb3JlIGFyZ3NcbiAgYXJncyA9IFtdLmNvbmNhdChidXRMYXN0KGFyZ3MpLCBsYXN0KGFyZ3MpKTtcbiAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXJncyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHZhciBsaXN0ID0gT2JqZWN0KGFycmF5KTtcbiAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgdmFyIHZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVmQXRQYXRoKHRyZWUsIHBhdGhzKSB7IC8vIHRoaXMgaXMgZ2V0LWluIGluIGNsb2p1cmVcbiAgcmV0dXJuIHJlZHVjZShwYXRocywgZGVyZWYsIHRyZWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVyZWYob2JqLCBrZXkpIHsgLy8gYWthIGdldCBpbiBjbG9qdXJlXG4gIGNvbnNvbGUuYXNzZXJ0KGtleSBpbiBvYmosICcnKTtcbiAgcmV0dXJuIG9ialtrZXldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbChhcnJheSkge1xuICByZXR1cm4gYXJyYXkuc2xpY2UoMCwgYXJyYXkubGVuZ3RoIC0gMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShhcnJheSwgZiwgbXplcm8pIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZShmLCBtemVybyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGxpc3RPZkxpc3RzKSB7XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGxpc3RPZkxpc3RzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhaXJzKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufTtcblxuLyoqXG4gKiBIYXNoIG9mIG51bGwgaXMgbnVsbCwgaGFzaCBvZiB1bmRlZmluZWQgaXMgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoU3RyaW5nKHN0cikge1xuICB2YXIgaGFzaCA9IDAsIGksIGNoLCBsO1xuICBpZiAoc3RyID09PSB1bmRlZmluZWQgfHwgc3RyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICB9XG4gIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgfVxuICBmb3IgKGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2ggID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2g7XG4gICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG4gIHJldHVybiBoYXNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaFJlY29yZChyZWNvcmQpIHtcbiAgICByZXR1cm4gaGFzaFN0cmluZyhKU09OLnN0cmluZ2lmeShyZWNvcmQpKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHVuaXF1ZSB0aGluZyB0byB1c2UgYXMgYSBtZW1vaXplIHJlc29sdmVyIGhhc2ggZm9yIHJlZmVyZW5jZSB0eXBlcy5cbiAqL1xudmFyIHJlZnNDYWNoZSA9IHt9OyAvLyB7IGlkOiBjbXAgfVxudmFyIGNhY2hlSWRJbmRleCA9IDA7XG5leHBvcnQgZnVuY3Rpb24gcmVmVG9IYXNoIChjbXApIHtcbiAgLy8gc2VhcmNoIHRoZSBjbXBVbmlxdWVNYXAgYnkgcmVmZXJlbmNlIC0gaGF2ZSB3ZSBzZWVuIGl0IGJlZm9yZT9cbiAgLy8gaWYgc28sIHVzZSB0aGUgYXNzaWduZWQgaWQgYXMgdGhlIGhhc2hcbiAgLy8gaWYgbm90LCBhZGQgdG8gY2FjaGUgYW5kIGluY3JlbWVudCBjYWNoZUlkSW5kZXggYXMgYSBuZXcgSUQgdG8gaGFzaCBvblxuXG4gIHZhciBjbXBzV2l0aFVpZCA9IHBhaXJzKHJlZnNDYWNoZSk7XG4gIHZhciBjbXBGb3VuZCA9IGZpbmQoY21wc1dpdGhVaWQsIGZ1bmN0aW9uIChjbXBBbmRJZCkgeyByZXR1cm4gY21wQW5kSWRbMV0gPT09IGNtcDsgfSk7XG4gIGlmIChjbXBGb3VuZCkge1xuICAgIHJldHVybiBjbXBGb3VuZFswXTsgLy8gcmV0dXJuIHRoZSB1aWRcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgdWlkID0gKGNhY2hlSWRJbmRleCsrKS50b1N0cmluZygpO1xuICAgIHJlZnNDYWNoZVt1aWRdID0gY21wO1xuICAgIHJldHVybiB1aWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lbW9pemVGYWN0b3J5IChyZXNvbHZlcikge1xuICB2YXIgY2FjaGUgPSB7fTtcbiAgZnVuY3Rpb24gbWVtb2l6ZShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBrZXkgPSByZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KVxuICAgICAgICA/IGNhY2hlW2tleV1cbiAgICAgICAgOiAoY2FjaGVba2V5XSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gbWVtb2l6ZTtcbn1cblxuXG4vLyBjb3B5IGZyb20gTUROIGV4YW1wbGU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9mcmVlemUjRXhhbXBsZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWVwRnJlZXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8gUmV0cmlldmUgdGhlIHByb3BlcnR5IG5hbWVzIGRlZmluZWQgb24gb2JqXG4gIHZhciBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuXG4gIC8vIEZyZWV6ZSBwcm9wZXJ0aWVzIGJlZm9yZSBmcmVlemluZyBzZWxmXG4gIHByb3BOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgcHJvcCA9IG9ialtuYW1lXTtcblxuICAgIC8vIEZyZWV6ZSBwcm9wIGlmIGl0IGlzIGFuIG9iamVjdFxuICAgIGlmICh0eXBlb2YgcHJvcCA9PSAnb2JqZWN0JyAmJiAhT2JqZWN0LmlzRnJvemVuKHByb3ApKSB7XG4gICAgICBkZWVwRnJlZXplKHByb3ApO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRnJlZXplIHNlbGZcbiAgcmV0dXJuIE9iamVjdC5mcmVlemUob2JqKTtcbn1cblxuZXhwb3J0IGNvbnN0IHZhbEVxID0gKGEsIGIpID0+IGlzRXF1YWwoYSwgYik7XG5leHBvcnQgY29uc3QgcmVmRXEgPSAoYSwgYikgPT4gYSA9PT0gYjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoLmlzb2JqZWN0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7Z2V0UmVmQXRQYXRoLCBmbGF0dGVufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHt1cGRhdGVJbiwgbWVyZ2UsIHB1c2gsIHVuc2hpZnQsIHNwbGljZX0gZnJvbSAndXBkYXRlLWluJztcblxuXG5jbGFzcyBSZWZDdXJzb3Ige1xuICBjb25zdHJ1Y3RvciAocm9vdERlcmVmLCByb290U3dhcCwgcGF0aHMpIHtcbiAgICB0aGlzLnZhbHVlID0gKCkgPT4gZ2V0UmVmQXRQYXRoKHJvb3REZXJlZigpLCBwYXRocyk7XG4gICAgdGhpcy5yZWZpbmUgPSAoLi4ubW9yZVBhdGhzKSA9PiBidWlsZChyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRocy5jb25jYXQobW9yZVBhdGhzKSk7XG4gICAgdGhpcy5zd2FwID0gKGYsIC4uLmFyZ3MpID0+IHJvb3RTd2FwKHJvb3RWYWx1ZSA9PiB1cGRhdGVJbihyb290VmFsdWUsIHBhdGhzLCB2ID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpKTtcblxuICAgIHRoaXMuc2V0ID0gKHZhbCkgPT4gdGhpcy5zd2FwKHYgPT4gdmFsKTtcbiAgICB0aGlzLm1lcmdlID0gKHZhbCkgPT4gdGhpcy5zd2FwKG1lcmdlLCB2YWwpO1xuICAgIHRoaXMucHVzaCA9ICh4cykgPT4gdGhpcy5zd2FwKHB1c2gsIHhzKTtcbiAgICB0aGlzLnVuc2hpZnQgPSAoeHMpID0+IHRoaXMuc3dhcCh1bnNoaWZ0LCB4cyk7XG4gICAgdGhpcy5zcGxpY2UgPSAoeHMpID0+IHRoaXMuc3dhcChzcGxpY2UsIHhzKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmVmQ3Vyc29ycyBoYXZlIG5vIG1lbW9pemF0aW9uIGFzIHRoZXkgZG8gbm90IGV4cG9zZSBhbnkgbm90aW9uIG9mIHZhbHVlIGVxdWFsaXR5LlxuICovXG5mdW5jdGlvbiBidWlsZCAocm9vdERlcmVmLCByb290U3dhcCwgcGF0aCkge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICByZXR1cm4gbmV3IFJlZkN1cnNvcihyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRoKTtcbn1cblxuUmVmQ3Vyc29yLmJ1aWxkID0gYnVpbGQ7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZkN1cnNvcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1JlZkN1cnNvci5qc1xuICoqLyIsImltcG9ydCBvbWl0IGZyb20gJ29taXQta2V5cyc7XG5pbXBvcnQge3ZhbEVxLCByZWZFcX0gZnJvbSAnLi91dGlsJztcblxuXG5mdW5jdGlvbiBJbW11dGFibGVPcHRpbWl6YXRpb25zIChyZWZGaWVsZHMsIGlnbm9yZWRGaWVsZHMvKm9wdGlvbmFsKi8pIHtcbiAgdmFyIG5vVmFsdWVDaGVja0ZpZWxkcyA9IHJlZkZpZWxkcy5jb25jYXQoaWdub3JlZEZpZWxkcyB8fCBbXSk7XG4gIHJldHVybiB7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG5cbiAgICAgIHZhciB2YWx1ZXNDaGFuZ2VkID0gIXZhbEVxKFxuICAgICAgICBvbWl0KG5leHRQcm9wcywgbm9WYWx1ZUNoZWNrRmllbGRzKSxcbiAgICAgICAgb21pdCh0aGlzLnByb3BzLCBub1ZhbHVlQ2hlY2tGaWVsZHMpKTtcblxuICAgICAgdmFyIHJlZnNDaGFuZ2VkID0gIXJlZkZpZWxkcy5ldmVyeSgoZmllbGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZkVxKHRoaXMucHJvcHNbZmllbGRdLCBuZXh0UHJvcHNbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzQ2hhbmdlZCB8fCByZWZzQ2hhbmdlZDtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZU9wdGltaXphdGlvbnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzXG4gKiovIiwiLyohXG4gKiBvbWl0LWtleSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvb21pdC1rZXk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG52YXIgZGlmZmVyZW5jZSA9IHJlcXVpcmUoJ2FycmF5LWRpZmZlcmVuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbWl0KG9iaiwga2V5cykge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuXG4gIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtrZXlzXTtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlKHByb3BzLCBrZXlzKTtcbiAgdmFyIG8gPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGRpZmZbaV07XG5cbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG9ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb21pdC1rZXlzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaXNvYmplY3QgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb24gU2NobGlua2VydCwgY29udHJpYnV0b3JzLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGlzIHRoZSB2YWx1ZSBhbiBvYmplY3QsIGFuZCBub3QgYW4gYXJyYXk/XG4gKlxuICogQHBhcmFtICB7Kn0gYHZhbHVlYFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcbiAgcmV0dXJuIG8gIT0gbnVsbCAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCdcbiAgICAmJiAhQXJyYXkuaXNBcnJheShvKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG5cdHZhciBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgZnVuY3Rpb24oZWxlbSkge1xuXHRcdHZhciBpZHgsIGxlbjtcblxuXHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleE9mIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0XHR9XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAodGhpc1tpZHhdID09PSBlbGVtKSB7XG5cdFx0XHRcdHJldHVybiBpZHg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuXHRcdHZhciBpZHgsIGxlbjtcblx0XHR2YXIgcmVzID0gW107XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGIsIGFbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGFbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gYi5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmIChpbmRleE9mLmNhbGwoYSwgYltpZHhdKSA9PT0gLTEpIHtcblx0XHRcdFx0cmVzLnB1c2goYltpZHhdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpZmZlcmVuY2U7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Z2xvYmFsLmRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlO1xuXHR9XG5cbn0odGhpcykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYXJyYXktZGlmZmVyZW5jZS9kaWZmZXJlbmNlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=