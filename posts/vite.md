---
date: 2025-05-20
title: Vite
category: Vite
tags:
- ts
- js
- Vite
description: 
---
# <samp>Vite</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

<samp>Vite 是一款立即启动项目并实时查看修改的构建工具</samp>

<samp>**场景**</samp>

- <samp>使用 React、Vue 和 Svelte 等框架的快速前端开发</samp>
- <samp>极简的配置获得优化生产构建的应用</samp>
- <samp>寻求比 Webpack 等传统打包工具更轻量高效的工具</samp>

<samp>Vite 需要 Node.js 18 或 20 以上版本支持</samp>

```sh
node --version
```

## <samp>Building React apps with Vite</samp>

::: code-group

```sh[npm]
npm create vite@latest
```

```sh[yarn]
yarn create vite
```

```sh[pnpm]
pnpm create vite
```

```sh[bun]
bun create vite
```

:::

```sh
Need to install the following packages:
create-vite@6.5.0
Ok to proceed? (y)


> npx
> create-vite

│
◇  Project name:
│  .
│
◇  Package name:
│  vite-app
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in E:\study_coding\vue\Vite_app...
│
└  Done. Now run:

  npm install
  npm run dev
```

- <samp>`public`：最终生成的静态资源</samp>
- <samp>`src/assets`：可优化的静态资源</samp>
- <samp>`package.json`：存放相关依赖</samp>
- <samp>`vite.config.json`：配置和插件列表</samp>

<samp>**特点**</samp>

- <samp>Fast startup time：无论项目规模大小，Vite 都能以极简配置提供闪电般的开发体验，实现效率最大化</samp>

- <samp>Fast DX(Development experience)</samp>

- <samp>Bundling vs HMR over native ES modules</samp>

  - <samp>使用 HMR 代替原生 ES Module，Vite 不会在发生更改时捆绑整个代码，而是仅仅替换已更改的部分代码，开发服务器仍在运行时实现快速更新且不会破坏应用程序的现有状态</samp>

    <samp>例：当浏览器修改了 `App` 组件的 `count` 时，再添加 `Header` 组件，对应的 `count` 的值并未重载</samp>

    ::: code-group

    ```jsx[App.jsx]
    // ...
    import Header from './components/Header'; // [!code ++]
    
    export default function App() {
      const [count, setCount] = useState(0)
    
      return (
        <>
        	{/* [!code ++] */}
          <Header /> 
          <div>
          {/* ... */}
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            {/* ... */}
          </div>
          {/* ... */}
        </>
      )
    }
    ```

    ```jsx[Header.jsx]
    export default function Header(){
      return(
        <header>
          <h1>Hello Vite</h1>
        </header>
      );
    }
    ```

    :::

## <samp>Working with static assets</samp>

<samp>Vite 处理 Static Assets(如：图像、字体、文本、媒体等)</samp>

- <samp>Optimize</samp>

  1. <samp>Hash to cache：向文件名添加哈希进行缓存</samp>
  2. <samp>Inline if size < 4KB：如果文件小于 4 KB 则内联该文件，不会使用第一种方式，而是将文件转换为 base64 并包含在 HTML 中而不是作为单独的文件，这样不会产生额外的 HTTP 请求</samp>
  3. <samp>Optimize with plugins：使用插件优化</samp>

- <samp>Copy As Is</samp>

  ```txt
  Vite_app
  ├─ public
  │  └─ vite.svg
  ├─ src
  │  └─ assets
  │     └─ react.svg
  └─ README.md
  ```

  - <samp>`src/assets`：需要优化的文件(文件名包含哈希值)，引入时使用相对路径</samp>

    ::: code-group

    ```jsx[App.jsx]
    import reactLogo from './assets/react.svg'
    ```

    ```sh
    ls -l dist/assets
    -a----         2025/6/16      0:24           4126 react-CHdo91hT.svg
    ```

    :::

  - <samp>`public`：不需要进行优化的文件(文件名不包含哈希值)，引入时使用绝对路径</samp>

    ::: code-group

    ```jsx[App.jsx]
    import viteLogo from '/vite.svg'
    ```

    ```sh
    ls -l dist
    -a----         2025/6/15     23:38           1497 vite.svg
    ```

    :::

## <samp>Using environment variables</samp>

