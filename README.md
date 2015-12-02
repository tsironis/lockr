![Lockr logo](http://i.imgur.com/m5kPjkB.png)
[![Code
Climate](https://codeclimate.com/github/tsironis/lockr/badges/gpa.svg)](https://codeclimate.com/github/tsironis/lockr)


> A minimal API wrapper for localStorage. Simple as your high-school locker.

Lockr (pronounced /ˈlɒkəʳ/) is an extremely lightweight library (<2kb when minified), designed to facilitate how you interact with localStorage. Saving objects and arrays, numbers or other data types, accessible via a Redis-like API, heavily inspired by [node_redis](https://github.com/mranney/node_redis/).

## How to use lockr

In order to user lockr, you firstly need to install it in your project.

```js
bower install lockr
```

or download it manually from [here](https://raw2.github.com/tsironis/lockr/master/lockr.js) and hook it in your HTML.

```html
<script src="/path/to/lockr.js" type="text/javascript"></script>
```

## API reference

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
