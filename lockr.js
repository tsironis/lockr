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
    localStorage.setItem(key, JSON.stringify({"data": value}));
  };

  Lockr.get = function (key, missing) {
    var value = JSON.parse(localStorage.getItem(key));
    if(value === null)
      return missing;
    else
      return (value.data || missing);
  };

  Lockr.getAll = function () {
    var keys = Object.keys(localStorage);

    return keys.map(function (key) {
      return Lockr.get(key);
    });
  };

  Lockr.rm =  function (key) {
    localStorage.removeItem(key);
  };

  Lockr.flush = function () {
    localStorage.clear();
  };
  return Lockr;

}));