<samp>`import.meta`：一个特殊对象，描述了当前模块的元信息</samp>

- <samp>`import.meta.env`：访问环境变量</samp>
  - <samp>`.BASE_URL`：项目的基础路径，通常指构建时指定应用的部署路径</samp>
  - <samp>`.MODE`：当前构建的模式；development 开发模式、production 生产模式、staging 自定义模式</samp>
  - <samp>`.DEV`：是否为开发模式</samp>
  - <samp>`.PROD`：是否为生产模式</samp>
  - <samp>`SSR`：是否为服务器渲染模式</samp>

- <samp>`.env`：加载额外的环境变量</samp>

  - <samp>自定义的变量必须以 `VITE_` 开头的大写字母</samp>

    ::: code-group

    ```ini[.env]
    VITE_GREETING=Howdy!
    ```

    ```jsx[App.jsx]
    export default function App() {
      // [!code ++]
      const greeting = import.meta.env.VITE_GREETING
    
      return (
        <>
          <h1>Vite + React</h1>
          {/*[!code ++]*/}
          <h2>{greeting}</h2>
        </>
      )
    }
    ```

    :::

<samp>例：获取 IP 地址</samp>

::: code-group

```ini[.env]
VITE_API_URL=https://api.ipify.org
```

```jsx[App.jsx]
import { useEffect, useState } from 'react'

export default function App() {

  const [ipAddress, setIpAddress] = useState('');
  useEffect(() => {
    const fetchIpAddress = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}?format=json`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setIpAddress(data.ip);
      }
      catch (err) {
        setIpAddress('NOT AVAILABLE');
        console.log(err.message);
      }
    }
    fetchIpAddress();
  }, [])
  return (
    <>
      <h3>Your IP Address is {ipAddress}</h3>
    </>
  )
}
```

:::

## <samp>TypeScript development</samp>

<samp>TypeScript 开发工具分为两类</samp>

- <samp>Transpilation：Vite 负责开箱即用，转译</samp>

- <samp>Type Checking：IDE、tsc 类型检查</samp>

<samp>vite+ts</samp>

::: code-group

```sh[npm]
npm create vite@latest my-app -- --template react-ts
```

```sh[yarn]
yarn create vite my-app --template react-ts
```

```sh[pnpm]
pnpm create vite my-app --template react-ts
```

```sh[bun]
bun create vite my-app --template react-ts
```

:::

<samp>JavaScript to TypeScript Migration</samp>

1. <samp>Create a separate boilerplate project with Vite, choosing TypeScript as the language variant.</samp>

2. <samp>Form that project, bring in all the config files that Vite provides: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` and `vite-env.d.ts`</samp>

   ::: code-group

   ```ts[src/vite-env.d.ts]
   /// <reference types="vite/client" />
   ```

   :::

3. <samp>Install all the TypeScript-related dependencies.</samp>

   ::: code-group

   ```json[package.json]
   "devDependencies": {
     "@eslint/js": "^9.25.0",
     "@types/react": "^19.1.2",
     "@types/react-dom": "^19.1.2",
     "@vitejs/plugin-react": "^4.4.1",
     "eslint": "^9.25.0",
     "eslint-plugin-react-hooks": "^5.2.0",
     "eslint-plugin-react-refresh": "^0.4.19",
     "globals": "^16.0.0",
     "typescript": "~5.8.3", // [!code ++]
     "typescript-eslint": "^8.30.1", // [!code ++]
     "vite": "^6.3.5"
   }
   ```

   :::

4. <samp>Add the TypeScript compiler to your build script like so:</samp>

   ::: code-group

   ```json[package.json]
   "scripts": {
     "dev": "vite",
     "build": "tsc -b && vite build", // [!code ++]
     "lint": "eslint .",
     "preview": "vite preview"
   }
   ```

   :::

5. <samp>Rename each file you want to migrate to TypeScript and add the types as needed.</samp>

   ::: code-group

   ```sh
   mv src/main.jsx src/main.tsx
   mv src/App.jsx src/App.tsx
   ```

   ```html[index.html]
   <script type="module" src="/src/main.tsx"></script>
   ```

   :::

