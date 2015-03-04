afterEach(function() {
  localStorage.clear();
});

describe('Lockr.set', function  () {
  it('saves a key-value pair in the localStorage', function () {
    Lockr.set('test', 123);

    expect(localStorage.getItem('test')).toEqual('{"data":123}');
  });

  it('should save a hash object in the localStorage', function () {
    Lockr.set('my_hash', {"test": 123, "hey": "whatsup"});

    expect(localStorage.getItem('my_hash')).toContain('data');
    expect(localStorage.getItem('my_hash')).toContain('test');
    expect(localStorage.getItem('my_hash')).toContain('123');
    expect(localStorage.getItem('my_hash')).toContain('hey');
    expect(localStorage.getItem('my_hash')).toContain('whatsup');
  });
});

describe('Lockr.get', function () {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', {"test": 123, "hey": "whatsup"});
  });

  it('returns the value for the given key from the localStorage', function () {
    var value = Lockr.get('test');

    expect(value).toEqual(123);
  });

  it('returns undefined for a non-existent key', function() {
    var value = Lockr.get('something');

    expect(value).not.toBeNull();
    expect(value).toBeUndefined();
  });

  it('gets all contents of the localStorage', function () {
    var contents = Lockr.getAll();

    expect(contents.length).toBe(3);
    expect(contents).toContain({"test": 123, "hey": "whatsup"});
    expect(contents).toContain(123);
    expect(contents).toContain([2, 3]);
  });

  describe('with wrong data', function() {
    beforeEach(function() {
      localStorage.setItem('wrong', ',fluffy,truffly,commas,hell');
    });

    it('cleans wrong data', function () {
      var wrongData = Lockr.get("wrong");

      expect(wrongData).toBeUndefined();
    });
  });
});

describe('Lockr.rm', function () {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', {"test": 123, "hey": "whatsup"});
  });

  it('removes succesfully a key-value pair', function() {
    var oldContents = Lockr.getAll();
    expect(oldContents.length).toBe(3);

    Lockr.rm('test');
    expect(Lockr.get('test')).toBeUndefined();

    var contents = Lockr.getAll();
    expect(contents.length).toBe(2);
  });
});

describe('Lockr.flush', function  () {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', {"test": 123, "hey": "whatsup"});
  });

  it('clears all contents of the localStorage', function () {
    var oldContents = Lockr.getAll();
    expect(oldContents.length).not.toBe(0);

    Lockr.flush();

    var contents = Lockr.getAll();
    expect(contents.length).toBe(0);
  });
});

describe('Sets', function() {
  beforeEach(function() {
    Lockr.sadd('test_set', 1);
    Lockr.sadd('test_set', 2);
  });

  describe('Lockr.sadd', function () {
    it('saves a set under the given key in the localStorage', function () {
      Lockr.sadd('a_set', 1);
      Lockr.sadd('a_set', 2);

      expect(localStorage.getItem('a_set')).toEqual('{"data":[1,2]}');
    });

    it('does not add the same value again', function() {
      Lockr.sadd('test_set', 1);
      Lockr.sadd('test_set', 2);
      Lockr.sadd('test_set, 1');

      expect(Lockr.smembers('test_set')).toEqual([1, 2]);
    });
  });

  describe('Lockr.smembers', function() {
    it('returns all the values for given key', function() {
      expect(Lockr.smembers('test_set')).toEqual([1, 2]);
    });
  });

  describe('Lock.sismember', function() {
    it('returns true if the value exists in the given set(key)', function () {
      expect(Lockr.sismember('test_set', 1)).toEqual(true);
      expect(Lockr.sismember('test_set', 34)).toEqual(false);
    });
  });

  describe('Lock.srem', function() {
    it('removes value from collection if exists', function() {
      Lockr.srem('test_set', 1);
      expect(Lockr.sismember('test_set', 1)).toEqual(false);
    });
  });
});

describe('Lockr::Prefixed', function() {
  it('should set a prefix', function() {
    Lockr.prefix = "imaprefix";
    expect(Lockr.prefix).toEqual("imaprefix");
  });
  it('should return a correctly prefixed key', function() {
    expect(Lockr._getPrefixedKey('lalala')).toEqual('imaprefixlalala');
  });
  it('should return a non-prefixed key', function() {
    expect(Lockr._getPrefixedKey('lalala', {noPrefix: true})).toEqual("lalala");
  });
  it('should save a key-value pair, prefixed', function() {
    Lockr.set("justlikeyou", true);
    expect("imaprefixjustlikeyou" in localStorage).toEqual(true);
  });
});
