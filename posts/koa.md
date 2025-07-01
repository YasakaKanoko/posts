---
date: 2025-06-29
title: koa
category: js
tags:
- Node.js
- js
description: Koa 是一个新的 web 框架，由 Express 幕后的原版人马打造，为搭建 web 服务器提供更轻量、更优雅的方案
---

# Koa

::: details 目录

[[TOC]]

:::

**对比 Express**

- 更轻量：在 `express` 基础上简化了框架
  - `koa` 没有内置中间件
  - `koa` 不提供路由匹配
- 更合理的对象结构
  - `express` 的主要操作的对象 `app`、`req`、`res`
  - `koa` 的主要操作对象 `app`、`context`、`request`、`response`
- 更友好的中间件支持

