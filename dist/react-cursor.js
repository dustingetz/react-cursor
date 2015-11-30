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
	
	    return internalBuild(rootValue, rootSwap, paths.concat(morePaths), (0, _util.getIn)(_this.value(), morePaths));
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
	  leafValue = leafValue || (0, _util.getIn)(rootValue, path);
	  // When refining inside a lifecycle method, same cmp(swapper) and same path isn't enough.
	  // this.props and nextProps have different subtree values, and refining memoizer must account for that
	  return (0, _util.refToHash)(rootSwap) + (0, _util.hashRecord)(leafValue) + (0, _util.hashRecord)(path);
	});
	
	var internalBuild = cursorBuildMemoizer(function (rootValue, rootSwap, path, leafValue) {
	  path = path === undefined ? [] : path;
	  leafValue = leafValue || (0, _util.getIn)(rootValue, path);
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
	exports.getIn = getIn;
	exports.get = get;
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
	    return (0, _util.getIn)(rootDeref(), paths);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTA5ZWNhOWM4ZDI4Nzc2OWIyMDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0LWN1cnNvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3VwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2xvZGFzaC5pc29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVmQ3Vyc29yLmpzIiwid2VicGFjazovLy8uL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzIiwid2VicGFjazovLy8uL34vb21pdC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaXNvYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9hcnJheS1kaWZmZXJlbmNlL2RpZmZlcmVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7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QUNBO0FBQ0EsRzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1DQUFrQyxXQUFXO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdDQUErQixXQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFdBQVc7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTs7QUFFQSxFQUFDIiwiZmlsZSI6InJlYWN0LWN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlMDllY2E5YzhkMjg3NzY5YjIwOFxuICoqLyIsImltcG9ydCBDdXJzb3IgZnJvbSAnLi9DdXJzb3InO1xuaW1wb3J0IFJlZkN1cnNvciBmcm9tICcuL1JlZkN1cnNvcic7XG5pbXBvcnQgSW1tdXRhYmxlT3B0aW1pemF0aW9ucyBmcm9tICcuL0ltbXV0YWJsZU9wdGltaXphdGlvbnMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ3Vyc29yOiBDdXJzb3IsXG4gIEltbXV0YWJsZU9wdGltaXphdGlvbnM6IEltbXV0YWJsZU9wdGltaXphdGlvbnMsXG4gIFJlZkN1cnNvcjogUmVmQ3Vyc29yXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC1jdXJzb3IuanNcbiAqKi8iLCJpbXBvcnQge3VwZGF0ZUluLCBtZXJnZSwgcHVzaCwgdW5zaGlmdCwgc3BsaWNlfSBmcm9tICd1cGRhdGUtaW4nO1xuaW1wb3J0IHttZW1vaXplRmFjdG9yeSwgZ2V0SW4sIGhhc2hSZWNvcmQsIHJlZlRvSGFzaCwgZmxhdHRlbiwgZGVlcEZyZWV6ZX0gZnJvbSAnLi91dGlsJztcblxuXG5jbGFzcyBDdXJzb3Ige1xuICBjb25zdHJ1Y3RvciAocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aHMsIGxlYWZWYWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSAoKSA9PiBsZWFmVmFsdWU7XG4gICAgdGhpcy5yZWZpbmUgPSAoLi4ubW9yZVBhdGhzKSA9PiBpbnRlcm5hbEJ1aWxkKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGhzLmNvbmNhdChtb3JlUGF0aHMpLCBnZXRJbih0aGlzLnZhbHVlKCksIG1vcmVQYXRocykpO1xuICAgIHRoaXMuc3dhcCA9IChmLCAuLi5hcmdzKSA9PiByb290U3dhcChyb290VmFsdWUgPT4gdXBkYXRlSW4ocm9vdFZhbHVlLCBwYXRocywgdiA9PiBmLmFwcGx5KG51bGwsIFt2XS5jb25jYXQoYXJncykpKSk7XG5cbiAgICB0aGlzLnNldCA9ICh2YWwpID0+IHRoaXMuc3dhcCh2ID0+IHZhbCk7XG4gICAgdGhpcy5tZXJnZSA9ICh2YWwpID0+IHRoaXMuc3dhcChtZXJnZSwgdmFsKTtcbiAgICB0aGlzLnB1c2ggPSAoeHMpID0+IHRoaXMuc3dhcChwdXNoLCB4cyk7XG4gICAgdGhpcy51bnNoaWZ0ID0gKHhzKSA9PiB0aGlzLnN3YXAodW5zaGlmdCwgeHMpO1xuICAgIHRoaXMuc3BsaWNlID0gKHhzKSA9PiB0aGlzLnN3YXAoc3BsaWNlLCB4cyk7XG5cbiAgICBpZiAoQ3Vyc29yLmRlYnVnICYmIHR5cGVvZiBPYmplY3QuZnJlZXplID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkZWVwRnJlZXplKHRoaXMpO1xuICAgICAgZGVlcEZyZWV6ZShsZWFmVmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vIElmIHdlIGJ1aWxkIHR3byBjdXJzb3JzIGZvciB0aGUgc2FtZSBwYXRoIG9uIHRoZSBzYW1lIFJlYWN0IGNvbXBvbmVudCxcbi8vIGFuZCB0aG9zZSBSZWFjdCBjb21wb25lbnRzIGhhdmUgZXF1YWwgc3RhdGUsIHJldXNlIHRoZSBzYW1lIGN1cnNvciBpbnN0YW5jZSxcbi8vIHNvIHdlIGNhbiB1c2UgPT09IHRvIGNvbXBhcmUgdGhlbS5cbnZhciBjdXJzb3JCdWlsZE1lbW9pemVyID0gbWVtb2l6ZUZhY3RvcnkoKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkgPT4ge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICBsZWFmVmFsdWUgPSBsZWFmVmFsdWUgfHwgZ2V0SW4ocm9vdFZhbHVlLCBwYXRoKTtcbiAgLy8gV2hlbiByZWZpbmluZyBpbnNpZGUgYSBsaWZlY3ljbGUgbWV0aG9kLCBzYW1lIGNtcChzd2FwcGVyKSBhbmQgc2FtZSBwYXRoIGlzbid0IGVub3VnaC5cbiAgLy8gdGhpcy5wcm9wcyBhbmQgbmV4dFByb3BzIGhhdmUgZGlmZmVyZW50IHN1YnRyZWUgdmFsdWVzLCBhbmQgcmVmaW5pbmcgbWVtb2l6ZXIgbXVzdCBhY2NvdW50IGZvciB0aGF0XG4gIHJldHVybiByZWZUb0hhc2gocm9vdFN3YXApICsgaGFzaFJlY29yZChsZWFmVmFsdWUpICsgaGFzaFJlY29yZChwYXRoKTtcbn0pO1xuXG52YXIgaW50ZXJuYWxCdWlsZCA9IGN1cnNvckJ1aWxkTWVtb2l6ZXIoKHJvb3RWYWx1ZSwgcm9vdFN3YXAsIHBhdGgsIGxlYWZWYWx1ZSkgPT4ge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICBsZWFmVmFsdWUgPSBsZWFmVmFsdWUgfHwgZ2V0SW4ocm9vdFZhbHVlLCBwYXRoKTtcbiAgcmV0dXJuIG5ldyBDdXJzb3Iocm9vdFZhbHVlLCByb290U3dhcCwgcGF0aCwgbGVhZlZhbHVlKTtcbn0pO1xuXG5cbi8vIFRvIHN1cHBvcnQgYmluZGluZyBjdXJzb3JzIHRvIHJlYWN0IHN0YXRlLCB3ZSBuZWVkIGNtcC5zZXRTdGF0ZSBhcyBhIGZ1bmN0aW9uLCBhbmQgdGhlIGZ1bmN0aW9uXG4vLyBuZWVkcyB0byBiZSA9PT0gaWYgaXQgY29tZXMgZnJvbSB0aGUgc2FtZSByZWFjdCBjb21wb25lbnQuIE90aGVyd2lzZSwgdGhpcyB0ZXN0IGZhaWxzOlxuLy8gXCJDdXJzb3JzIHRvIHRoZSBzYW1lIGNvbXBvbmVudCBhcmUgPT09XCIuIFNpbmNlIGBjbXAuc2V0U3RhdGUuYmluZChjbXApICE9PSBjbXAuc2V0U3RhdGUuYmluZChjbXApYCxcbi8vIHdlIG5lZWQgdG8gbWVtb2l6ZSBiYXNlZCBvbiB0aGUgY21wIHJlZmVyZW5jZS5cbnZhciByZWFjdENtcE1lbW9pemVyID0gbWVtb2l6ZUZhY3RvcnkoKGNtcCkgPT4gcmVmVG9IYXNoKGNtcCkpO1xudmFyIG1lbW9pemVkUmVhY3RTdGF0ZVN3YXBwZXIgPSByZWFjdENtcE1lbW9pemVyKChjbXApID0+IGNtcC5zZXRTdGF0ZS5iaW5kKGNtcCkpO1xuXG5mdW5jdGlvbiBidWlsZCAocm9vdFZhbHVlLCByb290U3dhcCkge1xuICB2YXIgaXNSZWFjdENtcCA9IHR5cGVvZiByb290VmFsdWUuX19wcm90b19fLnJlbmRlciA9PT0gXCJmdW5jdGlvblwiO1xuICBpZiAoaXNSZWFjdENtcCkge1xuICAgIHZhciBjbXAgPSByb290VmFsdWU7XG4gICAgcmV0dXJuIGludGVybmFsQnVpbGQoY21wLnN0YXRlLCBtZW1vaXplZFJlYWN0U3RhdGVTd2FwcGVyKGNtcCkpO1xuICB9XG4gIHJldHVybiBpbnRlcm5hbEJ1aWxkKHJvb3RWYWx1ZSwgcm9vdFN3YXApO1xufVxuXG5cbkN1cnNvci5idWlsZCA9IGJ1aWxkO1xuXG5DdXJzb3IuZGVidWcgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9DdXJzb3IuanNcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7ZGVmYXVsdCBhcyBwZXJzaXN0ZW50VXBkYXRlfSBmcm9tICdyZWFjdC1hZGRvbnMtdXBkYXRlJztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSAoYSwgYikge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhLCB7JG1lcmdlOiBifSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoIChhcywgYnMpIHtcbiAgcmV0dXJuIHBlcnNpc3RlbnRVcGRhdGUoYXMsIHskcHVzaDogYnN9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2hpZnQgKGFzLCBicykge1xuICByZXR1cm4gcGVyc2lzdGVudFVwZGF0ZShhcywgeyR1bnNoaWZ0OiBic30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaWNlIChhcywgc3BsaWNlcykge1xuICAvLyBwZXJzaXN0ZW50VXBkYXRlKFsxMiwgMTcsIDE1XSwgeyRzcGxpY2U6IFtbMSwgMSwgMTMsIDE0XV19KSA9PiBbMTIsIDEzLCAxNCwgMTVdXG4gIHJldHVybiBwZXJzaXN0ZW50VXBkYXRlKGFzLCB7JHNwbGljZTogc3BsaWNlc30pO1xufVxuXG5cbi8qKlxuICogVGhpbiB3cmFwcGVyIG92ZXIgcmVhY3QtYWRkb25zLXVwZGF0ZSB0byBhcHBseSBhIGZ1bmN0aW9uIGF0IHBhdGhcbiAqIHByZXNlcnZpbmcgb3RoZXIgcmVmZXJlbmNlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUluIChyb290VmFsLCBwYXRocywgZiwgLi4uYXJncykge1xuICBsZXQgZmYgPSAodikgPT4gZi5hcHBseShudWxsLCBbdl0uY29uY2F0KGFyZ3MpKTtcblxuICB2YXIgbmV3Um9vdFZhbDtcbiAgaWYgKHBhdGhzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBjb21tYW5kID0gcm9vdEF0KHBhdGhzLCB7JGFwcGx5OiBmZn0pO1xuICAgIG5ld1Jvb3RWYWwgPSBwZXJzaXN0ZW50VXBkYXRlKHJvb3RWYWwsIGNvbW1hbmQpO1xuICB9XG4gIGVsc2UgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgIG5ld1Jvb3RWYWwgPSBmZihyb290VmFsKTtcbiAgfVxuXG4gIC8vIHdvdWxkIGJlIGJldHRlciB0byBkbyB0aGlzIHZhbEVxIGNoZWNrIG9uIGp1c3QgdGhlIGxlYWZcbiAgcmV0dXJuIGlzRXF1YWwocm9vdFZhbCwgbmV3Um9vdFZhbClcbiAgICAgID8gcm9vdFZhbCAvLyBwcmVzZXJ2ZSA9PT0gaWYgc2FtZSB2YWx1ZVxuICAgICAgOiBuZXdSb290VmFsO1xufVxuXG5cblxuLy8gSGVscGVyIG1ldGhvZHMgZm9yIGZvcm1pbmcgcmVhY3QtYWRkb25zLXVwZGF0ZSBjb21tYW5kcy5cblxuLyoqXG4gKiBAcGFyYW0gbGVhZlZhbCBlLmcuIHskYXBwbHk6IGZ9XG4gKiBAcGFyYW0gcGF0aHMgZS5nLiBbJ3gnLCAneScsICd6J11cbiAqIEByZXR1cm5zIGUuZy4ge3g6IHt5OiB7ejogeyRhcHBseTogZn19fVxuICovXG5mdW5jdGlvbiByb290QXQgKHBhdGhzLCBsZWFmVmFsKSB7XG4gIHJldHVybiBwYXRocy5yZWR1Y2VSaWdodCh1bkRlcmVmLCBsZWFmVmFsKVxufVxuXG5cbi8qKlxuICogQHBhcmFtIG9iaiBlLmcgeyRhcHBseTogZn1cbiAqIEBwYXJhbSBrZXkgZS5nLiAnZm9vJ1xuICogQHJldHVybnMgZS5nLiB7Zm9vOiB7JGFwcGx5OiBmfX1cbiAqL1xuZnVuY3Rpb24gdW5EZXJlZihvYmosIGtleSkgeyAvLyBha2EgdW4tZ2V0XG4gIHZhciBuZXh0T2JqID0ge307XG4gIG5leHRPYmpba2V5XSA9IG9iajtcbiAgcmV0dXJuIG5leHRPYmo7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vdXBkYXRlLWluL3NyYy91cGRhdGUtaW4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi91cGRhdGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hZGRvbnMtdXBkYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHVwZGF0ZVxuICovXG5cbi8qIGdsb2JhbCBoYXNPd25Qcm9wZXJ0eTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vT2JqZWN0LmFzc2lnbicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9ICh7fSkuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4geC5jb25jYXQoKTtcbiAgfSBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBhc3NpZ24obmV3IHguY29uc3RydWN0b3IoKSwgeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbn1cblxudmFyIENPTU1BTkRfUFVTSCA9IGtleU9mKHsgJHB1c2g6IG51bGwgfSk7XG52YXIgQ09NTUFORF9VTlNISUZUID0ga2V5T2YoeyAkdW5zaGlmdDogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NQTElDRSA9IGtleU9mKHsgJHNwbGljZTogbnVsbCB9KTtcbnZhciBDT01NQU5EX1NFVCA9IGtleU9mKHsgJHNldDogbnVsbCB9KTtcbnZhciBDT01NQU5EX01FUkdFID0ga2V5T2YoeyAkbWVyZ2U6IG51bGwgfSk7XG52YXIgQ09NTUFORF9BUFBMWSA9IGtleU9mKHsgJGFwcGx5OiBudWxsIH0pO1xuXG52YXIgQUxMX0NPTU1BTkRTX0xJU1QgPSBbQ09NTUFORF9QVVNILCBDT01NQU5EX1VOU0hJRlQsIENPTU1BTkRfU1BMSUNFLCBDT01NQU5EX1NFVCwgQ09NTUFORF9NRVJHRSwgQ09NTUFORF9BUFBMWV07XG5cbnZhciBBTExfQ09NTUFORFNfU0VUID0ge307XG5cbkFMTF9DT01NQU5EU19MSVNULmZvckVhY2goZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgQUxMX0NPTU1BTkRTX1NFVFtjb21tYW5kXSA9IHRydWU7XG59KTtcblxuZnVuY3Rpb24gaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBjb21tYW5kKSB7XG4gICFBcnJheS5pc0FycmF5KHZhbHVlKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgdGFyZ2V0IG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuJywgY29tbWFuZCwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHNwZWNWYWx1ZSA9IHNwZWNbY29tbWFuZF07XG4gICFBcnJheS5pc0FycmF5KHNwZWNWYWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4gJyArICdEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgcGFyYW1ldGVyIGluIGFuIGFycmF5PycsIGNvbW1hbmQsIHNwZWNWYWx1ZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodmFsdWUsIHNwZWMpIHtcbiAgISh0eXBlb2Ygc3BlYyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBZb3UgcHJvdmlkZWQgYSBrZXkgcGF0aCB0byB1cGRhdGUoKSB0aGF0IGRpZCBub3QgY29udGFpbiBvbmUgJyArICdvZiAlcy4gRGlkIHlvdSBmb3JnZXQgdG8gaW5jbHVkZSB7JXM6IC4uLn0/JywgQUxMX0NPTU1BTkRTX0xJU1Quam9pbignLCAnKSwgQ09NTUFORF9TRVQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NFVCkpIHtcbiAgICAhKE9iamVjdC5rZXlzKHNwZWMpLmxlbmd0aCA9PT0gMSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGggJXMnLCBDT01NQU5EX1NFVCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHNwZWNbQ09NTUFORF9TRVRdO1xuICB9XG5cbiAgdmFyIG5leHRWYWx1ZSA9IHNoYWxsb3dDb3B5KHZhbHVlKTtcblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX01FUkdFKSkge1xuICAgIHZhciBtZXJnZU9iaiA9IHNwZWNbQ09NTUFORF9NRVJHRV07XG4gICAgIShtZXJnZU9iaiAmJiB0eXBlb2YgbWVyZ2VPYmogPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHNwZWMgb2YgdHlwZSBcXCdvYmplY3RcXCc7IGdvdCAlcycsIENPTU1BTkRfTUVSR0UsIG1lcmdlT2JqKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgIShuZXh0VmFsdWUgJiYgdHlwZW9mIG5leHRWYWx1ZSA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgdGFyZ2V0IG9mIHR5cGUgXFwnb2JqZWN0XFwnOyBnb3QgJXMnLCBDT01NQU5EX01FUkdFLCBuZXh0VmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBhc3NpZ24obmV4dFZhbHVlLCBzcGVjW0NPTU1BTkRfTUVSR0VdKTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfUFVTSCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfUFVTSCk7XG4gICAgc3BlY1tDT01NQU5EX1BVU0hdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9VTlNISUZUKSkge1xuICAgIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgQ09NTUFORF9VTlNISUZUKTtcbiAgICBzcGVjW0NPTU1BTkRfVU5TSElGVF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgbmV4dFZhbHVlLnVuc2hpZnQoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1NQTElDRSkpIHtcbiAgICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgJXMgdGFyZ2V0IHRvIGJlIGFuIGFycmF5OyBnb3QgJXMnLCBDT01NQU5EX1NQTElDRSwgdmFsdWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAhQXJyYXkuaXNBcnJheShzcGVjW0NPTU1BTkRfU1BMSUNFXSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgc3BlY1tDT01NQU5EX1NQTElDRV0uZm9yRWFjaChmdW5jdGlvbiAoYXJncykge1xuICAgICAgIUFycmF5LmlzQXJyYXkoYXJncykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuICcgKyAnRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICBuZXh0VmFsdWUuc3BsaWNlLmFwcGx5KG5leHRWYWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX0FQUExZKSkge1xuICAgICEodHlwZW9mIHNwZWNbQ09NTUFORF9BUFBMWV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGEgZnVuY3Rpb247IGdvdCAlcy4nLCBDT01NQU5EX0FQUExZLCBzcGVjW0NPTU1BTkRfQVBQTFldKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgbmV4dFZhbHVlID0gc3BlY1tDT01NQU5EX0FQUExZXShuZXh0VmFsdWUpO1xuICB9XG5cbiAgZm9yICh2YXIgayBpbiBzcGVjKSB7XG4gICAgaWYgKCEoQUxMX0NPTU1BTkRTX1NFVC5oYXNPd25Qcm9wZXJ0eShrKSAmJiBBTExfQ09NTUFORFNfU0VUW2tdKSkge1xuICAgICAgbmV4dFZhbHVlW2tdID0gdXBkYXRlKHZhbHVlW2tdLCBzcGVjW2tdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBrZXlPZlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIChvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2tleU9mLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ0ludmFyaWFudCBWaW9sYXRpb246ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMuanMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vbGliL2lzX2FyZ3VtZW50cy5qcycpO1xuXG52YXIgZGVlcEVxdWFsID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgIT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cGVjdGVkICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICB2YXIgaSwga2V5O1xuICBpZiAoaXNVbmRlZmluZWRPck51bGwoYSkgfHwgaXNVbmRlZmluZWRPck51bGwoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG4gIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG4gIGlmIChpc0FyZ3VtZW50cyhhKSkge1xuICAgIGlmICghaXNBcmd1bWVudHMoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuICB9XG4gIGlmIChpc0J1ZmZlcihhKSkge1xuICAgIGlmICghaXNCdWZmZXIoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0cnkge1xuICAgIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICAgIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoLmlzb2JqZWN0JztcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuXG5cbmV4cG9ydCBsZXQgY2xvbmUgPSAoeHMpID0+IHhzLnNsaWNlKDApO1xuXG5mdW5jdGlvbiBidXRMYXN0ICh4cykge1xuICBsZXQgeHhzID0gY2xvbmUoeHMpO1xuICB4eHMucG9wKCk7XG4gIHJldHVybiB4eHM7XG59XG5cbmV4cG9ydCBsZXQgYXBwbHkgPSAoZiwgLi4uYXJncykgPT4ge1xuICAvLyBsYXN0IGFyZyBjYW4gYmUgYSBzZXEgb2YgbW9yZSBhcmdzXG4gIGFyZ3MgPSBbXS5jb25jYXQoYnV0TGFzdChhcmdzKSwgbGFzdChhcmdzKSk7XG4gIHJldHVybiBmLmFwcGx5KG51bGwsIGFyZ3MpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQoYXJyYXksIHByZWRpY2F0ZSkge1xuICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICB2YXIgbGlzdCA9IE9iamVjdChhcnJheSk7XG4gIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gIHZhciB2YWx1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluKHRyZWUsIHBhdGhzKSB7IC8vIHRoaXMgaXMgZ2V0LWluIGluIGNsb2p1cmVcbiAgcmV0dXJuIHJlZHVjZShwYXRocywgZ2V0LCB0cmVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChvYmosIGtleSkge1xuICBjb25zb2xlLmFzc2VydChrZXkgaW4gb2JqLCBgQmFkIGN1cnNvciByZWZpbmU6IHBhdGggJHtrZXl9IG5vdCBmb3VuZCBpbiBgLCBvYmopO1xuICByZXR1cm4gb2JqW2tleV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5zbGljZSgwLCBhcnJheS5sZW5ndGggLSAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlKGFycmF5LCBmLCBtemVybykge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGYsIG16ZXJvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4obGlzdE9mTGlzdHMpIHtcbiAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgbGlzdE9mTGlzdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFpcnMob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgfVxuICByZXR1cm4gcGFpcnM7XG59O1xuXG4vKipcbiAqIEhhc2ggb2YgbnVsbCBpcyBudWxsLCBoYXNoIG9mIHVuZGVmaW5lZCBpcyB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoc3RyKSB7XG4gIHZhciBoYXNoID0gMCwgaSwgY2gsIGw7XG4gIGlmIChzdHIgPT09IHVuZGVmaW5lZCB8fCBzdHIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gIH1cbiAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBoYXNoO1xuICB9XG4gIGZvciAoaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaCAgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaDtcbiAgICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cbiAgcmV0dXJuIGhhc2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoUmVjb3JkKHJlY29yZCkge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgdW5pcXVlIHRoaW5nIHRvIHVzZSBhcyBhIG1lbW9pemUgcmVzb2x2ZXIgaGFzaCBmb3IgcmVmZXJlbmNlIHR5cGVzLlxuICovXG52YXIgcmVmc0NhY2hlID0ge307IC8vIHsgaWQ6IGNtcCB9XG52YXIgY2FjaGVJZEluZGV4ID0gMDtcbmV4cG9ydCBmdW5jdGlvbiByZWZUb0hhc2ggKGNtcCkge1xuICAvLyBzZWFyY2ggdGhlIGNtcFVuaXF1ZU1hcCBieSByZWZlcmVuY2UgLSBoYXZlIHdlIHNlZW4gaXQgYmVmb3JlP1xuICAvLyBpZiBzbywgdXNlIHRoZSBhc3NpZ25lZCBpZCBhcyB0aGUgaGFzaFxuICAvLyBpZiBub3QsIGFkZCB0byBjYWNoZSBhbmQgaW5jcmVtZW50IGNhY2hlSWRJbmRleCBhcyBhIG5ldyBJRCB0byBoYXNoIG9uXG5cbiAgdmFyIGNtcHNXaXRoVWlkID0gcGFpcnMocmVmc0NhY2hlKTtcbiAgdmFyIGNtcEZvdW5kID0gZmluZChjbXBzV2l0aFVpZCwgZnVuY3Rpb24gKGNtcEFuZElkKSB7IHJldHVybiBjbXBBbmRJZFsxXSA9PT0gY21wOyB9KTtcbiAgaWYgKGNtcEZvdW5kKSB7XG4gICAgcmV0dXJuIGNtcEZvdW5kWzBdOyAvLyByZXR1cm4gdGhlIHVpZFxuICB9XG4gIGVsc2Uge1xuICAgIHZhciB1aWQgPSAoY2FjaGVJZEluZGV4KyspLnRvU3RyaW5nKCk7XG4gICAgcmVmc0NhY2hlW3VpZF0gPSBjbXA7XG4gICAgcmV0dXJuIHVpZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVtb2l6ZUZhY3RvcnkgKHJlc29sdmVyKSB7XG4gIHZhciBjYWNoZSA9IHt9O1xuICBmdW5jdGlvbiBtZW1vaXplKGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBrZXkpXG4gICAgICAgID8gY2FjaGVba2V5XVxuICAgICAgICA6IChjYWNoZVtrZXldID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBtZW1vaXplO1xufVxuXG5cbi8vIGNvcHkgZnJvbSBNRE4gZXhhbXBsZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2ZyZWV6ZSNFeGFtcGxlc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBGcmVlemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICAvLyBSZXRyaWV2ZSB0aGUgcHJvcGVydHkgbmFtZXMgZGVmaW5lZCBvbiBvYmpcbiAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG5cbiAgLy8gRnJlZXplIHByb3BlcnRpZXMgYmVmb3JlIGZyZWV6aW5nIHNlbGZcbiAgcHJvcE5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBwcm9wID0gb2JqW25hbWVdO1xuXG4gICAgLy8gRnJlZXplIHByb3AgaWYgaXQgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBwcm9wID09ICdvYmplY3QnICYmICFPYmplY3QuaXNGcm96ZW4ocHJvcCkpIHtcbiAgICAgIGRlZXBGcmVlemUocHJvcCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBGcmVlemUgc2VsZlxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShvYmopO1xufVxuXG5leHBvcnQgY29uc3QgdmFsRXEgPSAoYSwgYikgPT4gaXNFcXVhbChhLCBiKTtcbmV4cG9ydCBjb25zdCByZWZFcSA9IChhLCBiKSA9PiBhID09PSBiO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9sb2Rhc2guaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtnZXRJbiwgZmxhdHRlbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7dXBkYXRlSW4sIG1lcmdlLCBwdXNoLCB1bnNoaWZ0LCBzcGxpY2V9IGZyb20gJ3VwZGF0ZS1pbic7XG5cblxuY2xhc3MgUmVmQ3Vyc29yIHtcbiAgY29uc3RydWN0b3IgKHJvb3REZXJlZiwgcm9vdFN3YXAsIHBhdGhzKSB7XG4gICAgdGhpcy52YWx1ZSA9ICgpID0+IGdldEluKHJvb3REZXJlZigpLCBwYXRocyk7XG4gICAgdGhpcy5yZWZpbmUgPSAoLi4ubW9yZVBhdGhzKSA9PiBidWlsZChyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRocy5jb25jYXQobW9yZVBhdGhzKSk7XG4gICAgdGhpcy5zd2FwID0gKGYsIC4uLmFyZ3MpID0+IHJvb3RTd2FwKHJvb3RWYWx1ZSA9PiB1cGRhdGVJbihyb290VmFsdWUsIHBhdGhzLCB2ID0+IGYuYXBwbHkobnVsbCwgW3ZdLmNvbmNhdChhcmdzKSkpKTtcblxuICAgIHRoaXMuc2V0ID0gKHZhbCkgPT4gdGhpcy5zd2FwKHYgPT4gdmFsKTtcbiAgICB0aGlzLm1lcmdlID0gKHZhbCkgPT4gdGhpcy5zd2FwKG1lcmdlLCB2YWwpO1xuICAgIHRoaXMucHVzaCA9ICh4cykgPT4gdGhpcy5zd2FwKHB1c2gsIHhzKTtcbiAgICB0aGlzLnVuc2hpZnQgPSAoeHMpID0+IHRoaXMuc3dhcCh1bnNoaWZ0LCB4cyk7XG4gICAgdGhpcy5zcGxpY2UgPSAoeHMpID0+IHRoaXMuc3dhcChzcGxpY2UsIHhzKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmVmQ3Vyc29ycyBoYXZlIG5vIG1lbW9pemF0aW9uIGFzIHRoZXkgZG8gbm90IGV4cG9zZSBhbnkgbm90aW9uIG9mIHZhbHVlIGVxdWFsaXR5LlxuICovXG5mdW5jdGlvbiBidWlsZCAocm9vdERlcmVmLCByb290U3dhcCwgcGF0aCkge1xuICBwYXRoID0gcGF0aCA9PT0gdW5kZWZpbmVkID8gW10gOiBwYXRoO1xuICByZXR1cm4gbmV3IFJlZkN1cnNvcihyb290RGVyZWYsIHJvb3RTd2FwLCBwYXRoKTtcbn1cblxuUmVmQ3Vyc29yLmJ1aWxkID0gYnVpbGQ7XG5cbmV4cG9ydCBkZWZhdWx0IFJlZkN1cnNvcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1JlZkN1cnNvci5qc1xuICoqLyIsImltcG9ydCBvbWl0IGZyb20gJ29taXQta2V5cyc7XG5pbXBvcnQge3ZhbEVxLCByZWZFcX0gZnJvbSAnLi91dGlsJztcblxuXG5mdW5jdGlvbiBJbW11dGFibGVPcHRpbWl6YXRpb25zIChyZWZGaWVsZHMsIGlnbm9yZWRGaWVsZHMvKm9wdGlvbmFsKi8pIHtcbiAgdmFyIG5vVmFsdWVDaGVja0ZpZWxkcyA9IHJlZkZpZWxkcy5jb25jYXQoaWdub3JlZEZpZWxkcyB8fCBbXSk7XG4gIHJldHVybiB7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG5cbiAgICAgIHZhciB2YWx1ZXNDaGFuZ2VkID0gIXZhbEVxKFxuICAgICAgICBvbWl0KG5leHRQcm9wcywgbm9WYWx1ZUNoZWNrRmllbGRzKSxcbiAgICAgICAgb21pdCh0aGlzLnByb3BzLCBub1ZhbHVlQ2hlY2tGaWVsZHMpKTtcblxuICAgICAgdmFyIHJlZnNDaGFuZ2VkID0gIXJlZkZpZWxkcy5ldmVyeSgoZmllbGQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZkVxKHRoaXMucHJvcHNbZmllbGRdLCBuZXh0UHJvcHNbZmllbGRdKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWVzQ2hhbmdlZCB8fCByZWZzQ2hhbmdlZDtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEltbXV0YWJsZU9wdGltaXphdGlvbnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9JbW11dGFibGVPcHRpbWl6YXRpb25zLmpzXG4gKiovIiwiLyohXG4gKiBvbWl0LWtleSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvb21pdC1rZXk+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LCBjb250cmlidXRvcnMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG52YXIgZGlmZmVyZW5jZSA9IHJlcXVpcmUoJ2FycmF5LWRpZmZlcmVuY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbWl0KG9iaiwga2V5cykge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuXG4gIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtrZXlzXTtcbiAgdmFyIGRpZmYgPSBkaWZmZXJlbmNlKHByb3BzLCBrZXlzKTtcbiAgdmFyIG8gPSB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGRpZmZbaV07XG5cbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG9ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb21pdC1rZXlzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaXNvYmplY3QgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBKb24gU2NobGlua2VydCwgY29udHJpYnV0b3JzLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGlzIHRoZSB2YWx1ZSBhbiBvYmplY3QsIGFuZCBub3QgYW4gYXJyYXk/XG4gKlxuICogQHBhcmFtICB7Kn0gYHZhbHVlYFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcbiAgcmV0dXJuIG8gIT0gbnVsbCAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCdcbiAgICAmJiAhQXJyYXkuaXNBcnJheShvKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG5cdHZhciBpbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgZnVuY3Rpb24oZWxlbSkge1xuXHRcdHZhciBpZHgsIGxlbjtcblxuXHRcdGlmICh0aGlzID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbmRleE9mIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0XHR9XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAodGhpc1tpZHhdID09PSBlbGVtKSB7XG5cdFx0XHRcdHJldHVybiBpZHg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGRpZmZlcmVuY2UoYSwgYikge1xuXHRcdHZhciBpZHgsIGxlbjtcblx0XHR2YXIgcmVzID0gW107XG5cblx0XHRmb3IgKGlkeCA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpZHggPCBsZW47ICsraWR4KSB7XG5cdFx0XHRpZiAoaW5kZXhPZi5jYWxsKGIsIGFbaWR4XSkgPT09IC0xKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGFbaWR4XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAoaWR4ID0gMCwgbGVuID0gYi5sZW5ndGg7IGlkeCA8IGxlbjsgKytpZHgpIHtcblx0XHRcdGlmIChpbmRleE9mLmNhbGwoYSwgYltpZHhdKSA9PT0gLTEpIHtcblx0XHRcdFx0cmVzLnB1c2goYltpZHhdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpZmZlcmVuY2U7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Z2xvYmFsLmRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlO1xuXHR9XG5cbn0odGhpcykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYXJyYXktZGlmZmVyZW5jZS9kaWZmZXJlbmNlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=