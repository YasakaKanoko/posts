---
date: 2025-05-20
title: Node.js
category: js
tags:
- Node.js
- js
description: 
---

# <samp>Node.js</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

Visual Studio Code

- `Ctrl` + <code>`</code>：打开/关闭终端
- `Ctrl` + `,`：打开/关闭侧边栏
- `Ctrl` + `Shift` + `P` -> Terminal: Select Default Profile：设置默认终端

## global

`global` ：全局对象；所有全局变量(包括自身)和函数都是 `global` 对象的属性，与 `window` 相似

::: code-group

```js[Browser]
window.window === window; // true
```

:::

[globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)：为所有 JavaScript 环境提供一致的方式访问全局对象

### setTimout

`setTimeout()`：定时器函数；在浏览器中，返回一个数字；在 Node 中，返回一个对象

::: code-group

```js[Browser]
const timeId = setTimeout(() => {
  console.log(timeId); // 101
}, 1000);
```

```js[Node]
const timeId = setTimeout(() => {
  console.log(`Hello Node ${process.version}`); // Hello Node v22.16.0
}, 1000);
console.log(timeId); // 返回Timeout对象 
```

:::

`clearTimeout()`：清除定时器

```js
clearTimeout(timeId);
```

### setInterval

`setInterval()`：定时器函数；一个实现定时调用的函数

::: code-group

```js[Browser]
const timeId = setInterval(() => {
  console.log("Hello"); // 449
}, 1000);
```

```js[Node]
const timeId = setInterval(() => {
  console.log("Hello");
}, 1000);
console.log(timeId); // 返回Timeout对象 
```

:::

`clearInterval()` 清除定时器

```js
clearInterval(timeId);
```

### setImmediate

`setImmediate()`：在下一事件循环(next tick)开始时执行一个函数，类似于 `setTimeout(fn, 0)`

```js
console.log('开始');
setImmediate(() => {
  console.log('setImmediate');
});
setTimeout(() => {
  console.log('setTimeout');
}, 0);
console.log('结束');

// 开始 -> 结束 -> setTimeout -> setImmediate
```

### console

`console` 是一个全局对象，用于标准输出流，如：终端中打印信息

- `log()`：输出一般信息
- `error()`：输出错误信息
- `warn()`：输出警告信息
- `clear()`：清除控制台输出

### __dirname

`__dirname`：当前模块目录的绝对路径；并非全局变量

```js
const path = require('path');
const dirname = path.resolve(__dirname,'./index.js');
console.log(dirname); // node-app/src/index.js
```

**注意**：`__dirname` 和 `__filename` 是 CommonJS 专属

- `import.meta.url`：ESM 模块的元属性，返回模块完整的 URL 字符串
  - 可以返回 `file://` 协议的本地路径，也可以返回 `http://` 或 `https://` 等网络协议的路径
- `fileURLToPath`：转换为文件路径 URL 字符串或 URL 对象

::: code-group

```js[ESM]
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

:::

### __filename

`__filename`：当前模块的绝对路径；并非全局变量

```js
console.log(__filename); // node-app/src/index.js
```

### Buffer

Buffer 对象继承至 [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 子类，表示定长的字节序列，输出为十六进制

> 虽然 Buffer 类在全局范围内可用，但仍然建议使用前通过 `import` 或 `require` 引用

```js
const { Buffer } = require('node:buffer');

