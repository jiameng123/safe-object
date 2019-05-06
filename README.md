# safe-object

安全的操作对象的 getter 和 setter

## example

```
yarn add safe-object
or
npm install safe-object

const delegetter = require("delegetter");
const a = delegetter({ a: 11, b: { c: [1, 2] }, c: { d: { x: "", b: 1 } } });
 console.log(a.setter(["z", "zd", 0], 222));
//{ a: 11, b: { c: [ 1, 2 ] },c: { d: { x: '', b: 1 } },z: { zd: [ 222 ] } }


```

## API

| name   | params1                 | params2          | return             |
| ------ | ----------------------- | ---------------- | ------------------ |
| getter | paths (string \| array) | defaultValue("") | (value \| default) |
| setter | paths (string \| array) | value            | object             |

**⚠ 注意 ️**

1.不支持 Map,Set,WeakMap,WeakSet.

2.没有完善的测试用例
