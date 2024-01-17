import { Command } from "commander"

import { chatTypeProcess, defaultApi, defaultToken, requestOpenAi } from "./utils"

import { getBboyConfig } from "@/utlis/common"

const program = new Command()

export interface optionsProps {
	i18: string[]
	prompt?: string
	debugger?: boolean
}

export const openAiCommand = program

	.command("ai")
	.argument("[token]", "使用openai的token", defaultToken) // 默认给到token 和 api地址 ，用户可以是 ai token link -i 来翻译
	.argument("[link]", "发送的请求地址", defaultApi)
	.description("open api use")
	.option("-i, --i18 <arg...>", "将代码的中文翻译成i18支持的格式")
	.option("-p, --prompt <arg>", "自定义翻译提示词")
	.option("-d, --debugger ", "查看发送的提示词")
	.action(async (token: string, link: string, options: optionsProps) => {
		/**
		 * 配置提到bbconfig里
		 */
		process.env["OPENAI_MODEL"] = "gpt-4" //"gpt-3.5-turbo" //
		process.env["OPENAI_API_KEY"] = token
		process.env["OPENAI_ENDPOINT"] = link
		// console.log(token, "参数")
		// console.log(link, "参数")
		// console.log(options, "options")

		const config = getBboyConfig()
		if (!config.i18n.i18FolderPath) {
			console.log("请配置Bboy配置文件:i18n.i18FolderPath")
			return
		}

		await chatTypeProcess(options, config)
		//await requestOpenAi(options)
	})