const buffer = Buffer.from("Hello world", "utf-8");
console.log(buffer); // Buffer(11) [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, buffer: ArrayBuffer(8192), byteLength: 11, byteOffset: 256, length: 11, Symbol(Symbol.toStringTag): 'Uint8Array']
```

### process

`process` 对象提供有关当前 Node.js 进程的信息并进行控制

- `cwd()`：返回 Node.js 进程的当前工作目录绝对路径
- `exit([code])`：强制退出状态终止进程，默认为 `0`
- `argv`：返回一个数组，包含启动 Node.js 进程时传递的命令行参数

- `platform`：返回 API 最低支持当前操作系统平台
- `kill(pid)`：结束进程
- `env`：返回一个包含用户环境的对象

## 模块

::: details <samp>参考</samp>

- [CommonJS 规范](https://javascript.ruanyifeng.com/nodejs/module.html)
- [The Node.js Way - How `require()` Actually Works](https://fredkschott.com/post/2014/06/require-and-the-module-system/)
- [module.js 源码](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/module.js)
- [ES6 Module 的语法](https://es6.ruanyifeng.com/#docs/module)
- [Changing `require` to `import` updates the module syntax to ES modules, which are more compatible with modern JavaScript environments and tooling](https://typescript.tv/errors/#ts80001)
- [Asynchronous vs. Synchronous Programming: Key Similarities and Differences](https://www.mendix.com/blog/asynchronous-vs-synchronous-programming/)
- [CommonJS loads modules synchronously, ES modules are asynchronous](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/)
- [CommonJS is not going away](https://bun.sh/blog/commonjs-is-not-going-away)

:::

### CommonJS

::: details <samp>目录</samp>

- [module](#module)
- [require()](#require)
- [exports](#exports)
- [require() 基本用法](#require-基本用法)
- [require.main](#require-main)
- [模块缓存](#模块缓存)
- [模块的加载机制](#模块的加载机制)

:::

- 所有代码运行在模块作用域，不会污染全局作用域

- 模块可以多次加载，但只会在第一次加载时运行一次，然后将运行结果缓存，后续加载直接读取缓存结果

- 模块的加载顺序：同步加载

- 每个模块内部存在一个 `module` 对象，`module` 代表当前模块，有一个 `exports` 属性表示对外部的接口

  > 通过 `global` 暴露，这种做法是不推荐的

#### `module`

`Module` 构造函数，所有模块都是 `Module` 的实例

```js
class Module {
  constructor(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
  }
}
```

- `module.id`：模块的标识符，通常是带有绝对路径的模块文件名
- `module.filename`：模块的文件名，绝对路径
- `module.loaded`：返回布尔值，表示模块是否完成加载
- `module.parent`：返回对象，表示调用该模块的模块
- `module.children`：返回数组，表示模块要用到的其他模块
- `module.exports`：模块输出的值

#### `require()`

`Module._load`：负责加载新模块并管理模块缓存，加载时减少冗余文件的读取次数，提升程序速度

```js
Module._load = function(request, parent, isMain) {
  // 1. Check Module._cache for the cached module.
    
  // 2. Create a new Module instance if cache is empty. 
    
  // 3. Save it to the cache.
    
  // 4. Call module.load() with your the given filename.
  //    This will call module.compile() after reading the file contents.
    
  // 5. If there was an error loading/parsing the file,
  //    delete the bad module from the cache
    
  // 6. return module.exports
};
```

如果缓存中不存在该模块，`Module._load` 会创建一个模块实例，读取文件内容，并调用 `Module.compile`

```js
Module.prototype._compile = function(content, filename) {
  // 1. Create the standalone require function that calls module.require.
    
  // 2. Attach other helper methods to require.
    
  // 3. Wraps the JS code in a function that provides our require,
  //    module, etc. variables locally to the module scope.
    
  // 4. Run that function
};
```

`require` 封装在一个独立函数中，这个函数包含一些鲜为人知的(lesser-known)方法

- `require()`：加载模块
- `require.resolve()`：将模块名解析为绝对路径
- `require.main`：主模块
- `require.cache`：缓存的模块
- `require.extensions`：根据文件扩展名，可用的编译方法

当 `require` 准备就绪，将加载的整个源代码封装在一个新的函数中，接收 `require`、`module`、`exports` 以及其他暴露的变量作为参数，这将为模块创建一个新的函数作用域，从而不会污染 Node.js 的其余部分

```js
(function (exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
});
```

执行该函数，`Module._compile` 同步执行，待此代码执行完毕后，`Module._load` 开始执行并返回 `module.exports` 给用户

#### `exports`

- `exports` 是 `module.exports` 的指针

  ```js
  const exports = module.exports;
  ```

- 使用 `exports` 输出模块接口时，可以向 `exports` 对象添加方法

  > 不能让 `exports` 指向单一的值，这样会改变 `exports` 的指向

- `exports` 是 `module.exports` 对象的指针，修改 `module.exports` 会让 `exports` 失效

  > 建议不要使用 `exports`，而是使用 `module.exports`
  >
  > ```js
  > this.m = 5;
  > exports.c = 3;
  > module.exports = {
  >   a: 1,
  >   b: 2
  > }; // 输出: { a: 1, b: 2 }
  > ```

#### `require()` 基本用法

`require` 命令的基本功能，读入并执行一个 JavaScript 文件，返回该模块的 `exports` 对象；如果未发现指定模块，会报错

- 默认后缀名是 `.js`

  > 如果未指定后缀名，Node 会尝试添加 `.js`、`.json`、`.node`、`.cjs` 再搜索

- 模块的路径最终都会转换为绝对路径

  - 如果参数以 `/` 开头表示绝对路径

  - 如果参数以 `./` 开头表示相对路径

  - 如果参数不以 `/` 或 `./` 开头，则表示加载的模块是核心模块 (位于 Node.js 系统安装目录中)
    1. 检查是否为内置模块，如：`fs`、`path`
    2. 检查当前目录是否包含 `node_modules`
    3. 向上级目录递归查找是否包含 `node_modules`
    4. 成功找到目标模块返回该模块的绝对路径，否则报错

- 如果该目录下 `package.json` 中存在 `main` 字段，则加载 `main` 字段指定的路口文件

#### `require.main`

`require` 方法有一个 `main` 属性，用于判断模块是直接执行，还是调用执行

- 直接执行 (`node module.js`)，`require.main` 指向模块自身

  ```js
  require.main === module; // true
  ```

- 调用执行时 (通过 `require` 加载执行)，返回 `false`

#### 模块缓存

首次加载某个模块，Node 会缓存该模块，之后再加载时，直接从缓存中取出模块的 `module.exports` 属性

- 所有缓存的模块都保存在 `require.cache` 中

- 删除模块缓存

  ```js
  // 删除指定模块缓存
  delete require.cache[moduleName];
  
  // 删除所有模块缓存
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
  ```

#### 模块的加载机制

CommonJS 模块加载机制，输入的是输出的值的拷贝

::: code-group

```js[lib.js]
// lib.js
let counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter
};
```

```js[main.js]
// main.js
let { counter } = require('./lib');
let { incCounter } = require('./lib');

