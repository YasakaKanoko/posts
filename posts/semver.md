---
date: 2025-07-02
title: 语义化版本
category: git
tags:
- github
- git
description: 语义化版本 (Semantic Versioning, 简称 SemVer) 是一种版本号命名规范，用于清晰地表达软件版本的变化及其兼容性。采用 主版本号.次版本号.修订号 的格式
---

# 语义化版本

::: details 目录

[[TOC]]

:::

## 依赖地狱

系统规模越大，加入的包越多，当你项目的进展因为版本依赖被锁死或版本混乱变得不够简便和可靠，在软件管理的领域里称作 "依赖地狱"

- 如果依赖关系过高，可能面临版本控制被锁死的风险 (必须对每一个依赖包改版才能完成某次升级)
- 如果依赖关系过于松散，又将无法避免版本的混乱 (假设兼容于未来的多个版本已超出了合理数量)

语义化版本控制规范，提议用一组简单的规则及条件来约束版本号的配置和增长

1. 必须要有定义好的公共 API，可能包括文档或代码的强制要求
2. 透过修改相应的版本号来向大家说明你的修改。考虑采用 **主版本号**.**次版本号**.**修订号** 的格式
   - **主版本号 (Major)**：当软件进行不兼容的变更 (breaking changes)，即可能破坏现有功能的更改时，主版本号递增
   - **次版本号 (Minor)**：当添加新功能但保持向后兼容，次版本号递增
   - **修订号 (Patch)**：当进行向后兼容的错误修复或小更新，修订号递增

## 语义化版本控制规范 (SemVer)

以下关键词 MUST、MUST NOT、REQUIRED、SHALL、SHALL NOT、SHOULD、SHOULD NOT、 RECOMMENDED、MAY、OPTIONAL 依照 RFC 2119 (Key words for use in RFCs to Indicate Requirement Levels) 的叙述解读

1. 使用语义化版本控制的软件必须（MUST）定义公共 API

## References

- [语义化版本 2.0](https://semver.org/lang/zh-CN/)