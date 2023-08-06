// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { bootstrap } from "commitizen/dist/cli/git-cz"
import path from "path"

export const runCommitCZ = () => {
	const cliPath = path.join(__dirname, "../../../../node_modules/commitizen")
	console.log(cliPath, "czpath", process.argv)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	bootstrap({
		cliPath,
		config: {
			path: "cz-conventional-changelog"
		}
	})
}

export const parseGitPushOptions = (options: { force?: boolean; setUpstream?: boolean; deleteRemote?: string }) => {
	const pushOptions = []

	if (options.force) {
		pushOptions.push("--force")
	}
	if (options.setUpstream) {
		pushOptions.push("--set-upstream")
	}
	if (options.deleteRemote) {
		pushOptions.push(`--delete ${options.deleteRemote}`)
	}
	return pushOptions
}
