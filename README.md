![Lockr logo](http://i.imgur.com/m5kPjkB.png)

> A minimal API wrapper for localStorage. Simple as your high-school locker.

Lockr (it's pronounced /ˈlɒkəʳ/) is a extremely lightweight library (<1kb when minified), designed to facilitate how you interact with localStorage. Saving objects and arrays, numbers or other data types, accessible via a Redis-like API, heavily inspired by [node_redis](https://github.com/mranney/node_redis/).

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

```Lockr.set``` - arguments: *[ key, value ]*

> Set a key to a particular value. Value could be ```String``` or ```Number```. Do *not* use this for saving ```Object``` or ```Array```.

*Example*

```js
Lockr.set('username', 'Coyote'); // Saved as string
Lockr.set('user_id', 12345); // Saved as number
```

---

```Lockr.hset``` - arguments: *[ hash_key, hash_value ]*

> Save a hash object (```Object``` or ```Array```) under a hash key.

*Example*

```js
Lockr.hset('users', [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]);
```

---

```Lockr.get``` - arguments: *[ key or hash_key ]*

> Returns the saved value for given key, even if the saved value is hash object.

*Example*
```js
Lockr.get('username');
> "Coyote"

Lockr.get('user_id');
> 12345

Lockr.get('users');
>  [{name: 'John Doe', age: 18}, {name: 'Jane Doe', age: 19}]
```

---

Lockr.getAll - arguments: *null*

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
