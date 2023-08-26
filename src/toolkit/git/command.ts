import { Command } from "commander"
import shell from "shelljs"
import { parseGitPushOptions, runCommitCZ } from "./utils"
const program = new Command()
export const gitCommand = program

	.command("push [args...]")
	.description("Use git add, git commit, and git push")
	.option("-f, --force", "Force push")
	.option("-u, --set-upstream ", "Set upstream branch")
	.option("-d, --delete-remote <remote>", "Delete remote branch")
	.action((args: string[], options: { force?: boolean; setUpstream?: string; deleteRemote?: string }) => {
		console.log(options, "options")
		shell.exec("git add .")
		/**移除push后的参数，否则cz-cli 执行 git commit -m argv 会跟命令参数*/
		process.argv = process.argv.slice(0, 2)

		runCommitCZ()
		const pushOptions = parseGitPushOptions(options)

		const command = `git push ${args.join(" ")} ${pushOptions.join(" ")}`
		console.log(command, "命令")
		shell.exec(command)
	})
