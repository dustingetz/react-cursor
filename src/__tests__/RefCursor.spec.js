import _ from 'lodash';
import {Cursor, RefCursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe('RefCursors are not immutable', () => {

  let cur, storeValue;
  const initialState = {a: {b: 42}};


  let suite = {
    'updating cursor does change ref cursor\'s value': () => {
      let prevCurValue = cur.value();
      cur.refine('a', 'b').swap(v => 43);
      expect(_.isEqual(storeValue(), prevCurValue)).to.equal(false);
      expect(cur.value() === prevCurValue).to.equal(false);
    }
  };

  describe('RefCursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = RefCursor.build(store.value, store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = storeValue = null;
    });

    _.map(suite, (v, k) => it(k, v));
  });

  describe('RefCursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      storeValue = () => cmp.state;
      cur = RefCursor.build(cmp);
    });

    afterEach(() => {
      cur = storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });

});