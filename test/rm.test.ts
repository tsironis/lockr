import { set, get, sadd, rm, getAll } from '../src';

describe('Lockr.rm', function() {
  beforeEach(function() {
    set('test', 123);
    sadd('array', 2);
    sadd('array', 3);
    set('hash', { "test": 123, "hey": "whatsup" });
  });
  it('removes succesfully a key-value pair', function() {
    var oldContents = getAll();
    expect(oldContents.length).toBe(3);
    rm('test');
    expect(get('test')).toBeUndefined();
    var contents = getAll();
    expect(contents.length).toBe(2);
  });
});
