import {updateIn} from 'update-in';
import reduce from 'lodash.reduce';


export let rootAt = (segments, fn) => (value) => updateIn(value, segments, fn);

let get = (obj, key) => {
  console.assert(key in obj, `Bad cursor refine: '${key}' not found in `, obj);
  return obj[key];
};

export let getIn = (tree, paths) => reduce(paths, get, tree);