console.log(counter); // 3
incCounter();
console.log(counter); // 3
```

:::

**为什么浏览器不使用 CJS**

1. 浏览器加载 JS 文件，需要从远程服务器获取，网络的传输效率低于 node 读取本地文件的效率，由于 CommonJS 是同步的，这会极大地降低运行的性能
2. CommonJS 属于社区标准，而非官方标准

### ESM

::: details <samp>目录</samp>

- [export](#export)
- [import](#import)
- [export default](#export-default)
- [export 与 import 复合](#export-与-import-复合)
- [跨模块常量](#跨模块常量)
- [import()](#import-1)

:::

**ESM 的设计思想**

- CommonJS 加载模块称为"运行时加载"，只有运行时才能得到整个对象，无法在编译时"静态优化"

- ESM 的设计思想是尽量静态化，编译时确定模块的依赖关系，以及输入和输出变量，称"编译时加载"

  > ESM 最初设计在浏览器中，文件的加载通过网络加载

**注意**

1. `import` 和 `export` 必须处于模块顶层
2. 异步加载：加载完成后使用回调函数

<samp>**node 中使用 ESM**</samp>

- <samp>在 `package.json` 中添加 `"type": "module"` 字段</samp>
- <samp>文件的后缀为 `.mjs`</samp>

#### <samp>`export`</samp>

<samp>给定一个 ES 模块，浏览器无需查看导入或导出的内容，执行前整个模块都将被解析(这会涉及往返多次网络请求)</samp>

1. <samp>`export` 对外输出三种接口：函数、类、使用 `var`, `let`, `const` 声明的变量</samp>

   ::: code-group

   ```js[export1]
   export let firstName = 'Mike';
   export let lastName = 'Wheeler';
   export let year = 1985;
   
   export function v1() {};
   ```

   ```js[export2]
   let firstName = 'Mike';
   let lastName = 'Wheeler';
   let year = 1985;
   function v1() {};
   
   export { firstName, lastName, year, v1 };
   ```

   :::

2. <samp>通过 `export` 输出的接口，与对应的值存在动态绑定，即通过接口可以获取模块内部实时的值</samp>

   > <samp>CommonJS 的模块输出具有缓存，不存在动态更新</samp>

3. <samp>`export` 命令可以出现在模块任意位置，但必须处于模块顶层；如果处于块级作用域，会报错</samp>

4. <samp>使用 `as` 设置别名</samp>

   ```js
   function v1() {};
   
   export { 
     v1 as streamV1
   };
   ```

#### <samp>`import`</samp>

1. <samp>指定导入的变量名，必须与导出时接口名称相同</samp>

   ```js
   import { firstName, lastName, year } from './example.js';
   ```

2. <samp>`as` 关键字：重命名</samp>

   ```js
   import { lastName as surname } from './example.js';
   ```

3. <samp>`import` 输入变量是只读的，不允许在加载模块的脚本中改写接口</samp>

   > <samp>特殊情况：如果导入的是一个对象，可以改写对象的属性，但不建议</samp>

   ```js
   import { a } from './a.js';
   a.foo = 'Hello world!'; // ✅
   ```

4. <samp>`import` 命令具有提升效果</samp>

   > <samp>`import` 是在编译阶段执行的，在代码运行之前执行</samp>

   ```js
   foo();
   import { foo } from './module.js';
   ```

5. <samp>`import` 必须处于模块顶层</samp>

6. <samp>重复执行同一句 `import` 语句，只执行一次，而不会执行多次</samp>

   > <samp>`import` 语句是 Singleton 模式</samp>

   ```js
   import { foo } from './my_module.js';
   import { bar } from './my_module.js';
   
   // 等价于
   import { foo, bar } from './my_module.js';
   ```

7. <samp>通过 Babel 转码，CommonJS 模块的 `require` 命令和 ES6 模块的 `import` 命令，可以写在同一个模块里面，但不建议，`import` 会在静态解析阶段执行，可能达不到预期效果</samp>

8. <samp>`*`：整体加载</samp>

   ```js
   import * as myLib from './lib.js';
   myLib.add(1, 2);
   ```

#### <samp>`export default`</samp>

<samp>使用 `import` 命令时，必须知道加载的变量名和函数名</samp>

1. <samp>匿名函数</samp>

   ::: code-group

   ```js[module.js]
   export default function() {
     console.log('foo');
   }
   ```

   ```js[index.js]
   import customName from './export-default.js';
   customName(); // foo
   ```

   :::

2. <samp>具名导出</samp>

   ```js
   function foo() {
     console.log('foo');
   }
   export default foo;
   ```

3. <samp>一个模块中只能有一个默认导出，因此默认导出不需要使用大括号，且 `import` 导入时无需加大括号，因为仅有且只有一个与之对应</samp>

   ```js
   import foo from './foo.js';
   foo(); // foo
   ```

4. <samp>本质上，`default` 实际是一个变量，`export default` 会将变量的值赋给 `default`，实际是输出 `default` 变量的值</samp>

   <samp>`default` 后不能跟变量声明语句</samp>

   ```js
   let a = 1;
   export default a;
   ```

   <samp>本质上，`export default` 是在输出一个叫 `default` 的变量或方法</samp>

   ::: code-group

   ```js[module.js]
   function add(x, y) {
     return x * y;
   }
   export { add as default }; // 等价于 export default add;
   ```

   ```js[index.js]
   import { default as foo } from './module.js';// 等价于 import foo from './modules.js';
   ```

   :::

#### <samp>`export` 与 `import` 复合</samp>

1. <samp>在同一个模块中，表示输入后输出</samp>

   > <samp>需要注意的是，当 `export` 和 `import` 写成一行后，实际并未导入该模块，而是转发接口</samp>

   ```js
   export { foo, bar } from './my_module.js';
   
   // 可以理解为
   import { foo, bar } from './my_module.js';
   export { foo, bar };
   ```

2. <samp>整体导出</samp>

   ```js
   export * from './my_module.js';
   ```

3. <samp>默认导出</samp>

   ```js
   export { default } from './my_module.js';
   ```

4. <samp>具名导出</samp>

   ```js
   export { foo as default } from './my_module.js';
   
   export { default as foo } from './my_module.js';
   ```

5. <samp>ES2020：别名导出</samp>

   ```js
   export * as ns from './my_module.js';
   ```

#### <samp>跨模块常量</samp>

<samp>如果需要使用的常量非常多，可以创建一个 `constants` 目录，将常量写在不同文件中并保存在该目录下</samp>

::: code-group

```js[index.js]
import { db, users } from './constants/index';
```

```js[constants/index.js]
export { db } from './db';
export { users } from './users';
```

```js[constants/user.js]
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```

```js[constants/db.js]
export const db = {
  url: 'http://127.0.0.1:8080/',
  username: 'admin',
  password: '123456'
};
```

:::

#### <samp>`import()`</samp>

<samp>ES2020 提案：`import()` 函数支持动态加载模块</samp>

- <samp>`import()` 可以用在任何地方</samp>

- <samp>`import()` 与 `import` 不同，没有静态连接关系</samp>

- <samp>`import()` 是异步的，返回 Promise 对象，`require()` 是同步的</samp>

  ```js
  async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
      const widget = await import('./widget.js');
      widget.render(container);
    }
  }
  
  renderWidget();
  ```

- <samp>`import()` 场景</samp>

  - <samp>按需加载：在需要时，再加载某个模块</samp>

    ```js
    button.addEventListener('click', (event) => {
      import('./dialogBox.js').then((dialogBox) => {
        dialogBox.open();
      }).catch((error) => {
        console.log(error);
      })
    });
    ```

  - <samp>条件加载</samp>
  
    ```js
    if (condition) {
      import('./moduleA.js').then();
    } else {
      import('./moduleB.js').then();
    }
    ```

  - <samp>动态的模块路径</samp>

    > <samp>根据 `fn` 的返回结果，返回不同的模块</samp>

    ```js
    import(fn()).then();
    ```


### <samp>ESM 与 CommonJS 的差异</samp>

<samp>在大型项目中，ESM 速度较慢，与 `require` 相比，要么导入时使用 `await` 表达式，这样必须返回一个 Promise，这将带来额外的 microticks 和开销</samp>

- <samp>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用</samp>

  > <samp>因为 CommonJS 加载的是一个对象 ( `module.exports` )，在模块内部变化不会影响原值</samp>

- <samp>CommonJS 是运行时加载，ES6 是编译时加载</samp>

- <samp>CommonJS 的 `require()` 是同步加载，ES6 的 `import` 是异步加载</samp>

### <samp>Loading ECMAScript modules using `require()`</samp>

<samp>Node.js v22 新特性：[Loading ECMAScript modules using `require()`](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require)</samp>

- <samp>模块是同步的(即不包含顶级的 `await`)</samp>
- <samp>模块是 ESM</samp>

::: code-group

```js[point.mjs]
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
} 
```

```js[index.js]
const point = require('./point.mjs');
console.log(point); // Module {__esModule: <accessor>, default: <accessor>, Symbol(Symbol.toStringTag): 'Module'}
```

:::

## <samp>os</samp>

::: code-group

```js[CJS]
const os = require('node:os');
```

```js[ESM]
import os from 'node:os';
```

:::

<samp>`node:os`  模块提供与操作系统相关的实用方法和属性</samp>

- <samp>`EOL`：操作系统特定的行尾序列标记</samp>
  - <samp>UNIX：`\n`</samp>
  - <samp>Windows：`\r\n`</samp>
- <samp>`arch()`：返回操作系统 CPU 架构</samp>

- <samp>`cpus()`：返回包含每个 CPU 核心信息的对象数组</samp>
  - <samp>`os.cpus().length`：返回总核心数</samp>

- <samp>`freemem()`：以整数形式返回可用系统内存量(以字节为单位)</samp>
  - <samp>KB：`os.freemem() / 1024`</samp>
  - <samp>MB：`os.freemem() / 1024 ** 2`</samp>
  - <samp>GB：`os.freemem() / 2 ** 30`</samp>

- <samp>`homedir()`：返回当前用户主目录的字符串路径</samp>
- <samp>`hostname()`：以字符串形式返回操作系统的主机名</samp>
- <samp>`tmpdir()`：以字符串形式返回操作系统的临时文件默认目录</samp>

## <samp>path</samp>

::: code-group

```js[CJS]
const path = require('node:path');
```

```js[ESM]
import path from 'node:path';
```

:::

<samp>`path` 模块提供了处理文件和目录路径的工具</samp>

- <samp>`basename(path, [suffix])`：返回 `path` 的最后一部分</samp>

- <samp>`delimiter`：返回特定平台的路径分隔符</samp>
  - <samp>UNIX：`:`</samp>
  - <samp>Windows：`;`</samp>

- <samp>`sep`：返回特定平台的路径段分隔符</samp>
  - <samp>UNIX：`/`</samp>
  - <samp>Windows：`\`</samp>

- <samp>`dirname(path)`：返回 `path` 目录</samp>

- <samp>`extname(path)`：返回 `path` 的扩展名</samp>

- <samp>`join(...paths)`：使用特定平台分隔符将给定 `path` 段连接在一起</samp>

- <samp>`normalize(path)`：将绝对路径、相对路径规范化处理成一个符合对应操作系统风格的路径</samp>
- <samp>`relative(from, to)`：返回从 `from` 到 `to` 的相对路径</samp>

- <samp>`resolve(...path)`：将路径或多个路径作为参数，返回一个绝对路径</samp>

## <samp>URL</samp>

::: code-group

```js[CJS]
const url = require('node:url');
```

```js[ESM]
import url from 'node:url';
```

:::

::: code-group

```js[URL]
const url = require('node:url');
const input = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

