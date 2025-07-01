---
date: 2025-05-20
title: less
category: css
tags:
- css
description: 
---
# <samp>Less</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

## <samp>开始</samp>

- 初始化

  ```sh
  npm init -y
  
  npm i -D less
  
  npx lessc style.less style.css
  ```

- 配置

  ::: code-group

  ```json[package.json]
  "scripts": {
    "lessc": "lessc css/style.less css/style.css"
  },
  ```

  :::

  - 优化

    ::: code-group

    ```sh
    npm i -D nodemon 
    ```

    ```json[package.json]
    "scripts": {
      "watch-less": "nodemon --watch css --ext less --exec \"lessc css/style.less css/style.css\""
    },
    ```

    :::

## <samp>变量</samp>

<samp>**变量**</samp>：用 `@` 表示，用于存储重复使用的信息；如：颜色、字体堆栈

::: code-group

```less [style.less]
@danger: #f40;
@success: #0f0;
@warning: #ff0;
@info: #00f;

#header {
  color: @success;
}
```

```css[style.css]
#header {
  color: #0f0;
}
```

:::

## <samp>运算</samp>

<samp>**运算**</samp>：在变量中参与运算

::: code-group

```less [style.less]
@width: 100px;
@height: @width * 2;
.box {
  width: @width;
  height: @height;
}
```

```css[style.css]
.box {
  width: 100px;
  height: 200px;
}
```

:::

## <samp>嵌套</samp>

- <samp>**子集**</samp>

  ::: code-group

  ```less [style.less]
  #header {
    color: black;
    .nav {
        font-size: 12px;
        h1 {
            font-size: 3em;
        }
    }
    .logo {
        width: 300px;
    }
  }
  ```

  ```css[style.css]
  #header {
    color: black;
  }
  
  #header .nav {
    font-size: 12px;
  }
  
  #header .nav h1 {
    font-size: 3em;
  }
  
  #header .logo {
    width: 300px;
  }
  ```

  :::

- <samp>**父级**</samp>：用 `&` 表示仍需同时满足的样式

  ::: code-group

  ```less [style.less]
  li {
      color: #008c8c;
      &.active {
          color: #f40;
      }
      &::after {
          content: '';
      }
  }
  ```

  ```css[style.css]
  li {
    color: #008c8c;
  }
  
  li.active {
    color: #f40;
  }
  
  li::after {
    content: '';
  }
  ```

  :::

- <samp>**直接子元素**</samp>：用 `>` 表示

  ::: code-group

  ```less [style.less]
  li {
    color: #008c8c;
    > a {
        text-decoration: none;
    }
  }
  ```

  ```css[style.css]
  li {
    color: #008c8c;
  }
  li > a {
    text-decoration: none;
  }
  ```

  :::

## <samp>Mixins</samp>

<samp>**Mixins**</samp>：将一组规则以函数式混入另一个规则

- <samp>**无参**</samp>

  ::: code-group

  ```less [style.less]
  .round() {
    border-radius: 5px;
  }
  div {
    .round();
  }
  ```

  ```css[style.css]
  div {
    border-radius: 5px;
  }
  ```

  :::

- <samp>**有参**</samp>

  ::: code-group

  ```less [style.less]
  .round(@r) {
    border-radius: @r;
  }
  div {
    .round(5px);
  }
  ```

  ```css[style.css]
  div {
    border-radius: 5px;
  }
  ```

  :::

- <samp>**参数默认值**</samp>

  ::: code-group

  ```less [style.less]
  .round(@r: 5px) {
    border-radius: @r;
  }
  div {
    .round();
  }
  ```

  ```css[style.css]
  div {
    border-radius: 5px;
  }
  ```

  :::

## <samp>注释</samp>

- `// 单行注释`：只存在 Less 源码

- `/* 多行注释 */`：会生成到编译结果中

## <samp>Maps</samp>

<samp>**Maps**</samp>：将混合和规则集作为值映射

::: code-group

```less [style.less]
#colors() {
  primary: blue;
  secondary: green;
}
.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

```css[style.css]
.button {
  color: blue;
  border: 1px solid green;
}
```

:::

## <samp>Scope</samp>

<samp>**作用域**</samp>：先从本地中查找，再从父级中查找

```less
@var: red;

#page {
  @var: white;
  #header {
      color: @var; // white
  }
}
```

> 作用域具有懒加载

```less
#page {
  #header {
      color: @var; // white
  }
  @var: white;
}
```

## <samp>模块</samp>

创建 `.less` 文件，通过 `@import` 导入，导入的 `.less` 文件可以直接省略扩展名

```less
@import "library"; // library.less
@import "typo.css";
```

