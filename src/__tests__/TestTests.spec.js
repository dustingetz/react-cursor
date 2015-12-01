import {Cursor} from '../react-cursor';

describe('Cursors can be tested', () => {
  it('load the library in the unit tests', function () {
    expect(Cursor).to.be.a('function');
  });

  it('debug mode is turned on in tests', () => {
    expect(process.env.NODE_ENV !== 'production').to.equal(true);
  })
});

