// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// import { bootstrap } from "commitizen/dist/cli/git-cz"
import path from "path"

export type PushOptions = {
	force?: boolean
	setUpstream?: string
	deleteRemote?: string
}

/**
 * This function runs the commitizen command-line interface (CLI) to initialize the commitizen tool.
 *
 * @return {void} This function does not return any value.
 */
export const runCommitCZ = () => {
	const cliPath = path.join(__dirname, "../../../../node_modules/commitizen")
	console.log(cliPath, "czpath", process.argv)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	// bootstrap({
	// 	cliPath,
	// 	config: {
	// 		path: "cz-conventional-changelog"
	// 	}
	// })
}

/**
 * Parses the git push options and returns an array of options to be used with the push command.
 *
 * @param {PushOptions} options - The options object.
 * @return {Array} - An array of push options to be used with the git push command.
 */
export const parseGitPushOptions = (options: PushOptions) => {
	const pushOptions = []

	if (options.force) {
		pushOptions.push("--force")
	}
	if (options.setUpstream) {
		pushOptions.push(`--set-upstream ${options.setUpstream}`)
	}
	if (options.deleteRemote) {
		pushOptions.push(`--delete ${options.deleteRemote}`)
	}
	return pushOptions
}
