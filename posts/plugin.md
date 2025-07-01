---
date: 2025-05-20
title: Plugin
category: plugin
tags:
- plugin
description: 
---

# <samp>Things I am using</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

## 开发

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Git 可视化

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker): 拼写检查

- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens): 改进错误、警告和其他语言诊断的突出显示

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)：代码检查工具

  ::: details

  ```json
  {
    // Disable the default formatter, use eslint instead
    "prettier.enable": false,
    "editor.formatOnSave": false,
  
    // Auto fix
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.organizeImports": "never"
    },
  
    // Silent the stylistic rules in you IDE, but still auto fix them
    "eslint.rules.customizations": [
      { "rule": "style/*", "severity": "off", "fixable": true },
      { "rule": "format/*", "severity": "off", "fixable": true },
      { "rule": "*-indent", "severity": "off", "fixable": true },
      { "rule": "*-spacing", "severity": "off", "fixable": true },
      { "rule": "*-spaces", "severity": "off", "fixable": true },
      { "rule": "*-order", "severity": "off", "fixable": true },
      { "rule": "*-dangle", "severity": "off", "fixable": true },
      { "rule": "*-newline", "severity": "off", "fixable": true },
      { "rule": "*quotes", "severity": "off", "fixable": true },
      { "rule": "*semi", "severity": "off", "fixable": true }
    ],
  
    // Enable eslint for all supported languages
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "vue",
      "html",
      "markdown",
      "json",
      "jsonc",
      "yaml",
      "toml",
      "xml",
      "gql",
      "graphql",
      "astro",
      "svelte",
      "css",
      "less",
      "scss",
      "pcss",
      "postcss"
    ]
  }
  ```

  :::

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): 指定配置文件 `.prettierrc.js` 在项目中通过配置文件进行格式化

  ::: details

  ```json
  "prettier.enable": false,
  "prettier.printWidth": 200,
  "prettier.semi": false,
  "prettier.singleQuote": true,
  ```

  :::

- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)：国际化

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): Tailwind CSS 智能提示

- [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)：查找 CSS 模块；仅支持 React

- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)：创建一些规则后，您可以将它们提取到预设中，并与他人共享

  ::: details

  ::: code-group

  ```ts[uno.config.ts]
  import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetWind3,
    transformerDirectives,
    transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    shortcuts: [
      // ...
    ],
    theme: {
      colors: {
        // ...
      }
    },
    presets: [
      presetWind3(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        fonts: {
          // ...
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })
  ```

  :::

- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify): 内敛图标预览

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)：静态和动态页面实时重新加载功能的开发本地服务器

- [Browse Lite](https://marketplace.visualstudio.com/items?itemName=antfu.browse-lite)：VSCode 中嵌入简版服务器

- [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)：VSCode 本地嵌入 Vite 服务器

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)：Vue 官方提供的格式化、语法检查工具

- [ES7 React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets): 代码片段

- [Shader languages support for VS Code](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)：Web GL 必备的着色器语言的语法高亮工具

- [shadcn Color Preview](https://marketplace.visualstudio.com/items?itemName=dexxiez.shadcn-color-preview): 颜色转换

- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)：颜色高亮

- [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv): 分隔 CSV、TSV 和 其他分隔符文件

- [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case): 命名转换

