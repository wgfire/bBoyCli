import { Command } from "commander"
import shell from "shelljs"
import { PushOptions, parseGitPushOptions } from "./utils"
import { useInquirer } from "@/hooks/inquirer/useInquirer"
import { spawn } from "node:child_process"
const program = new Command()
export const gitCommand = program

	.command("push [args...]")
	.description("Use git add, git commit, and git push")
	.option("-f, --force", "Force push")
	.option("-u, --set-upstream ", "Set upstream branch")
	.option("-d, --delete-remote <remote>", "Delete remote branch")
	.action(async (args: string[], options: PushOptions) => {
		console.log(options, "options")
		shell.exec("git add .")
		/**移除push后的参数，否则cz-cli 执行 git commit -m argv 会跟命令参数*/
		process.argv = process.argv.slice(0, 2)

		// runCommitCZ()
		const message = await useInquirer()
		const commitCommand = ["commit", "-m", message]
		console.log(commitCommand, "commit命令")
		spawn("git", commitCommand, { stdio: "inherit" })

		const pushOptions = parseGitPushOptions(options)
		const command = `git push ${args.join(" ")} ${pushOptions.join(" ")}`
		console.log(command, "push命令")
		shell.exec(command)
	})
