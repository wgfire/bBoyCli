import { Command } from "commander"
import shell from "shelljs"
import { runCommitCZ } from "./git"
const program = new Command()
export const git = program
	.command("git")
	.description("use git add git commit git push ")
	.action(arg => {
		console.log(arg)
		const gitCommand = "git add ."
		shell.exec(gitCommand)
		runCommitCZ()
	})
