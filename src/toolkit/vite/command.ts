import { Command } from "commander"

import { startVite } from "./utils"
const program = new Command()

export const viteCommand = program
	.command("vite")
	.description("use vite dev|build")
	.argument("<type>", "dev|build")
	.option("-c --config <path>", "use vite", "default")
	.action(async (arg, options) => {
		console.log(arg, "参数", options)
		/// process.chdir("D:\\垃圾项目\\脚手架\\cli-boy");

		const cwd = process.cwd()
		console.log(cwd, "路径", "dirname", __dirname)
		await startVite()
	})

// const configPath = path.resolve(process.cwd(), "./vite.config.ts")
// console.log(configPath, "配置文件地址")
// shell.exec(`chcp 65001`)
// shell.exec(
// 	`npm run vite ${cwd} --config D:\\项目文件\\keewood-web\\vite.config.ts`,
// 	{ cwd: "D:\\项目文件\\cli-boy-master" },
// 	(code, stdout, stderr) => {
// 		console.log(code, stdout, stderr)
// 	}
// )
