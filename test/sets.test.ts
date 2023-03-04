import sadd from '../src/sadd';
import sismember from '../src/sismember';
import smembers from '../src/smembers';
import srem from '../src/srem';

describe('Sets', function() {
  beforeEach(function() {
    sadd('test_set', 1);
    sadd('test_set', 2);
  });

  describe('Lockr#sadd', function() {
    it('saves a set under the given key in the localStorage', function() {
      sadd('a_set', 1);
      sadd('a_set', 2);

      expect(localStorage.getItem('a_set')).toEqual('{"data":[1,2]}');
    });

    it('does not add the same value again', function() {
      sadd('test_set', 1);
      sadd('test_set', 2);
      sadd('test_set', 1);

      expect(smembers('test_set')).toEqual([1, 2]);
    });
  });

  describe('Lockr#smembers', function() {
    it('returns all the values for given key', function() {
      expect(smembers('test_set')).toEqual([1, 2]);
    });
  });

  describe('Lockr#sismember', function() {
    it('returns true if the value exists in the given set(key)', function() {
      expect(sismember('test_set', 1)).toEqual(true);
      expect(sismember('test_set', 34)).toEqual(false);
    });
  });

  describe('Lockr#srem', function() {
    it('removes value from collection if exists', function() {
      srem('test_set', 1);
      expect(sismember('test_set', 1)).toEqual(false);
    });
  });
});
