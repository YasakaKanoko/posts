---
date: 2025-05-20
title: Vue
category: vue
tags:
- js
description: 
---
# Vue

::: details 目录

[[TOC]]

:::

## 编程范式

### 命令式编程





### 声明式编程



Vue 提供了一套声明式的、组件化的编程模型

- **声明式**：Vue 扩展了一套模板语法，声明式地描述 HTML 与 JavaScript 状态的关系
- **响应式**：Vue 会自动跟踪 JavaScript 状态并在发生变化时响应式更新 DOM

## 开始

使用 `create-vue`

::: code-group

```sh[npm]
npm create vue@latest
```

```sh[pnpm]
pnpm create vue@latest
```

```sh[yarn]
yarn dlx create-vue@latest
```

```sh[bun]
bun create vue@latest
```

:::

### 启动

::: code-group

```sh[npm]
cd my-vue-app
npm install
npm run dev
```

```sh[pnpm]
cd my-vue-app
pnpm install
pnpm dev
```

```sh[yarn]
cd my-vue-app
yarn
yarn dev
```

```sh[bun]
cd my-vue-app
bun install
bun run dev
```

:::

## Vue3 vs Vue2

- Vue3 不存在构造函数 `new Vue()`

  ::: code-group

  ```js[vue2/src/main.js]
  import Vue from "vue";
  import App from "./App.vue";
  
  new Vue({
    render: (h) => h(App)
  }).$mount('#app')
  ```

  ```js[vue3/src/main.js]
  import { createApp } from 'vue'; // [!code ++]
  import App from './App.vue';
  
  createApp(App).mount('#app')
  ```

  :::

  ::: details 区别

  - `new Vue()` 构造函数创建的对象，所有实例共享全局组件/指令等
  - `createApp()` 方法应用实例之间具有隔离的环境

  :::

- Vue2 的 `this` 指向组件实例；Vue3 的 `this` 指向 `Proxy` 对象

- Vue3 有选项式(option)、组合式(composition)两种 API 可选

  ::: details composition API

  - `setup()` 会在生命周期钩子函数之前调用

  - `setup()` 的 `this` 指向 `undefined`

  - `setup()` hook 内部的数据、方法直接附着在组件实例上

  :::

### 为什么去除了 Vue 构造函数

vue2 的全局构造函数带来的问题

1. 调用构造函数静态方法会对所有的 vue 应用生效，不利于隔离不同应用
2. vue2 的构造函数集成了太多功能，不利于 tree shaking，vue3 将它们作为普通函数导出，充分利用 tree shaking 优化打包体积
3. vue2 没有把组件实例和 vue 应用两个概念分开，在 vue2 中，通过 `new Vue()` 创建的对象，既是一个应用，同时又是一个特殊的 vue 组件。而在 vue3 中，把两个概念区分开，通过 `createApp` 创建的对象，是一个 vue 应用，内部提供的方法是针对整个应用的，而不再是一个特殊的组件

### Vue3 的数据响应式

Vue3 不再使用 `Object.defineProperty` 的方式定义完成数据响应式，而是使用 `Proxy`

- `Proxy` 本身的效率比 `Object.defineProperty` 更高
- 不必递归遍历所有属性，而是直接得到一个 `Proxy`，在 Vue3 中，对数据的访问是动态的，当访问某个属性时，动态获得值与设置，极大提升了在组件初始阶段的效率
- `Proxy` 可以监控成员的新增和删除，在 Vue3 中新增、删除成员、访问索引等都可以触发重新渲染



## 文本插值

[Mustache 语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)：(双大括号)，在标签中同步更新相应组件实例中的数据

- vue 模板可以直接解析组件实例中的属性
- vue 模板可以直接调用属性的方法
- vue 模板可以直接嵌入 JavaScript 表达式

::: code-group

```vue[App.vue]
<script setup>
const text = 'Hello World';
</script>

<template>
  <div>
    <p>{{ text }}</p>
  </div>

</template>
```

:::

## [v-model](https://cn.vuejs.org/api/built-in-directives.html#v-model)

`v-model`：双向数据绑定

