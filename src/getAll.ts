import get from './get';
import { default as getKeys } from './keys';

export default function getAll(includeKeys?: boolean) {
  const keys = getKeys();

  if (includeKeys) {
    return keys.reduce(function(accum, key) {
      const tempObj: Index = {};
      tempObj[key] = get(key);
      accum.push(tempObj);
      return accum;
    }, []);
  }

  return keys.map(function(key) {
    return get(key);
  });
}
