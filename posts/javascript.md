---
date: 2025-05-20
title: javascript
category: js
tags:
- js
description: 
---
# <samp>JavaScript</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

**API 可以分成三大类**

- 浏览器控制类：操作浏览器
- DOM 类：操作网页的各种元素
- Web 类：实现互联网的各种功能

如果宿主环境是 Node，则会提供各种操作系统的 API，比如：文件操作 API、网络通信 API 等等

## BOM

**BOM (Browser Object Model，浏览器对象模型)**：主要处理浏览器窗口(`window`)和框架(`iframe`)，描述了与浏览器进行交互的方法和接口

- 弹出新的浏览器窗口
- 移动、关闭浏览器窗口以及调整窗口大小
- 提供 Web 浏览器详细信息的定位对象
- 提供用户屏幕分辨率详细信息的屏幕对象
- 对 `cookie` 的支持
- 加入 `ActiveXObject` 类，通过 js 实例化 `ActiveX` 对象



BOM 与 DOM 之间的关系

- DOM(Document Object Model，文档对象模型)，JavaScript 通过 DOM 对象访问、控制、修改浏览器中的网页
- BOM 的 `window` 对象包含了 `document` 对象，通过 `window` 对象对 `document` 属性进行访问、检索、修改文档结构和内容
- `document` 是 DOM 模型的根节点

### BOM 对象

