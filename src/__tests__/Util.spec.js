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
});
