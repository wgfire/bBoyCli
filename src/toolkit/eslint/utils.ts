// example-eslint-integration.js

import { ESLint } from "eslint"

// Create an instance of ESLint with the configuration passed to the function
export function createESLintInstance(eslintConfig: ESLint.Options): ESLint {
	const defaultEslintConfi: ESLint.Options = {
		cwd: process.cwd(),
		fix: true
	}
	const eslint = new ESLint(Object.assign(defaultEslintConfi, eslintConfig))

	return eslint
}
