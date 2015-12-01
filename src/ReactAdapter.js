import {memoized, refToHash} from './util';


// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Since
// `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
let makeSwapFromReact = memoized(refToHash, cmp => cmp.setState.bind(cmp));


let ReactAdapter = (NewCursorFn) => {
  return (rootValue, rootSwap) => {
    var isReactCmp = typeof rootValue.__proto__.render === "function";
    if (isReactCmp) {
      let cmp = rootValue;
      return NewCursorFn(cmp.state, makeSwapFromReact(cmp));
    }
    return NewCursorFn(rootValue, rootSwap);
  }
};

export default ReactAdapter;
