/* global describe, it, expect, beforeEach */

var util = require('../util');

'use strict';

describe('Util', function() {

  describe('Util.last', function () {
    var items;

    beforeEach(function() {
      items = ['a', 'b', 'c'];
    });

    it('should find last item in array', function () {
      expect(util.last(items)).to.equal('c');
    });
  });

  describe('Util.isObject', function () {
    it('should return true when passing an object literal', function () {
      expect(util.isObject({})).to.be.true;
    });

    it('should return true when passing an instance of a "class"', function () {
      var JsClass = function () {};
      expect(util.isObject(new JsClass())).to.be.true;
    });

    it('should return false when passing a number', function () {
      expect(util.isObject(42)).to.be.false;
    });

    it('should return false when passing null', function () {
      expect(util.isObject(null)).to.be.false;
    });

    it('should return false when passing undefined', function () {
      expect(util.isObject(undefined)).to.be.false;
    })
  });
});
