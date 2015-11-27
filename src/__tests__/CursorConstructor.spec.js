import {Cursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe('Cursor constructors', function () {
  it("can we make an instance of a react cmp and get at the state", function () {
    var cmp = renderComponentWithState({ a: 42 });
    expect(cmp.state.a).to.equal(42);
  });

  it('Can build cursor from a react component reference', function () {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);
    expect(c.value()).to.equal(cmp.state);
  });

  it('Can build cursor decoupled from react component (rootValue/rootSwap)', function () {
    var store = new Store({a: 42});
    var c = Cursor.build(store.value(), store.swap);
    expect(c.value()).to.equal(store.value());
  });
});
