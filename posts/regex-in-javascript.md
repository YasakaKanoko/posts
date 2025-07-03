---
date: 2025-07-03
title: 正则表达式
category: Angel Beats!
tags:
- js
description: 正则表达式是一种定义搜索模式的字符序列，通常缩写为 regex。这种模式提供了一种强大的方式来搜索、替换和操作文本，它被用于在字符串中查找匹配项，帮助你识别特定的文本或字符模型
---

# 正则表达式

::: details 目录

[[TOC]]

:::

正则表达式是一种定义搜索模式的字符序列，通常缩写为 "regex"。这种模式提供了一种强大的方式来搜索、替换和操作文本，它被用于在字符串中查找匹配项，帮助你识别特定的文本或字符模型

在 JavaScript 中，使用**字面量**或**构造函数**的方式创建正则表达式

- **正则表达式字面量**：使用 `/` 包裹
- **构造函数**：`RegExp` 构造函数，这种方式允许运行时编译

```js
const r = /pattern/;
const e = new RegExp("pattern");
```

## 模式

一个正则表达式模式是由**简单字符**或者是**简单和特殊字符的组合**所构成

- **简单模式**：精确匹配字符序列。如：`/abc/` 表示精确匹配字符串 `"abc"`
- **特殊字符**：通过重复或匹配特定类型的字符等功能增强匹配模式，实现更灵活、更强大的模式匹配
  - `*`：匹配前面出现 0 次或多次，如：`/ab*c/` 表示匹配 `"ab"`、`"abc"`、`"abbc"` 等

## 锚点

- `^`：检查字符串是否以特定字符或模式开头的字符串

- `$`：检查字符串是否以特定字符或模式结尾的字符串

  ```js
  let isValid = /^\d\d:\d\d$/.test('10:01');
  console.log(isValid); // true
  ```

- `m`：多行模式

  ```js
  let str = `1st line
  2nd line
  3rd line`;
  console.log(str.match(/^\d/gm)); // [ '1', '2', '3' ]
  ```

- `\b`：单词边界；匹配完整单词，而不是匹配包含当前字符串的子字符串

  ```js
  let pattern1 = /\bword\b/;
  let pattern2 = /word/;
  
  console.log(pattern1.test("This is wording.")); // false
  console.log(pattern2.test("This is wording")); // true
  ```

  > [!TIP]
  >
  > - `\b\d+\b`：匹配字符串所有整数，不包括数字字符相邻的非数字字符
  > - `^\bword\b$`：表示精确匹配字符串 `word`

## 预定义

- `\d`：匹配数字，等价于区间 `[0-9]`
- `\s`：匹配单个空白字符，包括空格、制表符、换行符
- `\w`：匹配任何单词字符 (字母、数字、下划线)，等价于区间 `[A-Za-z0-9_]`

## 反向类

- `\D`：匹配任何不包含在相应小写类中的字符

## 特殊字符

### 元字符

