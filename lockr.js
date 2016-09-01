(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory(root, exports);
    }
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      root.Lockr = factory(root, exports);
    });
  } else {
    root.Lockr = factory(root, {});
  }

}(this, function(root, Lockr) {
  'use strict';

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  Lockr.prefix = "";
  Lockr.expires = new Date().getTime()+1e6*6*6*24*365; //the default expires more than 10 years

  Lockr._getPrefixedKey = function(key, options) {
    options = options || {};
    if (options.noPrefix) {
      return key;
    } else {
      return this.prefix + key;
    }
  };

  Lockr.getExpirationTime = function(options) {
    options = options || {};
    if (options.expires) {
      return new Date().getTime() + options.expires * 60 * 1000;
    } else {
      return this.expires;
    };
  }

  Lockr.set = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
      expires = this.getExpirationTime(options);
    try { 
      localStorage.setItem(query_key, JSON.stringify({"data": value, "timestamp":expires}));
    } catch (e) {
      if (console) console.warn("Lockr didn't successfully save the '{" + key + ": " + value + "}' pair, because the localStorage is full.");
    }
  };

  Lockr.get = function(key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
      value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
      if (!value.timestamp) {
        value.timestamp = this.getExpirationTime(options);
      };
    } catch (e) {
      if (localStorage[query_key]) {
        value = { data: localStorage.getItem(query_key), timestamp: this.getExpirationTime(options) };
      } else {
        value = null;
      }
    }
    if (value === null) {
      return missing;
    } else if (typeof value === 'object' && typeof value.data !== 'undefined' && new Date().getTime() < value.timestamp) {
      return value.data;
    } else {
      return missing;
    }
  };

  Lockr.sadd = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
      json;

    var values = Lockr.smembers(key);

    if (values.indexOf(value) > -1) {
      return null;
    }

    try {
      values.push(value);
      json = JSON.stringify({ "data": values });
      localStorage.setItem(query_key, json);
    } catch (e) {
      console.log(e);
      if (console) console.warn("Lockr didn't successfully add the " + value + " to " + key + " set, because the localStorage is full.");
    }
  };

  Lockr.smembers = function(key, options) {
    var query_key = this._getPrefixedKey(key, options),
      value;

    try {
      value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
      value = null;
    }

    if (value === null)
      return [];
    else
      return (value.data || []);
  };

  Lockr.sismember = function(key, value, options) {
    return Lockr.smembers(key).indexOf(value) > -1;
  };

  Lockr.keys = function() {
    var keys = [];
    var allKeys = Object.keys(localStorage);

    if (Lockr.prefix.length === 0) {
      return allKeys;
    }

    allKeys.forEach(function(key) {
      if (key.indexOf(Lockr.prefix) !== -1) {
        keys.push(key.replace(Lockr.prefix, ''));
      }
    });

    return keys;
  };

  Lockr.getAll = function() {
    var keys = Lockr.keys();
    return keys.map(function(key) {
      return Lockr.get(key);
    });
  };

  Lockr.srem = function(key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
      json,
      index;

    var values = Lockr.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
      values.splice(index, 1);

    json = JSON.stringify({ "data": values });

    try {
      localStorage.setItem(query_key, json);
    } catch (e) {
      if (console) console.warn("Lockr couldn't remove the " + value + " from the set " + key);
    }
  };

  Lockr.rm = function(key) {
    localStorage.removeItem(key);
  };

  Lockr.flush = function() {
    if (Lockr.prefix.length) {
      Lockr.keys().forEach(function(key) {
        localStorage.removeItem(Lockr._getPrefixedKey(key));
      });
    } else {
      localStorage.clear();
    }
  };
  return Lockr;

}));