- [`.lazy`](https://cn.vuejs.org/guide/essentials/forms.html#lazy)：输入懒加载
- [`.number`](https://cn.vuejs.org/guide/essentials/forms.html#number)：将输入的合法字符串转为数字
- [`.trim`](https://cn.vuejs.org/guide/essentials/forms.html#trim)：移除输入内容两端空格

原生 JS 实现 `v-model`

::: code-group

```vue[App.vue]
<script setup>
import { ref } from 'vue';
const text = ref('');
</script>

<template>
  <div>
    <input type="text" v-model="text">
    <p>{{ text }}</p>
  </div>

</template>
```

```js[vanilla.js]
const pEle = document.querySelector('.p-text');
const inputEle = document.querySelector('.input-text');

inputEle.addEventListener('input', (event) => {
  pEle.textContent = event.target.value;
});
```

:::

原生 JS 实现 `v-model.lazy`

::: code-group

```vue[App.vue]
<script setup>
import { ref } from 'vue';
const text = ref('');
</script>

<template>
  <div>
  	<!-- [!code ++] -->
    <input type="text" v-model.lazy="text"> 
    <p>{{ text }}</p>
  </div>

</template>
```

```js[vanilla.js]
const pEle = document.querySelector('.p-text');
const inputEle = document.querySelector('.input-text');

let text = ""; // [!code ++]
inputEle.addEventListener('input', (event) => {
  text = event.target.value; // [!code ++]
});
inputEle.addEventListener('blur', () => { // [!code ++]
  pEle.textContent = text; // [!code ++]
}); // [!code ++]
```

:::

## [v-bind](https://cn.vuejs.org/guide/essentials/class-and-style.html)

`v-model` 可以直接绑定 `input`、`select`、`checkbox` 的值，但无法绑定元素的属性

`v-bind`：操作元素的 CSS 以及类样式，简写：⌈`:`⌋

```vue
<script setup>
import { ref } from 'vue'
const textColor = ref('red-text');
</script>

<template>
  <h1 class="red-text" :class="textColor">Demo</h1>
  <select name="" id="" v-model="textColor">
    <option value="red-text">Red</option>
    <option value="blue-text">Blue</option>
  </select>
</template>

<style scoped>
.red-text {
  color: red;
}

.blue-text {
  color: blue;
}
</style>
```

## v-on

`v-on`：为元素绑定事件监听器，简写：⌈`@`⌋

::: code-group

```vue[template]
<template>
  <form>
    <label for="txt">
      账号: <input 
      type="text" 
      id='txt' 
      placeholder="Enter your username" 
      v-model="username" 
      :class="username_is_error" />
    </label><br />

    <label for="pwd">
      密码: <input 
      type="password" 
      id='pwd' 
      placeholder="Enter your password" 
      v-model="password"
      :class="password_is_error" />
    </label><br />

    <!-- prevent: 阻止默认事件 -->
    <button type="submit" @click.prevent="submit">Login</button>
  </form>
</template>
```

```vue[script]
<script setup>
import { ref } from 'vue'
let username = ref('');
let password = ref('');
let username_is_error = ref('');
let password_is_error = ref('');

const submit = () => {
  username_is_error.value = '';
  password_is_error.value = '';

  if (username.value.length < 3 || password.value.length < 3) {

    if (username.value.length < 3) {
      username_is_error.value = 'input-error';
    }

    if (password.value.length < 3) {
      password_is_error.value = 'input-error';
    }

    console.log('The input length smaller than 3 ');
  }
  
  console.log(`Your username is ${username.value}, Your password is ${password.value}`);
}
</script>
```

```vue[style]
<style scoped>
input {
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.input-error {
  border: solid 1px red;
}

button {
  margin-bottom: 10px;
}
</style>
```

:::

## watch

`watch`：监听一个或多个数据源，当数据变化时调用回调函数

```js
const countRef = ref(0)
watch(countRef, (newCount, oldCount) => {
})
```

监听多个数据源时

```js
watch([fooRef, barRef], ([newFoo, newBar], [oldFoo, oldBar]) => {
})
```

```vue
<script setup>
import { ref, watch } from 'vue'

const usernameRef = ref('');
const passwordRef = ref('');
const titleRef = ref('Title');

watch([usernameRef, passwordRef, titleRef], ([newUsername, newPassword, newTitle], [prevUsername, prevPassword, prevTitle]) => {
  titleRef.value = "Title";
  if (newUsername.length < 3) {
    titleRef.value = 'Error occur';
  }
  if (newPassword.length < 3) {
    titleRef.value = 'Error occur';
  }
  if (newTitle === prevTitle) {
    return;
  }
  if (prevTitle === 'Error occur') {
    console.log('Input valid!');
    return;
  }
  console.log('Input Error!');
})


</script>

<template>
  <h1>{{ titleRef }}</h1>
  <form>
    <label for="txt">
      账号: <input type="text" id='txt' placeholder="Enter your username" v-model="usernameRef" />
    </label><br />

    <label for="pwd">
      密码: <input type="password" id='pwd' placeholder="Enter your password" v-model="passwordRef" />
    </label><br />
  </form>
</template>
```

## computed

## v-if



## 响应式

`ref()`：声明响应式的状态

> - 在 `setup()` 函数中声明时，函数参数实质上是一个带有 `.value` 属性的 `ref` 对象
> - **自动解包**：在组件模板中使用时，具有自动解包

```vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let count = ref(0);
    return {
      count,
    }
  }
}
</script>
```

::: details 优化：使用 `ref()` 实现类似 React 的 `useState()`

```vue
<template>
  <button @click="increase">{{ count }}</button>
</template>

<script>
import { ref } from 'vue'
function useCount() {
  let count = ref(0);
  const increase = () => {
    count.value++;
  }
  return {
    count,
    increase
  }
}
export default {

  setup() {
    return {
      ...useCount()
    }
  }
}
</script>
```

:::

## 渲染机制

**虚拟 DOM(Virtual DOM，VDOM)**：虚拟 DOM 是一种编程概念，由 React 率先提出，通过 `vnode` 描述渲染的 UI 的数据结构，保存在内存中，使之与真实 DOM 保持同步

```js
const vnode = {
  type: 'div',
  props: [
    id: 'Hello'
  ],
  children: [
    // 更多 vnode
  ]
};
```

> `vnode` 是一个纯 JavaScript 对象，代表一个 `div` 元素，包含实际元素所需的所有信息，还包含更多节点，这使它称为虚拟 DOM 的根节点

**挂载(mount)**：一个运行时渲染器会遍历整个虚拟 DOM 树，并由此构建真实 DOM 树，这个过程称作**挂载**

**更新(patch)**：渲染器会遍历比较新旧两份虚拟 DOM 树，找出之间的区别，并将其中的变化应用到真实 DOM 中，这个过程称为更新(patch)，又称比对(diffing)或协调(reconciliation)

**流程**

1. **编译**：将 Vue 模板编译为渲染函数，即返回虚拟 DOM 树的函数。这一步骤可以通过构建步骤提前完成，也可以使用运行时编译器即时完成
2. **挂载**：运行时渲染器调用渲染函数，遍历并返回虚拟 DOM 树，创建实际 DOM 节点
3. **更新**：当依赖发生变化后，组件重新渲染，这时会创建一个更新后的虚拟 DOM 树，运行时渲染器遍历新树，与旧树进行比较，然后将必要的更新应用到真实 DOM 中

<img src="https://cn.vuejs.org/assets/render-pipeline.CwxnH_lZ.png" alt="vue how to construct a real DOM tree"/>

::: code-group

```js[render]
render(h) {
  return h('div', [
    h('h1', `${this.msg}`),
    h('p', `${this.info}`)
  ]);
}
```

```html[template]
<div>
  <h1>Hello Vue!</h1>
  <p>zhizi</p>
</div>
```

:::

Vue 模板会被预编译成 DOM 渲染函数

为什么 Vue 默认推荐使用模板?

- 模板更贴近实际 HTML，这样更方便重用已有的 HTML 代码片段，能够带来更好的可访问性体验、更方便地使用 CSS 样式，并且更易理解和修改
- 由于确定的语法，更容易对模板进行静态分析，使得 Vue 模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能

## Vite

::: code-group

```sh[npm]
npm create vite@latest my-vue-app -- --template vue
```

```sh[pnpm]
pnpm create vite my-vue-app --template vue
```

```sh[yarn]
yarn create vite my-vue-app --template vue
```

```sh[bun]
bun create vite my-vue-app --template vue
```

:::

### 相较于 webpack

**webpack 原理**

- **依赖图构建**：webpack 会从入口文件开始，递归地分析项目中的依赖关系，构建一个依赖图
- **模块转换**：webpack 会使用各种 loader 将不同类型的模块(如 JS、CSS、图片等)转换为 webpack 可以理解的模块
- **代码优化**：webpack 提供了各种插件来优化输出的代码，如代码压缩、tree shaking 等
- **输出打包**：webpack 最终会将所有模块打包成一个或多个 bundle 文件，供浏览器加载和执行

**Vite 的工作原理**

1. **原生 ES 模块**：Vite 利用浏览器原生支持的 ES 模块机制，在开发环境下无需打包，直接以原生 ES 模块的方式运行应用
2. **按需编译**：Vite 只会在浏览器请求时即时编译所需的模块，大大提高了开发环境下的构建速度
3. **HMR 机制**：Vite 采用 native ESM HMR 机制，可以实现快速的模块热更新
4. **生产环境打包**：在生产环境下，Vite 会使用 rollup 进行打包优化，生成最终的生产包

### Why Vite

- **缓慢的服务器启动**

  - 传统打包工具(webpack)需要先构建整个应用才能启动开发服务器，这将导致启动时间较长
  - vite 通过将应用分为依赖和源码，并使用 esbuild 预构建依赖，大幅缩短开发服务器启动时间

- **按需编译**

  - 传统打包工具(webpack)在文件修改后，需要重新构建整个包，这会导致更新速度随应用规模增长而下降

  - vite 利用原生 ESM 实现精确的模块失活和 HMR，使得无论应用的规模如何，更新速度始终都能保持快速

    > - 现代浏览器原生支持 ESM，自动向依赖的 Module 发出请求
    >
    > - HMR：当改动模块后，仅需让浏览器重新请求该模块，而不是像传统打包工具那样将模块的相关依赖模块全部编译一次，效率更高

- **生产环境**：生产环境的 ESM 仍然效率低下，Vite 附带了一套构建优化的构建命令，确保开发和生产环境的输出和行为一致

  > vite 使用传统的 rollup 插件 API 进行打包，主要优势体现在开发阶段，未来可能切换基于 Rust 的 Rolldown 进一步提高构建性能

### 效率提升

- **静态提升**

  - 静态节点提升：在编译阶段识别出静态节点(即在数据变化时不需要重新渲染的节点)，并将它们提升到外层，减少 diff 的工作量

    ::: code-group

    ```js[vue2]
    // 动态节点
    render() {
      createVNode('h1', null, 'Hello World!');
    }
    ```

    ```js[vue3]
    // 静态节点
    const _hoisted = _createVNode('h1', null, 'Hello World!');
    export default function render() {
    	// 使用 _hoisted
    	
    }
    ```

    :::

  - 静态属性提升：方便重用，减少内存占用

    ::: code-group

    ```html[template]
    <div class="user">
    	{{ user.name }}
    </div>
    ```

    ```js[vue]
    const _hoisted = { class: "user" };
    
    export default function render() {
    	createVNode('div', hoisted, user.name);
    }
    ```

    :::

- **预字符串化**：在编译阶段将一些静态的 HTML 模板预先转换为字符串形式，在运行时直接使用，避免了重复的虚拟 DOM 创建

  ::: code-group

  ```html[template]
  <div class="menu-bar-container">
  	<div class="logo">
  		<h1>logo</h1>
  	</div>
  	<ul class="nav">
  		<li><a href="#">menu</a></li>
  		<li><a href="#">menu</a></li>
  		<li><a href="#">menu</a></li>
  		<li><a href="#">menu</a></li>
  		<li><a href="#">menu</a></li>
  	</ul>
  	<div class="user">
  		<span>{{ user.name }}</span>
  	</div>
  </div>
  ```

  ```js[vue]
  _createStaticVNode("<div class=\"logo\"><h1>logo</h1></div><ul class=\"nav\"><li><a href=\"#\">menu</a></li><li><a href=\"#\">menu</a></li><li><a href=\"#\">menu</a></li><li><a href=\"#\">menu</a></li><li><a href=\"#\">menu</a></li></ul>", 2)
  ```

  :::
  
- **缓存事件处理函数**：自动缓存事件处理函数,避免不必要的重复创建，因为事件处理函数不需要在每次渲染时都重新创建

  ::: code-group

  ```html[Template]
  <button @click="count++">Plus</button>
  ```

  ```js[vue2]
  render(ctx) {
  	return createVNode('button', {
  		onClick: function($event) {
  			ctx.count++;
  		}
  	});
  }
  ```

  ```js[vue3]
  render(ctx, _cache) {
  	return createVNode('button', {
  		onClick: cache[0] || (cache[0] = ($event) => (ctx.count++));
  	});
  }
  ```

  :::

- **Block Tree**：将组件树划分为多个独立的"块"，每个块都有自己的更新逻辑，从而减少不必要的重新渲染

  ```html
  <form>
    <div>
      <label>账号：</label>
      <input v-model="user.loginId" />
    </div>
    <div>
      <label>密码：</label>
      <input v-model="user.loginPwd" />
    </div>
  </form>
  ```

- **Patch Flag**：标记虚拟 DOM 节点的更新类型。在更新时，Vue 只需要关注有标记的节点，从而提高更新效率。常见的 PatchFlag 有 TEXT、CLASS、STYLE 等


## Pinia

