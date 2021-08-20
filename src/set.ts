import { getPrefixedKey } from './prefix';

export default function set(key: string, value: any, options?: Options): void {
  var query_key = getPrefixedKey(key, options);

  try {
    localStorage.setItem(query_key, JSON.stringify({ data: value }));
  } catch (e) {
    if (console) {
      console.warn(
        `Lockr didn't successfully save the '{"${key}": "${value}"}' pair, because the localStorage is full.`
      );
    }
  }
}