// new URL(path): url 构造函数, 返回一个对象
const myURL = new URL(input);
console.log(myURL);

// parse(): 将一个 URL 字符串作为参数，返回一个包含 URL 各个部分的对象, 类似构造函数
console.log(url.parse(input));

// searchParams.has(name): 参数是否包含对应键值对
console.log(myURL.searchParams.has("query")); // true

// searchParams.get(name): 返回第一个匹配的键值
console.log(myURL.searchParams.get("query")); // string

// format(): 将一个对象作为参数，返回一个 URL 字符串
const obj = {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash', // 完整地址
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  hash: '#hash'
};
const myurl = url.format(obj);
console.log(myurl); // https://sub.example.com:8080/p/a/t/h?query=string#hash
```

```shell
URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
Url {
  protocol: 'https:',
  slashes: true,
  auth: 'user:pass',
  host: 'sub.example.com:8080',
  port: '8080',
  hostname: 'sub.example.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
}
true
string
https://sub.example.com:8080/p/a/t/h?query=string#hash
```

:::

## <samp>util</samp>

::: code-group

```js[CJS]
const util = require('node:util');
```

```js[ESM]
import util from 'node:util';
```

:::

- <samp>`util.callbackify(original)`：接收一个 `async` 函数(或返回 Promise 的函数)，并返回该函数的回调形式</samp>
- <samp>`util.promisify(original)`：接收一个回调风格的异步函数，并返回该函数的 Promise 形式</samp>

- <samp>`util.isDeepStrictEqual(val1, val2)`：比较 `val1` 与 `val2` 是否存在深度严格相等</samp>

  ::: details <samp>`isDeepStrictEqual(val1, val2)` 与 `===` 的**区别**</samp>

  ```js
  const util = require('util');
  
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2 };
  
  console.log(obj1 === obj2); // false
  console.log(util.isDeepStrictEqual(obj1, obj2)); // true
  ```

  :::

## <samp>fs</samp>

<samp>**基于 Promise API**</samp>

::: code-group

```js[CJS]
const fs = require('node:fs/promises');
```

```js[ESM]
import * as fs from 'node:fs/promises';
```

:::

<samp>**基于回调和同步 API**</samp>

::: code-group

```js[CJS]
const fs = require('node:fs');
```

```js[ESM]
import * as fs from 'node:fs';
```

:::

- <samp>`readFile(path, [options])`：读取文件内容</samp>

  ::: code-group

  ```js[CJS]
  const { readFile } = require('fs/promises');
  const path = require('path');
  
  const filePath = path.resolve(__dirname, 'data.json');
  
  async function logFile() {
    try {
      const content = await readFile(filePath, { encoding: 'utf8' });
      console.log(content);
    } catch (err) {
      console.log(err.message)
    }
  }
  logFile();
  ```

  ```js[ESM]
  import { readFile } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'data.json');
  
  try {
    const content = await readFile(filePath, { encoding: 'utf8' });
    console.log(content);
  } catch (err) {
    console.log(err.message)
  }
  ```

  ```json[data.json]
  [
    {
      "name": "Laravel",
      "tag": "PHP"
    },
    {
      "name": "Django",
      "tag": "Python"
    },
    {
      "name": "NestJS",
      "tag": "NodeJS"
    }
  ]
  ```

  :::
  
- <samp>`writeFile(path, data, [options]`：写入文件内容</samp>

  ::: code-group

  ```js[CJS]
  const { readFile, writeFile } = require('fs/promises');
  const path = require('path');
  
  const filePath = path.resolve(__dirname, 'data.json');
  
  async function logFile() {
    try {
      await writeFile(filePath, 'Alex', 'utf8');
      const content = await readFile(filePath, { encoding: 'utf8' });
      console.log(content);
    } catch (err) {
      console.log(err.message)
    }
  }
  logFile();
  ```

  ```js[ESM]
  import { readFile, writeFile } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'data.json');
  
  try {
    await writeFile(filePath, 'Alex', 'utf8');
    const content = await readFile(filePath, { encoding: 'utf8' });
    console.log(content);
  } catch (err) {
    console.log(err.message)
  }
  ```

  :::

  > <samp>当 `options` 设置为 `{ flag: "a" }` 时，表示追加文件内容，等价于 `appendFile()`</samp>
  
- <samp>`appendFile(path, data, [options])`：追加文件内容</samp>

  ::: code-group

  ```js[CJS]
  const { readFile, appendFile } = require('fs/promises');
  const path = require('path');
  
  const filePath = path.resolve(__dirname, 'data.json');
  
  async function logFile() {
    try {
      await appendFile(filePath, 'Alex', 'utf8');
      const content = await readFile(filePath, { encoding: 'utf8' });
      console.log(content);
    } catch (err) {
      console.log(err.message)
    }
  }
  logFile();
  ```

  ```js[ESM]
  import { readFile, appendFile } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, 'data.json');
  
  try {
    await appendFile(filePath, 'Alex');
    const content = await readFile(filePath, { encoding: 'utf8' });
    console.log(content);
  } catch (err) {
    console.log(err.message)
  }
  ```

  :::
  
- <samp>`stat(path)`：获取文件或目录的状态</samp>

  - <samp>`isDirectory()`：是否为目录</samp>
  - <samp>`isFile()`：是否为文件</samp>

  ::: code-group

  ```js[CJS]
  const { stat } = require('fs/promises');
  const path = require('path');
  
  const filePath = path.resolve(__dirname, './myfiles', 'data.json');
  
  async function fileStat() {
    try {
      const states = await stat(filePath);
      console.log(states)
    } catch (e) {
      console.error(e.message);
    }
  }
  
  fileStat();
  ```

  ```js[ESM]
  import { stat } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, './myfiles', 'data.json');
  
  try {
    const states = await stat(filePath);
    console.log(states)
  } catch (e) {
    console.error(e.message)
  }
  ```

  ```sh
  Stats {
    dev: 0,
    mode: 33206,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    blksize: 4096,
    ino: 30680772461468292,
    size: 8, # 占用字节数
    blocks: 0,
    atimeMs: 1749515530333.382, # 上次访问文件的时间
    mtimeMs: 1749456681797.5737, # 上次修改文件的时间
    ctimeMs: 1749515528688.089, # 上次修改文件状态的时间
    birthtimeMs: 1749453821009.349 # 创建文件的时间
  }
  ```

  :::

- <samp>`readdir(path)`：读取目录的子文件和子目录，返回一个数组</samp>

  ::: code-group

  ```js[CJS]
  const { readdir } = require('fs/promises');
  const { resolve } = require('path');
  
  const filePath = resolve(__dirname, './myfiles');
  
  async function filePaths() {
    try {
      const paths = await readdir(filePath);
      console.log(paths)
    } catch (e) {
      console.error(e.message)
    }
  }
  
  filePaths();
  ```

  ```js[ESM]
  import { readdir } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, './myfiles');
  
  try {
    const paths = await readdir(filePath);
    console.log(paths)
  } catch (e) {
    console.error(e.message)
  }
  ```

  :::

- <samp>`mkdir()`：创建目录</samp>

  ::: code-group

  ```js[CJS]
  const { mkdir } = require('fs/promises');
  const { resolve } = require('path');
  
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  async function createDir() {
    try {
      // recursive: true 表示路径不存在时不报错, 递归创建目录
      await mkdir(filePath, { recursive: true }); // 创建newdir
    } catch (e) {
      console.error(e.message)
    }
  }
  
  createDir();
  ```

  ```js[ESM]
  import { mkdir } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  try {
    await mkdir(filePath, { recursive: true });
  } catch (e) {
    console.error(e.message)
  }
  ```

  :::

- <samp>`exists(path)`：~~已废弃~~，需要重写；检查文件或目录是否存在</samp>

  ::: code-group

  ```js[CJS]
  const { stat, mkdir } = require('fs/promises');
  const { resolve } = require('path');
  
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  async function exists(filename) {
    try {
      await stat(filename);
      return true;
    } catch (e) {
      if (e.code === 'ENOENT') {
        // 文件不存在
        return false;
      }
      throw e;
    }
  }
  
  async function checkPath() {
    try {
      const result = await exists(filePath);
      if (result) {
        console.log('目录已存在');
      } else {
        console.log('目录不存在，创建目录中');
        await mkdir(filePath);
        console.log('创建目录成功');
      }
    } catch (e) {
      throw e;
    }
  }
  
  checkPath();
  ```

  ```js[ESM]
  import { stat, mkdir } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  async function exists(filename) {
    try {
      await stat(filename);
      return true;
    } catch (e) {
      if (e.code === 'ENOENT') {
        // 文件不存在
        return false;
      }
      throw e;
    }
  }
  try {
    const result = await exists(filePath);
    if (result) {
      console.log('目录已存在');
    } else {
      console.log('目录不存在，创建目录中');
      await mkdir(filePath);
      console.log('创建目录成功');
    }
  } catch (e) {
    throw e;
  }
  ```

  :::
  
- <samp>`unlink()`：删除文件</samp>

  ::: code-group

  ```js[CJS]
  const { unlink } = require('fs/promises');
  
  const { resolve } = require('path');
  const filePath = resolve(__dirname, './myfiles/hello.txt');
  
  async function deleteFile() {
    try {
      await unlink(filePath);
      console.log('文件已删除')
    } catch (e) {
      console.log(e.message);
    }
  }
  
  deleteFile();
  ```

  ```js[ESM]
  import { unlink } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  const filePath = resolve(__dirname, './myfiles/hello.txt');
  
  try {
    await unlink(filePath);
    console.log('文件已删除')
  } catch (e) {
    console.log(e.message);
  }
  ```

  :::

- <samp>`rmdir()`：删除目录</samp>

  ::: code-group

  ```js[CJS]
  const { rmdir } = require('fs/promises');
  
  const { resolve } = require('path');
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  async function deleteDir() {
    try {
      await rmdir(filePath);
      console.log('目录已删除')
    } catch (e) {
      console.log(e.message);
    }
  }
  
  deleteDir();
  ```

  ```js[ESM]
  import { rmdir } from 'fs/promises';
  import { fileURLToPath } from 'url';
  import { dirname, resolve } from 'path';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  const filePath = resolve(__dirname, './myfiles/newdir');
  
  try {
    await rmdir(filePath);
    console.log('目录已删除')
  } catch (e) {
    console.log(e.message);
  }
  ```

  :::

## <samp>stream</samp>

<samp>**流**，是数据的集合，与字符串、数组类似</samp>

<samp>不同之处在于，流不能一次可用，所以它不必适合内存</samp>

<samp>流在处理大量数据和外部数据时非常强大，一次处理一个区块</samp>

<samp>**分类**：可读流、可写流、双工流 </samp>

### <samp>可读流</samp>

<samp>`createReadStream(path, [options])`：创建文件可读流</samp>

- <samp>`start`：起始字节</samp>
- <samp>`end`：结束字节</samp>
- <samp>`encoding`：编码类型</samp>
- <samp>`highWaterMark`：表示流的缓冲区大小(默认为 16KB)</samp>
- <samp>`autoClose`：表示是否自动关闭流</samp>

```js
const { createReadStream } = require('fs');

