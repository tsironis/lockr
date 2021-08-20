import getPrefix, { hasPrefix } from './prefix';
export default function keys() {
  const prefix = getPrefix();
  const keys: Array<any> = [];
  const allKeys = Object.keys(localStorage);

  if (!hasPrefix()) {
    return allKeys;
  }

  allKeys.forEach(function(key) {
    if (key.indexOf(prefix) !== -1) {
      keys.push(key.replace(prefix, ''));
    }
  });

  return keys;
}