- [锚点](#锚点)：`^` 和 `$`
- 交替：`|`
- [量词](#量词)：`+`、`?`、`{}`
- [预定义](#预定义)：`\d`、`\w`、`\s`

- `.`：匹配除了换行符 (`\n`) 以外的任意单个字符
  - `/s`：启用单行模式

### 转义字符

使用 `\` 开启转义

## 量词

- `{n}`：匹配固定长度的字符或模式

  ```js
  let str = 'Year: 2022';
  let s = /\d{4}/; // 匹配固定长度的数字
  console.log(str.match(s)); // ['2022']
  ```

- `{n,m}`：区间量词；匹配的字符、字符组必须重复至少 `n` 次，至多 `m` 次

  ```js 
  let str = "The meeting is scheduled for 10:30 AM and ends at 2 PM";
  let re = /\d{2,4}/g; // 匹配有2到4位数字的数
  console.log(str.match(re)); // [ '10', '30' ]
  ```

- `{n,}`：匹配的字符、字符组必须重复至少 `n` 次

  ```js
  let str = 'The price of the item is $2500';
  let re = /\d{2,}/g; // 匹配至少有2位数字的数。
  console.log(str.match(re)); // ["2500"]
  ```

- `+`：至少一次

  ```js
  let phone = "+1-(103)-777-0101";
  let result = phone.match(/\d+/g); // 匹配一个或多个数字。
  console.log(result.join('')); // 11037770101
  ```

- `?`：零次或 1 次

  ```js
  let str = 'The sky is blue in color, but the ocean is blue in colour';
  let result = str.match(/colou?r/g); // 匹配"color"和"colour"
  console.log(result); // [ 'color', 'colour' ]
  ```

- `*`：零次或多次

  ```js
  let str = 'Computer science is fascinating, but computational engineering is equally interesting';
  let results = str.match(/comput\w*/gi); // 匹配"computer"和"computational"
  console.log(results); // [ 'Computer', 'computational' ]
  ```

### 贪婪量词

**贪婪量词** (greedy quantifiers)，默认情况下，量词会尽可能多地匹配符合条件的字符

如：`/".+"/g` 表示匹配一个或多个任意字符 (贪婪模式)

```js
let regexp = /".+"/g;
let str = 'The "Boy" and his "Friends" were here';
console.log(str.match(regexp)); // "Boy" and his "Friends"
```

> [!NOTE]
>
> - 它会将 `Boy` 后的 `"` 和 `Friends` 前的 `"` 视为一组
>
> - `.`：表示匹配任意字符
>
> - `+`：表示匹配一次或多次
>
>   `".+"`：表示匹配双引号内的内容

### 懒惰模式

**懒惰模式** (也称**非贪婪模式**，lazy mode 或 non-greedy mode)：在量词后添加 `?`，使量词匹配尽可能少的字符，而不是匹配尽可能多

- 如：`*?`、`+?`、`??`、`{n,m}?`

## 集合与区间

### 集合

- `[...]`：允许匹配集合中的任意一个字符

  ```js
  let str = 'The cat chased the rats in the backyard';;
  let re = /[cr]at/g;
  
  console.log(str.match(re)); // ['cat', 'rat']
  ```

### 区间

- `[a-z]`：匹配小写字母
- `[0-9]`：匹配 0-9 数字

### 否定/排除

`^`：表示排除

- `/[^0-9]/g`：除了数字
- `/[^a-z]/g`：除了小写字母

## 标志

- `i`：忽略标志；使正则表达式在搜索匹配项时忽略大小写
- `g`：全局标志；允许正则表达式在字符串中找到所有匹配项，而不是在找到第一个匹配项后停止

- 组合标志：如：`gi`，允许进行不区分大小写匹配，找到所有匹配项
- `u`：正确处理 Unicode 字符，而非代理对

## 方法

- `test()`：检查特定字符串是否与指定模式或正则表达式匹配，如果字符串中找到该模式，返回 `true`，反之返回 `false`

  ```js
  const pattern = /hello/;
  const str = 'hello world';
  console.log(pattern.test(str)); // true
  ```

- `exec()`：根据正则表达式模式的内容搜索字符串中匹配项，返回一个数组。包含**匹配的字符串文本**、**匹配项的开始索引**、**输入字符串的详细信息**

  ```js
  const pattern = /hello/;
  const str = 'hello world';
  console.log(pattern.exec(str)); // [ 'hello', index: 0, input: 'hello world', groups: undefined ]
  ```

- `match()`：根据正则表达式模式的内容，在字符串中搜索出现的次数；

  - 如果具有全局标志 (`g`)，则返回一个包含所有匹配项的数组；如果未找到匹配项，返回 `null`

  - `i` 表示不区分大小写


  ```js
  let str = "The quick brown fox jumps over the lazy dog.";
  console.log(str.match(/the/gi)); // ["The", "the"]
  ```

- `matchAll()`：返回一个用于匹配字符串中正则表达式的所有结果的迭代器，迭代器每个元素都是一个数组，包含有关匹配的详细信息，包括捕获的分组

  ```js
  let str = "Hello world! This is a test string.";
  let regex = /[a-zA-Z]+/g;
  let matches = str.matchAll(regex);
  
  for (let match of matches) {
      console.log(match);
  }
  ```

- `search()`：在字符串中指定搜索模式，返回匹配第一个元素的索引，如果未找到，返回 `-1`

  ```js
  let str = "The quick brown fox jumps over the lazy dog";
  let pattern = /brown/;
  console.log(str.search(pattern)); // 10
  ```

- `replace()`：替换指定模式的第一个实例。要替换所有实例，可以在正则表达式中使用全局标志 (`g`)

  ```js
  let str = "Hello, World!";
  let newStr = str.replace(/o/g, "O");
  console.log(newStr); // "HellO, WOrld!"
  ```

- `replaceAll()`：替换指定模式的所有实例，无需指定全局标志 (`g`)

  ```js
  let str = "apple,banana,apple,grape";
  let newStr = str.replaceAll("apple", "orange");
  console.log(newStr); // "orange,banana,orange,grape"
  ```

- `split()`：接收一个正则表达式作为参数，根据指定模式或分隔符将字符串拆分成字符串数组

  ```js
  let str = "apple,banana,grape";
  let arr = str.split(/,/);
  console.log(arr); // [ 'apple', 'banana', 'grape' ]
  ```


## 分组



## Reference

[how to use regular expressions in javascript](https://www.freecodecamp.org/chinese/news/regex-in-javascript/#how-to-use-regular-expressions-in-javascript)