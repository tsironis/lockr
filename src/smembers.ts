import { getPrefixedKey } from './prefix';
export default function smembers(key: string, options?: Options): Array<any> {
  const queryKey = getPrefixedKey(key, options);
  let value;

  const localValue = localStorage.getItem(queryKey);
  if (localValue !== null) {
    value = JSON.parse(localValue);
  } else {
    value = null;
  }

  return value && value.data ? value.data : [];
}
