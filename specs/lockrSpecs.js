describe('Lockr::Saving data', function  () {
  it('should save a key-value pair in the localStorage', function () {
    Lockr.set('test', 123);
    expect(localStorage.getItem('test')).toEqual('{"data":123}');
    Lockr.set('test_floating', 123.123);
    expect(localStorage.getItem('test_floating')).toEqual('{"data":123.123}');
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
describe('Lockr::Retrieving data', function  () {
  it('should get a hash object from the localStorage', function () {
    var integer = Lockr.get('test');
    var floating = Lockr.get('test_floating');
    var number = Lockr.get('test');
    var hash = Lockr.get('my_hash');
    var empty = Lockr.get('something_that_doesnt_exist');
    expect(hash.hey).toBe('whatsup');
    expect(hash.test).toEqual(123);

    expect(integer).toEqual(123);
    expect(floating).toEqual(123.123);
    expect(empty).not.toBeNull();
    expect(empty).toBeUndefined();
  });

  it('should get all contents of the localStorage', function () {
    var contents = Lockr.getAll();
    expect(contents.length).toBe(3);
    expect(contents).toContain(123.123);
    expect(contents).toContain({"test": 123, "hey": "whatsup"});
    expect(contents).toContain(123);
  });

  it('should return strings containing "{"" as strings', function () {
    var theString = 'This is a string containing the characters "{", "}", "[", "]", ":" which are used in objects';

    Lockr.set('aString', theString);
    expect(Lockr.get('aString')).toEqual(theString);
  });
});

describe('Lockr::Deleting an element', function () {
  it('should remove succesfully a key-value pair', function() {
    Lockr.rm('test_floating');
    expect(Lockr.get('test_floating')).toBeUndefined();
    var contents = Lockr.getAll();
    expect(contents.length).toBe(3);
  });
});
describe('Lockr::Flushing data', function  () {
  it('should clear all contents of the localStorage', function () {
    Lockr.flush();
    var contents = Lockr.getAll();
    expect(contents.length).toBe(0);
  });
});
