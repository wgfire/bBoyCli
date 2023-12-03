import axios, { AxiosRequestConfig } from "axios"
import path from "node:path"
import { ChatCompletion, ConfigProvider, ResponseData } from "./type"
import { createLanguageModel, createJsonTranslator } from "typechat"
import fs from "node:fs"
export const defaultToken = "sk-4161uzGojlRVmfngE1C516413c1b43F995D6AaD4C921597e" //"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" //"sk-4161uzGojlRVmfngE1C516413c1b43F995D6AaD4C921597e"
export const defaultApi = "https://api.gptapi.us/v1/chat/completions" //https://api.openai.com/v1/chat/completions" //https://api.gptapi.us/v1/chat/completions
export const defaultPath = path.resolve(__dirname, "config")

const options: AxiosRequestConfig = {
	url: defaultApi,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${defaultToken}`
	}
}

const getConfig = (configPath: string = defaultPath) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const data = require(configPath) as ConfigProvider
	console.log(data, "data")
	return data
}
const getLanguaNames = () => {
	const localesNames = Object.values(getConfig().locals)
	return localesNames.map(item => item.name).join()
}
const getPrompt = () => {
	const postData = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `你现在是一名专业的前端工程师，我将询问你有关前端的问题，涉及react,编码规范、组件设计相关前端知识点`
			},
			{
				role: "user",
				content: `
				现在有一段这样的react代码，请将下面代码里的中文变成 t('ZHONG_WEN') t函数里面是对应的中文拼音，返回改变后的react代码给我
				import react from 'react'
				import { t } from 'react-i18next'
				const button = ()=>{
					const [state,setState]=useState(false)
					return (
						<div>
						 <span>点击按钮</span>
						 <span>点击查询</span>
						 <section>展开面板</section>
						 <section>用户实例</section>
						</div>
					)
				}
				`
			},
			{
				role: "user",
				content: `
				 好，下一步我需要你帮我将对应的拼音翻译成 
				 以下语言:${getLanguaNames()} 对应的json格式，拼音作为他的key
				 如 { "TI_JIAO":"提交"}
				`
			},
			{
				role: "user",
				content: `
				 最后，当你明白我的意思后，依据下面这个这个对象，
				 ${JSON.stringify(getConfig().locals)}
				 将语言对应的翻译内容放到每个对象里的content这个key中返回给我形成一个新的locals JSON对象
				`
			}
		],
		tool_choice: { type: "function", function: { name: "get_content" } },
		tools: [
			{
				type: "function",
				function: {
					name: "get_content",
					description: "Get the current reactCode and locales object",
					parameters: {
						type: "object",
						properties: {
							reactCode: {
								type: "string",
								description: "react code"
							},
							locales: {
								type: "object",
								description: "new json object"
							}
						},
						required: ["reactCode", "locales"]
					}
				}
			}
		],
		temperature: 0.8
	}
	return postData
}
export const requestOpenAi = async () => {
	options.data = getPrompt()
	const result = await axios<ChatCompletion>(options)
	for (const choice of result.data.choices) {
		console.log(choice.message.content, "返回结果")
	}

	return result.data.choices
}

export const chatTypeProcess = async () => {
	const model = createLanguageModel(process.env)
	const schema = fs.readFileSync(path.join(__dirname, "type.d.ts"), "utf8")
	const translator = createJsonTranslator<ResponseData>(model, schema, "ResponseData")

	const request = `你现在是一名专业的前端工程师，我将询问你有关前端的问题，涉及react,编码规范、组件设计相关前端知识点
	现在有一段这样的react代码，请将下面代码里的中文变成 t('ZHONG_WEN') t函数里面是对应的中文拼音，返回改变后的react代码给我
				import react from 'react'
				import { t } from 'react-i18next'
				const button = ()=>{
					const [state,setState]=useState(false)
					return (
						<div>
						 <span>点击按钮</span>
						 <span>点击查询</span>
						 <section>展开面板</section>
						 <section>用户实例</section>
						</div>
					)
				}
	好，下一步我需要你帮我将对应的拼音翻译成 以下语言:${getLanguaNames()} 对应的json格式，拼音作为他的key如 { "TI_JIAO":"提交"}
	最后，当你明白我的意思后，依据下面这个这个对象，${JSON.stringify(
		getConfig().locals
	)} 将每种语言对应的翻译内容放到每个对象里的content这个对象里，返回给我形成一个新的locals JSON对象
	正确的话locals这个对象应该有${Object.keys(getConfig().locals).length}个语言对应的翻译内容
	
	`
	console.log(request, "请求")
	const response = await translator.translate(request)
	if (!response.success) {
		console.log(response.message)
		return
	}
	const content = response.data
	console.log(JSON.stringify(content, undefined, 2))

	console.log("Success!")
}
