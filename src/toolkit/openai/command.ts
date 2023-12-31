import { Command } from "commander"
import path from "path"
import { chatTypeProcess, defaultApi, defaultToken, requestOpenAi } from "./utils"

const program = new Command()

const localesPath = path.resolve(process.cwd(), "src/i18n/locales")
interface optionsProps {
	i18: boolean | string
}
export const openAiCommand = program

	.command("ai")
	.argument("[token]", "使用openai的token", defaultToken) // 默认给到token 和 api地址 ，用户可以是 ai token link -i 来翻译
	.argument("[link]", "发送的请求地址", defaultApi)
	.description("open api use")
	.option("-i, --i18 [arg]", "将代码的中文翻译成i18支持的格式")

	.action(async (token, link, options: optionsProps) => {
		process.env["OPENAI_MODEL"] = "gpt-3.5-turbo"
		process.env["OPENAI_API_KEY"] = "sk-4161uzGojlRVmfngE1C516413c1b43F995D6AaD4C921597e"
		process.env["OPENAI_ENDPOINT"] = "https://api.gptapi.us/v1/chat/completions"
		console.log(token, "参数")
		console.log(link, "参数")
		console.log(options, "options")
		console.log(localesPath, "语言包地址")
		//await requestOpenAi()
		await chatTypeProcess()
		// if (fs.existsSync(localesPath) && fs.statSync(localesPath).isDirectory()) {
		// 	const zhJson = fs.readFileSync(path.resolve(localesPath, "zh.json"), "utf-8")
		// 	fs.writeFile(path.resolve(localesPath, "zh.json"), `{"test":"aa"}`, { flag: "a+", encoding: "utf-8" }, err => {
		// 		if (err) throw err
		// 		console.log("The file has been saved!")
		// 	})
		// }
	})
