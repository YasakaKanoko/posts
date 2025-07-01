---
date: 2025-05-20
title: npm
category: npm
tags:
- npm
- Node.js
- js
description: 
---
# <samp>npm</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

**包管理器**：主要用于管理项目的依赖(如：库、框架或工具)，确保项目能够以一致的方式在不同环境(开发、测试、生产)中运行

- **依赖管理**：跟踪依赖的版本，确保兼容性，支持开发依赖和生产依赖
- **版本控制**：使用锁文件记录依赖的确切版本，确保构建一致性

- **脚本执行**：运行 `package.json` 中的脚本，自动化构建、测试、部署等任务
- **包发布与共享**：允许开发者将自己的包发布到公共或私有仓库
- **环境一致性**：确保不同开发者的环境使用相同的依赖版本

## nvm

nvm (Node Version Manager) Node 版本管理器

- `nvm -v`：查看 `nvm` 版本

- `nvm arch`：当前操作系统位数

- `nvm install <version> [arch]`：安装指定版本的 Node

  ```sh
  nvm install latest
  ```

- `nvm list [available]`：显示可安装的所有版本，`list` 简写 `ls`

- `nvm on`：开启 Node 版本管理

- `nvm off`：关闭 Node 管理

- `nvm alias default vx.y.z`：设置默认版本

  ```sh
  nvm install 18.10.0
  
  nvm alias default 18.10.0
  
  nvm use default
  ```

- `nvm use [version] [arch]`：使用指定版本的 Node

- `nvm uninstall <version>`：卸载指定版本的 Node

## corepack

`corepack` 是 Node.js v16.9.0 开始内置的一个工具，用于管理包管理器(`npm`、`pnpm`、`yarn`)的版本

- `corepack` 会先读取 `package.json` 中的 `"packageManager"` 字段；使用指定版本执行

  ```sh
  # 启用corepack
  corepack enable
  
  # 检查corepack状态
  corepack --version
  yarn -v
  pnpm -v
  
  # 禁用corepack
  corepack disable
  ```

- **缓存**

  - Linux/MacOS：`~/.cache/node/corepack`

  - Windows：`%LocalAppData%\node\corepack`

- **禁用自动添加** `"packageManager"`：在项目的根目录新建 `.npmrc` 文件

  ::: code-group

  ```ini[.npmrc]
  enable-strict-package-manager=false
  ```

  :::

## 开始

::: code-group

```sh[npm]
npm init -y
```

```sh[pnpm]
pnpm init
```

```sh[yarn]
yarn init -y
```

```sh[bun]
bun init
```

:::

## package.json

- `name`: 项目名称
  - 符合 `npm` 命名规则(小写、无空格)

- `version`: 版本号
  - 遵循语义化版本规范(SemVer)

- `description`: 项目描述
- `type`: 模块类型
- `main`: 入口文件
- `scripts`: 可执行脚本
- `keywords`: 搜索关键字
  - 默认值：空数组 `[]`

- `author`: 作者信息
  - `name`：姓名
  - `email`：电子邮件
  - `url`：网站主页

- `license`: 许可证
  - 默认值：`"ISC"`
- `dependencies`: 生产环境依赖
- `devDependencies`: 开发环境依赖
- `peerDependencies`：要求使用该项目的开发者自行安装，需要与指定版本兼容
- `packageManager`: 指定包管理器
- `repository`：代码仓库信息
  - `type`：仓库类型
  - `url`：仓库 URL
  - `directory`：如果项目是仓库的子目录，指定绝对路径

### SemVer

**语义化版本控制(Semantic Versioning，简称 SemVer)**，格式：`MAJOR.MINOR.PATCH` (主版本号.次版本号.补丁版本号)，每个部分是数字

- `MAJOR`：表示破坏性变更(Breaking Changes)

  - 例：可能更改了 API 接口或删除了功能

  - 场景：需要开发者调整代码以适应新版本

- `MINOR`：向后兼容的功能(新增功能但不破坏现有功能)
  - 例：添加了新特性但旧代码仍可运行
  - 场景：通常无需修改代码即可升级
