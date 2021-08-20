import { set, setPrefix, sadd, getAll, flush } from '../src';

describe('Lockr#flush', function() {
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

  it('clears all prefixed keys created by Lockr', function() {
    setPrefix('example');

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