const { resolve } = require('path');
const filePath = resolve(__dirname, './myfiles/data.json');

const rs = createReadStream(filePath);
```

<samp>Events</samp>

- <samp>`open`：文件打开时触发</samp>

  ```js
  rs.on('open', () => {
    console.log('文件打开');
  });
  ```

- <samp>`data`：当流将数据块传递给使用者时触发</samp>

  ```js
  rs.on('data', (chunk) => {
    console.log(`读取数据：${chunk.toString()}`);
  });
  ```

- <samp>`end`：当流中没有更多数据可供使用时触发</samp>

  ```js
  rs.on('end', () => {
    console.log('读取完成')
  });
  ```

- <samp>`error`：表示流发生错误</samp>

  ```js
  rs.on('error', (err) => {
    console.log(`错误：${err.message}`);
  });
  ```

- <samp>`close`：关闭</samp>

  ```js
  rs.on('close', () => {
    console.log('流关闭');
  });
  ```

- <samp>`readable`：当流中有可读数据时触发</samp>

  ```js
  rs.on('readable',()=>{
    console.log('流中有可读的数据')
  });
  ```

<samp>Functions</samp>

- <samp>`pipe()`：将流的输出传递给另一个流或函数</samp>

  ```js
  const { createWriteStream } = require('fs');
  const inPath = resolve(__dirname, './myfiles/hello.txt');
  const ws = createWriteStream(inPath);
  
  rs.pipe(ws);
  ```

- <samp>`unpipe()`：停止将流的输出传递给另一个流或函数</samp>

  ```js
  rs.unpipe(ws);
  ```

- <samp>`read()`：读取指定大小的数据</samp>

  ```js
  rs.read(1024);
  ```

- <samp>`unshift()`：将数据添加到流的开始</samp>

  ```js
  rs.unshift(Buffer.from('追加数据'));
  ```

- <samp>`resume()`：恢复流的读取</samp>

  ```js
  rs.resume();
  ```

- <samp>`pause()`： 暂停流的读取</samp>

  ```js
  rs.pause();
  ```

- <samp>`isPaused()`：检查流是否暂停</samp>

  ```js
  console.log(rs.isPaused());
  ```

- <samp>`setEncoding()`：设置流的编码</samp>

  ```js
  rs.setEncoding('utf8');
  ```

### <samp>可写流</samp>

<samp>`createWriteStream(path, [options])`：创建文件可写流</samp>

- <samp>`start`：起始字节</samp>
- <samp>`encoding`：编码类型</samp>
- <samp>`highWaterMark`：表示流的缓冲区大小（默认为 16KB）</samp>
- <samp>`autoClose`：表示是否自动关闭流</samp>

```js
const inPath = resolve(__dirname, './myfiles/hello.txt');
const ws = createWriteStream(inPath);
```

<samp>Events</samp>

- <samp>`close`：关闭</samp>

  ```js
  ws.on('close', () => {
    console.log('流关闭');
  });
  ```

- <samp>`error`：表示流发生错误</samp>

  ```js
  ws.on('error', (err) => {
    console.log(`写入错误：${err.message}`);
  });
  ```

- <samp>`drain`：当流的缓冲区空闲时触发</samp>

  ```js
  ws.on('drain', () => {
    console.log('流缓冲区空闲');
  });
  ```

- <samp>`finish`：当流的写入完成时触发</samp>

  ```js
  ws.on('finish', () => {
    console.log('写入完成');
  });
  ```

- <samp>`pipe`：当流的输出被连接时触发</samp>

  ```js
  ws.on('pipe', () => {
    console.log('流的输出被连接');
  });
  ```

- <samp>`unpipe`：当流的输出被断开时触发</samp>

  ```js
  ws.on('unpipe', () => {
    console.log('流的输出被断开');
  });
  ```

<samp>Functions</samp>

- <samp>`write()`：写入数据到流</samp>

  ```js
  ws.write('写入数据');
  ```

- <samp>`end()`：结束写入</samp>

  ```js
  ws.end();
  ```

- <samp>`cork()`：开启流的缓冲</samp>

  ```js
  ws.cork();
  ```


- <samp>`uncork()`：取消流的缓冲</samp>

  ```js
  ws.uncork();
  ```

- <samp>`setDefaultEncoding()`：设置流的默认编码</samp>

  ```js
  ws.setDefaultEncoding('utf8');
  ```

### <samp>双工流</samp>

::: code-group

```js[Duplex 模块]
const { Duplex } = require('stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
  }

  _read(size) {
    // 读取数据
    this.push('读取数据');
  }

  _write(chunk, encoding, callback) {
    // 写入数据
    this.push(chunk.toString());
    callback();
  }
}

