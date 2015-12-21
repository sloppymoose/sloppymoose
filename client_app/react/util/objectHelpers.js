import { camelCase, keys, reduce } from 'lodash';

// Returns a new object with camelize keys
export function camelizeKeys(obj) {
  return reduce(keys(obj), (newTokens, key) => {
    newTokens[camelCase(key)] = obj[key];
    return newTokens;
  }, {});
}
