![Lockr logo](http://i.imgur.com/m5kPjkB.png)

> A minimal API wrapper for localStorage. Simple as your high-school locker.

[![Build Status](https://travis-ci.org/tsironis/lockr.svg?branch=master)](https://travis-ci.org/tsironis/lockr)
[![npm version](https://badge.fury.io/js/lockr.svg)](http://badge.fury.io/js/lockr)
[![CodeClimate](https://codeclimate.com/github/tsironis/lockr/badges/gpa.svg)](https://codeclimate.com/github/tsironis/lockr)
[![Dependencies](https://david-dm.org/tsironis/lockr.svg?theme=shields.io)](https://david-dm.org/tsironis/lockr)
[![devDependency Status](https://david-dm.org/tsironis/lockr/dev-status.svg)](https://david-dm.org/tsironis/lockr#info=devDependencies)

Lockr (pronounced /ˈlɒkəʳ/) is an extremely lightweight library (<2kb when minified), designed to facilitate how you interact with localStorage. Saving objects and arrays, numbers or other data types, accessible via a Redis-like API, heavily inspired by [node_redis](https://github.com/mranney/node_redis/).

## How to use lockr

In order to user lockr, you firstly need to install it in your project.

```js
bower install lockr
```

or you use npm to install

```js
npm i lockr --save
```

or maybe download it manually from [here](https://raw.github.com/tsironis/lockr/master/lockr.js) and hook it in your HTML.

```html
<script src="/path/to/lockr.js" type="text/javascript"></script>
```

## API reference


```Lockr.prefix``` - String

> Set a prefix to a string value that is going to be prepended to each key saved by Lockr.

*Example*

```js
Lockr.prefix = 'lockr_';
Lockr.set('username', 'Coyote'); // Saved as string
localStorage.getItem('username');
> null
localStorage.getItem('lockr_username');
> {"data":123}
```
*Please note that* when prefix is set, ```flush``` method deletes only keys that are prefixed, and ignores the rest.

---

```Lockr.set``` - arguments: *[ key, value ]* {String, Number, Array or Object}

> Set a key to a particular value or a hash object (```Object``` or ```Array```) under a hash key.

*Example*

```js
Lockr.set('username', 'Coyote'); // Saved as string
Lockr.set('user_id', 12345); // Saved as number
Lockr.set('users', [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]);
```

---

```Lockr.get``` - arguments: *[ key or hash_key, default value ]*

> Returns the saved value for given key, even if the saved value is hash object. If value is null or undefined it returns a default value.

*Example*
```js
Lockr.get('username');
> "Coyote"

Lockr.get('user_id');
> 12345

Lockr.get('users');
>  [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]

Lockr.get('score', 0):
> 0

Lockr.set('score', 3):
Lockr.get('score', 0):
> 3
```

---

```Lockr.rm``` - arguments: *[ key ]* {String}

> Remove a key from ```localStorage``` entirely.

*Example*

```js
Lockr.set('username', 'Coyote'); // Saved as string
Lockr.get('username');
> "Coyote"
Lockr.rm('username');
Lockr.get('username');
> undefined
```

---

```Lockr.sadd``` - arguments *[ key, value ]*{String, Number, Array or Object}

> Adds a unique value to a particular set under a hash key.

*Example*

```js
Lockr.sadd("wat", 1); // [1]
Lockr.sadd("wat", 2); // [1, 2]
Lockr.sadd("wat", 1); // [1, 2]
```

---

```Lockr.smembers``` - arguments *[ key ]*

> Returns the values of a particular set under a hash key.

*Example*

```js
Lockr.sadd("wat", 42);
Lockr.sadd("wat", 1337);
Lockr.smembers("wat"); // [42, 1337]
```

---

```Lockr.sismember``` - arguments *[ key, value ]*

> Returns whether the value exists in a particular set under a hash key.

*Example*

```js
Lockr.sadd("wat", 1);
Lockr.sismember("wat", 1); // true
Lockr.sismember("wat", 2); // false
```

---

```Lockr.srem``` - arguments *[ key, value ]*

> Removes a value from a particular set under a hash key.

*Example*

```js
Lockr.sadd("wat", 1);
Lockr.sadd("wat", 2);
Lockr.srem("wat", 1);
Lockr.smembers("wat"); // [2]
```

---

```Lockr.getAll``` - arguments: *null*

> Returns all saved values & objects, in an ```Array```

*Example*

```js
Lockr.getAll();
> ["Coyote", 12345, [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]]
```

```Lockr.getAll``` - arguments: *[includeKeys] {Boolean}*

> Returns contents of `localStorage` as an Array of dictionaries that contain key and value of the saved item.

*Example*

```js
Lockr.getAll(true);
> [{"username": "Coyote"}, {"user_id": 12345}, {"users": [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]}]
```
---

```Lockr.flush()``` - arguments: *null*

> Empties localStorage().

*Example*

```js
localStorage.length;
> 3
Lockr.flush();
localStorage.length;
> 0
```
