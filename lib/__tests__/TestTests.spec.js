'use strict';

var _reactCursor = require('../react-cursor');

describe('Cursors can be tested', function () {
  it('load the library in the unit tests', function () {
    expect(_reactCursor.Cursor).to.be.a('function');
  });

  it('debug mode is turned on in tests', function () {
    expect(process.env.NODE_ENV !== 'production').to.equal(true);
  });
});