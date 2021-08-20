let PREFIX = '';
export function setPrefix(prefix: string): string {
  PREFIX = prefix;
  return PREFIX;
}
export function getPrefixedKey(key: string, options?: Options): string {
  if (options?.noPrefix === true) {
    return key;
  } else {
    return `${PREFIX}${key}`;
  }
}

export function hasPrefix(): boolean {
  return PREFIX.length > 0;
}

export function getPrefix(): string {
  return PREFIX;
}

export default getPrefix;