const duplex = new MyDuplex();
duplex.on('data', (chunk) => {
  console.log(`读取数据：${chunk}`);
});
duplex.write('写入数据');
```

```js[Transform 流]
const { Transform } = require('stream');

class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    // 转换数据
    this.push(chunk.toString());
    callback();
  }

  _flush(callback) {
    // flush数据
    callback();
  }
}

const transform = new MyTransform();
transform.on('data', (chunk) => {
  console.log(`读取数据：${chunk}`);
});
transform.write('写入数据');
```

```js[自定义]
const { Readable, Writable } = require('stream');

class MyDuplex extends Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    // 读取数据
    this.push('读取数据');
  }
}

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    // 写入数据
    this.push(chunk.toString());
    callback();
  }
}

const duplex = new MyDuplex();
const writable = new MyWritable();
duplex.on('data', (chunk) => {
  console.log(`读取数据：${chunk}`);
});
writable.on('finish', () => {
  console.log('写入完成');
});
writable.write('写入数据');
```

:::

## <samp>net</samp>

<samp>`net` 模块，是一个通信模块</samp>

- <samp>IPC：进程间通信</samp>

- <samp>TCP/IP：网络通信</samp>

<samp>`createConnection(port, [host], [connectListener])`：创建一个 TCP 或 UDP 连接，返回值是一个 `socket`，在 Node 中表现为双工流</samp>

```js
const { createConnection } = require('net');
const socket = createConnection(8080, 'localhost', () => {
  console.log('已连接');
});

