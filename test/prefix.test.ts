import {
  setPrefix,
  keys as getKeys,
  getPrefixedKey,
  set,
  flush,
  sadd,
  getAll,
} from '../src';

describe('Lockr#prefix', function() {
  it('should set a prefix', function() {
    expect(setPrefix('imaprefix')).toEqual('imaprefix');
  });
  it('should return a correctly prefixed key', function() {
    expect(getPrefixedKey('lalala')).toEqual('imaprefixlalala');
  });
  it('should return a non-prefixed key', function() {
    expect(getPrefixedKey('lalala', { noPrefix: true })).toEqual('lalala');
  });
  it('should save a key-value pair, prefixed', function() {
    set('justlikeyou', true);
    expect('imaprefixjustlikeyou' in localStorage).toEqual(true);
  });
  it('gets Lockr keys (with prefix)', function() {
    flush();

    localStorage.setItem('zero', '0');
    set('one', 1);
    set('two', 2);
    set('three', 3);
    set('four', 4);

    var keys = getKeys();

    expect(keys.length).toBe(4);
    expect(keys).toMatchObject({});
  });

  describe('flush', function() {
    it('clears all contents of the localStorage with prefix', function() {
      localStorage.setItem('noprefix', 'false');
      set('test', 123);
      sadd('array', 2);
      sadd('array', 3);
      set('hash', { test: 123, hey: 'whatsup' });

      var oldContents = getAll();
      var keys = Object.keys(localStorage);

      expect(oldContents.length).not.toBe(0);
      expect(keys).toContain('noprefix');
      flush();
      expect(keys).toContain('noprefix');

      var contents = getAll();
      expect(contents.length).toBe(0);
    });
  });
});
