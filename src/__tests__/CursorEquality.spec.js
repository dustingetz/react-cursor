import {Cursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';
import {valEq, refEq} from '../util';


describe('Cursors ensure equal values are ===', () => {
  var store, cur;

  beforeEach(() => {
    store = new Store({a: {b: 42}});
    cur = Cursor.build(store.value(), store.swap).refine('a');
  });

  afterEach(() => {
    store = null;
    cur = null;
  });

  it('sanity check that two equal js objects are not ===', () => {
    expect({b: 42} === {b: 42}).to.equal(false);
    expect(refEq(cur.value(), {b: 42})).to.equal(false);
    expect(valEq(cur.value(), {b: 42})).to.equal(true);
  });

  it('Cursors built from same react component are ===', function () {
    var cmp = renderComponentWithState({ a: 42 });

    var c1 = Cursor.build(cmp);
    var c2 = Cursor.build(cmp);

    expect(c1).to.equal(c2);
    expect(c1.set).to.equal(c2.set);
    expect(c1.value()).to.equal(c2.value());

    var c10 = c1.refine('a');
    var c20 = c2.refine('a');
    expect(c10).to.equal(c20);
    expect(c10.value()).to.equal(c20.value());
    expect(c10.set).to.equal(c20.set);

    var c20b = c2.refine('a');
    expect(c20).to.equal(c20b);
    expect(c20.value()).to.equal(c20b.value());
    expect(c20.set).to.equal(c20b.set);
  });

  it('Cursors built from same rootValue/rootSwap are ===', function () {
    var c1 = Cursor.build(store.value(), store.swap);
    var c2 = Cursor.build(store.value(), store.swap);

    expect(c1).to.equal(c2);
    expect(c1.set).to.equal(c2.set);
    expect(c1.value()).to.equal(c2.value());

    var c10 = c1.refine('a');
    var c20 = c2.refine('a');
    expect(c10).to.equal(c20);
    expect(c10.value()).to.equal(c20.value());
    expect(c10.set).to.equal(c20.set);

    var c20b = c2.refine('a');
    expect(c20).to.equal(c20b);
    expect(c20.value()).to.equal(c20b.value());
    expect(c20.set).to.equal(c20b.set);
  });

  it('cursor set with equal value preserves ===', () => {
    let prevLeafVal = cur.value();
    var nextLeafVal = {b: 42};

    expect(valEq(prevLeafVal, nextLeafVal)).to.equal(true); // same value
    expect(refEq(prevLeafVal, nextLeafVal)).to.equal(false); // different reference

    cur.set(nextLeafVal);

    // the store preserves ===
    expect(valEq(store.value().a, nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(store.value().a, nextLeafVal)).to.equal(false); // cur not refEq nextVal
    expect(refEq(store.value().a, prevLeafVal)).to.equal(true); // cur refEq prevVal

    // cursor preserves ===
    let cur2 = Cursor.build(store.value(), store.swap).refine('a');
    expect(valEq(cur2.value(), nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(cur2.value(), nextLeafVal)).to.equal(false); // cur not refEq nextVal
    expect(refEq(cur2.value(), prevLeafVal)).to.equal(true); // cur refEq prevVal
  });

  it('cursor apply resulting in equal value preserves ===', () => {

    var cmp = renderComponentWithState({a: {b: 42}});
    var a = Cursor.build(cmp).refine('a');

    let prevLeafVal = a.value();
    var nextLeafVal = {b: 42};

    a.apply(leaf => nextLeafVal);

    expect(valEq(cmp.state.a, nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(cmp.state.a, nextLeafVal)).to.equal(false); // cur not refEq nextVal

    let cur2 = Cursor.build(cmp).refine('a');
    expect(valEq(cur2.value(), nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(cur2.value(), nextLeafVal)).to.equal(false); // cur not refEq nextVal
    expect(refEq(cur2.value(), prevLeafVal)).to.equal(true); // cur refEq prevVal
  });
});


describe('cursors are frozen', () => {
  it('should eventually throw an exception when adding new keys to a cursor value', function () {
    var cmp = renderComponentWithState({ a: 42 });
    var root = Cursor.build(cmp);
    expect(() => root.value().b = 43).to.throw(Error);
  });

  it('should eventually throw an exception when removing keys from a cursor value', function () {
    var cmp = renderComponentWithState({ a: 42, b: 43 });
    var root = Cursor.build(cmp);
    expect(() => delete root.value().b).to.throw(Error);
  });
});
