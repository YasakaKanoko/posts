---
date: 2025-06-30
title: React
category: 技术
tags:
- React
- js
description: A JavaScript library for building user interfaces
---
# React

::: details  目录

[[TOC]]

:::

React 是由 Facebook 开发的用于构建用户界面的强大的 JavaScript 库，它允许开发者将 UI 分解成更小的可重用的部分(称为 "组件")来创建动态的且具有交互式的 Web 程序

- JSX 是一种 JavaScript 语法糖，使用 JSX 可以直接将 JavaScript 注入到 UI 中，作为组件的返回语句返回

- **组件**(Component)是一个普通的 JavaScript 函数

  - 返回值不再是字符串、数值或布尔值等，而是返回 JSX UI，如：按钮、表单、页面等

  - 轻松 **重用** 和管理代码，易于维护

    > `props`：在组件之间传递数据，根据调用时传递参数的不同，从而让 UI 返回不同的结果，`props` 允许你将数据从父组件传递到子组件。在 React 中，父子概念非常普遍
  
- **虚拟 DOM**：DOM(文档对象模型)，代表网页的结构。虚拟 DOM 是真实 DOM 轻量级的副本，当应用程序的数据发生变化时，React 会首先更新虚拟 DOM，然后将有效的更改与真实 DOM 同步

## **开始**

::: code-group

```sh[npm]
npm create vite@latest my-app -- --template react
```

```sh[pnpm]
pnpm create vite my-app --template react
```

```sh[yarn]
yarn create vite my-app --template react
```

```sh[bun]
bun create vite my-app --template react
```

:::

Project Structure

```txt
react-app
├─ eslint.config.js	# ESLint 配置文件，用于代码 linting 和格式检查
├─ index.html       # 项目的入口 HTML 文件，React 应用的挂载点 
├─ package.json     # 项目配置文件，定义依赖、脚本和元数据 
├─ pnpm-lock.yaml   # pnpm 的锁文件，记录依赖的确切版本
├─ public           # 静态资源目录，存放无需构建的公共文件
├─ src              # 源代码目录，包含 React 组件、样式和其他资源
│  ├─ App.css       # App 组件的 CSS 样式文件
│  ├─ App.jsx       # 主 React 组件，应用的入口组件
│  ├─ assets        # 静态资源目录（如图片、字体等）
│  ├─ index.css     # 全局 CSS 样式文件
│  └─ main.jsx      # React 应用的入口 JS 文件，负责渲染 App 组件
└─ vite.config.js   # Vite 配置文件，插件、构建、开发服务器配置
```

## **JSX**

JSX (JavaScript XML) 是 React 的一种语法扩展，允许在 JavaScript 中编写类似 HTML 的代码，作为组件的返回语句

本质上，JSX 不是 HTML，而是作为 `React.createElement` 语法糖

::: code-group

```HTML
<div>Hello</div>
```

``` JSX
React.createElement('div', null, 'Hello')
```

:::

**基本规则**

- **必须有单一根元素**：每个 JSX 表达式必须有一个父元素包裹。如果不需要额外 DOM 元素，可用 `<></>` (`Fragment`)

- **标签必须正确闭合**：JSX 基于 XML 语法，要求严格的标签闭合
  - 如：自闭合标签 `<img />`
- **JSX 嵌入 JavaScript 表达式**：使用 `{}` 嵌入 JS 表达式 (不能是语句，如：`if` 或 `for`)
- **静态属性值** 为字符串字面量，**动态属性值** 使用 `{}` 嵌入一个表达式
- `style` 属性只接受 JavaScript 对象
- **属性使用 camelCase**：如 `class` 在 JSX 写作 `className`
- **注释**：`{/* 注释 */}`

- JSX 允许模板中插入数组，数组会自动展开

## **列表 & key**

**列表渲染**：React 中通过 `map()` 将数组渲染为 JSX 元素列表

- 如：待办事项、用户列表
- `map()` 遍历返会 JSX 元素，在模板中自动展开所有成员

```jsx
export default function Hello() {
  const todos = [
    { id: 1, text: 'Learn JSX' },
    { id: 2, text: 'Build App' },
  ];
  const res = todos.map(item => (<li>{item.text}</li>));
  return (<>
    <ul>
      {res}
    </ul>
  </>);
}
```

`key` 是一个特殊的 JSX 属性，用于帮助 React 高效更新 DOM

::: warning Each child in a list should have a unique "key" prop.

- React 使用 Virtual DOM 比较新旧状态，`key` 帮助 React 识别哪些元素发生变化 (添加、删除、排序等)

