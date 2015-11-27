import {Cursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe('Cursor refine', () => {
  it('cursors can refine by path', function () {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);
    expect(c.value().a).to.equal(42);
    expect(c.refine('a').value()).to.equal(42);
  });
});
