# 安装next.js
```bash
pnpm create next-app --ts
// 其中选择了eslint,src
```
## 使用swc
```js
//next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	swcMinify: true,
	 eslint: {
    dirs: ["src"],
  },
}

module.exports = nextConfig
```
# 格式化配置
包括eslint,prettier,commitlint,husky,lint-staged.

stylelint因为使用的是tailwindcss,用处不大.不安装.

因为初始化已经包括eslint,不再安装.只要修改配置就行.

## prettier
```bash
pnpm add -D eslint-config-prettier
```
### 搭配eslint
```json
//eslintrc.json
{
  "extends": ["next", "prettier"]
}
```
## 保存时自动修复

在.vscode/settings.json 中添加一下规则

```json
{
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true,
    // "source.fixAll.stylelint": true
  },
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 配置该项，新建文件时默认就是space：2
  "editor.tabSize": 2,
  // stylelint校验的文件格式
  // "stylelint.validate": ["css", "less", "vue", "html"]
}
```
## husky
```bash
pnpm add husky -D
```

package.json 添加脚本命令

```json
{
	"scripts": {
		"prepare": "husky install"
	}
}
```

执行命令

```
pnpm prepare && pnpm husky add .husky/pre-commit "pnpm lint:lint-staged"
```

执行完上面的命令后，会在.husky 目录下生成一个 pre-commit 文件

现在当我们执行`git commit`的时候就会执行`pnpm lint`的三个代码，当这两条命令出现报错，就不会提交成功。以此来保证提交代码的质量和格式。

## lint-staged
```bash
pnpm add lint-staged -D
```

添加 package.json 配置

```json
{
	"lint:lint-staged": "lint-staged"
}
```

```js
// .lintstagedrc.js
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
```
### commitlint

对 git 提交时的信息进行检查.

```bash
pnpm add @commitlint/cli @commitlint/config-conventional -D
```

然后在根目录创建配置文件 `.commitlintrc.cjs`

```js
/**
 * 约定git提交规范
 * types:[空格]message
 * e.g. feat: 这是一个新的feature
 */

// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */

/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *     - ci: 持续集成修改
 *     - docs: 文档修改
 *     - feat: 新特性、新功能
 *     - fix: 修改bug
 *     - perf: 优化相关，比如提升性能、体验
 *     - refactor: 代码重构
 *     - revert: 回滚到上一个版本
 *     - style: 代码格式修改, 注意不是 css 修改
 *     - test: 测试用例修改
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */

module.exports = {
	ignores: [commit => commit.includes('init')],
	extends: ['@commitlint/config-conventional'],
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [1, 'always'],
		'header-max-length': [2, 'always', 108],
		'subject-empty': [2, 'never'],
		'type-empty': [2, 'never'],
		'subject-case': [0],
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'docs',
				'style',
				'refactor',
				'perf',
				'test',
				'build',
				'ci',
				'chore',
				'revert',
				'wip',
				'workflow',
				'types',
				'release'
			]
		]
	},
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    skipQuestions: ['footerPrefixesSelect','body','breaking','customFooterPrefix','footer'],
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      { value: 'docs', name: 'docs:     文档更新 | Documentation only changes' },
      { value: 'style', name: 'style:    代码格式 | Changes that do not affect the meaning of the code' },
      { value: 'refactor', name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature' },
      { value: 'perf', name: 'perf:     性能提升 | A code change that improves performance' },
      { value: 'test', name: 'test:     测试相关 | Adding missing tests or correcting existing tests' },
      { value: 'build', name: 'build:    构建相关 | Changes that affect the build system or external dependencies' },
      { value: 'ci', name: 'ci:       持续集成 | Changes to our CI configuration files and scripts' },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      { value: 'chore', name: 'chore:    其他修改 | Other changes that do not modify src or test files' },
    ],
    useEmoji: false,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
```

然后把 commitlint 命令也添加 Husky Hook。运行命令：

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

# 安装tailwindCSS
```bash
pnpm add -D tailwindcss postcss autoprefixer
```
## 配置tailwindcss
新建`tailwindcss.config.js`.
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		// 可以自定义字体
    fontFamily: {
      serif: 'DM Serif Display',
      body: 'Rubik',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
    },
		// 响应式布局
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1120px',
    },
    extend: {
			// 默认颜色
      colors: {
        page: '#FEF8F5',
        primary: '#402B2B',
        accent: {
          DEFAULT: '#EE4D47',
          hover: '#DA423D',
        },
        tint: '#FDEDE8',
        darkblue: '#0F264C',
      },
      dropShadow: {
        primary: '0 20px 40px rgba(238, 77, 71, 0.1)',
        secondary: '0px 30px 40px rgba(244, 125, 103, 0.2)',
        tertiary: '0 20px 40px rgba(32, 56, 100, 0.3);',
      },
			// 默认背景图
      backgroundImage: {
        hero: "url('/images/hero/scene.svg')",
        faq: "url('/images/faq/bg.svg')",
        footer: "url('/images/footer/bg.svg')",
      },
    },
  },
  plugins: [],
};
```
## 修改全局css
```css
/* 这3个是必须的 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义使用 */
@layer base {
  body {
    @apply font-body font-normal text-base text-primary bg-slate-200;
  }
  a {
    @apply font-body text-base uppercase font-medium tracking-[5%];
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-serif;
  }
  .h1 {
    @apply text-[68px] lg:text-[100px] leading-none;
  }
  .h2 {
    @apply text-[36px] lg:text-[48px] leading-[140%];
  }
  .h3 {
    @apply font-body text-[24px] font-bold leading-[40px] uppercase tracking-[10%] text-accent mb-4 lg:mb-10;
  }
  .lead {
    @apply font-body font-light text-[18px] leading-[40px];
  }
  .btn {
    @apply h-[60px] bg-accent py-[20px] px-[24px] text-white rounded-[5px] font-body uppercase tracking-[5%] text-base font-medium hover:bg-accent-hover flex items-center gap-6;
  }
  .input {
    @apply h-[60px] rounded-[5px] max-w-[400px] outline-none px-[40px] ring-1 ring-accent/50 focus:ring-2 focus:ring-accent transition focus:drop-shadow-primary text-[18px] font-bold placeholder:text-[18px] placeholder:font-light placeholder:text-primary;
  }
}
```
## postcss配置
新建文件`postcss.config.js`.
```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