- [Commit Message Editor](https://marketplace.visualstudio.com/items?itemName=adam-bender.commit-message-editor): 方便编辑提交信息

- [px to rem & rpx & vw (cssrem)](https://github.com/cipchk/vscode-cssrem/blob/HEAD/README.zh-CN.md): px、rem 相互转换

- [Template String Converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter): 输入 `${` 自动转为模板字符串

- [TabOut](https://marketplace.visualstudio.com/items?itemName=albert.TabOut): 按 `Tab` 跳出括号

- [Tab Cycle](https://marketplace.visualstudio.com/items?itemName=mpontus.tab-cycle)：确保最近选项卡始终保持在最前

  > `Alt` + `<number>` 选项卡将顺序切换；`Ctrl` + `<PageUp>` / `<PageDown>` 选项卡将循环切换

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components): 组件样式语法高亮

- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag): 标签高亮

- [Parameter Hints](https://marketplace.visualstudio.com/items?itemName=DominicVonk.parameter-hints): 函数参数智能提示

## 辅助

- [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
- [SVG Gallery](https://marketplace.visualstudio.com/items?itemName=developer2006.svg-gallery)
- [Image Gallery](https://marketplace.visualstudio.com/items?itemName=GeriYoco.vscode-image-gallery)
- [Figma for VS Code](https://marketplace.visualstudio.com/items?itemName=figma.figma-vscode-extension)
- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Comment Translate](https://marketplace.visualstudio.com/items?itemName=intellsmi.comment-translate)
- [Slidev](https://marketplace.visualstudio.com/items?itemName=antfu.slidev)
- [Where Am I?](https://marketplace.visualstudio.com/items?itemName=antfu.where-am-i)
- [TSConfig Helper](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-tsconfig-helper)

## 工具

- [project-tree](https://marketplace.visualstudio.com/items?itemName=zhucy.project-tree)
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)
- [:emojisense:](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense)
- [CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
- [vscode-pdf](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf)
- [Office Viewer](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-office)
- [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)
- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Dev Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
- [SQLite3 Editor](https://marketplace.visualstudio.com/items?itemName=yy0931.vscode-sqlite3-editor)
- [Open in GitHub Button](https://marketplace.visualstudio.com/items?itemName=antfu.open-in-github-button)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)
- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [WakaTime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)

## 外观

- [Power Mode](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-power-mode)
- [1984](https://marketplace.visualstudio.com/items?itemName=juanmnl.vscode-theme-1984)
- [Carbon Product Icons](https://marketplace.visualstudio.com/items?itemName=antfu.icons-carbon)
- [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc)
- [Catppuccin Icons for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
- [Vitesse Theme](https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse)
- [file-icons](https://marketplace.visualstudio.com/items?itemName=file-icons.file-icons)
- [Gruvbox Material](https://marketplace.visualstudio.com/items?itemName=sainnhe.gruvbox-material)
- [Vira Theme](https://marketplace.visualstudio.com/items?itemName=vira.vsc-vira-theme)

## 自动补全

- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Tabnine: AI Chat & Autocomplete for JavaScript, Python, TypeScript, Java, PHP, Go, and more](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
- [Fitten Code: Faster and Better AI Assistant](https://marketplace.visualstudio.com/items?itemName=FittenTech.Fitten-Code)
- [Mintlify Doc Writer for Python, JavaScript, TypeScript, C++, PHP, Java, C#, Ruby & more](https://marketplace.visualstudio.com/items?itemName=mintlify.document)

## 刷题

- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [algorithm](https://marketplace.visualstudio.com/items?itemName=supperchong.algorithm)

## 軟體

- [AltSnap](https://www.majorgeeks.com/files/details/altsnap.html)
- [Snipaste](https://www.snipaste.com/)
- [ScreenToGif](https://www.screentogif.com/)
- [Everything](https://www.voidtools.com/zh-cn/downloads/)

## 浏览器插件

- [File Icons for GitHub and GitLab](https://chromewebstore.google.com/detail/file-icons-for-github-and/ficfmibkjjnpogdcfhfokmihanoldbfe)
- [Language Reactor](https://chromewebstore.google.com/detail/language-reactor/hoombieeljmmljlkjmnheibnpciblicm?hl=zh-CN&utm_source=ext_sidebar)
- [Refined GitHub](https://chromewebstore.google.com/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf?hl=zh-CN&utm_source=ext_sidebar)
- [沉浸式翻译 - 网页翻译插件 | PDF翻译 | 免费](https://chromewebstore.google.com/detail/%E6%B2%89%E6%B5%B8%E5%BC%8F%E7%BF%BB%E8%AF%91-%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91%E6%8F%92%E4%BB%B6-pdf%E7%BF%BB%E8%AF%91-%E5%85%8D%E8%B4%B9/bpoadfkcbjbfhfodiogcnhhhpibjhbnh?hl=zh-CN&utm_source=ext_sidebar)
