import {default as persistentUpdate} from 'react-addons-update';
import {valEq, flatten, apply} from './util';


export function merge (a, b) {
  return persistentUpdate(a, {$merge: b});
}

export function push (as, bs) {
  return persistentUpdate(as, {$push: bs});
}

export function unshift (as, bs) {
  return persistentUpdate(as, {$unshift: bs});
}

export function splice (as, splices) {
  // persistentUpdate([12, 17, 15], {$splice: [[1, 1, 13, 14]]}) => [12, 13, 14, 15]
  return persistentUpdate(as, {$splice: splices});
}


/**
 * Thin wrapper over react-addons-update to apply a function at path
 * preserving other references.
 */
export function updateIn (rootVal, paths, f, ...args) {
  let ff = (v) => apply(f, v, args);

  var newRootVal;
  if (paths.length > 0) {
    const command = rootAt(paths, {$apply: ff});
    newRootVal = persistentUpdate(rootVal, command);
  }
  else if (paths.length === 0) {
    newRootVal = ff(rootVal);
  }

  // would be better to do this valEq check on just the leaf
  return valEq(rootVal, newRootVal)
      ? rootVal // preserve === if same value
      : newRootVal;
}



// Helper methods for forming react-addons-update commands.

/**
 * @param leafVal e.g. {$apply: f}
 * @param paths e.g. ['x', 'y', 'z']
 * @returns e.g. {x: {y: {z: {$apply: f}}}
 */
function rootAt (paths, leafVal) {
  return paths.reduceRight(unDeref, leafVal)
}


/**
 * @param obj e.g {$apply: f}
 * @param key e.g. 'foo'
 * @returns e.g. {foo: {$apply: f}}
 */
function unDeref(obj, key) { // aka un-get
  var nextObj = {};
  nextObj[key] = obj;
  return nextObj;
}
