# safe-object

安全的操作对象的 getter 和 setter

## example

```
yarn add safe-object2
or
npm install safe-object2

const safeObj2 = require("safe-object2");
const a = safeObj2({ a: 11, b: { c: [1, 2] }, c: { d: { x: "", b: 1 } } });
 console.log(a.setter(["z", "zd", 0], 222));
//{ a: 11, b: { c: [ 1, 2 ] },c: { d: { x: '', b: 1 } },z: { zd: [ 222 ] } }

 const objs = { a: { b: "c", d: { x: [1], foo: "" } } };
 const safe = safeObject(objs);
 safe.getter(["a", "b", "d", "foo", "x"]) // '' empty string
 safe.getter(["a", "b", "d", "foo", "x"], "a") // 'a'

```

## API

| name   | params1                 | params2          | return             |
| ------ | ----------------------- | ---------------- | ------------------ |
| getter | paths (string \| array) | defaultValue("") | (value \| default) |
| setter | paths (string \| array) | value            | object             |

**⚠ 注意 ️**

1.不支持 Map,Set,WeakMap,WeakSet.