- 没有 `key` 或使用不正确的 `key`，可能导致性能问题或渲染错误 (如：UI 不更新、状态丢失)
  - `key` 必须是唯一的、稳定的
  - 推荐使用数据的唯一标识作为 `key` (如：`id`)，避免使用数组索引 (`index`)
  
    ```jsx
    const res = todos.map(item => (<li key={item.id}> {item.text}</li>));
    ```

:::

## **组件**

**组件** 是 React 的核心，用于构建可复用、模块化的 UI 块

- **类组件**：基于 ES6 类，早期主要用于**有状态组件**
  - 通过继承 `React.Component` 创建，使用 `class` 语法
  - **状态管理**：通过 `this.state` 和 `this.setState` 管理状态
- **函数组件**：早期称为 "**无状态组件**"，现在通过 Hooks 支持状态和生命周期
  - 早期：仅接受 `props` ，无法管理状态或使用生命周期方法
  - React 16.8 引入 Hooks (如：`useState`、`useEffect`) 使函数支持状态和生命周期的功能，这不仅是语法的转变，同时也代表 React 编程思想的转变

::: code-group

```jsx[Class]
import React from 'react'

export default class World extends React.Component {

  render() {
    return (<h1>Hello World!</h1>)
  }
}
```

```jsx[Function]
import React from "react";

export default function App() {
    return <h1>Hello World!</h1>;
}
```

:::

## **props**

- 类组件：通过 `this` 关键字访问 `props`

  - `this` 指向当前类的实例，继承至父类 `React.Component`

  - 如果未设置构造函数，React 将自动处理 `this.props` 初始化

  - 如果定义了构造函数，必须显式地调用 `super(props)`，以确保构造函数 `React.Component`将  `props` 绑定到 `this.props`

    ::: code-group

    ```jsx[default constructor]
    import React from 'react'
    
    export default class World extends React.Component {
      render() {
        return <h1>Hello {this.props.name}!</h1>;
      }
    }
    ```

    ```jsx[constructor]
    import React from 'react'
    
    export default class World extends React.Component {
      constructor(props) {
        super(props);
        this.state = { greeting: 'Hello' };
      }
    
      render() {
        return <h1>{this.state.greeting}, {this.props.name}</h1>;
      }
    }
    ```

    :::

- 函数组件：`props` 作为第一个参数传输的

  - 直接访问 `props` 参数

  - 使用解构赋值

    ::: code-group

    ```jsx[props]
    export default function Hello(props) {
      return <h1>Hello {props.name}!</h1>;
    }
    ```

    ```jsx[destructuring]
    export default function Hello({ name }) {
      return <h1>Hello {name}!</h1>;
    }
    ```

    :::

## **事件处理**

- 事件命名采用小驼峰 (camelCase)
- 使用 JSX 语法需要传入一个函数作为事件处理函数

- React 的事件系统基于合成事件 (SyntheticEvent)

  - 无法通过 `return false` 阻止默认行为，而需要使用 `e.preventDefault` 阻止默认行为

    ```jsx
    export default function App() {
      function handleClick(e){
        e.preventDefault()
      }
      return <a href="https://www.bilibili.com/" onClick={handleClick}>Test</a>
    }
    ```

- 访问原生事件对象：`e.nativeEvent`

- 如果是类组件，那么将事件处理函数写作类方法

  ```jsx
  import React from 'react'
  
  export default class App extends React.Component {
    clickHandler(e) {
      e.preventDefault()
    }
    render() {
      return <a href="https://www.bilibili.com/" onClick={this.clickHandler}>Test</a>
    }
  }
  ```

### this 指向

在 JavaScript 中，`this` 取决于函数的调用方式

在 React 类组件中，事件处理函数是类方法，当方法作为事件处理函数传递给 DOM 元素时，`this` 上下文可能丢失

- 将事件处理函数修改为箭头函数

  ```jsx
  clickHandler() { // [!code --]
    console.log(this); // [!code --]
  } // [!code --]
  clickHandler = () => { // [!code ++] [!code focus]
    console.log(this); // [!code ++] [!code focus]
  } // [!code ++] [!code focus]
  ```

- 将事件绑定修改为箭头函数

  ```jsx
  // [!code --]
  <button onClick={this.clickHandler}>Button</button> 
  // [!code ++] [!code focus]
  <button onClick={() => this.clickHandler()}>Button</button> 
  ```

- 使用 `bind` 强制绑定 `this` 指向

  ```jsx
  constructor(props) {
    super(props);
    // ...
    this.clickHandler = this.clickHandler.bind(this); // [!code ++]
  }
  ```

### 事件处理函数传参

事件对象 `e` 会作为第二个参数传递

- 如果通过箭头函数，事件对象必须显式传递
- 如果通过 `bind`，事件对象以及其他参数将隐式传递

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## **State & 生命周期**

类组件设置组件自身状态

- 在构造函数中，通过 `this.state` 初始化

