import { set, keys as getKeys, sadd, get, getAll, flush } from '../src';

describe('Lockr#get', () => {
  beforeEach(function() {
    set('test', 123);
    sadd('array', 2);
    sadd('array', 3);
    set('hash', { test: 123, hey: 'whatsup' });
    localStorage.nativemethod = 'NativeMethod';
    set('valueFalse', false);
    set('value0', 0);
  });

  afterEach(() => {
    flush();
  });

  it('returns the value for the given key from the localStorage', function() {
    var value = get('test');

    expect(value).toEqual(123);
  });

  it('returns undefined for a non-existent key', function() {
    var value = get('something');

    expect(value).not.toBeNull();
    expect(value).toBeUndefined();
  });

  it('returns the value for the given key from the localStorage which set by native method', function() {
    var value = get('nativemethod');

    expect(value).toEqual('NativeMethod');
  });

  it('returns the value for the given key from the localStorage which equals false', function() {
    var value = get('valueFalse');

    expect(value).toEqual(false);
  });

  it('returns the value for the given key from the localStorage which equals 0', function() {
    var value = get('value0');

    expect(value).toEqual(0);
  });

  it('gets Lockr keys', function() {
    flush();
    set('one', 1);
    set('two', 2);
    set('three', 3);
    set('four', 4);

    var keys = getKeys();

    expect(keys.length).toBe(4);
  });

  it('gets all contents of the localStorage', function() {
    var contents = getAll();

    expect(contents.length).toBe(6);
    expect(contents).toContainEqual({ test: 123, hey: 'whatsup' });
    expect(contents).toContain(123);
    expect(contents).toContainEqual([2, 3]);
  });

  it('gets all contents of the localStorage as Array of dictionaries (key/value)', function() {
    var contents = getAll(true);

    expect(contents.length).toBe(6);
    expect(contents).toContainEqual({ hash: { test: 123, hey: 'whatsup' } });
    expect(contents).toContainEqual({ test: 123 });
    expect(contents).toContainEqual({ array: [2, 3] });
  });

  describe('with pre-existing data', function() {
    beforeEach(function() {
      localStorage.setItem('wrong', ',fluffy,truffly,commas,hell');
      localStorage.setItem('unescaped', 'a " double-quote');
    });

    it("if it's not a json we get as-is", function() {
      var wrongData = get('wrong');
      expect(wrongData).toBe(',fluffy,truffly,commas,hell');
    });

    it('works with unescaped characters', function() {
      var unescaped = get('unescaped');
      expect(unescaped).toBe('a " double-quote');
    });
  });
});
