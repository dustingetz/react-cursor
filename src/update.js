import {default as persistentUpdate} from 'react-addons-update';
import {unDeref, getRefAtPath, valEq} from './util';


function update(rootSwap, path, operation, leafUpdate) {
  if (typeof leafUpdate !== 'function') {
    // Backwards compatibility with non-function values of nextUpdate
    var prevValue = leafUpdate;
    leafUpdate = function ( ) { return prevValue; };
  }

  rootSwap(function (rootVal) {
    var nextRootVal;

    if (path.length > 0) {
      nextRootVal = persistentUpdate(
          rootVal,
          path.concat(operation).reduceRight(
              unDeref,
              leafUpdate(getRefAtPath(rootVal, path))
          )
      );
    } else if (path.length === 0) {
      nextRootVal = leafUpdate(rootVal);
    }

    // would be better to do this valEq check on just the leaf
    return valEq(rootVal, nextRootVal)
        ? rootVal // preserve === if same value
        : nextRootVal;
  });
}

export default update;
