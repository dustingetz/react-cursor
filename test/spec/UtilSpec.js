var util = require('../../src/util');

'use strict';

describe('Util', function() {
  var items;

  beforeEach(function() {
    items = ['a', 'b', 'c'];
  });

  it('#last should find last item in array', function () {
    expect(util.last(items)).to.equal('c');
  });
});

