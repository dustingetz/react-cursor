import {default as persistentUpdate} from 'react-addons-update';
import util from './util';


function update(rootSwap, path, operation, leafUpdate) {
  if (typeof leafUpdate === 'function') {
    // Don't setState if nextUpdate produces the same value
    // run this check at the leaf, not the root, since isEqual is O(n)
    var leafVal = util.getRefAtPath(this.value(), path);
    var nextLeafVal = leafUpdate(leafVal);
    if (util.isEqual(nextLeafVal, leafVal)) {
      return;
    }
  } else {
    // Don't setState if nextUpdate is equivalent to this.value
    if (leafUpdate === this.value() || util.isEqual(leafUpdate, this.value())) {
      return;
    }

    // Backwards compatibility with non-function values of nextUpdate
    var prevValue = leafUpdate;
    leafUpdate = function ( ) { return prevValue; };
  }

  rootSwap(function (rootVal) {
    var nextState;

    if (path.length > 0) {
      nextState = persistentUpdate(
          rootVal,
          path.concat(operation).reduceRight(
              util.unDeref,
              leafUpdate(util.getRefAtPath(rootVal, path))
          )
      );
    } else if (path.length === 0) {
      nextState = leafUpdate(rootVal);
    }

    // if nextState is the same as the prevState, just return the prevState,
    // to preserve reference equality.

    return nextState;
  });
}

export default update;
