import { getPrefixedKey } from './prefix';

export default function get(
  key: string,
  missing?: any,
  options?: Options
): any {
  const queryKey = getPrefixedKey(key, options);
  let value;

  const localValue = localStorage.getItem(queryKey);
  try {
    if (localValue !== null) {
      value = JSON.parse(localValue);
    }
  } catch (e) {
    if (localStorage[queryKey]) {
      value = { data: localStorage.getItem(queryKey) };
    } else {
      value = null;
    }
  }

  if (!value) {
    return missing;
  } else if (typeof value === 'object' && typeof value.data !== 'undefined') {
    return value.data;
  }
}
