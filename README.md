# safe-object

安全的操作对象的 getter 和 setter

## example
```
yarn add safe-object
or
npm install safe-object

const delegetter = require("delegetter");
const a = delegetter({ a: 11, b: { c: [1, 2] }, c: { d: { x: "", b: 1 } } });
    console.log(a.setter(["z", "zd", 0], 222));  //{ a: 11, b: { c: [ 1, 2 ] },c: { d: { x: '', b: 1 } },z: { zd: [ 222 ] } }


```

**⚠ 注意 ️**

 1.不支持Map,Set,WeakMap,WeakSet.
 
 2.没有完成测试用例
