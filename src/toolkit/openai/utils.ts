import axios, { AxiosRequestConfig } from "axios"
import path from "node:path"
import { ResponseData, languageItem } from "./type"
import { createLanguageModel, createJsonTranslator, createJsonValidator } from "typechat"
import fs from "node:fs"
import { getBboyConfig } from "@/utlis/common"
import { appendFileContent, projectRoot, readFileByPath, writeFileContent } from "@/utlis/fs"
import { optionsProps } from "./command"
export const defaultToken = "sk-u28jmorVnCJunXZOF2C77e75Ae4044E3B84b354508F02cDb" //"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" //"sk-4161uzGojlRVmfngE1C516413c1b43F995D6AaD4C921597e"
export const defaultApi = "https://api.gptapi.us/v1/chat/completions" //https://api.openai.com/v1/chat/completions" //https://api.gptapi.us/v1/chat/completions
export const defaultPath = path.resolve(__dirname, "config")
export interface ChatCompletion {
	id: string
	object: string
	created: number
	model: string
	usage: {
		prompt_tokens: number
		completion_tokens: number
		total_tokens: number
	}
	choices: {
		message: {
			role: string
			content: string
			tool_calls: string
		}
		finish_reason: string
		index: number
	}[]
}
const request: AxiosRequestConfig = {
	url: defaultApi,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${defaultToken}`
	}
}

const getConfig = (configPath: string = defaultPath) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const config = getBboyConfig() || (require(configPath) as BboyConfigProps)
	if (configPath) config.i18n.i18FolderPath = path.join(projectRoot, config.i18n.i18FolderPath)

	return config.i18n
}
const getLanguaNames = () => {
	const localesNames = getConfig().language
	return localesNames.map(item => item.languageName).join()
}
const appendFileLanguage = (language: languageItem[]) => {
	const config = getConfig()
	const FolderPath = config.i18FolderPath
	const filePaths = language.map(item => path.join(FolderPath, `${item.fileName}`))
	for (let index = 0; index < filePaths.length; index++) {
		const filePath = filePaths[index]
		const content = language[index].content
		let originContent = {}
		if (fs.existsSync(filePath)) {
			originContent = JSON.parse(readFileByPath(filePath)) as object
		}
		const newContent = { ...originContent, ...content }
		writeFileContent(filePath, JSON.stringify(newContent, null, 2))
	}
}
const getPrompt = (options: optionsProps) => {
	const localesConfig = getConfig()
	const readPath = path.join(projectRoot, options.i18[0])
	const postData = {
		model: "gpt-3.5-turbo",
		messages: [
			// {
			// 	role: "user",
			// 	content: `你现在是一名专业的前端工程师，我将询问你有关前端的问题，涉及react,编码规范、组件设计相关前端知识点
			// 	我的目的是实现国际化多语言,需要你返回一个对象里面有{codeContent:"" language:[]}`
			// },
			{
				role: "user",
				content: `
				现在有一段这样的react代码:
				${readFileByPath(readPath)}
				`
			},
			{
				role: "user",
				content: `
				将代码里的中文使用 t("KEY")函数形式替代, KEY参数是对应的中文拼音，中文拼音可以是这种大写格式:
				如"翻译"变为: t("FAN_YI"), 返回改变后的react代码给我。最终结果放在返回对象里的codeContent,t函数已经实现,你只需要替换.
				`
			},
			{
				role: "user",
				content: `
				然后需要你帮我将对应的拼音翻译成 以下语言:${getLanguaNames()}
				依据下面这个这个language对象，${JSON.stringify(localesConfig.language)}
				将每种语言对应的翻译内容放到每个语言对象里的content这个对象里， 中文拼音作为他的key,对应的翻译内容为value
				如:{"FAN_YI":"翻译"}返回给我所有语言形成一个新的language 数组对象
				`
			},
			{
				role: "user",
				content: `
				最后将两种结果返回为repesonData.json， 格式如下:
				{
					codeContent:"",
					language:[]
				}
				记住 不需要返回其他信息。
				`
			}
		]
	}
	return postData
}
export const requestOpenAi = async (options: optionsProps) => {
	request.data = getPrompt(options)
	const result = await axios<ChatCompletion>(request)

	const resultData = result.data.choices[0].message.content
	const schema = fs.readFileSync(path.join(__dirname, "type.d.ts"), "utf8")
	const resolve = createJsonValidator(schema, "ResponseData")
	console.log(resultData, "返回结果")
	const translate = resolve.validate(resultData)
	console.log(translate, "翻译结果")

	return result.data.choices
}
const getHeaderPromat = () => {
	return `需要你根据代码实际情况使用 t("KEY")或者{t("KEY")} 这种形式替代
	代码里的中文文本, KEY参数是对应的中文大写拼音，不用关心t函数我已经实现,只需要返回修改后的代码即可，不需要返回其他任何东西
	`
}
export const chatTypeProcess = async (options: optionsProps, config: BboyConfigProps) => {
	const model = createLanguageModel(process.env)
	const schema = fs.readFileSync(path.join(__dirname, "type.d.ts"), "utf8")
	const translator = createJsonTranslator<ResponseData>(model, schema, "ResponseData")

	// translator.validator.validate()
	translator.attemptRepair = true
	// translator.stripNulls = true
	// const resolve = createJsonValidator(schema, "ResponseData")

	const localesConfig = getConfig()
	const readPath = path.join(projectRoot, options.i18[0])

	const request = `
	${readFileByPath(readPath)}
	${options.prompt ?? getHeaderPromat()}
	然后将提取到的文本翻译成 以下语言:${getLanguaNames()}
	依据下面这个这个对象，${JSON.stringify(localesConfig.language)}
	将每种语言对应的翻译内容放到每个语言对象里的content这个对象里， 中文拼音作为他的key,对应的翻译内容为value
	返回给我所有语言形成一个新的language 数组对象`
	options.debugger && console.log(translator.createRequestPrompt(request), "请求")
	console.log("翻译中...😴")
	const response = await translator.translate(request)

	if (!response.success) {
		console.log(response.message)
		return
	}
	// resolve.createModuleTextFromJson(response)
	const content = response.data

	console.log("-------------------------------代码-----------------------------------------------")
	console.log(content.codeContent)
	console.log("-------------------------------翻译-----------------------------------------------")
	console.log(content.language)
	writeFileContent(readPath, content.codeContent)
	content.language && appendFileLanguage(content?.language)
	console.log("Success!")
}
