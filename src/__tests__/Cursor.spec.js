/* global describe, it, expect */
import { Cursor } from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';
import clone from 'clone';
import {isEqual, valEq, refEq} from '../util';


describe('Cursors can be tested', () => {
  it('load the library in the unit tests', function () {
    expect(Cursor).to.be.a('function');
  });

  it('debug mode is turned on in tests', () => {
    expect(Cursor.debug).to.equal(true); // NODE_ENV !== production
  })
});

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


describe('Cursor refine', () => {
  it('cursors can refine by path', function () {
    var cmp = renderComponentWithState({ a: 42 });
    var c = Cursor.build(cmp);
    expect(c.value().a).to.equal(42);
    expect(c.refine('a').value()).to.equal(42);
  });
});


describe('Cursor operations', () => {
  var store, cur;

  beforeEach(() => {
    store = new Store({a: {b: 42}});
    cur = Cursor.build(store.value(), store.swap);
  });

  afterEach(() => {
    store = null;
    cur = null;
  });

  it('set at leaf', () => {
    expect(store.value()).to.deep.equal({a: {b: 42}});
    cur.refine('a', 'b').set(43);
    expect(store.value()).to.deep.equal({a: {b: 43}});
  });

  it('set at object', () => {
    expect(store.value()).to.deep.equal({a: {b: 42}});
    cur.refine('a').set({b: 43});
    expect(store.value()).to.deep.equal({a: {b: 43}});
  });

  it('push', function () {
    var cmp = renderComponentWithState({a: [1, 2, 3]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.push([4]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4]);
    a.push([5, 6]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('unshift', function () {
    var cmp = renderComponentWithState({a: [4, 5, 6]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.unshift([3]);
    expect(cmp.state.a).to.deep.equal([3, 4, 5, 6]);
    a.unshift([2, 1]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('splice', function () {
    var cmp = renderComponentWithState({a: [1, 2, 3]});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.splice([[1, 1, 4]]);
    expect(cmp.state.a).to.deep.equal([1, 4, 3]);
    a.splice([[0, 1, 6, 5], [4, 0, 2, 1]]);
    expect(cmp.state.a).to.deep.equal([6, 5, 4, 3, 2, 1]);
  });

  it('merge', function () {
    var cmp = renderComponentWithState({a: {b: 64}});
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.merge({ c: 72 });
    expect(cmp.state.a).to.deep.equal({ b: 64, c: 72});
  });

  it('apply against react state', function () {
    var cmp = renderComponentWithState({a: 64 });
    var c = Cursor.build(cmp);
    var a = c.refine('a');
    a.apply((root) => (leaf) => leaf/8);
    expect(cmp.state.a).to.equal(8);
  });

  it('apply against store', function () {
    cur.refine('a').apply((root) => (leaf) => leaf/8);
    expect(store.value().a).to.equal(8);
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

    a.apply(root => leaf => nextLeafVal);

    expect(valEq(cmp.state.a, nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(cmp.state.a, nextLeafVal)).to.equal(false); // cur not refEq nextVal

    let cur2 = Cursor.build(cmp).refine('a');
    expect(valEq(cur2.value(), nextLeafVal)).to.equal(true); // cur valEq nextVal
    expect(refEq(cur2.value(), nextLeafVal)).to.equal(false); // cur not refEq nextVal
    expect(refEq(cur2.value(), prevLeafVal)).to.equal(true); // cur refEq prevVal
  });
});
