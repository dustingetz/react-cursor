/* global describe, it, expect */
import {Cursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';
import {valEq, refEq} from '../util';


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