6. <samp>Adjust `eslint.config.js` file to include TypeScript</samp>

   ::: code-group

   ```js[eslint.config.js]
   import js from '@eslint/js'
   import globals from 'globals'
   import reactHooks from 'eslint-plugin-react-hooks'
   import reactRefresh from 'eslint-plugin-react-refresh'
   import tseslint from 'typescript-eslint' // [!code ++]
   
   export default tseslint.config( // [!code ++]
     { ignores: ['dist'] },
     {
       extends: [js.configs.recommended, ...tseslint.configs.recommended], // [!code ++]
       files: ['**/*.{ts,tsx}'], // [!code ++]
       languageOptions: {
         ecmaVersion: 2020,
         globals: globals.browser,
         parserOptions: { // [!code --]
           ecmaVersion: 'latest', // [!code --]
           ecmaFeatures: { jsx: true }, // [!code --]
           sourceType: 'module', // [!code --]
         }, // [!code --]
       },
       plugins: {
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
       },
       rules: {
         ...js.configs.recommended.rules, // [!code --]
         ...reactHooks.configs.recommended.rules,
         'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // [!code --]
         'react-refresh/only-export-components': [
           'warn',
           { allowConstantExport: true },
         ],
       },
     },
   )
   ```

   :::

7. <samp>Update the `vite.config.js` file to `vite.config.ts`</samp>

8. <samp>Restart development server</samp>

## <samp>Building for production</samp>

- <samp>`dev`：`vite dev` 和 `vite serve` 是 `vite` 的别名，在本地开启一个开发服务器</samp>
- <samp>`build`：构建并输出到名为 `dist` 的目录</samp>
- <samp>`preview`：本地测试或预览构建</samp>

## <samp>Configuring and extending Vite</samp>

<samp>Vite 预置了很多默认设置，这使得它能开箱即用</samp>

::: code-group

```js[vite.config.js]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 修改开发服务器的默认端口号
  server: {
    port: 3000
  },
  // 修改构建生成的目录
  build: {
    outDir: 'out'
  }
})

```

:::

### <samp>Extend with plugins</samp>

<samp>How to use a Vite plugin</samp>

1. <samp>Import the plugin as a dev dependency in `package.json`</samp>

   ```sh
   npm i -D vite-plugin-qrcode
   ```

2. <samp>Import and add it to the plugins array in `vite.config.js`</samp>

   ::: code-group

   ```js[vite.config.js]
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import { qrcode } from 'vite-plugin-qrcode' // [!code ++]
   
   // https://vite.dev/config/
   export default defineConfig({
     plugins: [react(), qrcode()], // [!code ++]
   })
   ```

   ```json[package.json]
   "scripts": {
     "dev": "vite --host",
     "build": "vite build",
     "lint": "eslint .",
     "preview": "vite preview"
   },
   ```

   :::

3. <samp>Check the plugin docs for any additional configurations.</samp>

<samp>使用 `svgr` 插件将 `svg` 转为组件</samp>

1. <samp>添加依赖</samp>

   ```sh
   npm i -D vite-plugin-svgr
   ```

2. <samp>在 `vite.config.js` 中导入插件</samp>

   ::: code-group

   ```js[vite.config.js]
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import svgr from 'vite-plugin-svgr' // [!code ++]
   
   // https://vite.dev/config/
   export default defineConfig({
     plugins: [react(), svgr()], // [!code ++]
   })
   ```

   :::

3. <samp>使用</samp>

   ::: code-group

   ```jsx[App.jsx]
   import ReactLogo from './assets/react.svg?react' // [!code ++]
   import viteLogo from '/vite.svg'
   import './App.css'
   
   export default function App() {
   
     return (
       <>
         <div>
           <a href="https://vite.dev" target="_blank">
             <img src={viteLogo} className="logo" alt="Vite logo" />
           </a>
           <a href="https://react.dev" target="_blank">
             {/* [!code --] */}
             <img src={reactLogo} className="logo react" alt="React logo" />
              {/* [!code ++] */}
             <ReactLogo className="logo react" />
           </a>
         </div>
         <h1>Vite + React</h1>
         <p className="read-the-docs">
           Click on the Vite and React logos to learn more
         </p>
       </>
     )
   }
   ```

   ```css[App.css]
   .logo {
     height: 6em;
     /* [!code ++] */
     width: 6em; 
     padding: 1.5em;
     will-change: filter;
     transition: filter 300ms;
   }
   ```

   :::

