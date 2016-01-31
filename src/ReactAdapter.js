import memoized from './util/memoized';
import refToHash from './util/refToHash';


// To support binding cursors to react state, we need cmp.setState as a function, and the function
// needs to be === if it comes from the same react component. Since
// `cmp.setState.bind(cmp) !== cmp.setState.bind(cmp)`,
// we need to memoize based on the cmp reference.
export let makeSwapFromReact = memoized(refToHash, cmp => cmp.setState.bind(cmp));
export let makeDerefFromReact = memoized(refToHash, cmp => () => cmp.state);
export let makeValueFromReact = cmp => cmp.state;
export let isReactCmp = (a) => typeof a.__proto__.render === "function";
