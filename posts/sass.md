---
date: 2025-05-20
title: Sass
category: css
tags:
- css
description: 
---
# <samp>Sass</samp>

<samp><b>初始化</b></samp>

```sh
npm init -y

npm i -D sass

# 监视文件夹app/sass变化, 编译到public/stylesheets文件夹中
# sass --watch app/sass:public/stylesheets
```

<samp><b>配置</b></samp>

```json
"scripts": {
  "start": "sass --watch ./css/index.scss ./css/index.css",
},
```

<samp><b>运行</b></samp>

```sh
npm start
```

::: tip

<samp>Sass 有两种语法</samp>

- <samp>`.scss` 最常用，是 CSS 超集</samp>
- <samp>`.sass` 规则比较特殊，采用缩进而不是花括号来嵌套语句，采用换行符而不是分号来分隔</samp>

:::

## <samp>变量</samp>

<samp>变量用于存储重复使用的信息，如：颜色、字体堆栈</samp>

::: code-group

```scss [index.scss]
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css[index.css]
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

:::

## <samp>嵌套</samp>

<samp>获得 HTML 一样清晰的视觉层次结构</samp>

<samp>过度嵌套会导致 CSS 难以维护</samp>

::: code-group

```scss [index.scss]
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css[index.css]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

:::

## <samp>模块</samp>

<samp>创建 Sass 文件部分，使其模块化，易于维护；只需写作以下划线 `_` 开头的 Sass 文件，那么它就不会生成对应的 CSS 文件，部分文件可以使用 `@use` 引用</samp>

<samp>Sass 文件可以通过 `@use` 规则将其拆分为任意的文件，将另一个 Sass 文件加载为 module，使得变量、函数、Mixins 隔离</samp>

::: info <samp>注意</samp>

<samp>使用 `@use` 时，无需包含扩展名</samp>

:::

::: code-group

```scss [_base.scss]
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss[index.scss]
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

```css[index.css]
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```

:::

## <samp>Mixins</samp>

<samp>创建 `mixin` 需要使用 `@mixin` 并命名，在括号内定义变量，方便值传递。通过 `@include` 调用</samp>

::: code-group

```scss [index.scss]
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

```css[index.css]
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
```

:::

## <samp>继承</samp>

<samp>使用扩展 `@extend` 将 CSS 属性从一个选择器共享；同类行为可以共用，因此创建一个占位符类，表示共同的行为；未使用的占位符类，将不会编译</samp>

::: code-group

```scss [index.scss]
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// 未使用
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

```css[index.css]
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

:::

## <samp>运算符</samp>

<samp>在 CSS 中进行数学运算，如：`+`、`-`、`*`、`math.div()`、`%`</samp>

::: code-group

```scss [index.scss]
@use "sass:math";

.container {
  display: flex;
}

article[role="main"] {
  width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
  width: math.div(300px, 960px) * 100%;
  margin-left: auto;
}
```

```css[index.css]
.container {
  display: flex;
}

article[role=main] {
  width: 62.5%;
}

aside[role=complementary] {
  width: 31.25%;
  margin-left: auto;
}
```

:::