socket.write("Hello World!");
socket.on('close', () => {
  console.log('连接已关闭');
});
```

<samp>`createServer([options], [connectionListener])`：创建服务器</samp>

- <samp>`listen()`：监听端口号</samp>
- <samp>`listening`：服务器开始监听时触发</samp>
- <samp>`connection`：当新客户端连接至服务器时触发</samp>

```js
const { createServer } = require('net');

const server = createServer((socket) => {
  console.log('连接已建立');

  // 发送HTTP响应头
  socket.write('HTTP/1.1 200 OK\r\n');
  socket.write('Content-Type: text/html\r\n');
  socket.write('Connection: close\r\n');
  socket.write('\r\n'); // 空行表示HTTP头结束
  socket.write('<h1>Hello World!</h1>');

  // 关闭连接
  socket.end();
  socket.end();
});

server.listen(3000, () => {
  console.log('正在监听3000端口')
});

server.on('listening', () => {
  console.log('服务器已启动')
});

server.on('connection', (socket) => {
  console.log('有新连接')
});
```

## <samp>http</samp>

<samp>`http` 模块是基于 `net` 模块的用于创建客户端和服务器的核心模块，支持创建 HTTP 服务和发送 HTTP 请求</samp>

<samp>`request({options}, callback)`：发送 HTTP 请求，返回一个 `clientRequest` 对象</samp>

::: code-group

```js[GET]
import { request } from "http";

const options = {
  hostname: 'localhost',
  port: 3000,
  method: 'GET',
};

