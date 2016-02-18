import {updateIn} from 'update-in';
import reduce from 'lodash.reduce';

let debug = process.env.NODE_ENV !== 'production';

export let rootAt = (segments, fn) => (value) => updateIn(value, segments, fn);

let get = (obj, key) => {
  if (debug && !(key in obj)) {
    console.warn(`Refining cursor to non-existent key: '${key}' not found in `, obj);
  }
  return obj[key];
};

export let getIn = (tree, paths) => reduce(paths, get, tree);
