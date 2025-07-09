---
date: 2025-07-09
title: css 布局
category: CLANNAD
tags:
- css
description: 
---

# Layout

::: details 目录

[[TOC]]

:::

> 当对一个文档进行布局 (lay out) 的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型** (**CSS basic box model**)，将所有元素表示为一个个矩形的盒子 (box)。CSS 决定这些盒子的大小、位置以及属性 (例如：颜色、背景、边框尺寸…)。
>
> <br />
>
> 每个盒子由四个部分 (或称*区域*) 组成，其效用由它们各自的边界 (Edge) 所定义 (原文：defined by their respective edges，可能意指容纳、包含、限制等)。如图，与盒子的四个组成区域相对应，每个盒子有四个边界：*内容边界* *Content edge*、*内边距边界* *Padding Edge*、*边框边界* *Border Edge*、*外边框边界* *Margin Edge*。

- `width`：内容区宽度；值为长度、百分比、`auto` 等

- `height`：内容区高度；值为长度、百分比、`auto` 等

- `padding`：内边距；其百分比相较于容器宽度

  > ::: details 取值
  >
  > - 当指定**一**个值时，表示**四个边**的内边距
  > - 当指定**两**个值时，第一个值应用于**上下**、第二值应用于**左右**
  > - 当指定**三**个值时，第一个值应用于**上**，第二值应用于**左右**，第三个值应用于**下**
  > - 当指定**四**个值时，这些值依次表示**上右下左**四个方向
  >
  > :::

- `margin`：外边距；其百分比相较于容器宽度

  > ::: details 取值
  >
  > - 当指定**一**个值时，表示**四个边**的外边距
  > - 当指定**两**个值时，第一个值应用于**上下**、第二值应用于**左右**
  > - 当指定**三**个值时，第一个值应用于**上**，第二值应用于**左右**，第三个值应用于**下**
  > - 当指定**四**个值时，这些值依次表示**上右下左**四个方向
  >
  > :::

- `border`：边框；可以设置属性 `border-width` 宽度、`border-style` 类型 (实线/虚线)、`border-color` 颜色

  > 绘制三角形
  >
  > 1. 为四个边框设置颜色
  >
  > 2. 将容器的宽度和高度设置为 `0`
  >
  > 3. 将其余边框设置为 `transparent`
  >
  >    ```css
  >    .box {
  >      width: 0px;
  >      height: 0px;
  >      border-width: 10px;
  >      border-style: solid;
  >      border-left-color: aqua;
  >      border-right-color: transparent;
  >      border-top-color: transparent;
  >      border-bottom-color: transparent;
  >    }
  >    ```

## box-sizing

默认情况，`width`、`height` 会应用到这个元素的内容区，如果这个元素还有任何 `border`、`padding` 属性，盒子的**宽高**会加上设置的**边框和内边距**

- `content-box`：默认值。假设当前设置元素的宽高为 `100px`，并且任何边框和内边距的宽高都会被应用到最终的元素宽度中，即内容区的实际宽高是 `width` 加上去 (`border` + `padding`) 的值
- `border-box`：假设当前设置元素的宽高为 `100px`，实际上内容区的实际宽高包含 `border` 和 `padding`，即内容区的实际宽高是 `width` 减去 (`border` + `padding`) 的值

## overflow

`overflow`：设置元素溢出时的行为；即当一个元素内容太大而无法适应[块级格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)时该做什么，是 `overflow-x` 和 `overflow-y` 的简写属性

> 为了使 `overflow` 有效果，块级容器必须有一个指定的宽度 (`height` 或 `max-height`)，或将 `white-space` 设置为 `nowrap`

## 块级元素

块级元素占据父元素 (容器) 的整个水平空间，以及与其内容高度相等的垂直空间

- `display: block;`
- 常见块级元素：`body`、`article`、`div`、`main`、`section`、`h1`-`h6`、`p`、`ul`、`li`

## 行内元素

行内元素只占据它定义元素的标签所限定的空间元素，而不打破内容流

- `display: inline;`
- 常见行内元素：`span`、`em`、`strong`、`cite`、`section`、`code` 等

## 常规流

正常布局流 (normal flow)：根元素、浮动和绝对定位的元素会脱离文档流，其他元素都在常规流之内 (in-flow)。常规流中的盒子，在某种排版上下文中参与布局

- 行级排版上下文、块级排版上下文、Table 排版上下文、Flex 排版上下文、Grid 排版上下文......

### 行内格式化上下文

行内格式化上下文 (Inline formatting context)，各行内框 (inline boxes) 一个接一个排列，其排列顺序根据书写模式 (writing-mode) 的设置决定

- 对于水平书写模式，各个框从左边开始水平地排列
- 对于垂直书写模式，各个框从顶部开始垂直地排列

以下给出的例子，黑色边框的两个 div 组成一个块级格式化上下文，其中的每一个单词都参与一个行内格式化上下文中，水平书写模式下的各个框水平排列， 垂直书写模式下的各个框垂直排列

::: code-group

```html
<div class="example horizontal">One Two Three</div>
<div class="example vertical">Four Five Six</div>
```

```css
body {
  font: 1.2em sans-serif;
}

.example {
  border: 5px solid black;
  margin: 20px;
}

.horizontal {
  writing-mode: horizontal-tb;
}

.vertical {
  writing-mode: vertical-rl;
}
```

:::

- 只包含行级盒子的容器会创建一个 IFC，IFC 排版规则

  - 盒子在一行内摆放，当一行摆放不下是时换行显示

  - `text-align` 决定行内盒子的水平对齐

  - `vertical-align` 决定盒子在行内的垂直

- 一个段落实际上是一系列行框的集合，这些行框在块的方向上排列

- 一个行内框（inline box）被分割到多行中时， `margins`、`borders` 以及 `padding` 的设定均不会在断裂处生效

### 块级格式化上下文

块级格式化上下文 (Block Formatting Context, BFC)，块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

- 盒子从上到下摆放
- **BFC 内的垂直 margin 会合并**
- **BFC 内盒子的 margin 则不会与外面的合并**

- BFC 不会与浮动元素重叠