- `PATCH`：向后兼容的错误修复(Bug Fixes)
  - 例：修复了 bug，但功能和接口不变
  - 场景：安全且直接升级

**修饰符**

- **预发布版本(Pre-release)**
  - 在版本号后添加连字符和标识符，如：1.0.0-alpha、1.0.0-beta.1
  - 表示不稳定的版本，通常用于测试
  - 示例：1.0.0-alpha 表示 alpha 预发布版，可能有未完成功能
- **构建元数据(Build Metadata)**
  - 在版本号后添加 + 和元数据，如：1.0.0+build.123
  - 表示附加信息(如构建号)，不影响版本优先级
  - 示例：1.0.0+20230620 表示特定构建

**更新**

- `npm version major`：递增主版本(1.2.3 -> 2.0.0)，用于破坏性变更
- `npm version minor`：递增次版本(1.2.3 -> 1.3.0)，用于新功能
- `npm version patch`：递增补丁版本(1.2.3 -> 1.2.4)，用于 bug 修复

**规则**

- **精确版本**：表示精确版本，等同于 `=`
- **波浪号**(`~`)：允许补丁版本更新
- **插入符**(`^`)：允许次版本和补丁版本更新
- **星号**(`*`)：允许任意版本更新(不推荐)
- **等于**(`=`)：仅允许指定的精确版本
- **大于**(`>`)：允许大于指定版本
- **大于等于**(`>=`)：允许大于或等于指定版本
- **小于**(`<`)：允许小于指定版本
- **小于等于**(`<=`)：允许小于或等于指定版本
- **版本范围**(`-`)：允许同时满足多个版本范围

## CLI 命令

### 管理依赖

- `--save`：(默认行为)安装依赖，安装依赖并保存到 `dependencies`

  ::: code-group

  ```sh[npm]
  npm install lodash
  ```

  ```sh[pnpm]
  pnpm add lodash
  ```

  ```sh[yarn]
  yarn add lodash
  ```

  ```sh[bun]
  bun add lodash
  ```

  :::

- `--save-dev`：简写 `-D` ，安装依赖并保存到 `devDependencies`

  ::: code-group

  ```sh[npm]
  npm install webpack -D
  ```

  ```sh[pnpm]
  pnpm add webpack -D
  ```

  ```sh[yarn]
  yarn add webpack -D
  ```

  ```sh[bun]
  bun add webpack -D
  ```

  :::

- `--save-exact`：简写 `-E`，精确安装版本，而不是精确地锁定包的版本号，而不是使用默认的波浪号 `~` 或插入符 `^`

  `@`：安装指定版本

  ::: code-group

  ```sh[npm]
  # --save-dev表示精确匹配3.4.0, 不会匹配小版本3.4.1
  npm install typescript@3.4 -E
  ```

  ```sh[pnpm]
  pnpm add typescript@3.4 -E
  ```

  ```sh[yarn]
  yarn add typescript@3.4 -E
  ```

  ```sh[bun]
  bun add typescript@3.4 -E
  ```

  :::

- 更新

  ::: code-group

  ```sh[npm]
  npm update
  ```

  ```sh[pnpm]
  pnpm update
  ```

  ```sh[yarn]
  yarn upgrade
  ```

  ```sh[bun]
  bun update
  ```

  :::

- 卸载包

  ::: code-group

  ```sh[npm]
  # 简写: uni
  npm uninstall lodash
  ```

  ```sh[pnpm]
  # 简写: rm
  pnpm remove lodash
  ```

  ```sh[yarn]
  # 简写: rm
  yarn remove lodash
  ```

  ```sh[bun]
  # 简写: rm
  bun remove lodash
  ```

  :::

### 查看依赖

- `list`：查看已安装的包

  ::: code-group

  ```sh[npm]
  npm list
  # 只列出顶层依赖
  npm list --depth=0
  ```

  ```sh[pnpm]
  pnpm list
  # 只列出顶层依赖
  pnpm list --depth=0
  ```

  ```sh[yarn]
  yarn list
  # 只列出顶层依赖
  yarn list --depth=0
  ```

  ```sh[bun]
  bun ls
  # 只列出顶层依赖
  bun ls --depth 0
  ```

  :::

