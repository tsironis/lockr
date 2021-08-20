import { set } from '../src';

describe('Lockr#set', () => {
  it('saves a key-value pair in the localStorage', () => {
    set('test', 123);
    expect(localStorage.getItem('test')).toEqual('{"data":123}');
  });

  it('should save a hash object in the localStorage', function() {
    set('my_hash', { test: 123, hey: 'whatsup' });

    expect(localStorage.getItem('my_hash')).toContain('data');
    expect(localStorage.getItem('my_hash')).toContain('test');
    expect(localStorage.getItem('my_hash')).toContain('123');
    expect(localStorage.getItem('my_hash')).toContain('hey');
    expect(localStorage.getItem('my_hash')).toContain('whatsup');
  });
});
