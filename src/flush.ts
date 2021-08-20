import keys from './keys';
import { hasPrefix, getPrefixedKey } from './prefix';

export default function flush() {
  if (hasPrefix()) {
    keys().forEach(key => {
      localStorage.removeItem(getPrefixedKey(key));
    });
  } else {
    localStorage.clear();
  }
}
