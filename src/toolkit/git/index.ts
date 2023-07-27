// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { bootstrap } from "commitizen/dist/cli/git-cz"
import path from "path"

export const runCommitCZ = () => {
	const cliPath = path.join(__dirname, "../../../../node_modules/commitizen")
	console.log(cliPath, "czpath")

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	bootstrap({
		cliPath,
		config: {
			path: "cz-conventional-changelog"
		}
	})
}
