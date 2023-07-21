# eslint

配置vscode编辑器针对ts使用 eslint 来修复格式，由于安装了eslint-plug-prettier 可以调用prettier来修复格式，有prettier文件是用来美化其他文件格式

# commitizen配置

```
npx commitizen init cz-conventional-changelog --save --save-exact
npm i @commitlint/cli @commitlint/config-conventional -D
新建 commitlint.config.js 并设置校验规则
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```
