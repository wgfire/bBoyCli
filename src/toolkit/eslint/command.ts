import { Command } from "commander"
import shell from "shelljs"
const program = new Command()
export const eslintCommand = program

	.command("eslint [args...]")
	.description("Use eslint lint files")

	.action((args: string[], options: any) => {
		shell.exec("git add .")
	})
