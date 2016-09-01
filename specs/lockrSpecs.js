beforeEach(function() {
  timerCallback = jasmine.createSpy('timerCallback');
  jasmine.clock().install();
})
afterEach(function() {
  localStorage.clear();
  jasmine.clock().uninstall();
});

describe('Lockr.set', function() {
  it('saves a key-value pair in the localStorage', function() {
    Lockr.set('test', 123);

    expect(localStorage.getItem('test')).toContain('"data":123,');
  });

  it('should save a hash object in the localStorage', function() {
    Lockr.set('my_hash', { "test": 123, "hey": "whatsup" });

    expect(localStorage.getItem('my_hash')).toContain('data');
    expect(localStorage.getItem('my_hash')).toContain('test');
    expect(localStorage.getItem('my_hash')).toContain('123');
    expect(localStorage.getItem('my_hash')).toContain('hey');
    expect(localStorage.getItem('my_hash')).toContain('whatsup');
  });
});

describe('Lockr.get', function() {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', { "test": 123, "hey": "whatsup" });
    localStorage.nativemethod = 'NativeMethod'
    Lockr.set('valueFalse', false)
    Lockr.set('value0', 0)
  });

  it('returns the value for the given key from the localStorage', function() {
    var value = Lockr.get('test');
    expect(value).toEqual(123);
  });

  it('returns undefined for a non-existent key', function() {
    var value = Lockr.get('something');

    expect(value).not.toBeNull();
    expect(value).toBeUndefined();
  });

  it('returns the value for the given key from the localStorage which set by native method', function() {
    var value = Lockr.get('nativemethod');
    expect(value).toEqual('NativeMethod');
  });

  it('returns the value for the given key from the localStorage which equals false', function() {
    var value = Lockr.get('valueFalse');

    expect(value).toEqual(false);
  });

  it('returns the value for the given key from the localStorage which equals 0', function() {
    var value = Lockr.get('value0');

    expect(value).toEqual(0);
  });

  it('gets Lockr keys', function() {
    Lockr.flush();
    Lockr.set('one', 1);
    Lockr.set('two', 2);
    Lockr.set('three', 3);
    Lockr.set('four', 4);

    var keys = Lockr.keys();

    expect(keys.length).toBe(4);
    expect(keys).toContain('one', 'two', 'three', 'four');
  });

  it('gets all contents of the localStorage', function() {
    var contents = Lockr.getAll();
    expect(contents.length).toBe(6);
    expect(contents).toContain({ "test": 123, "hey": "whatsup" });
    expect(contents).toContain(123);
    expect(contents).toContain([2, 3]);
  });

  describe('with pre-existing data', function() {
    beforeEach(function() {
      localStorage.setItem('wrong', ',fluffy,truffly,commas,hell');
      localStorage.setItem('unescaped', 'a " double-quote');
    });

    it("if it's not a json we get as-is", function() {
      var wrongData = Lockr.get("wrong");
      expect(wrongData).toBe(',fluffy,truffly,commas,hell');
    });

    it('works with unescaped characters', function() {
      var unescaped = Lockr.get('unescaped');
      expect(unescaped).toBe('a " double-quote');
    });
  });

  describe('set the expiration time', function() {
    beforeEach(function() {
      Lockr.set('tom', '28', { expires: .1 }); //6s

      var now = new Date();
      jasmine.clock().mockDate(now);
    });

    it('works in the expiration time', function() {
      jasmine.clock().tick(7000); //7s
      var value = Lockr.get('tom');

      expect(value).toBeUndefined();
    });

    it('works in the effective time', function(){
      jasmine.clock().tick(5000); //5s
      var value = Lockr.get('tom');

      expect(value).toEqual('28');
    });
    
  });
});

describe('Lockr.rm', function() {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', { "test": 123, "hey": "whatsup" });
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

describe('Lockr.flush', function() {
  beforeEach(function() {
    Lockr.set('test', 123);
    Lockr.sadd('array', 2);
    Lockr.sadd('array', 3);
    Lockr.set('hash', { "test": 123, "hey": "whatsup" });
  });

  it('clears all contents of the localStorage', function() {
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

  describe('Lockr.sadd', function() {
    it('saves a set under the given key in the localStorage', function() {
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
    it('returns true if the value exists in the given set(key)', function() {
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

describe('Lockr::Timestamp', function() {
  it('returns the default after 10 years', function() {
    //new Date(1e6 * 6 * 6 * 24 * 364); less 1 day than 10 year
    expect(Lockr.getExpirationTime()).toBeGreaterThan(new Date().getTime() + 1e6 * 6 * 6 * 24 * 364);
  });

  it('should set global expires time', function() {
    Lockr.expires = 10; //1m == 60s

    expect(Lockr.expires).toEqual(10);
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
    expect(Lockr._getPrefixedKey('lalala', { noPrefix: true })).toEqual("lalala");
  });
  it('should save a key-value pair, prefixed', function() {
    Lockr.set("justlikeyou", true);
    expect("imaprefixjustlikeyou" in localStorage).toEqual(true);
  });
  it('gets Lockr keys (with prefix)', function() {
    Lockr.flush();

    localStorage.setItem('zero', 0);
    Lockr.set('one', 1);
    Lockr.set('two', 2);
    Lockr.set('three', 3);
    Lockr.set('four', 4);

    var keys = Lockr.keys();

    expect(keys.length).toBe(4);
    expect(keys).toContain('one', 'two', 'three', 'four');
  });

  describe('Lockr.flush', function() {
    it('clears all contents of the localStorage with prefix', function() {
      localStorage.setItem('noprefix', false);
      Lockr.set('test', 123);
      Lockr.sadd('array', 2);
      Lockr.sadd('array', 3);
      Lockr.set('hash', { "test": 123, "hey": "whatsup" });

      var oldContents = Lockr.getAll();
      var keys = Object.keys(localStorage);

      expect(oldContents.length).not.toBe(0);
      expect(keys).toContain('noprefix')
      Lockr.flush();
      expect(keys).toContain('noprefix')

      var contents = Lockr.getAll();
      expect(contents.length).toBe(0);
    });
  });


});
