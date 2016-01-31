import _ from 'lodash';
import {Cursor, RefCursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe('Value cursors are immutable', () => {

  let cur, storeValue;
  const initialState = {a: {b: 42}};


  let suite = {
    'updating cursor does not change value cursor\'s value': () => {
      let prevCurValue = cur.value();
      cur.refine('a', 'b').swap(v => 43);
      expect(_.isEqual(storeValue(), prevCurValue)).to.equal(false);
      expect(cur.value() === prevCurValue).to.equal(true);
    },
    'cannot mutate cursor\'s value by assoc': () => {
      expect(() => cur.value().b = 43).to.throw(Error);
      expect(cur.value() === initialState).to.equal(true);
      expect(storeValue() === initialState).to.equal(true);
    },
    'cannot mutate cursor\'s value by delete': () => {
      expect(() => delete cur.value().a).to.throw(Error);
      expect(cur.value() === initialState).to.equal(true);
      expect(storeValue() === initialState).to.equal(true);
    }
  };

  describe('Cursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = Cursor.build(store.value(), store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = storeValue = null;
    });

    _.map(suite, (v, k) => it(k, v));
  });

  describe('Cursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      cur = Cursor.build(cmp);
      storeValue = () => cmp.state;
    });

    afterEach(() => {
      cur = storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });
});
