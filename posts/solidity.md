---
date: 2025-05-20
title: Solidity
category: web3
tags:
- Solidity
- web3
description: 
---
# Solidity

::: details 目录

[[TOC]]

:::

1. **智能合约**：**运行在链上**的程序

   - **合约开发者**：通过智能合约实现与链上资产、数据的交互
   - 用户：通过链上账户调用合约、访问资产与数据

2. Solidity

   - 面向合约的高级语言

   - 运行在 EVM 虚拟机

   - 类 JavaScript 语法

3. Solidity 编辑器

   - [Remix IDE](https://remix.ethereum.org/)
   - [JuanBlanco.solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

4. 标识符
   - 合约名、函数名、变量名均限制为 ASCII 字符
   - 字符串变量可以存储为 UTF-8
5. 部署：.sol -> Compile -> Contract Bytecode -> Deploy -> Ethereum(Contract)

## A simple example smart contract

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

- `SPDX-License-Identifier: GPL-3.0`：源代码遵循 GPL 3.0 版本许可
- `pragma solidity >=0.4.16 <0.9.0;`：指定源代码是为 Solidity 版本 0.4.16，或该语言的较新版本(最高至 0.9.0 版本，但不包括 0.9.0 版本)
- `uint storedData;`：声明一个 *256 位 无符号 整数*变量
- `view`：表示该方法只读的，不会修改合约状态

在 [Remix IDE](https://remix.ethereum.org/?#language=solidity&version=0.8.30&code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAKcHJhZ21hIHNvbGlkaXR5ID49MC40LjE2IDwwLjkuMDsKCmNvbnRyYWN0IFNpbXBsZVN0b3JhZ2UgewogICAgdWludCBzdG9yZWREYXRhOwoKICAgIGZ1bmN0aW9uIHNldCh1aW50IHgpIHB1YmxpYyB7CiAgICAgICAgc3RvcmVkRGF0YSA9IHg7CiAgICB9CgogICAgZnVuY3Rpb24gZ2V0KCkgcHVibGljIHZpZXcgcmV0dXJucyAodWludCkgewogICAgICAgIHJldHVybiBzdG9yZWREYXRhOwogICAgfQp9) 中运行

- 选择 `Solidity compiler` -> `Auto compile`
- 选择 `Deploy & run transaction` -> `Deploy`

## 私有链

- [ganache](https://archive.trufflesuite.com/ganache/)：部署私有链

  - Quick Start
    - Accounts：账户信息
    - Blocks：区块信息
    - Transaction：交易信息
    - Logs：日志

  - 选择 Show Keys 获取私钥


- **安装 MetaMask 钱包**

  - 添加自定义网络

    - 选择左上角 -> Add a custom network -> Add a URL -> Add RPC URL

      | 属性名          | 属性值     |
      | ---------------------------- | ----------------------- |
      | Network name    | `Ganache`  |
      | RPC URL         | `http://127.0.0.1:7545` |
      | Chain ID        | `1337`                  |
      | Currency symbol | `ETH`      |


  - 选择 Account1 -> Import a wallet or account -> Private Key，粘贴私钥

- 在 Remix IDE 中链接私有链
  - 选择 Deploy & run transactions -> ENVIRONMENT -> Injected Provider - MetaMask
  - 选择 ACCOUNT 地址
  - 选择 VALUE 设置 Gas
  - 点击 Deploy

## 类型

- `boolean`：布尔

- **整型**

  - `uint`：无符号整型；只能表示正数

  - `int`：相当于 `number`

- `address`：地址

  > 以太坊地址长度为 20 个字节，1 个字节 8 位，一共 160 位；一个十六进制占 4 个字节，整个地址长度 40
  >
  > ```js
  > console.log('0x0000000000000000000000000000000000000000'.length); // 42
  > ```

  - `msg.sender`：全局变量；部署合约的地址(合约的拥有者)
  - 方法
    - `balance`：查看余额
    - `transfer`：转账

- `string`：字符串

- `bytes`

- 数组

- 枚举

  
