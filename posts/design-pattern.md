---
date: 2025-06-28
title: design pattern
category: design pattern 
tags:
- design pattern
description: 
---
# 设计模式

## 设计原则

### 面向对象设计(SOLID)

- 单一职责原则 - Single Responsibility Principle, SRP
- 开放封闭原则 - Open Closed Principle, OCP
- 里氏替换原则 - Liskov Substitution Principle, LSP
- 接口隔离原则 - Interface Segregation Principle, ISP

- 依赖倒转原则 - Dependence Inversion Principle, DIP

- 迪米特法则 - The Law of Demeter, LoD (或最少知识原则 - Least Knowledge Principle)
- 合成复用原则 - Composite Reuse Principle, CRP

## 设计模式

- 创建型
- 结构型
- 行为型

## SRP

单一职责原则要求一个类(或模块、函数)只负责一项职责，一个类只处理一类的功能和逻辑

换句话说，一个对象只做一件事

- 副作用很高
- 架构上的分层，会比较困难

::: code-group

```js
class UserOptions {
  updateUserInfo(user, type) {
    if (type === 'username') {
      this.user.username = user.username;
    } else if (type === 'password') {
      this.user.password = user.password;
    }
  }
}
```

```js[SRP]
class UserOptionsSRP {
  updateUserInfo(typeArr) {
    // 控制修改策略
  }
  // 具体修改逻辑
  updateUserName(username) {
    this.user.username = username;
  }
  updatePassword(password) {
    this.user.password = password;
  }
}
```

:::

### 应用

`List` 组件耦合了大量的接口请求相关的逻辑

::: code-group

```jsx[App.jsx]
import { useState, useEffect } from 'react'

const getBookList = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(['HTML', 'CSS', 'JS',]);
  }, 1000)
})

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getBookList().then(res => setList(res));
  }, [])

  return (<>
    <ul>
      {list.map(item => <li key={item}>{item}</li>)}
    </ul>
  </>);
}

export default function App() {
  return (<>
    <List />
  </>)
}
```

```jsx[App-SRP.jsx]
import { useState, useEffect } from 'react'

const getBookList = () => new Promise((resolve) => { 
  setTimeout(() => {
    resolve(['HTML', 'CSS', 'JS',]);
  }, 1000)
})

const useBookList = () => { // [!code ++]
  const [list, setList] = useState([]);// [!code ++]

  useEffect(() => { // [!code ++]
    getBookList().then(res => setList(res)); // [!code ++]
  }, []) // [!code ++]
  return [list]; // [!code ++]
} // [!code ++]

// 纯展示的逻辑
const ListView = ({ list }) => { // [!code ++]
	{/* [!code ++] */}
  return (<ul>
  	{/* [!code ++] */}
    {list.map(item => <li key={item}>{item}</li>)} 
  </ul>) // [!code ++]
} // [!code ++]

const List = () => {
  const [list] = useBookList();

  return (<>
    <ListView list={list} />
  </>);
}


export default function App() {
  return (<>
    <List />
  </>)
}
```

:::

#### 什么时候解耦

如果两个职责在修改时，都是同时变化，就不必解耦

如果未来可能独立复用，可以考虑单一职责

OCP

## Reference

- [design-patterns](https://refactoringguru.cn/design-patterns)
