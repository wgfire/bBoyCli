import { Command } from "commander"
import shell from "shelljs"
const program = new Command()
export const eslintCommand = program

	.command("eslint [args...]")
	.description("Use eslint lint files")

	.action((args: string[], options) => {
		console.log(args, options)
		shell.exec("git add .")
	})
