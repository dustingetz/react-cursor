import _ from 'lodash';
import {Cursor, RefCursor} from '../react-cursor';
import {Store, renderComponentWithState} from './CursorTestUtil';


describe ('Cursor equality', () => {
  it('sanity check that two equal js objects are not ===', () => {
    let a = {b: 42};
    let b = {b: 42};
    expect(a === b).to.equal(false);
    expect(_.isEqual(a, b)).to.equal(true);
  });


  let cur, cur2, storeValue;
  const initialState = {a: {b: 42}};




  let suite = {
    'cursors built from same constructor arguments are ===': () => {
      expect(cur).to.equal(cur2);
      expect(cur.refine('a')).to.equal(cur2.refine('a'));
    },
    'refining the same cursor twice ===': () => {
      expect(cur.refine('a')).to.equal(cur.refine('a'));
    },
    'if an update results in equal value, preserve ===': () => {
      let a = cur.refine('a');
      let prevLeafVal = a.value();
      var nextLeafVal = {b: 42};

      a.swap(v => nextLeafVal);

      // the store preserves ===
      expect(storeValue().a).to.deep.equal(nextLeafVal);
      expect(storeValue().a).to.not.equal(nextLeafVal);
      console.log(cur.value(), cur.refine('a').value(), prevLeafVal)
      expect(storeValue().a).to.equal(prevLeafVal);

      // cursor preserves ===
      //let aa = Cursor.build(storeValue(), store.swap).refine('a');
      //expect(valEq(aa.value(), nextLeafVal)).to.equal(true); // cur valEq nextVal
      //expect(refEq(aa.value(), nextLeafVal)).to.equal(false); // cur not refEq nextVal
      //expect(refEq(aa.value(), prevLeafVal)).to.equal(true); // cur refEq prevVal
    }
  };


  describe('Cursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = Cursor.build(store.value(), store.swap);
      cur2 = Cursor.build(store.value(), store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = cur2 = storeValue = null;
    });

    _.map(suite, (v, k) => it(k, v));
  });

  describe('Cursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      cur = Cursor.build(cmp);
      cur2 = Cursor.build(cmp);
      storeValue = () => cmp.state;
    });

    afterEach(() => {
      cur = cur2 = storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });

  describe('RefCursor with store', () => {
    beforeEach(() => {
      const store = new Store(initialState);
      cur = RefCursor.build(store.value, store.swap);
      cur2 = RefCursor.build(store.value, store.swap);
      storeValue = () => store.value();
    });

    afterEach(() => {
      cur = cur2 = storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });


  describe('RefCursor with react state', () => {
    beforeEach(() => {
      const cmp = renderComponentWithState(initialState);
      cur = RefCursor.build(cmp);
      cur2 = RefCursor.build(cmp);
      storeValue = () => cmp.state;
    });

    afterEach(() => {
      cur = cur2 = storeValue = null;
    });

    _.map(suite, (v, k) => { it(k, v) });
  });
});
