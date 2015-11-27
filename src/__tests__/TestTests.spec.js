import {Cursor} from '../react-cursor';

describe('Cursors can be tested', () => {
  it('load the library in the unit tests', function () {
    expect(Cursor).to.be.a('function');
  });

  it('debug mode is turned on in tests', () => {
    expect(Cursor.debug).to.equal(true); // NODE_ENV !== production
  })
});

