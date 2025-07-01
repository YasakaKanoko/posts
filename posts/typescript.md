---
date: 2025-05-20
title: TypeScript
category: ts
tags:
- ts
- js
description: 
---
# **TypeScript**

https://ts.yayujs.com/

**为什么需要 TypeScript？**

JavaScript 的核心特点就是灵活，随着项目规模日益增大，灵活成为了开发者的负担，如：变量可以被赋予字符串、布尔、数值、函数，充满不确定性，因此需要类型约束。

- TypeScript 更适合开发大型项目
- TypeScript 在编写代码时提供丰富的语法提示
- TypeScript 提供编译时类型检查，避免线上错误

- 越来越多的大型项目开始拥抱 TypeScript ，如：Vue、Pinia、React 等

## **什么是 TypeScript？**

TypeScript 是 JavaScript 超集，遵循 ES5/ES6 规范，TypeScript 扩展了 JavaScript 语法

TS 代码需要转换为 JS 代码再运行

### TS 编译器

1. 编译器

   ```sh
   npm i -g typescript
   ```

2. 初始化配置文件 `tsconfig.json`

   ```sh
   tsc --init
   ```

3. 监视：适用于最终生成的结果

   ```sh
   tsc --watch
   ```

#### 热更新

- 使用 vscode 插件：[Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

- 使用 `nodemon`+`ts-node`

  ::: code-group

  ```json[packge.json]
  "scripts": {
    "dev": "nodemon --watch 'src/**' --ext 'ts,json' --ignore 'src/**/*.spec.ts' --exec 'ts-node src/index.ts'"
  },
  ```

  :::

- 使用 `bun`

  ```sh
  bun --hot run index.ts
  ```

- 通过构建工具生成 js 运行 (webpack、rollup、esbuild 等)







## 编译选项

"**编译(Compile)**"：TS 编译器将 TypeScript 代码编译成 JavaScript 代码的过程，编译时会将类型声明和相关的代码删除，不改变 JavaScript 的运行结果

默认情况下，TS 编译器可能的**假设**

- 假设当前环境是 DOM
- 如果代码中未使用模块化，便认为当前代码是全局执行
- 编译目标是 ES3

**编译选项**：通过修改 `tsconfig.json` 编译选项改变 TypeScript 的假设

1. 初始化项目

   ::: code-group

   ```sh[pnpm]
   # 初始化
   pnpm init
   
   # 安装类型编译器
   pnpm i -D typescript
   
   # 初始化ts编译器, 生成ts配置文件
   npx tsc --init
   ```

   ```sh[bun]
   bun init -y
   ```

   :::

2. `tsconfig.json`

   参考：[tsconfig.json](https://www.typescriptlang.org/tsconfig/)

   ::: details

   - `"outDir": "./dist"`：导出路径
   - `"esModuleInterop": true`：改善CommonJS/ES模块互操作性
   - `"forceConsistentCasingInFileNames": true`：强制文件导入路径大小写一致
   - `"include": ["src"]`：包含的目录
   - `"exclude": ["node_modules"]`：排除的目录
   - `"strict": true`：严格类型检查
     - `noImplicitAny`：不允许隐式 `any` 类型
     - `strictNullChecks`：在类型检查中考虑 `null` 和 `undefined`
     - `strictFunctionTypes`：在函数赋值时进行严格的类型检查
     - `strictBindCallApply`：检查 `bind`, `call`, `apply` 方法的参数和返回值类型
     - `strictPropertyInitialization`：检查类字段是否在构造函数中被初始化
     - `strictBuiltinIteratorReturn`：内置迭代器的返回类型为 `undefined` 而不是 `any`
     - `noImplicitThis`：不允许 `this` 具有隐式的 `any` 类型
     - `useUnknownInCatchVariables`：默认情况下将 `catch` 变量视为 `unknown` 而不是 `any`
     - `alwaysStrict`：确保在生成的 JavaScript 文件中包含 `'use strict'`
   - `noImplicitUseStrict`：编译结果中不包含 `'use strict'`
   - `removeComments`：编译结果不包含注释
   - `noEmitOnError`：错误时不生成编译结果

   :::

   ::: code-group

   ```json[tsconfig.json]
   {
     "compilerOptions": {
     
     	// Environment setup & latest features
       "lib": ["ESNext"], // 生成的JavaScript版本
       "target": "ESNext", // 内部类型声明库, 不包含dom   
       "module": "Preserve", // TypeScript 编译器不会将其转换为其他模块系统
       "moduleDetection": "force", // 强制 TypeScript 编译器检测模块文件的格式
       "jsx": "react-jsx", // 指定生成的 JSX 代码的类型为 React.jsx
       "allowJs": true, // 允许编译 JavaScript 文件
       
       // Bundler mode
       "moduleResolution": "bundler", // 指定模块解析的模式为 bundler
       "allowImportingTsExtensions": true, // 允许导入带有 .ts 和 .tsx 扩展名的文件
       "verbatimModuleSyntax": true, // 确保 TypeScript 编译器在编译时不会对模块语法进行任何转换
       "noEmit": true, // 不要生成任何 JavaScript 文件
   
       // Best practices
       "strict": true, // 启用所有严格类型检查选项
       "skipLibCheck": true, // 跳过所有 .d.ts 文件的类型检查
       "noFallthroughCasesInSwitch": true, // 确保每个 case 语句都有明确的终止条件
       "noUncheckedIndexedAccess": true, // 通过索引访问对象属性时，确保返回的类型包含 undefined
       "noImplicitOverride": true, // 确保覆盖方法的意图是显式的
   
       // Some stricter flags (disabled by default)
       "noUnusedLocals": false, // 关闭对未使用的本地变量的类型检查
       "noUnusedParameters": false, // 禁止报告未使用的函数参数
       "noPropertyAccessFromIndexSignature": false, // 关闭对从索引签名访问属性时的严格类型检查
     },
   }
   ```

   :::

3. 依赖项

   ::: code-group

   ```sh[pnpm]
   # TypeScript 的类型定义包
   pnpm i -D @types/node
   
   # Node.js 执行环境，可以直接运行 TypeScript 文件
   pnpm i -D ts-node
   
   # 监视文件变化的工具，当检测到项目中的文件发生变化时，会自动重启 Node.js 应用程序
   pnpm i -D nodemon
   ```

   ```sh[bun]
   bun add -D @types/bun
   ```

   :::


4. 脚本

   ::: code-group

   ```json[pnpm.package.json]
   {
     "scripts": {
       "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"
     },
   }
   ```

   ```json[bun.package.json]
   "scripts": {
     "dev": "bun --hot run index.ts"
   },
   ```

   :::

## 原始类型

- `number`：数值

- `string`：字符串

- `boolean`：布尔值

- `bigint`：大整数

- `symbol`：符号

  - 通过 `Symbol()` 函数生成，每一个 Symbol 值都是独一无二的

    ```ts
    let x: symbol = Symbol();
    ```

  - `unique symbol`：表示单个的、某个具体的 Symbol 值

    ```ts
    // unique symbol只能使用const声明
    const x: unique symbol = Symbol();
    
    // const声明的symbol类型是unique symbol类型
    const x = Symbol();
    
    // 如果需要写成同一个unique symbol类型, 只能写成typeof x
    const a: unique symbol = Symbol();
    const b: typeof a = a; 
    
    // Symbol.for(): 返回相同的 Symbol 值(虽然值是相等的，但是引用完全不同)
    const a: unique symbol = Symbol.for('foo');
    const b: unique symbol = Symbol.for('foo');
    ```



- `undefined`：未定义

- `null`：空

  > [!NOTE]
  >
  > - `symbol` 和 `bigint` **无法直接获取它们的包装对象**
  >
  > - `null` 和 `undefined` 是所有类型的子类型，可以赋值给任意类型
  > - **编译选项**开启 `strictNullChecks` 后，`undefined` 和 `null` 只能赋值给自身、`any`、`unknown`

**类型约束**：常用于约束**变量**、**函数参数**、**函数返回值**

```ts
const q: string = 'string';
const w: number = 1;
const e: boolean = true;
const r: null = null;
const t: undefined = undefined;
```

## object

- `object`：**非原始类型**；包含**对象**、**数组**和**函数**

  > **非原始类型**：除了 `number`、`string`、`boolean`、`symbol`、`bigint`、`null`、`undefined` 之外的任何类型

- `Object`：所有可转换为对象值的构造函数；简写形式：`{}`

  > 除了 `undefined`、`null`
  >
  > - `boolean`、`string`、`number`、`bigint`、`symbol`
  
  ```ts
  let obj: Object;
  
  obj = true;
  obj = 'hi';
  obj = 1;
  obj = { foo: 123 };
  obj = [1, 2, 3];
  obj = (a: number) => { a + 1 };
  ```

### 对象

声明了对象类型，赋值时不能缺少指定属性，也不能有多余的属性

```ts
type Obj1 = {
  x:number;
  y:number;
};

interface Obj2 {
  x: number;
  y: number;
}
```

#### 可选属性

- 可选属性等同于 undefined，在属性名前使用 `?` 表示

  ```ts
  type User = { name?: string; }
  let user: User = {};
  ```

- 读写可选属性前，需要先判断是否为 `undefined`

  ::: code-group

  ```ts[===运算符]
  if (user.name === undefined) {
    user.name = 'Alice';
  }
  ```

  ```ts[?:运算符]
  (user.name === undefined) ? 'Alice' : user.name;
  ```

  ```ts[空值合并运算符]
  user.name ?? 'Alice';
  ```

  :::

- 如果打开 `"exactOptionalPropertyTypes"` 和 `"strictNullChecks"` 选项，则可选属性不能设为 `undefined` 

  ::: code-group

  ```ts[tsconfig.json]
  {
    "compilerOptions": {
      "strictNullChecks": true,
      "exactOptionalPropertyTypes": true,   
    }
  }
  ```

  :::

#### 只读属性

属性名前加上 `readonly` 关键字，表示只读属性，不能修改

- 只读属性值只能在初始化期间赋值，此后不能修改该属性

- `readonly` 修饰符并不禁止修改该对象的属性，只是禁止完全替换该对象

  ```ts
  interface Home {
    readonly resident: {
      name: string;
      age: number;
    }
  }
  
  const h: Home = {
    resident: {
      name: "Alice",
      age: 17
    }
  }
  
  h.resident = { name: 'Kate' }; // [!code --] 无法为“resident”赋值，因为它是只读属性。
  h.resident.age = 18; // [!code ++]
  ```

- 如果一个对象有两个引用，那么修改其中一个，会影响只读变量

  ```ts
  interface Person { name: string; age: number; }
  interface ReadonlyPerson { readonly name: string; readonly age: number; }
  
  let w: Person = { name: 'Vicky', age: 42 };
  let r: ReadonlyPerson = w;
  w.age += 1;
  
  console.log(w.age); // 43
  console.log(r.age); // [!code warning] 43
  ```


#### 索引类型

- 同名索引的属性名的类型可以不同，但是必须优先服从字符串类型

  ```ts
  type MyType = {
    [x: string]: string;
    [x: number]: string; // ✅
  }
  ```

- 同名索引的属性值的类型必须相同

  ```ts
  type MyType = {
    [x: string]: string;
    [x: number]: number; // [!code error] “number”索引类型“number”不能分配给“string”索引类型“string”。
  }
  ```

#### 对象解构

- 解构赋值

  ```ts
  let product = { id: '1', name: 'cup', price: 3 }
  
  const { id, name, price }: {
    id: string;
    name: string;
    price: number
  } = product;
  ```

- 为解构的属性命名

  ```ts
  let obj = { x: 'Hello', y: 1 };
  
  let { x: foo, y: bar }
    : { x: string; y: number } = obj;
  
  console.log(foo, bar);
  ```



### 数组

- **字面量**：「类型+方括号」
- **泛型**：`Array<T>`

  > 建议少用泛型的形式声明数组，因为在 React 中尖括号会被识别为组件

#### 只读数组

- 字面量加上 `readonly` 关键字

  ```ts
  const arr: readonly number[] = [0, 1];
  ```

- 泛型

  ```ts
  const a1: ReadonlyArray<number> = [0, 1];
  
  const a2: Readonly<number[]> = [0, 1];
  ```

#### 多维数组

使用 `T[][]` 声明二维数组

```ts
var multi: number[][] = [
  [1, 2, 3],
  [23, 24, 25]
];
```

#### 元组

元组(tuple)：元组必须声明每个成员的类型

- `?`：表示该成员可选；可选成员必须在必选成员之后

  ```ts
  type tuple = [number, string?];
  ```

- `...`：扩展运算符，表示不限成员数量的元组

  ```ts
  type tuple = [number, ...string[]];
  ```

- 元组可以通过方括号读取类型

  ```ts
  type Tuple = [string, number, Date];
  type TupleEl = Tuple[number]; // type TupleEl = string | number | Date
  ```

### 函数

```ts
type mult1 = (x: number, y: number) => number;

type mult2 = { (x: number, y: number): number }

interface mult3 { (x: number, y: number): number; }
```

#### 可选参数

**可选参数**：在参数末尾加上 `?` 实现可选参数

- 函数体使用可选参数时，需要先判断该参数是否为 `undefined`
- 可选参数必须在必选参数之后
- 可选参数与显式 `undefined` 不同：可选参数可以省略，`undefined` 必须显式传参

  ```ts
  type F2 = (a: number, b: number | undefined) => number;
  let f2: F2 = (x, y) => {
    return x + (y ?? 0);
  }
  f2(1); // [!code --] 应有 2 个参数，但获得 1 个。
  f2(1, undefined); // [!code ++]
  ```

#### 默认参数

**默认参数**：提供一个默认值，当用户没有传递该参数或传递值为 `undefined` 时，默认初始化值的参数

如果默认参数在必选参数之前，调用时必须显式传入 `undefined`

```ts
function add(x: number = 0, y: number) {
  return x + y;
}

add(1); // [!code --] 应有 2 个参数，但获得 1 个。
add(undefined, 1); // [!code ++] 
```

#### 参数解构

- 数组

  ```ts
  type A = [x: number, y: number];
  function sum([a, b]: A) {
    return a + b;
  }
  ```

- 对象

  ```ts
  type A = { x: number; y: number };
  function sum({ x, y }: A) {
    return x + y;
  }
  ```

#### rest

- `rest` 可以嵌套

  ```ts
  function f(...args: [boolean, ...string[]]) { }
  ```

- `rest` 可以结合解构使用

  ```ts
  function repeat(...[str, times]: [string, number]): string {
    return str.repeat(times);
  }
  ```

#### readonly

`readonly` 表示只读参数，函数内部无法修改

```ts
function arraySum(arr: readonly number[]) { }
```



#### 函数重载

**函数重载**：根据参数的不同，产生不同的函数行为

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

## 其他类型

- **联合类型**(union types)：多种类型任选其一；符号 `|`

- **交叉类型**(intersection types)：多种类型叠加在一起形成一种新类型，包含了所需的所有类型的特性；符号：`&`

- `void`：约束函数返回值；表示函数没有任何值返回

- `never`：约束函数返回值；表示函数永远不会结束

  > `never` 是"**底层类型**(bottom type)"，任何其他类型共有的

- **值类型**：使用值进行约束，变量为字面量

  ```ts
  // 和联合类型一起约束, 表示只能取其中一个值
  let gender: 'male' | 'female';
  
  // 约束空数组
  let arr: [];
  
  // 约束对象属性的类型
  let user: { 
    name: string; 
    age: number; 
  }
  ```

- **元组**(Tuple)：定长数组，数组每一项的类型确定

- `any`：任意类型；绕过类型检查

  > `any` 是"**顶层类型**(top type)"，可以赋值给任意类型的数据

- `unknown`：表示类型不确定，可能是任意类型；(严格的 `any`)，也是"**顶层类型**"(top type)

  > [!NOTE]
  >
  > - `unknown` 类型的变量不能直接赋值给其他类型变量 (除了 `any` 和 `unknown`)
  >
  >
  > - 不能直接调用 `unknown` 类型变量的方法和属性
  >
  >
  > - `unknown` 类型能进行的运算是有限的，只能进行比较运算 (`==`, `===`, `!=`, `!==`, `||`, `&&`，`?`, `typeof`, `instanceof`)

## 扩展类型

### 类型别名

`type`：类型别名；相当于 C++ 中的 `typedef`

- 类型别名具有块级作用域

  ```ts
  function hello(txt: string) {
    type msg = string;
    let newTxt: msg = 'Hello' + txt;
    return newTxt;
  }
  const newTxt: msg = hello('world'); // [!code error] 找不到名称“msg”。
  ```

- 类型别名不允许重名

- 别名支持表达式，允许嵌套

  ```ts
  type World = "world";
  type Greeting = `hello ${World}`;
  ```



### 枚举

`enum`：定义一组带名称的常量，在编译结果中**表现为对象**

> **表现为对象**
>
> - 可以使用方括号运算符或点运算符调用对象的属性
>
> - 不能出现与 enum 结构同名的变量

::: code-group

```ts[index.ts]
enum Gender {
  male = '男',
  female = '女'
};
```

```js[index.js]
var Gender;
(function (Gender) {
    Gender["Male"] = "\u7537";
    Gender["Female"] = "\u5973";
})(Gender || (Gender = {}));

export {};
```

:::

**枚举规则**

- 枚举字段值可以是字符串、数字(不能是 `bigint`)、表达式

- 数字枚举的值会自增，默认值从 0 开始

  ::: code-group

  ```ts[index.ts]
  enum Direction {
      Up,
      Down,
      Left,
      Right
  }
  ```

  ```js[index.js]
  var Direction;
  (function (Direction) {
      Direction[Direction["Up"] = 0] = "Up";
      Direction[Direction["Down"] = 1] = "Down";
      Direction[Direction["Left"] = 2] = "Left";
      Direction[Direction["Right"] = 3] = "Right";
  })(Direction || (Direction = {}));
  export {};
  ```

  :::

- 枚举的成员值是只读的，不能重新赋值(建议在声明时加上 `const` 修饰)

  ```ts
  const enum Color {
    Red,
    Green,
    Blue
  }
  ```

- 枚举可以混合，但尽量不要即出现字符串字段，又出现数字字段

- 枚举可以合并

  - 首个成员的值可以省略初始值
  - 不能有同名的成员

- `keyof`：取出枚举中的所有成员的名，作为联合类型返回

  ```ts
  enum MyEnum {
    A = 'a',
    B = 'b'
  }
  
  type Foo = keyof typeof MyEnum; // type Foo = "A" | "B"
  ```

- `in`：取出索引

  ```ts
  enum MyEnum {
    A = 'a',
    B = 'b'
  }
  for (let key in MyEnum) {
    console.log(key); // A B
  }
  ```

- **反向映射**：通过成员值获取成员名

  ```ts
  enum Direction {
      Up = 1,
      Down,
      Left,
      Right
  }
  console.log(Direction[3]); // Left
  ```

  **原理**：两段赋值

  ```ts
  Direction[Direction["Up"] = 0] = "Up";
  
  // 等价于
  Direction["Up"] = 0
  Direction[0] = "Up";
  ```

  > 字符串不存在反向映射

#### 枚举与值类型比较

- **值类型**在类型约束时会产生重复代码

  ```ts
  type gender = '男' | '女';
  ```

- **值类型**逻辑含义何真实值产生混淆，需要修改大量代码

- **值类型**不会产生在编译结果

#### 枚举的位运算

```ts
enum Permission {
  Read = 1,
  Write = 2,
  Create = 3,
  Delete = 4
}

// 1. 组合
let p: Permission = Permission.Read | Permission.Write;

// 2. 判断
function hasPermission(target: Permission, per: Permission) {
  return (target && per) === per;
}

// 3. 删除
p = p ^ Permission.Write;
```

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

`as const`：类型推断时，将变量断言为**值类型**

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
