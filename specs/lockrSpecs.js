describe('Lockr::Saving data', function  () {
  it('should save a key-value pair in the localStorage', function () {
    Lockr.set('test', 123);
    expect(localStorage.getItem('test')).toBe('123');
  });
  it('should save a hash object in the localStorage', function () {
    Lockr.hset('my_hash', {'test': 123, "hey": "whatsup"});
    expect(localStorage.getItem('my_hash')).toContain('test');
    expect(localStorage.getItem('my_hash')).toContain('123');
    expect(localStorage.getItem('my_hash')).toContain('hey');
    expect(localStorage.getItem('my_hash')).toContain('whatsup');
  });
});
describe('Lockr::Retrieving data', function  () {
  it('should get a hash object from the localStorage', function () {
    var number = Lockr.get('test');
    var hash = Lockr.get('my_hash');
    expect(hash.hey).toBe('whatsup');
    expect(hash.test).toEqual(123);

    expect(number).toEqual(123);
  });

  it('should get all contents of the localStorage', function () {
    var contents = Lockr.getAll();
    expect(contents.length).toBe(2);
    expect(contents[0].test).toEqual(123);
    expect(contents[0].hey).toBe('whatsup');
    expect(contents[1]).toEqual(123);
  });
});
describe('Lockr::Flushing data', function  () {
  it('should clear all contents of the localStorage', function () {
    Lockr.flush();
    var contents = Lockr.getAll();
    expect(contents.length).toBe(0);
  });
});
