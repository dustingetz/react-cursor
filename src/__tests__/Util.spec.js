/* global describe, it, expect, beforeEach */
import {last} from '../util';


describe('Util', function() {

  describe('last', function () {
    var items;

    beforeEach(function() {
      items = ['a', 'b', 'c'];
    });

    it('should find last item in array', function () {
      expect(last(items)).to.equal('c');
    });
  });
});
