import smembers from './smembers';
import { getPrefixedKey } from './prefix';

export default function sadd(
  key: string,
  value: any,
  options?: Options
): boolean {
  const queryKey = getPrefixedKey(key, options);
  let json;

  var values = smembers(key);

  if (values.indexOf(value) > -1) {
    return false;
  }

  try {
    values.push(value);
    json = JSON.stringify({ data: values });
    localStorage.setItem(queryKey, json);
  } catch (e) {
    console.log(e);
    if (console)
      console.warn(
        "Lockr didn't successfully add the " +
          value +
          ' to ' +
          key +
          ' set, because the localStorage is full.'
      );
  }
  return true;
}
