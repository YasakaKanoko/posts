---
date: 2025-07-01
title: TypeScript
category: ts
tags:
- ts
- js
description: TypeScript is JavaScript with syntax for types.
---
# **TypeScript**

::: details 目录

[[TOC]]

:::

## **什么是 TypeScript？**

- TypeScript 是 JavaScript 超集，遵循 ES5/ES6 规范，TypeScript 扩展了 JavaScript 语法

- 需要先将 TS 代码转换为 JavaScript (JS) 代码才能执行
- TypeScript 的主要目的是在开发阶段提供类型检查和更好的代码组织，但最终都需要通过编译器将其转换为 JS，以便在浏览器或 Node.js 中运行

### TS 编译器

1. 初始化

   ::: code-group

   ```sh[tsc]
   npm i -g typescript
   tsc --init
   ```

   ```sh[bun]
   bun init
   ```

   :::

2. 类型检查

   ::: code-group

   ```sh[npm]
   npm i -D @types/node
   ```

   ```sh[bun]
   bun add -D @types/bun
   ```

   :::

#### 热更新 (可选)

- 使用 vscode 插件：[Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

- Node.js 需要使用 `Nodemon`

  ::: code-group

  ```sh[Node.js]
  # "start": "nodemon --watch src -e ts --exec ts-node src/index.ts"
  npm run start
  ```

  ```sh[bun]
  bun --watch run index.ts
  ```

  :::

- `tsc --watch`：热更新

#### 构建工具

1. 通过构建工具 (webpack、rollup、esbuild) 将 ts 转换为 js 运行

   ```sh
   npm i rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve -D
   ```

2. 配置文件

   ::: code-group

   ```json[package.json]
   {
     "scripts": {
       "dev": "rollup -c -w"
     },
     "devDependencies": {
       "@rollup/plugin-node-resolve": "^16.0.1",
       "@types/node": "^24.0.8",
       "rollup": "^4.44.1",
       "rollup-plugin-typescript2": "^0.36.0",
       "typescript": "^5.8.3"
     }
   }
   ```

   ```js[rollup.config.js]
   import ts from 'rollup-plugin-typescript2'
   import { nodeResolve } from '@rollup/plugin-node-resolve'
   import { resolve, dirname } from 'path'
   import { fileURLToPath } from 'url'
   
   
   // 当前文件的绝对路径
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename)
   export default {
     // 项目入口文件
     input: "./src/index.ts",
     // 项目出口文件
     output: {
       // 打包的结果在dist目录
       file: resolve(__dirname, 'dist/bundle.js'),
       // 打包的结果是一个函数
       format: 'iife',
       sourcemap: true
     },
     plugins: [
       nodeResolve({
         // 第三方包入口文件可以是ts也可以是js
         extensions: ['.ts', '.js']
       }),
       ts({
         tsconfig: resolve(__dirname, 'tsconfig.json')
       })
     ]
   }
   ```

   ```json[tsconfig.json]
   {
     "compilerOptions": {
     
     	// Environment setup & latest features
       "lib": ["ESNext"], 
       "target": "ESNext", 
       "module": "esnext",
       "moduleDetection": "force", 
       "jsx": "react-jsx", 
       "allowJs": true,
       
       // Bundler mode
       "moduleResolution": "bundler",
       "verbatimModuleSyntax": true, 
       "outDir": "dist",
       "sourceMap": true,
   
       // Best practices
       "strict": true, 
       "skipLibCheck": true, 
       "noFallthroughCasesInSwitch": true,
       "noUncheckedIndexedAccess": true,
       "noImplicitOverride": true, 
   
       // Some stricter flags (disabled by default)
       "noUnusedLocals": false, 
       "noUnusedParameters": false,
       "noPropertyAccessFromIndexSignature": false
     }
   }
   ```

   :::

3. 项目结构

   ```txt
   ts
   ├─ package-lock.json
   ├─ package.json
   ├─ rollup.config.ts
   ├─ src
   │  └─ index.ts
   └─ tsconfig.json
   ```

## 基本类型

TS 是静态类型，关注的类型，而不是业务逻辑

- TS 是从安全的角度考虑使用，在赋值时，是否发生错误
- TS 发生在编译时，而非运行时
- 编译结束后，可以在生产环境添加 `.d.ts` 来对 js 增加类型声明

```ts
// string
const str: string = 'Alex'
// number
const n: number = 24;
// boolean
const b: boolean = true;
// bigint
const x: bigint = 123n;
// symbol
const s: symbol = Symbol('id');
// null
const r: null = null;
// undefined
const t: undefined = undefined;
```

> [!NOTE]
>
> - 原始类型 (`boolean`、`string`、`number`、`bigint`、`symbol`) 在声明时，应采用小写类型标识，而不是包装对象 (wrapper object)
> - `null` 与 `undefined` 即是类型也是值
>   - 当 `"strictNullChecks": false` 时，`null` 和 `undefined` 可以赋给任何类型 (即 `null` 和 `undefined` 是任意类型的子类型)
>   - 当 `"strictNullChecks": true` 时，`undefined` 和 `null` 只能赋值给自身、`any`、`unknown`

### 联合/交叉类型

- `|`：联合类型；表示一个值可以是几种类型之一
- `&`：交叉类型；多种类型叠加在一起成了一种类型，包含所需的所有类型的特性

### 数组

- `T[]`
- 泛型：`Array<T>`

```ts
const arr1: number[] = [1, 2, 3, 4, 5, 6];
const arr2: Array<number> = [1, 2, 3, 4, 5, 6];
const arr3: (number | string)[] = [1, 2, 3, 'a', 'b', 'c'];
```

### 元组

元组 (tuple) 必须符合结构和顺序，所以元组必须明确声明每个成员的类型

新增元素时，必须是元组已知类型

```ts
let tuple1: [string, number, string, number] = ["a", 1, "b", 2];

// 别名
let tuple2: [a: string, b: number, c: string, d: number] = ["a", 1, "b", 2];

tuple2.push('1');
// 访问时报错
const a = tuple2[4]; // [!code error] 长度为 "4" 的元组类型 "[a: string, b: number, c: string, d: number]" 在索引 "4" 处没有元素。
```

### 枚举

枚举 (`enum`)，在 js 中表现为一个自带类型的对象

**约定一组格式**：状态码、权限、数据格式、标志位

- 维护一组常量时，使用枚举

  ```ts
  enum STATUS {
    'OK',
    'ERROR',
    'NOT_FOUND'
  }
  ```

- 当值为数字时，枚举可以反举 (值会根据索引位置自增)

  ```ts
  console.log(STATUS[0]); // OK
  // 自增
  console.log(STATUS.NOT_FOUND); // 2
  ```

- 异构枚举：枚举中有字符串时，下一个位置无法推导

  ```ts
  enum STATUS {
    'OK' = 'OK',
    'ERROR', // [!code error] 枚举成员必须具有初始化表达式。
    'NOT_FOUND' // [!code error] 枚举成员必须具有初始化表达式。
  }
  ```

- 常量枚举

  ```ts
  const enum STATUS {
    'OK',
    'ERROR',
    'NOT_FOUND'
  }
  ```

### void

`void` 表示表示函数无返回值

- `undefined` 可以赋值给 `void` (`undefined` 是 `void` 的子类型)

  在 JavaScript 中，`forEach` 无返回值 (隐式返回 `undefined`)

  ```ts
  let arr: number[] = [1, 2, 3];
  arr.forEach((item): void => {
    console.log(item);
  })
  ```

- 当函数的返回值没有意义时，如：将日志输出至控制台

  ```ts
  function log(msg: string): void {
    console.log(msg);
  }
  ```

### never

- 表示函数无法执行完毕

  ```ts
  const whileTrue = (): never => {
    while (true) { 
      console.log('函数无法达到执行完毕的状态');
    }
  }
  ```

- 抛出错误

  ```ts
  function throwError(err: string): never {
    throw new Error(err);
  }
  ```

### any

`any`：任意类型，`any` 是所有类型的全集

- 关闭类型检查
- 污染其他变量

> [!NOTE]
>
> `"noImplicitAny": true` 时，类型推断为 `any` 就会报错

### unknown

`unknown`：严格的 `any`

- `unknown` 类型变量不能直接赋值给其他类型变量 (除了 `any` 和 `unknown`)
- 不能直接调用 `unknown` 类型变量的方法和属性

- `unknown` 类型参与的运算是有限的，只能比较运算 (`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`)、取反 (`!`)、`typeof`、`instanceof` 运算

## 引用类型

- `object`：包含**对象**、**数组**、**函数**，不包含原始类型的值

- `Object`：大写形式，包含原始类型

## 类型断言

声明类型时，没有标识类型，TS 会进行类型断言

- 未赋值的变量默认值为 `undefined`，但其类型断言为 `any`

- 如果是联合类型，只能调用它们的公共方法

  ```ts
  let str: string | number;
  str = 1;
  str.toFixed();
  ```

- `value as T`：断言成某种类型 (已有类型中的某个类型)

- 非空断言：`!`  这个值一定不为空

  ```ts
  let str: string | number;
  (str! as string).charCodeAt(0)
  ```

- `<T>value`：泛型断言，不建议使用，与 JSX 语法相似

  ```ts
  (<number>str!).toFixed(3)
  ```

- 双重断言：将类型范围缩小，断言成子类型，破坏原有关系

  ```ts
  (str! as unknown as boolean);
  ```

## 可选属性

`?`：标识属性可选，取值操作，不能赋值

```ts
let ele = document.getElementById('app');
ele?.style.background = 'red'; // [!code error] [!code --] 赋值表达式的左侧不能是可选属性访问。
ele?.style.background; // [!code ++]
```

::: info 注意：`!`、`?` 与 `??`

- 可选属性 `?` 不能赋值

- 非空断言 `!` 可以赋值

  ```ts
  let ele = document.getElementById('app');
  ele!.style.background = 'red';
  (ele as HTMLElement).style.color = 'white';
  ```

- 空值合并运算符 `??`：默认值，保证不为  `null` 与 `undefined`

  ```ts
  const valA = 0 ?? 100; // 0
  const valB = null ?? 100; // 100
  ```

:::

## 类型别名

`type`：快速构建一个可复用的类型

```ts
// 数组
type IArr1 = number[];
// 数组泛型
type IArr2 = Array<string | number | Record<string, number>>;
// 元组
type IArr3 = [number, number, string, string];
```

## 函数

- **函数声明式**：`function` 关键字声明的函数会提升至当前作用域的顶部；在 ts 中，函数声明式声明的关键字，不能标注函数类型

  ```ts
  function sum(a: number, b: number): number {
    return a + b;
  }
  ```

- **函数表达式**：函数表达式声明的函数，赋予的值必须满足定义类型

  ```ts
  // 函数类型 (a: any, b: any) => any
  const sum: (a: any, b: any) => any = function (a, b) {
    return a + b;
  }
  
  // (a: any, b: any): any
  const sum: { (a: any, b: any): any } = function (a, b) {
    return a + b;
  }
  ```

  > 如果函数已标明类型，在使用函数时，以标明的为准 
  >
  > ```ts
  > type ISum = { (a: any, b: any): any };
  > const sum: ISum = (a: string, b: string) => {
  >   return a + b;
  > }
  > ```

### 可选参数

**可选参数**：在参数末尾加上 `?` 表示参数可选

- 可选参数必须在必选参数之后
- 可选参数可以省略，`undefined` 必须显式传参

  ```ts
  type ISum1 = (a: string, b?: string) => string;
  type ISum2 = (a: string, b: string | undefined) => string;
  const sum1: ISum1 = (a, b) => a + b;
  const sum2: ISum2 = (a, b) => a + b;
  
  sum1('1');
  sum2('1');  // [!code error] 应有 2 个参数，但获得 1 个。
  ```

### 默认参数

**默认参数**：提供一个默认值，当用户没有传递该参数或传递值为 `undefined` 时，默认初始化值的参数

如果默认参数在必选参数之前，调用时必须显式传入 `undefined`

```ts
function add(x: number = 0, y: number) {
  return x + y;
}

add(1); // [!code --] 应有 2 个参数，但获得 1 个。
add(undefined, 1); // [!code ++] 
```

### 参数的 this

尽量不使用 `this` 作为函数上下文，`this` 的缺陷是类型推导问题

如果想限制 `this` 类型，`this` 参数必须是函数的第一个参数

```ts
function getValue(this: { name: string, age: number }, key) {
  return this[key];
}
```

> [!NOTE]  
>
> `"strictBindCallApply": true,`  需要更精确的 `this` 指向，详见 [keyof](#keyof)

### rest

**剩余参数**：在函数中，不建议使用 `arguments`，而是 rest 参数

```ts
function sum(...args: number[]) {
  return args.reduce((memo, cur) => (memo += cur, memo), 0);
}
```

### 函数重载

**函数重载**：根据参数类型的不同，产生不同的行为

> 在 js 中重载使用 `arguments`

```ts
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error('a与b必须是相同类型');
}
```

## typeof

`typeof`：根据值获得类型；提取的类型会提升至顶部

```ts
// 类型被提升到顶部
function getValue(this: IPerson, key) {
  return this[key];
}
const person = { name: 'Alex', age: 30, address: 'LA' };
type IPerson = typeof person;
```

## keyof

`keyof`：获取对象所有键的并集

```ts
function getValue(this: IPerson, key: IKeys) {
  return this[key];
}
const person = { name: 'Alex', age: 30, address: 'LA' };
type IPerson = typeof person;
type IKeys = keyof IPerson;
```

## 类

`public`、`protected` 和 `private` 是类的访问修饰符，用于控制类成员 (属性、方法、构造函数等) 的访问权限

- `public`：公开属性；类成员可以被任何地方访问，包括类内部、子类和外部代码，这是 TypeScript 成员**默认访问修饰符**
- `protected`：类成员只能在类内部和子类中访问，外部代码无法直接访问

- `private`：类成员只能在类内部访问，子类和外部代码都无法直接访问























### 接口

`interface`：约束类、对象、函数的类型约定

- 约束对象

  ```ts
  interface IBytedancer {
    readonly jobId: number; // 只读属性
    name: string;
    sex: 'man' | 'woman' | 'other';
    age: number;
    hobby?: string; // 可选属性
    [key: string]: any; // 任意类型
  };
  ```

- 约束函数

  ::: code-group

  ```ts[interface]
  interface IMult {
    (x: number, y: number): number;
  };
  
  interface IMult {
    sum: (x: number, y: number) => number;
  }
  ```

  ```ts[type]
  type IMult = {
    (x: number, y: number): number;
  };
  
  type IMult = {
    sum: (x: number, y: number) => number;
  }
  
  type sum = (x: number, y: number) => number;
  ```

  :::

#### 接口继承

- 使用 `extends` 关键字继承其他的 `interface`

  ```ts
  interface A {
    T1: string;
  }
  
  interface B extends A {
    T2: number;
  }
  ```

- `interface` 允许多重继承

  ```ts
  interface A {
    T1: string;
  }
  
  interface B {
    T2: number;
  }
  
  interface C extends A, B {
    T3: boolean;
  }
  ```

- `interface` 可以继承 `type` 定义的对象类型

  ```ts
  type A = {
    name: string;
    capital: string;
  };
  
  interface B extends A {
    population: number;
  }
  ```

- `interface` 可以继承 `class`

  ```ts
  class A {
    x: string = '';
    y(): boolean {
      return true;
    }
  };
  
  interface B extends A {
    z: number;
  };
  ```

#### interface 与 type

- 同名的 `interface` 会合并

- `interface` 可以继承其他类型，而 `type` 的继承需要依赖 `&` 运算符

  - `interface` 子接口不能覆盖父接口(不能具有同名的成员)

    ```ts
    interface A {
      foo: number;
    };
    
    interface B extends A {
      foo: string; // [!code error] 接口“B”错误扩展接口“A”。属性“foo”的类型不兼容。不能将类型“string”分配给类型“number”。
      bar: number;
    };
    ```

  - `type` 使用交叉类型继承会将相同成员交叉

    ```ts
    type A = {
      str: string;
    }
    
    type B = {
      str: number;
    } & A;
    
    let s: B = {
      str: 1, // [!code error] 不能将类型“number”分配给类型“never”。
    }
    ```

- `interface` 不能包含属性映射，而 `type` 可以

  ```ts
  interface Point {
    x: number;
    y: number;
  }
  
  type PointCopy1 = {
    [Key in keyof Point]: Point[Key];
  };
  ```

- `this` 关键字只能用于 `interface`

  ```ts
  interface Foo {
    add(num: number): this;
  };
  ```

- `type` 只能表示非对象类型，`interface` 只能表示对象(数组、函数、对象、类等)

- `type` 可以扩展复杂类型(联合类型和交叉类型)

### 类

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

- 参数默认值

  ::: code-group

  ```ts[index.ts]
  // 在参数中初始化默认值
  class User {
    name: string;
    age: number;
    gender: "男" | "女" = "男";
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  
  ```

  ```ts[index.ts]
  // 在构造函数中初始化默认值
  class User {
    name: string;
    age: number;
    gender: "男" | "女";
  
    constructor(name: string, age: number, gender: "男" | "女" = "男") {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }
  }
  ```

  :::

  > 检查是否设置初值
  >
  > ::: code-group
  >
  > ```json[tsconfig.json]
  > {
  >   "compilerOptions": {
  >   	"strictPropertyInitialization": true;
  >   },
  > }
  > ```
  >
  > :::

- 可选属性：`?`

- 访问修饰符，控制类中的某个成员的访问权限

  - `public`：公共的(默认)
  - `private`：私有的；只在类中范围内可用
  - protected：

## 类型推断

类型声明不是必需的，如果没有，TypeScript 会自己推断类型

- `any`：如果无法推断出类型，TypeScript 就会认为该变量的类型是 `any`

  > `noImplicitAny` 选项：不允许隐式 `any`

- `never`

  - 联合类型
  - 抛出错误的函数
  - 无限执行的函数

- `symbol`

  - `let` 声明的 `symbol`，推断为 `symbol`

    > 如果 `let` 声明的变量，被 `unique symbol` 变量赋值，类型推断依然是 `symbol`
    >
    > ```ts
    > const x = Symbol();
    > let y = x; // let y: symbol
    > ```


  - `const` 声明的 `symbol`，推断为 `unique symbol`

    > 如果 `const` 声明的变量，被赋值为另一个 `symbol` 类型变量，则推断为 `symbol`
    >
    > ```ts
    > let x = Symbol();
    > const y = x; // const y: symbol
    > ```

- 数组：如果初始值是空数组，推断为 `any[]`

- `void`：函数返回 `undefined` 或 `null`

## 类型保护

**类型保护**：通常情况下，可以通过 `typeof` 触发类型保护

## 类型断言

允许绕过编译器的类型检查

- `<T>value`
- `value as T`

```ts
// 类型断言的条件: 值的实际类型是 T 的子类型，或 T 是值的子类型
const p1: { x: number } = { x: 0, y: 0 } as { x: number; y: number };

// 类型断言不应该滥用, 可能留下安全隐患
const data: object = {
  a: 1, b: 2, c: 3
};
console.log((data as Array<string>).length);

// 类型断言的作用: 指定未知类型的变量具体类型
const value: unknown = 'Hello World!';
const s1: string = value as string;
```

### as const

`as const`：类型推断时，将变量断言为 **值类型**

- `as const` 只能用于字面量，不能用于变量
- `as const` 无法用于表达式
- `as const` 的前置形式(`<const>val`)

```ts
// as const 将数组断言成只读元组
const arr = [1, 2, 3] as const; // const arr: readonly [1, 2, 3]

// as const 断言枚举成员
enum f { x, y };
let e = f.x as const; 
```

### 非空断言

**非空断言**：符号 `!`；针对可能为空的变量(即 `undefined` 与 `null`)

::: code-group

```ts[非空断言运算符]
function f(x: number | null) {
  console.log(x!.toFixed());
}
```

```ts[typeof]
function f(x: number | null) {
  if (typeof x !== 'number') {
    throw new Error('Not a number');
  }
  console.log(x.toFixed)
}
```

:::

非空断言在类中，表示类的属性初始化时有初始值

```ts
class Point {
  x!: number;
  y!: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
```

### 断言函数

`asserts` 语句等同于 `void`

```ts
type AccessLevel = 'r' | 'w' | 'rw';

function allowsReadAccess(level: AccessLevel): asserts level is 'r' | 'rw' {
  if (!level.includes('r')) {
    throw new Error('Read not allowed');
  }
}
```

`NonNullable<T>`：表示类型 `T` 去除空以后的剩余类型

```ts
function assertIsDefined<T>(
  value: T
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}
```

`asserts x`：断言为真，即不为 `undefined`、`null`、`false` ，断言函数的简写形式

```ts
function assertIsDefined(x: unknown): asserts x {
  if (!x) {
    throw new Error("x is not defined");
  }
}
```

## 模块

TS 支持所有的 ES 模块语法(即 `import`、`export` 语句)

- 如果希望一个文件作为模块(变量不暴露)，在脚本顶部加上一行

  ```ts
  export {};
  ```

- TS 允许输出和输入类型

  ::: code-group

  ```ts[a.ts]
  // export type Bool = true | false;
  
  type Bool = true | false;
  export { Bool };
  ```

  ```ts[b.ts]
  import { Bool } from './a';
  let foo: Bool = true;
  ```

  :::

### commonjs

如果编译结果是 commonjs 模块，导出的声明是 `exports` 属性，默认导出会变成 `exports` 的 `default` 属性

导出

::: code-group

```ts[myModule.ts]
export const name = "Kevin";
export function sum(a: number, b: number) {
  return a + b;
}
export default function (){
  console.log("Hello World!")
}
```

```js[myModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
exports.sum = sum;
exports.default = default_1;
exports.name = "Kevin";
function sum(a, b) {
    return a + b;
}
function default_1() {
    console.log("Hello World!");
}
```

:::

导入

::: code-group

```ts[index.ts]
import sayHello, { name, sum } from './myModule'
console.log(name)
console.log(sum(3, 4))
sayHello();
```

```js[index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myModule_1 = require("./myModule");
console.log(myModule_1.name);
console.log((0, myModule_1.sum)(3, 4));
(0, myModule_1.default)();
```

:::

- 解决默认导出的问题

  - 方法一

    ```ts
    import fs from 'fs'; // [!code error] 模块“"fs"”没有默认导出。
    
    import * as fs from 'fs'; // ✅
    ```

  - 方法二

    ::: code-group

    ```json[tsconfig.json]
    {
      "compilerOptions": {
        "target": "ES2016",
        "module": "CommonJS",
        "lib": ["ES2016"],
        "esModuleInterop": true // [!code ++]
      }
    }
    ```

    ```ts[index.ts]
    import fs from 'fs'; // ✅
    ```

    :::

**TS 中的 commonjs**

在 TS 中的 commonjs 语法没有类型推断，建议使用 `import`

```ts
const myModule = require ('./myModule'); // [!code --]
import myModule = require ('./myModule'); // [!code ++]
```

### 模块解析

- classic：递归查找模块
- bundler：bundler 模式，使用打包工具解析规则，在打包过程中将所有模块打包成一个文件
- node：查找本地 node_modules，再查找库

## References

- [TypeScript 中文文档](https://ts.yayujs.com/)

- [TypeScript 教程](https://wangdoc.com/typescript/)
