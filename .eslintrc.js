module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: true
	},

	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:prettier/recommended" // 这样写默认启用了plugins里调用了prettier能力,好处是--fix的时候可以根据下面的配置修复代码格式
		//"prettier" // 关闭一些prettier冲突
	],
	plugins: ["@typescript-eslint"], //不写prettier 不启用eslint 调用prettier的能力，如果需要启用，这份配置得和prettier配置保持一样，否则鬼畜,写了要配合rules写prettier/prettier使用

	rules: {
		"prettier/prettier": [
			2,
			{
				singleQuote: false,
				bracketSpacing: true,
				endOfLine: "auto", // 这里用auto
				trailingComma: "none",
				tabWidth: 2,
				useTabs: true,
				semi: false,
				printWidth: 120,
				jsxSingleQuote: false,
				arrowParens: "avoid",
				eslintIntegration: true
			}
		]
	}
}