- [Window](#window)：JavaScript 顶层对象，表示浏览器窗口
- [Navigator](#navigator)：包含客户端浏览器的信息
- [History](#history)：包含了浏览器窗口访问过的 URL
- [Location](#location)：包含了当前 URL 信息
- [Screen](#screen)：包含客户端显示器的信息

### Window

`window` 对象具有双重角色，既是 js 访问浏览器窗口的接口，又是全局对象

Window 对象表示一个浏览器窗口或框架。在客户端环境中，`window` 对象同时也是是全局对象自身的一个属性，可以直接引用属性作为全局变量使用，如：`window.document` 可以直接写作 `document`

- `closed`：返回窗口是否关闭

- `document`：返回对 `document` 对象的只读引用

- `history`：返回对 `history` 对象的只读引用:star:

- `innerHeight`：返回窗口内部高度(包括水平滚动条的高度):star:

- `innerWidth`：返回窗口内部宽度(包括垂直滚动条的宽度):star:

- `length`：返回 `window` 框架数量(`<frame>` 或 `<iframe>`元素)

- `location`：返回 `Location` 对象的只读引用:star:
- `localStorage`：返回 `Storage` 对象的只读引用，存储的数据跨浏览器会话保存:star:

- `name`：设置或返回窗口名称

- `navigator`：返回对 `Navigator` 对象的只读引用:star:

- `opener`：返回对打开该窗口的窗口引用；如果 A 打开了 B，那么 B.opener 返回 A

- `outerHeight`：返回整个浏览器的高度

- `outerWidth`：返回整个浏览器的宽度

- `parent`：返回当前窗口或子框架的父窗口

- `scrollX`：返回文档/页面水平方向滚动的像素值；`pageXOffset` 是 `scrollX` 的别名:star:

- `scrollY`：返回文档在垂直方向已滚动的像素值；`pageYOffset` 是 `scrollY` 的别名:star:

  ```js
  if (oDiv.offsetTop <= window.pageYOffset + window.innerHeight) {
    // ...
  }
  ```

- `screen`：返回 `Screen` 对象:star:

- `screenLeft`、`screenX`：获取一个元素相对于屏幕左上角的 x 坐标的属性:star:

- `screenTop`、`screenY`：获取一个元素相对于屏幕左上角的 y 坐标的属性:star:

- `self`：返回指向当前窗口的引用；等价于 `window`

- `top`：返回 `window` 层次最顶层的窗口的引用

- `window`：`window.window` 指向 `window` 对象本身，等价于 `self`

#### Window 方法

- `alert()`：指示浏览器显示一个带有可选消息的对话框，并等待用户关闭该对话框:star:

- `clearInterval()`：取消 `setInterval()` 定时器:star:

- `clearTimeout()`：取消 `setTimeout()` 定时器:star:

- `close()`：关闭当前窗口或调用窗口:star:

- `confirm()`：指示浏览器显示带有可选消息的对话框，并等待用户确认或取消对话框:star:

- `focus()`：请求将窗口置于最前面

- `moveBy()`：将当前窗口坐标移动指定像素
- `moveTo()`：将当前窗口移动到指定坐标

- `open()`：以指定名加载指定资源到新的或现有的上下文(选项卡、窗口或 `iframe`):star:

- `print()`：打印当前窗口的内容

- `prompt()`：显示可能提示用户输入的对话框，并等待用户提交文本或取消对话框:star:

- `resizeBy()`：将当前窗口的大小调整为指定的量
- `resizeTo()`：动态调整窗口大小

- `srollBy()`：按照指定像素滚动内容:star:

- `scrollTo()`：将内容滚动到指定坐标:star:

- `setInterval()`：指定的周期调用函数或表达式:star:

- `setTimeout()`：指定毫秒数后调用函数或表达式:star:

### Navigator

Navigator 对象包含的属性描述正在使用的浏览器，可以使用这些属性进行平台专用配置

- `appCodeName`：返回浏览器的代码名；以 Netscape 代码为基础的浏览器，返回值是 `'Mozila'`
- `appName`：返回浏览器名称
- `appVersion`：返回浏览器平台和版本信息

- `cookieEnabled`：返回指明浏览器是否启用 `cookie`:star:

- `onLine`：返回指明系统是否处于脱机模式的布尔值:star:

- `platform`：返回运行浏览器的操作系统平台

- `userAgent`：返回客户端发送给服务器的 `user-agent` 值:star:

- `plugins`：返回包含客户端所有插件的数组

#### Navigator 方法

- `javaEnabled()`：规定浏览器是否支持并启用了 Java
- `taintEnabled()`：规定浏览器是否启用了数据污点(data tainting)

### History

History 对象包含用户(在浏览器窗口)访问过的 URL

- `length`：返回浏览器历史列表的 URL 数量:star:

#### History 方法

- `back()`：加载 `history` 列表的前一个 URL:star:
- `forward()`：加载 `history` 列表的下一个 URL:star:
- `go()`：加载 `history` 列表的某个具体页面:star:

### Location

Location 对象包含有关当前 URL 的信息

- `hash`：设置或返回从井号(`#`)开始的 URL(锚点):star:
- `host`：设置或返回主机名和当前 URL 的端口号:star:
- `hostname`：设置或返回当前 URL 的主机名
- `href`：设置或返回完整的 URL:star:
- `pathname`：设置或返回当前 URL 的路径部分:star:
- `port`：设置或返回当前 URL 的端口号
- `protocol`：设置或返回当前 URL 的协议:star:
- `search`：设置或返回查询部分(`?` 开始的 URL 部分):star:

#### Location 方法

- `assign()`：加载新的文档:star:
- `reload('force')`：重新加载当前文档:star:
- `replace()`：用新文档替换当前文档:star:

### Screen

Screen 对象包含有关客户端显示屏的信息。每个 window 对象的 screen 引用了一个 Screen 对象。JavaScript 利用这些信息优化输出，达到显示要求。如：程序可以根据显示器尺寸选择使用大图像还是小图像，还可以根据显示器颜色深度选择 16 位色还是 8 位色的图形，以及根据屏幕尺寸信息将新的窗口定位在屏幕中心

- `availHeight`：返回浏览器窗口在屏幕上可占用的垂直空间(不包括任务栏)
- `availWidth`：返回浏览器窗口可占用的水平宽度(不包括任务栏)
- `colorDepth`：返回屏幕的颜色深度
- `height`：返回屏幕的高度
- `pixelDepth`：返回屏幕的位深度/色彩深度
- `width`：返回屏幕的宽度

## DOM

文档对象模型 ( Document Object Model, 简称 DOM )，是实现网站交互的关键要素。它是一种接口，允许编程语言操作网站的内容、结构和样式

`document` 是一个内置对象，提供的属性和方法，可用于访问和修改网站

- 在浏览器控制台中，输入 `document`，将输出与 Elements 选项卡相同的内容

- `document` 是一个对象，修改 DOM ，就是修改 `document` 的属性

  ::: code-group

  ```js
  document.body.style.backgroundColor = 'fuchsia';
  ```

  ```html
  <body style="background-color: fuchsia;">
    <h1>Document Object Model</h1>
  </body>
  ```

  :::

> [!NOTE]
>
> 任何连字符的 CSS 属性在 JavaScript 中都将以驼峰命名法(camelCase)形式书写

## 浏览器

::: details <samp>参考</samp>

- [Google开发者文档](https://developer.chrome.com/blog/inside-browser-part1?hl=zh-cn)

:::

- 浏览器进程
- 渲染进程
- GPU 进程
  - 负责将 HTML、CSS 和 JavaScript 代码解析、渲染成实际的网页。每个渲染进程都包含了 **Blink 排版引擎** 和 **V8 JavaScript 引擎**

  - **流程**：将 HTML 解析并构建 DOM 树 -> CSS Rule 树 -> 构建 Render 树 -> 布局 Render 树 -> 绘制 Render 树

- 网络进程
- 插件进程
- 扩展进程
- 工具进程

![image-20250622170926333](../img/browser.jpg)

### 线程

- js 引擎：解释执行 js 代码、用户输入、网络请求
- GUI 线程：绘制用户界面、与 js 主线程互斥
- http 网络请求线程：处理用户 get、post 等请求，等返回结果后将回调函数推入任务队列
- 定时器触发线程：setTimeout、setInterval 等待时间结束后将执行函数推入任务队列
- 浏览器事件处理线程：将 click、mouse 等交互事件发生后将事件放入事件队列中

## AJAX

AJAX (Asynchronous JavaScript And XML)是指浏览器和服务器之间异步数据传输

- XHR(XMLHTTPRequest)：IE 通过 XHR API 完成请求的发送，通过一个构造函数完成

- Fetch API：由于 XHR API 的诸多缺陷，在 HTML5 和 ES6 发布后，产生一套更完善的 API 来发送请求，这个函数是 `fetch`，返回一个 Promise，当接受完服务器的响应头，Promise 完成

::: code-group

```js[XHR API]
// 创建发送请求的对象
var xhr = new XMLHttpRequest();

// 事件
xhr.onreadystatechange = () => {
  // 事件处理函数: 当请求的状态发生变化时运行的函数
  // readyState属性: 0-4之间的整数, 表示请求/响应的状态, 如下
  // 1. open()被调用
  // 2. send()被调用
  // 3. 接收到响应信息
  // 4. 请求完成

  // xhr.responseText // 获取服务器响应的消息体文本
  if (xhr.readyState === 4) {
    console.log('服务器已完成响应');
    console.log(JSON.stringify(xhr.responseText));
  }
  // xhr.getResponseHeader('Content-Type'); // 获取响应头Content-Type的值
}
// 配置请求: 请求方法, 地址
xhr.open('GET', 'http://localhost:3000/');
// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');
// 构建请求体，如果没有请求体则直接传递null
xhr.send(null);
```

```js[Fetch API]
fetch('http://localhost:3000/').then((res) => {
  // 返回response属性和方法
  // console.log(res);
  // 响应头类型
  // console.log(res.headers.get('Content-Type'))
  // text(): 使用文本格式返回响应体内容
  // json(): 使用json格式返回响应体内容
  return res.text();
}).then((res) => {
  // 输出响应体的内容
  console.log(res)
});


async function fetchData() {
  const headers = await fetch('http://localhost:3000/');
  const body = await headers.text();
  return body;
}
```

:::

## ES6

### 严格模式

严格模式是 ES5 提供的特殊运行模式，在代码顶部添加 `"use strict";` 指令，强制 JavaScript 引擎以更严格方式解析和执行代码

- 消除 JavaScript 不安全的或不合理的语法
- 捕获常见编码错误，抛出异常便于修复
- 优化以提高代码性能

- **启用方式**

  - 全局启用：在脚本顶部声明，作用于整个文件

  - 函数内部启用：在函数体顶部，作用于该函数

  - ES6：在 ES 模块内部默认运行在严格模式，无需显式声明


- **规则**

  - **变量必须声明**：未声明的变量赋值会抛出 `ReferenceError`


  - **禁止删除未定义的变量**：使用 `delete` 删除未声明的变量会抛出 `SyntaxError`

    ```js
    "use strict";
    delete x; // SyntaxError: Delete of an unqualified identifier in strict mode
    ```


  - **函数**

    - **禁止重复参数名**： 函数参数名必须唯一，否则抛出 `SyntaxError`

    - `arguments` 不再动态映射到参数值

      ```js
      "use strict";
      function fn(a) {
        a = 2;
        console.log(arguments[0]); // 1（不随 a 变化）
      }
      fn(1);
      ```

    - 禁止将 `eval` 或 `arguments` 作为变量或函数名

      ```js
      "use strict";
      var eval = 10; // SyntaxError
      ```

    - 函数 `this` 默认不绑定到全局对象，而是指向 `undefined`


  - **对象**

    - **禁止删除不可配置的属性**： 使用 `delete` 删除不可配置的属性会抛出 `TypeError`

      ```js
      "use strict";
      const obj = {};
      Object.defineProperty(obj, "x", { configurable: false });
      delete obj.x; // TypeError
      ```

    - **属性名必须唯一**： 对象字面量中的重复属性名会抛出 `SyntaxError`

      ```js
      "use strict";
      var obj = { a: 1, a: 2 }; // SyntaxError: Duplicate data property
      ```


  - **禁止八进制字面量**： 以 `0` 开头的八进制数字（如 `010`）在严格模式下无效


  - 禁止 `with` 语句： `with` 语句因其不明确性和性能问题被禁用


  - **新增保留字**：`implements`、`interface`、`package`


### 变量声明

- `var`

  - **全局作用域**：污染全局变量

  - **重复声明**：导致数据被覆盖

  - **变量提升**：闭包问题

- `let` 与 `const`

  - **块级作用域**
  - **暂时性死区**：不允许重复声明

解决 `var` 带来的闭包问题

::: code-group

```js[closure]
var div = document.getElementById('divButtons');

for (var i = 1; i <= 10; i++) {
	var btn = document.createElement('button');
	btn.innerHTML = '按钮' + i;
	div.appendChild(btn);
	btn.onclick = () => {
	console.log(i);
	}
}
```

```js[IIFE]
var div = document.getElementById('divButtons');

for (var i = 1; i <= 10; i++) {
  var btn = document.createElement('button');
  btn.innerHTML = '按钮' + i;
  div.appendChild(btn);
  (function (i) {
    btn.onclick = () => {
      console.log(i);
    }
  })(i);
}
```

:::

### 模板字符串

使用反引号 <code>`</code> 表示，使用 <code>${}</code> 实现文本插值

- **多行字符串**

- **字符串拼接**

### 幂运算符

`**`：幂运算符

### 字符串

- `String.prototype.includes(searchString, position?)`：检查字符串是否包含指定的子字符串，返回布尔值
- `String.prototype.trim()`：移除字符串**首尾**的空白字符(空格、制表符、换行符等)
- `String.prototype.trimStart()`：移除字符串开头的空白字符
- `String.prototype.trimEnd()`：移除字符串结尾的空白字符
- `String.prototype.replaceAll(searchValue, replacement)`：将字符串中所有匹配的子字符串替换为指定值
- `String.prototype.startsWith(searchString, position?)`：检查字符串是否以指定的子字符串开头
- `String.prototype.endsWith(searchString, length?)`：检查字符串是否以指定的子字符串结尾

### 数组

- `for-of`：遍历数组和类数组对象
- `Array.isArray(value)`：判断给定值是否为数组，返回布尔值
  - 比 `instanceof Array` 更可靠
  - 不检查类数组对象(如 `arguments` 或 `NodeList`)
- `Array.from(arrayLike, mapFn?, thisArg?)`：从类数组对象或可迭代对象(如：字符串、`Set`、`Map`)创建新数组
- `Array.prototype.fill(value, start?, end?)`：用指定值填充数组的指定范围，修改原数组
- `Array.prototype.forEach(callbackFn, thisArg?)`：对数组的每个元素执行一次回调函数
  - 仅用于遍历，无法中断(除非抛出异常)
  - 无返回值
- `Array.prototype.map(callbackFn, thisArg?)`：对数组的每个元素应用回调函数，返回新数组
- `Array.prototype.filter(callbackFn, thisArg?)`：筛选出满足回调函数条件的元素，返回新数组
  - 空数组或无匹配元素返回空数组
  - 不遍历稀疏数组的空槽
- `Array.prototype.reduce(callbackFn, initialValue?)`：对数组元素从左到右累积计算，生成单一值
  - 适合求和、展平数组、构建对象等
  - 若数组只有一个元素且无 `initialValue`，直接返回该元素
- `Array.prototype.some(callbackFn, thisArg?)`：检查数组中是否至少有一个元素满足回调函数条件
  - 空数组始终返回 `false`
  - 不遍历稀疏数组的空槽
- `Array.prototype.every(callbackFn, thisArg?)`：检查数组中是否所有元素都满足回调函数条件
  - 找到第一个不满足条件的元素后立即停止遍历
- `Array.prototype.find(callbackFn, thisArg?)`：返回数组中第一个满足回调函数条件的元素
- `Array.prototype.includes(valueToFind, fromIndex?)`：检查数组是否包含指定值，返回布尔值

### 对象

1. **成员速写**：ES6 语法糖，变量名和属性名一致，可直接写变量名

2. **对象解构**(Object Destructuring)：从对象中提取属性并赋值给变量

   - **基本解构**：`const { prop } = obj;`
   - **别名**：`const { prop: newName } = obj;`
   - **默认值**：`const { prop = defaultValue } = obj;`
   - **嵌套解构**：`const { prop: { subProp } } = obj;`

3. **展开运算符**(Spread Operator)：ES6 中引入 `...` 运算符，展开数组/对象属性

4. **属性描述符**(Property Description)：定义对象属性的行为(如：是否可读、可枚举、可写等)，通过 `Object.defineProperty` 或 `get`/`set` 设置

   **数据描述符**：`value` (值)、`writable`(写)、`enumerable`(枚举)、`configurable` (配置)

   ::: code-group

   ```js[Object.defineproperty]
   Object.defineProperty(obj, 'age', {
     value: 30,
     writable: true,
     enumerable: true,
     configurable: false
   });
   ```

   ```js[getter/setter]
   const obj = {
     _name: "Alice",
     get name() { return this._name; },
     set name(value) { this._name = value.toUpperCase(); }
   };
   ```

   :::

5. `Object.keys(obj)`：返回对象的所有可枚举自身属性的**键名数组**

   ```js
   for (let key of Object.keys(obj)) {
     console.log(key, obj[key]);
   }
   ```

6. `Object.values(obj)`：返回对象的所有可枚举自身属性的**值数组**

   ```js
   for (let value of Object.values(obj)) {
     console.log(value);
   }
   ```

7. `Object.entries(obj)`：返回一个包含 `[key, value]` 数组的数组

   ```js
   for (let [key, value] of Object.entries(obj)) {
     console.log(key, value);
   }
   ```

8. `Object.fromEntries(entries)`：从键值对数组(或可迭代对象)创建对象

   包含键值对的可迭代对象，如：`Map` 或包含 `[key, value]` 数组

9. `Object.freeze(obj)`：冻结对象，使其属性不可修改、不可删除、不可添加

   - `deepFreeze()`：冻结深层的对象(自定义)

     ```js
     const deepFreeze = (obj, seen = new WeakSet()) => {
       if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
         if (seen.has(obj)) {
           return obj;
         }
         seen.add(obj);
         Object.freeze(obj);
         Object.keys(obj).forEach((key) => {
           deepFreeze(obj[key], seen);
         });
       }
       return obj;
     }
     ```

   - `Object.isFrozen(obj)`：检查冻结状态

10. `Object.seal(obj)`：密封对象，阻止添加或删除属性，但允许修改现有属性值

    - `Object.isSealed(obj)`：检查密封状态

11. `Object.is(value1, value2)`：比较两个值是否严格相等

    - 类似 `===`，但对 `NaN` 和 `+0`/`-0` 的处理更精确

    - `util.isDeepStrictEqual` ：递归比较两个值的结构和内容是否完全相等。不仅比较值，还深入比较对象、数组等的嵌套内容

### Set

`Set`：ES6 引入的集合数据结构，存储唯一值(任何类型)，无重复

- 自动去重
- 快速查找

Methods

- `add(value)`：添加值
- `has(value)`：检查是否包含值
- `delete(value)`：删除值
- `clear()`：清空集合
- `size`：返回集合长度

### Map

`Map`：ES6 引入的键值对集合，键可以是任意类型(包括对象)，不像普通对象的键仅限字符串/符号

- `set(key, value)`：添加或更新键值对
- `get(key)`：获取键对应的值
- `has(key)`：检查是否包含键
- `delete(key)`：删除键值对

- `clear()`：清空 Map

- `size`：返回键值对的数量

**注意**：`Set`  和 `Map` 中的回调(`forEach`)可能会触发微任务(如：Promise)

### 函数

- **箭头函数** (Arrow Functions)：箭头函数是简洁的函数表达式写法，使用 `=>` 代替 `function` 关键字

  - 没有 `this`、`arguments`、`super`
  - 不绑定 `this`，继承外层作用域的 `this`
  - 不能作为构造函数(`new` 实例化)
  - 没有 `prototype` 属性

- **剩余参数** (Rest Parameters)：使用 `...` 语法收集函数的多余参数到一个数组中，替代了传统函数的 `arguments` 对象

  - Rest 必须是函数的最后一个参数
  - Rest 是一个真正的函数，而 `arguments` 是一个伪数组

- **参数默认值** (Default Parameters)：允许为函数参数设置默认值，如果调用时未提供参数或参数为 `undefined` 时使用默认值

- **类** (Class Syntax)：`class` 用于定义类，本质上是构造函数的语法糖

  - `class` 定义类，`constructor` 定义构造函数
  - **继承**：`extends`、`super`
  - 方法写在类中，不需要使用 `function` 关键字

  

### 事件循环



### Promise

Promise 对象表示一个异步操作的最终完成或者失败，有效避免回调地狱，使异步代码清晰、简洁

Promise 规范：[Promise A+](https://promisesaplus.com/)

1. 所有异步的场景，都可以看作一个异步任务，每个异步任务在 JS 中表现为一个对象，该对象称作 Promise 对象，也称任务对象
2. 每个任务对象都有两个阶段、三种状态
   - 两个阶段：未决阶段(unsettled)、已决阶段(settled)
   - 三种状态：待定(pending)、完成(fulfilled)、失败(rejected)



## <samp>函数式编程</samp>

### <samp>惰性函数</samp>

<samp>**惰性函数**(Lazy Function)：指函数在第一次执行后重写自身，以免在后续调用中重复执行初始化和条件判断逻辑</samp>

<samp>**工作原理**</samp>

1. <samp>**初次调用**：函数执行其内部初始化逻辑</samp>
2. <samp>**函数重写**：初始化完成后，函数将其自身的引用指向一个新的、更简单的函数，该函数只包含核心业务逻辑，不包含初始化</samp>
3. <samp>**后续调用**：再次调用实际调用的是替换后的新函数</samp>

```js
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  }
  element['on' + type] = handler;
}

// 惰性函数
function addEventLazy(element, type, handler) {
  if (element.addEventListener) {
    addEventLazy = function (element, type, handler) { // 重写自身
      element.addEventListener(type, handler, false);
    };
  } else {
    addEventLazy = function (element, type, handler) { // 重写自身
      element['on' + type] = handler;
    };
  }
  // 第一次调用时，执行重写后的函数
  addEventLazy(element, type, handler);
}
// 首次调用，会执行一次判断并重写函数
addEventLazy(document.body, 'click', () => console.log('Body clicked (first time)'));
// 后续调用，直接执行重写后的函数，不再判断
addEventLazy(document.body, 'click', () => console.log('Body clicked (second time)'));
```

### 柯里化

**函数柯里化**(Currying)主要用于简化代码结构，提高系统的维护性。一个方法只有一个参数，强制功能的单一性，自然做到功能内聚，降低耦合

优点

- **参数复用**：允许你固定一些参数，创建更具体的、可复用的新函数
- **延迟执行**：函数在接收到所有参数之前不会真正执行，这允许你分阶段提供参数
- **提高函数组合性**： 柯里化函数更容易与其他函数组合，形成更复杂的逻辑

```js
function add(x, y) {
  return x + y;
}

// 柯里化
function curriedAdd(x) {
  return function (y) {
    return x + y;
  }
}
console.log(curriedAdd(10)(20)); // 30
```

实现柯里化

```js
// 柯里化
function curry(fn) {
  // 返回一个新函数, 处理参数的收集和最终执行
  return function curried(...args) {
    // 如果当前收集的参数数量已经足够或超过原函数的参数数量
    // 执行原函数, 并传入所有收集到的参数
    if (args.length >= fn.length) { // fn.length 为函数期望的参数数量
      return fn.apply(this, args);
    } else {
      // 否则, 返回一个新函数, 继续收集参数
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add(x, y) {
  return x + y;
}

const curriedAdd = curry(add);

console.log(curriedAdd(2)(3)); // 5
console.log(curriedAdd(2, 3)); // 5

const multilyByOne = curriedAdd(1); // 固化第一个参数
console.log(multilyByOne(2)); // 3
```

### bind 模拟

`bind()` 创建一个新的函数，当新函数被调用时，其 `this` 值被绑定到提供的值，可以预设一些参数

- **绑定** `this`：无论新函数如何被调用(直接调用、对象方法、构造函数)，`this` 始终固定在传入的第一个参数

- **柯里化(Currying)**：bind 允许预设参数，调用时传入的额外参数会放在新函数接收参数之前

- **作为构造函数时的特殊处理**：如果是作为构造函数使用(`new` 关键字)，`this` 会指向新创建的对象实例，而不是 `bind` 指定的 `this` 值，但 `bind` 时预设的参数依然有效

::: code-group

```js[基础绑定]
Function.prototype.myBind = function (context, ...args) {
  // this指向调用myBind的函数
  const self = this;

  return function (...innerArgs) {
    // 拼接bind时传入的参数和调用时传入的参数
    const allArgs = args.concat(innerArgs);
    // 使用apply明确绑定this并传递所有参数
    return self.apply(context, allArgs);
  }
}
```

```js[作为构造函数时调用]
Function.prototype.myBind = function (context, ...args) {
  const self = this;

  // 创建一个空函数作为中介，用于继承原函数的原型链
  // 这是为了确保新函数的实例能够继承原函数的原型
  const fNOP = function () { };

  const fBound = function (...innerArgs) {
    // 判断 fBound 是否作为构造函数被调用
    // 如果是，此时的 this 指向新创建的实例，而不是 context
    // 否则，this 指向 bind 时指定的 context
    const allArgs = args.concat(innerArgs);
    return self.apply(this instanceof fNOP ? this : context, allArgs);
  };

  // 将 fNOP 的原型指向原函数的原型
  // 这样 fBound 的实例就可以通过原型链访问到原函数的原型方法
  if (self.prototype) { // 检查原函数是否有原型，箭头函数就没有
    fNOP.prototype = self.prototype;
  }

  // 将 fBound 的原型指向 fNOP 的实例
  // 确保 fBound 的实例能够通过原型链访问到原函数的原型方法
  fBound.prototype = new fNOP();

  return fBound;
};
```

:::

### 防抖&节流

**防抖 (Debounce)** 和 **节流 (Throttle)** 是两种非常重要的性能优化技术，它们用于限制函数执行的频率。在处理频繁触发的事件(如用户输入、窗口resize、页面滚动、鼠标移动等)时，合理应用这两种技术可以显著提升应用的性能和用户体验

- **搜索框输入**： 用户每按下一个键，就立即发送一次 Ajax 请求进行搜索。这会导致大量的无效请求，浪费资源

- **窗口调整大小 (resize)** ：用户拖动浏览器窗口调整大小时，`resize` 事件会连续触发，每次都执行复杂布局计算可能会导致卡顿

- **页面滚动 (scroll)**： 页面滚动时，`scroll` 事件会持续触发，执行动画或加载更多内容的逻辑可能导致性能问题

**防抖的核心思想**： 在事件被触发后，延迟一定时间执行函数。如果在延迟时间内该事件再次被触发，则重新计时。**只有当事件停止触发，并且等待时间结束后，函数才会被执行一次**

场景

- **搜索框输入**： 用户停止输入一定时间后才发送请求

- **`resize` 事件**： 窗口大小调整结束后才重新渲染页面布局

- **表单验证**：用户停止输入几秒后才进行验证

```js
function debounce(func, delay) {
  let timeoutId = null; // 用于存储定时器的ID

  return function (...args) {
    const context = this; // 保存函数执行时的this上下文

    // 每次函数被调用时，清除上一个定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 重新设置一个新的定时器
    timeoutId = setTimeout(() => {
      func.apply(context, args); // 延迟时间到了，执行原始函数
      timeoutId = null; // 执行后清空定时器ID
    }, delay);
  };
}

// 示例用法
function handleInput(e) {
  console.log('Fetching data for:', e.target.value);
}

const debouncedHandleInput = debounce(handleInput, 500); // 延迟500毫秒

// 假设有一个输入框 <input type="text" id="myInput">
// document.getElementById('myInput').addEventListener('input', debouncedHandleInput);
```

**节流**：在一定时间内，函数只会被执行一次。**无论事件触发多频繁，在设定的时间周期内，函数最多只会执行一次**

- **页面滚动加载 (scroll)**： 每隔固定时间检查是否需要加载更多内容

- **鼠标移动 (mousemove)**： 限制鼠标移动时的复杂计算，如拖拽操作

- **游戏中的射击频率**： 限制连发武器的射速

```js
function throttle(func, delay) {
  let lastExecTime = 0; // 上次函数执行的时间戳

  return function (...args) {
    const context = this;
    const currentTime = Date.now(); // 当前时间戳

    // 如果当前时间与上次执行时间之差大于等于设定的延迟时间
    if (currentTime - lastExecTime >= delay) {
      func.apply(context, args); // 执行原始函数
      lastExecTime = currentTime; // 更新上次执行时间
    }
  };
}

// 示例用法
function handleScroll() {
  console.log('Scrolling...');
}

const throttledHandleScroll = throttle(handleScroll, 200); // 每200毫秒最多执行一次

// 假设绑定到页面的滚动事件
// window.addEventListener('scroll', throttledHandleScroll);
```

