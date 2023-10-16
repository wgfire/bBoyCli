import { createServer } from "vite"
import url from "node:url"
import path from "path"

export function fnDirname(metaUrl: string) {
	const filename = url.fileURLToPath(metaUrl)
	return path.dirname(filename)
}

export async function startVite() {
	const configPath = path.resolve(process.cwd(), "./vite.config.js")

	const server = await createServer({
		// 任何合法的用户配置选项，加上 `mode` 和 `configFile`

		configFile: path.resolve(configPath)
	})
	await server.listen()

	server.printUrls()
}
