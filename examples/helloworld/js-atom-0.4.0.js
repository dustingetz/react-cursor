!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.atom=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  /*global exports*/

  exports.createAtom = function createAtom(val, options) {
    var watchers = {};
    var validator = options && options.validator || function () { return true; };

    function transition(next) {
      if (!validator(next)) {
        var err = new Error(next + " failed validation");
        err.name = "AssertionError";
        throw err;
      }

      var prev = val;
      val = next;

      Object.keys(watchers).forEach(function (k) {
        watchers[k](k, atom, prev, next);
      });
    }

    var atom = {
      addWatch: function (key, fn) {
        watchers[key] = fn;
      },

      removeWatch: function (key) {
        delete watchers[key];
      },

      swap: function (fn) {
        var args = [val].concat([].slice.call(arguments, 1));
        transition(fn.apply(null, args));
      },

      reset: function (v) {
        transition(v);
      },

      deref: function () {
        return val;
      },

      toString: function () {
        return "Atom(" + JSON.stringify(val) + ")";
      }
    };

    return atom;
  };

},{}]},{},[1])(1)
});
