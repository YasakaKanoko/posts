---
date: 2025-05-20
title: Next.js
category: js
tags:
- Next.js
- React
- js
description: 
---

# <samp>Next.js</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

**System Requirements**：Node.js 18.18 or later.

::: code-group

```sh[npm]
npx create-next-app@latest
```

```sh[yarn]
yarn create next-app
```

```sh[pnpm]
pnpm create next-app
```

:::

```sh
√ What is your project named? ... .
√ Would you like to use TypeScript? ... No / Yes​
√ Would you like to use ESLint? ... No / Yes​
√ Would you like to use Tailwind CSS? ... No / Yes​
√ Would you like your code inside a `src/` directory? ... No​ / Yes
√ Would you like to use App Router? (recommended) ... No / Yes​
√ Would you like to use Turbopack for `next dev`? ... No / Yes​
√ Would you like to customize the import alias (`@/*` by default)? ... No​ / Yes
Creating a new Next.js app in D:\study\react\nextjs_app.

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss
- eslint
- eslint-config-next
- @eslint/eslintrc
```

::: code-group

```json[package.json]
"scripts": {
  "dev": "next dev --turbopack", // --turbopack提升性能
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
```

:::

Run the development server

::: code-group

```sh[npm]
npm run dev
```

```sh[yarn]
yarn dev
```

```sh[pnpm]
pnpm dev
```

:::

Visit `http://localhost:3000` to view your application

## 路由

在 `app` 目录下的每个 `.tsx` 都对应一个路由

- `app/page.tsx` 定义了主页路由 `/`
- `app/about/page.tsx` 定义路由 `/about`

### layout.tsx

`layout.tsx`：Next.js 应用程序的布局，`Rootlayout` 是位于顶层的

如：导航栏(`navbar`)需要全局显示；Next.js 提供了一个组件 `Link` 类似 `a` 标签

::: code-group

```txt[app structure]
nextjs_app
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
...
```

```tsx[app/layout.tsx]
// ...
import Link from "next/link"; // [!code ++]

// ...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
        	{/* [!code ++] */}
          <Link href={"/"}> Home </Link>
          {/* [!code ++] */}
          <Link href={"/about"}> about </Link>
          {/* [!code ++] */}
          <Link href={"/contact"}> Contact </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
```

:::

