import path from "path"
import { projectRoot, readFileByPath } from "./fs"

/**
 * 获取项目的bboy配置文件
 */

export const getBboyConfig = () => {
	const configPath = path.join(projectRoot, "bboy.json")
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const config = JSON.parse(readFileByPath(configPath)) as BboyConfigProps

	return config
}
