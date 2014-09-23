(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react/addons');
var _     = require('underscore');
var util  = require('./util');

'use strict';

function Cursor(cmp, path, value) {
  // value to put in the DOM, use from render() and the component lifecycle methods
  this.value = value;

  this.pendingValue = function () {
    // the current value right now, use in event handlers
    return util.getRefAtPath(cmp._pendingState || cmp.state, path);
  };

  this.onChange = _.partial(onChange, cmp, path);

  this.refine = function (/* one or more paths through the tree */) {
    // When refining inside a lifecycle method, same cmp and same path isn't enough.
    // this.props and nextProps have different subtree values, and refining memoizer must account for that

    var nextPath = [].concat(path, util.flatten(arguments));
    var nextValue = util.getRefAtPath(this.value, _.toArray(arguments));
    return build(cmp, nextPath, nextValue); // memoized
  };
}

function onChange(cmp, path, nextValue) {
  var nextState;

  if (path.length > 0) {
    nextState = React.addons.update(
      cmp._pendingState || cmp.state,
      path.concat('$set').reduceRight(util.unDeref, nextValue)
    );
  }
  else if (path.length === 0) {
    nextState = nextValue;
  }
  cmp.setState(nextState);
}


// If we build two cursors for the same path on the same React component,
// and those React components have equal state, reuse the same cursor instance,
// so we can use === to compare them.
var cursorBuildMemoizer = util.memoizeFactory(function (cmp, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(cmp.state, path);
  return util.refToHash(cmp) + util.hashRecord(value) + util.hashRecord(path);
  // I think we want to clamp this to cachesize === 2, because we only
  // care about this.state and nextState.
});

var build = cursorBuildMemoizer(function (cmp, path, value) {
  path = path === undefined ? [] : path;
  value = value || util.getRefAtPath(cmp.state, path);
  return new Cursor(cmp, path, value);
});

Cursor.build = build;

module.exports = Cursor;


},{"./util":4,"react/addons":"react/addons","underscore":"underscore"}],2:[function(require,module,exports){
var _ = require('underscore');

'use strict';

function ImmutableOptimizations (refFields, ignoredFields/*optional*/) {
  ignoredFields = ignoredFields === undefined ? [] : ignoredFields;
  return {
    shouldComponentUpdate: function (nextProps) {
      var valuesChanged = !_.isEqual(
        _.omit(nextProps, _.union(refFields, ignoredFields)),
        _.omit(this.props, _.union(refFields, ignoredFields)));

      var refsChanged = !_.every(refFields, function (field) {
        return this.props[field] === nextProps[field];
      }.bind(this));

      return valuesChanged || refsChanged;
    }
  };
}

module.exports = ImmutableOptimizations;

},{"underscore":"underscore"}],3:[function(require,module,exports){
var Cursor = require('./Cursor');
var ImmutableOptimizations = require('./ImmutableOptimizations');

'use strict';

module.exports = {
  Cursor: Cursor,
  ImmutableOptimizations: ImmutableOptimizations
}

},{"./Cursor":1,"./ImmutableOptimizations":2}],4:[function(require,module,exports){
  'use strict';

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

    var cmpsWithUid = _.pairs(refsCache);
    var cmpFound = _.find(cmpsWithUid, function (cmpAndId) { return cmpAndId[1] === cmp; });
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
      hashString: hashString,
      generateUUID: generateUUID,
      hashRecord: hashRecord,
      refToHash: refToHash,
      memoizeFactory: memoizeFactory
  };

},{}]},{},[3]);