const req = request(options, (res) => {
  console.log(`服务器状态码: ${res.statusCode}`);
  console.log(`服务器响应头: ${JSON.stringify(res.headers)}`);
  res.on('data', chunk => {
    console.log(chunk.toString('utf-8'));
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
```

```js[POST]
import { request } from "http";

const options = {
  hostname: 'localhost',
  port: 3000,
  method: 'POST', // [!code ++]
  headers: { // [!code ++]
    'Content-Type': 'application/json', // [!code ++]
    'Content-Length': Buffer.byteLength(JSON.stringify({ key: 'value' })) // [!code ++]
  } // [!code ++]
};

const data = JSON.stringify({ // [!code ++]
  key: 'value' // [!code ++] 
}); // [!code ++]

const req = request(options, (res) => {
  console.log(`服务器状态码: ${res.statusCode}`);
  console.log(`服务器响应头: ${JSON.stringify(res.headers)}`);
  res.on('data', chunk => {
    console.log(chunk.toString('utf-8'));
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(JSON.stringify(data)); // [!code ++]
req.end();
```

:::

## <samp>https</samp>

<samp>HTTPS 是 HTTP 的安全版本，用于客户端和服务器发送数据的主要协议，经过加密以提高数据传输的安全性</samp>

- <samp>网上购买证书</samp>
- <samp>本地生成证书</samp>

<samp>HTTPS 使用加密协议对通信进行加密，该协议称为传输层安全性(TLS)，以前称为安全套接字层(SSL)，该协议通过所谓的非对称公钥基础架构保护通信</samp>

- <samp>私钥：该密钥由网站所有者控制，是私有的位于 Web 服务器，用于解密来自公钥加密的信息</samp>
- <samp>公钥：以安全的方式与服务器交互，使用公钥加密的信息只能使用对应的私钥进行解密</samp>

<samp>**如何在本地生成证书**</samp>

- <samp>**配置环境变量**</samp>

  | `Path` | `D:\openssl\bin` |
  | ------ | ---------------- |

- <samp>安装 OpenSSL</samp>

  ```sh
  openssl --version
  ```

- <samp>生成 CA 私钥</samp>

  ```sh
  openssl genrsa -des3 -out ca-pri-key.pem 1024
  ```

- <samp>生成 CA 公钥</samp>

  ```sh
  openssl req -new -key ca-pri-key.pem -out ca-pub-key.pem
  ```

- <samp>生成 CA 证书</samp>

  ```sh
  openssl x509 -req -in ca-pub-key.pem -signkey ca-pri-key.pem -out ca-cert.crt
  ```

- <samp>生成服务器私钥</samp>

  ```sh
  openssl genrsa -out server-key.pem 1024
  ```

- <samp>生成服务器公钥</samp>

  ```sh
  openssl req -new -key server-key.pem -out server-scr.pem
  ```

- <samp>生成服务器证书</samp>

  ```sh
  openssl x509 -req -CA ca-cert.crt -CAkey ca-pri-key.pem -CAcreateserial -in server-scr.pem -out server-cert.crt
  ```

- <samp>`https` 模块：创建 HTTPS 服务器</samp>

  ```js
  const { createServer } = require('https');
  const { readFileSync } = require('fs');
  const { resolve } = require('path');
  
  
  const options = {
    // 私钥
    key: readFileSync(resolve(__dirname, './server-key.pem')),
    // 证书
    cert: readFileSync(resolve(__dirname, './server-cert.crt'))
  };
  createServer(options, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  }).listen(443);
  console.log('Server running at https://localhost:443/');
  ```


## <samp>生命周期</samp>

<samp>Node 的事件循环由 6 个阶段组成</samp>

1. <samp>Timers</samp>
   - <samp>这个阶段会执行 `setTimeout()` 和 `setInterval()` 的回调</samp>
   - <samp>如果有多个定时器回调，则会按照预定预定的时间顺序执行</samp>
2. <samp>Pending Callbacks</samp>
   - <samp>这个阶段会执行一些系统操作回调，如：TCP 错误事件</samp>
   - <samp>这些回调由操作系统安排，而不是通过 JavaScript 直接安排</samp>
3. <samp>Idle、Prepare</samp>
   - <samp>这两个阶段用于 Node.js 内部工作，开发者无需关心</samp>
4. <samp>Poll</samp>
   - <samp>除了 Timers、Check，绝大部分的回调都会存放在该队列，如：I/O 事件</samp>
   - <samp>如果 Poll 中有回调，依次执行回调，直到清空队列</samp>
   - <samp>如果事件循环进入 Poll，但却没有任何事件可以处理，等待直到新事件到来</samp>
5. <samp>Check</samp>
   - <samp>这个阶段执行 `setImmediate()` 回调函数</samp>
   - <samp>需要注意的是：`setImmediate()` 与 `setTimeout(fn, 0)` 的区别在于，`setImmediate()` 的回调会被安排在 Check 阶段执行</samp>

     ```js
     // 两种运行结果都有可能
     setTimeout(() => {
       console.log(0);
     }, 0)
     setImmediate(() => {
       console.log(1);
     });
     ```

     ::: code-group

     ```js
     // I/O -> Check -> Timers 
     const { readFile } = require('fs');
     readFile('./index.js', () => {
       setTimeout(() => console.log(0), 0);
       setImmediate(() => console.log(1));
     });
     ```

     ```shell
     1
     0
     ```

     :::
6. <samp>Close Callbacks</samp>
   - <samp>这个阶段执行 `close` 事件的回调函数，当一个 `socket` 或其他资源关闭时，`close` 事件的回调函数触发</samp>

> [!TIP]
>
> <samp>`nextTick()` 与 `Promise`</samp>
>
> <samp>在整个事件循环开始前都会先检查 `nextTick()` 和 `Promise`，再进入事件循环</samp>
>
> ```js
> setImmediate(() => {
>   console.log(1);
> });
> process.nextTick(() => {
>   console.log(2);
>   process.nextTick(() => {
>     console.log(3);
>   });
> })
> console.log(4);
> Promise.resolve().then(() => {
>   console.log(5);
>   process.nextTick(() => {
>     console.log(6);
>   })
> });
> // 4 2 3 5 6 1
> ```

::: code-group

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start"); 

setTimeout(function() {
  console.log("setTimeout0");
}, 0);

setTimeout(function() {
  console.log("setTimeout3");
}, 3);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick"));

async1();

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function() {
  console.log("promise3");
});

console.log("script end");
```

```sh
script start
async1 start
async2
promise1
promise2
script end
nextTick
async1 end
promise3
setTimeout0
setImmediate
setTimeout3
```

:::

## <samp>EventEmitter</samp>

<samp>`EventEmitter`：Node.js 中处理事件驱动编程</samp>

- <samp>**事件 Event**：如：`'data'`、`'error'`、`close`</samp>  
- <samp>**监听器 Listener**：事件发生时调用的函数</samp>

<samp>**方法**</samp>

- <samp>`once()`：事件只触发一次</samp>

  ```js
  const { EventEmitter } = require('events');
  
  // 创建事件处理函数对象
  const emitter = new EventEmitter();
  
  emitter.once('greet', (name) => {
    console.log(`Hello ${name}`);
  });
  
  emitter.emit('greet', 'Leo'); // Hello Leo
  emitter.emit('greet', 'John'); // 事件不触发
  ```

- <samp>`emit`：触发事件</samp>

- <samp>`off()`：移除事件</samp>

  ```js
  const { EventEmitter } = require('events');
  
  // 创建事件处理函数对象
  const emitter = new EventEmitter();
  const greetHandler = (name) => {
    console.log(`Hello ${name}`);
  };
  emitter.on('greet', greetHandler);
  emitter.emit('greet', 'Leo'); // 输出：Hello, Leo!
  
  emitter.off('greet', greetHandler); // 移除监听器
  emitter.emit('greet', 'Alice'); // 不会输出
  ```

## <samp>Express</samp>

### <samp>开始</samp>

```sh
npm init -y
npm i express
```

::: code-group

```js[createServer]
const express = require('express');
const { createServer } = require('http');

const app = express();
const port = 3000;
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`server listen to ${port}`)
})
```

```js[express]
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

:::

<samp>Express 的实例 `app` 可以作为 `createServer([options][, requestListener])` 方法的参数</samp>

- <samp>`requestListener` 是一个回调函数，在每次接收到 HTTP 请求时调用，Express 内部已经实现对应逻辑</samp>

- <samp>`app` 是 `express()` 返回函数对象，接收到 HTTP 请求时调用一系列中间件</samp>

  - <samp>Express 提供基于原生的 `req` 和 `res` **增强版的对象，并传递给路由处理函数**</samp>

  - <samp>在原生对象的基础上，添加了额外的属性和方法；如：`req.headers`、`req.query`、`req.path` 和 `res.send` 等；同时 `req` 和 `res` 仍是原生对象的实例(原型链继承)，仍包含原生对象的方法</samp>

### <samp>Routing</samp>

<samp>**路由**是指应用程序的端点(URI)如何响应客户端请求</samp>

- <samp>`app.get()`：处理 GET 请求</samp>
- <samp>`app.post()`：处理 POST 请求</samp>

<samp>**动态路由**：(或称**参数化路由**)，不需要为每一个值都定义一个独立的路由，而是通过一个通用的模式匹配一系列类似的 URL</samp>

> <samp>比如：为一个博客平台显示每篇文章的详情</samp>

<samp>**定义动态路由**：使用冒号(`:`)，定义路由参数，当定义了路由参数后，Express 就会将 URL 中匹配的动态的部分提取出来，并存储在 `req.params` 对象中</samp>

- <samp>`req.params`：一个包含路由参数键值对的对象</samp>

#### <samp>响应方法</samp>

| <samp>方法</samp> | <samp>描述</samp> |
| ----------------- | ----------------- |
| `res.setHeader()` |                   |
| `res.send()`      |                   |
| `res.status()`    |                   |
| `res.header()`    |                   |
| `res.location()`  |                   |
| `res.end()`       |                   |



### <samp>Middleware</samp>
