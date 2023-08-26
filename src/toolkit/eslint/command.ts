import { Command } from "commander"
import shell from "shelljs"
const program = new Command()
export const eslintCommand = program

	.command("eslint [args...]")
	.description("Use eslint lint files")

	.action((args: string[], options: { force?: boolean; setUpstream?: boolean; deleteRemote?: string }) => {
		shell.exec("git add .")
	})
