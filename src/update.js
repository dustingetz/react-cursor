import {default as persistentUpdate} from 'react-addons-update';
import util from './util';


function update(rootSwap, path, operation, leafUpdate) {
  // Backwards compatibility with non-function values of nextUpdate
  if (typeof leafUpdate !== "function") {
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

    return nextState;
  });
}

export default update;
