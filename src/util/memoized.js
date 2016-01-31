import identity from 'lodash.identity';


export default function memoized (hasher = identity, f) {
  let cache = {};
  return (...args) => {
    // hasher gets the same arguments as f, to create the hashKey
    const hashKey = hasher.apply(this, args);
    return hasOwnProperty.call(cache, hashKey)
        ? cache[hashKey]
        : (cache[hashKey] = f.apply(this, args));
  };
};
