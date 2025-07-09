---
date: 2025-07-04
title: ES6
category: Angel Beats! 
tags:
- js
description: 
---

# ES6



`Object.freeze()`：浅层冻结

`deepFreeze()`：深层冻结

```js
function deepFreeze(obj) {
  Object.freeze(obj);
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (typeof obj[i] === 'object') {
        deepFreeze(obj[i]);
      }
    }
  }
}

let obj = {
  name: 'Alex',
  age: 25,
  address: {
    city: 'New York',
  }
};

deepFreeze(obj);
obj.address.city = 'Los Angeles';
console.log(obj); // { name: 'Alex', age: 25, address: { city: 'New York' } }
```



