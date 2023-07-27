/**
 * cli 运行时入口，负责注册命令
 */
import { Command } from "commander"
import { toolKitCommand } from "./src"
const program = new Command()

// const git = program
// 	.command("git")
// 	.description("use git add git commit git push ")
// 	.action(arg => {
// 		const gitCommand = "git add ."
// 		shell.exec(gitCommand)
// 		shell.exec(`npm run commit ${process.cwd()}`, { cwd: "D:\\项目文件\\bBoyCli" })
// 	})

const viteCommand = program
	.command("vite")
	.description("use vite dev|build")
	.argument("<type>", "dev|build")
	.option("-c --config <path>", "use vite", "default")
	.action((arg, options) => {
		console.log(arg, "参数", options) // option:{config:'xx'} arg : type
		/// process.chdir("D:\\垃圾项目\\脚手架\\cli-boy");

		const cwd = process.cwd() // 或者 "D:\\垃圾项目\\脚手架\\cli-boy"指定 当前的cli命令 toolkit
		console.log(cwd, "路径", "dirname", __dirname)

		// mainDev()
		// const configPath = path.resolve(process.cwd(), "./vite.config.ts");
		// console.log(configPath, "配置文件地址");
		// shell.exec(`chcp 65001`);
		// shell.exec(
		//   `npm run vite ${cwd} --config D:\\项目文件\\keewood-web\\vite.config.ts`,
		//   { cwd: "D:\\项目文件\\cli-boy-master" },
		//   (code, stdout, stderr) => {
		//     console.log(code, stdout, stderr);
		//   }
		// );
	})
program.addCommand(toolKitCommand.git)
program.addCommand(viteCommand)
program.parse(process.argv)
