const { keys } = Object;

/*
 * Implementing our own `forEach` and `forEachKey` (essentially map for
 * arrays and objects) because using Array.map and Array.reduce was
 * approximately 50% as performant.
 * 
 * https://github.com/Nevon/logsplit/pull/1
 */

const forEach = (collection, fn) => {
  const out = [];

  for (let i = 0, len = collection.length; i < len; i++) {
    out.push(fn(collection[i]));
  }

  return out;
};

const forEachKey = (collection, fn) => {
  const out = {};

  const collectionKeys = keys(collection);
  for (let len = collectionKeys.length, i = 0; i < len; i++) {
    const key = collectionKeys[i];
    out[key] = fn(collection[key]);
  }

  return out;
};

module.exports = {
  forEach,
  forEachKey
};
