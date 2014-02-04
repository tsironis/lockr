(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      root.Lockr = factory(root, exports);
    });
  } else {
    root.Lockr = factory(root, {});
  }

}(this, function(root, Lockr) {
  root.Lockr = Lockr;

  Lockr.set = function (key, value) {
    localStorage.setItem(key, value);
  };

  Lockr.hset = function (key, hashObj) {
    localStorage.setItem(key, JSON.stringify(hashObj));
  };
  Lockr.get = function (key, callback) {
    var value = localStorage.getItem(key);
    if (value == null)
      return undefined;
    if (value.match(/[\{\}\:\[\]]/)) /* hash objects */
      return JSON.parse(value);
    else if (value.match(/^\d+(?:\.\d+$)/)) /* floating number */
      return parseFloat(value);
    else if (value.match(/^\d+$/)) /* integer number */
      return parseInt(value);
    else
      return value;
  };

  Lockr.getAll = function () {
    var keys = Object.keys(localStorage);

    return keys.map(function (key) {
      return Lockr.get(key);
    });
  };

  Lockr.flush = function () {
    localStorage.clear();
  };
  return Lockr;

}));