- `outdated`：检测项目中已安装的包是否有新版本可用

  ::: code-group

  ```sh[npm]
  npm outdated
  ```

  ```sh[pnpm]
  pnpm outdated
  ```

  ```sh[yarn]
  yarn outdated
  ```

  ```sh[bun]
  bun outdated
  ```

  :::

- `audit`：审计安全漏洞

  ::: code-group

  ```sh[npm]
  npm audit
  ```

  ```sh[pnpm]
  pnpm audit
  ```

  ```sh[yarn]
  yarn audit
  ```

  ```sh[bun]
  bun audit
  ```

  :::

- 解释包的来源

  ::: code-group

  ```sh[npm]
  npm ls webpack
  ```

  ```sh[pnpm]
  pnpm why typescript
  ```

  ```sh[yarn]
  yarn why typescript
  ```

  ```sh[bun]
  bun ls webpack
  ```

  :::

### 运行脚本

- `create`

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

- `dlx`

  ::: code-group

  ```sh[npm]
  npx create-vue@next my-app
  ```

  ```sh[pnpm]
  pnpm dlx create-vue@next my-app
  ```

  ```sh[yarn]
  yarn dlx create-vue@next my-app
  ```

  ```sh[bun]
  bunx create-vue@next my-app
  ```

  :::

### 配置管理

- `config ls`：列出所有配置

  ::: code-group

  ```sh[npm]
  npm config ls # 列出所有配置，包括默认值
  npm config ls -l # 更多详情
  ```

  ```sh[pnpm]
  pnpm config ls # 列出所有配置
  ```

  ```sh[yarn]
  yarn config list # 列出所有配置
  ```

  :::

- `config get`：获取特定配置项

  ::: code-group

  ```sh[npm]
  npm config get registry # 获取当前使用的 npm registry 地址
  npm config get proxy # 获取代理设置
  ```

  ```sh[pnpm]
  pnpm config get registry # 获取 registry 地址
  ```

  ```sh[yarn]
  yarn config get registry # 获取 registry 地址
  ```

  :::

- `config set`：设置配置项

  ::: code-group

  ```sh[npm]
  npm config set registry https://registry.npmmirror.com/ 
  ```

  ```sh[pnpm]
  pnpm config set registry https://registry.npmmirror.com/
  ```

  ```sh[yarn]
  yarn config set registry https://registry.npmmirror.com/
  ```

  :::

- `config delete`：删除配置项

  ::: code-group

  ```sh[npm]
  npm config delete registry
  ```

  ```sh[pnpm]
  pnpm config delete registry
  ```

  ```sh[yarn]
  yarn config delete registry 
  ```

  :::

### 用户认证

- `login`：登录

  ::: code-group

  ```sh[npm]
  npm login
  ```

  ```sh[pnpm]
  pnpm login
  ```

  ```sh[yarn]
  yarn login # Yarn Classic
  yarn npm login # Yarn Berry
  ```

  ```sh[bun]
  bun login
  ```

  :::

- `whoami`：查看当前登录的账号

  ::: code-group

  ```sh[npm]
  npm whoami
  ```

  ```sh[pnpm]
  pnpm whoami
  ```

  ```sh[yarn]
  yarn whoami # Yarn Classic
  yarn npm whoami # Yarn Berry
  ```

  ```sh[bun]
  bun whoami
  ```

  :::

- `logout`：注销

  ::: code-group

  ```sh[npm]
  npm logout
  ```

  ```sh[pnpm]
  pnpm logout
  ```

  ```sh[yarn]
  yarn logout # Yarn Classic
  yarn npm logout # Yarn Berry
  ```

  ```sh[bun]
  bun logout
  ```

  :::

- `publish`：发布

  ::: code-group

  ```sh[npm]
  npm publish
  ```

  ```sh[pnpm]
  pnpm publish
  ```

  ```sh[yarn]
  yarn publish
  ```

  ```sh[bun]
  bun publish
  ```

  :::