- 使用类字段语法，直接在类中定义 `state` ，无需使用构造函数

::: code-group

```jsx[constructor]
import React from 'react';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return ();
  }
}
```

```jsx[Class Fields]
import React from 'react';

export default class Counter extends React.Component {
  state = {};

  render() {
    return ();
  }
}
```

:::

### setState

- 不要直接修改 `State`，而应该使用 `setState`

  ```jsx
  this.state.num = this.state.num + 1 // [!code --]
  
  this.setState({ // [!code ++]
    num: this.state.num + 1 // [!code ++]
  }) // [!code ++]
  ```

- `setState` 可能是异步的，处于性能考虑，React 可能会将多个 `setState` 合并为一个调用

  - 如果改变状态的代码位于某个 HTML 事件中，则是异步的，否则是同步的
  
- 如果需要使用改变后的状态，需要使用回调函数 (`setState` 的第二个参数)

  ```jsx
  clickHandler = () => {
    this.setState({
      num: this.state.num + 1
    }, () => {
      this.setState({
        num: this.state.num + 1
      })
    })
  }
  ```

- 如果新的状态需要根据之前状态运算，使用函数的方式运算改变状态 (`setState` 的第一个参数是一个函数，而不再是对象)

  ```jsx
  clickHandler = () => {
    // 注意: 返回的是一个对象  
    this.setState((cur) => ({
      num: cur.num + 1,
    }))
  }
  ```

  

### useState



1. 不要直接修改 `state`：`state` 是 React 组件中的核心数据，表现为对象，修改对象的属性不会触发重新渲染
2. `setState` 异步特性：出于性能考虑，`setState` 不会立即更新 `this.state`，而是将多次 `setState` 调用批量处理 (batching)
   - 目的：优化性能，减少不必要的重新渲染

`setState` 合并机制：`setState` 是浅合并，只要传入的对象字段，不改变其他字段



## 表单

- 使用 `useState` 声明响应式变量
- 如何实现重置(类似 vue 中的 `v-model`)
- `e.preventDefault()`：阻止原生表单的默认行为

::: code-group

```jsx[App.jsx]
import { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    // 阻止事件默认行为
    e.preventDefault();

    if (username === '' || password === '') {
      alert("'username' and 'password' must be required");
      return;
    }

    console.log('username: ' + username, '\npassword: ' + password);
    // 表单提交后, 将文本框内容清空
    setUsername('');
    setPassword('');
  }
  // JSX syntax
  return (<main>
    <h2>Login Form</h2>

    <form onSubmit={handleSubmit}>
      <label htmlFor="txt">
        账号: <input type="text"
          id='txt'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          value={username} />
      </label><br />

      <label htmlFor="pwd">
        密码: <input type="password"
          id='pwd'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password} />
      </label><br />

      <button type="submit">Login</button>
    </form>

  </main>)
}
```

:::

## Derived State

 React [derived state](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html) 类似于 vue 中的 `computed`，但不需要像 vue 那样显式地去调用一个函数

::: code-group

```jsx[App.jsx]
import { useState } from 'react';
import './style.css'

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const usernameClass = username.length <= 5 ? 'input-error' : 'input'; // [!code ++]
  const passwordClass = password.length <= 5 ? 'input-error' : 'input'; // [!code ++]
  
  function handleSubmit(e) {
    // 阻止事件默认行为
    e.preventDefault();

    if (usernameClass === 'input-error' || passwordClass === 'input-error') { // [!code ++]
      return; // [!code ++]
    } // [!code ++]
    
    console.log('username: ' + username, '\npassword: ' + password);
    
    // 表单提交后, 将文本框内容清空
    setUsername('');
    setPassword('');
  }
  // JSX syntax
  return (<main>
    <h2>Login Form</h2>

    <form onSubmit={handleSubmit}>
      <label htmlFor="txt">
        账号: <input type="text" className={usernameClass} // [!code ++]
          id='txt'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          value={username} />
      </label><br />

      <label htmlFor="pwd">
        密码: <input type="password" className={passwordClass} // [!code ++]
          id='pwd'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password} />
      </label><br />

      <button type="submit">Login</button>
    </form>

  </main>)
}
```

```css[style.css]
.input-error{
  border:1px solid red;
}
```

:::

 [dynamic-circle-demo](https://github.com/YasakaKanoko/dynamic-circle-demo) 练习：

- useState()` 用法
- erived State 用法
- style` 样式绑定
- 件处理



## Vite+React-ts

::: code-group

```sh[npm]
npm create vite@latest my-app -- --template react-ts
```

```sh[pnpm]
pnpm create vite my-app --template react-ts
```

```sh[yarn]
yarn create vite my-app --template react-ts
```

```sh[bun]
bun create vite my-app --template react-ts
```

:::
