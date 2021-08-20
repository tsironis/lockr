import { getPrefixedKey } from './prefix';
import smembers from './smembers';

export default function srem(key: string, value: any, options?: Options) {
  const queryKey = getPrefixedKey(key, options);
  const values = smembers(key, value);
  const index = values.indexOf(value);

  if (index > -1) {
    values.splice(index, 1);
  }

  const json = JSON.stringify({ data: values });

  try {
    localStorage.setItem(queryKey, json);
  } catch (e) {
    if (console)
      console.warn(
        "Lockr couldn't remove the " + value + ' from the set ' + key
      );
  }
}
