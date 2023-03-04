import { getPrefixedKey } from './prefix';

export default function rm(key: string, options?: Options): void {
  const queryKey = getPrefixedKey(key, options);

  return localStorage.removeItem(queryKey);
}
