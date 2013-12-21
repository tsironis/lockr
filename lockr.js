(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports);
    });
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
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
    return JSON.parse(value);
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
