import fs from "node:fs"
import path from "node:path"
import { writeFile } from "node:fs"

export const projectRoot = process.cwd()

/**
 * @description 读取文件内容
 * @param path
 */
export const readFileByPath = (url: string) => {
	const content = fs.readFileSync(url, "utf-8")
	//console.log(content, "读取文件内容")
	return content
}

/**
 * @description
 */
export const writeFileContent = (url: string, content: string) => {
	fs.writeFile(
		url,
		content,
		{
			flag: "w",
			encoding: "utf-8"
		},
		err => {
			if (err) console.log(err)
		}
	)
}
/**
 * @description
 */
export const appendFileContent = (url: string, content: string) => {
	fs.appendFile(
		url,
		content,
		{
			flag: "w",
			encoding: "utf-8"
		},
		err => {
			console.log(err)
		}
	)
	console.log("插入文件内容", content)
}
