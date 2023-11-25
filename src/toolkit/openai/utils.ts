import axios, { AxiosRequestConfig } from "axios"
export const defaultToken = "sk-4161uzGojlRVmfngE1C516413c1b43F995D6AaD4C921597e"
export const defaultApi = "https://api.gptapi.us"
interface ChatCompletion {
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
		}
		finish_reason: string
		index: number
	}[]
}

const options: AxiosRequestConfig = {
	url: "https://api.gptapi.us/v1/chat/completions",
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${defaultToken}`
	}
}
const defaultData = {
	model: "gpt-3.5-turbo",
	messages: [
		{
			role: "user",
			content: "你现在是一名专业的前端工程师，我将询问你有关前端的问题，涉及react,编码规范、组件设计相关前端知识点"
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
			 两个语言，中文 ，英语 的json格式，拼音作为他的key
			 如 {zh: { "TI_JIAO":"提交"}}
			 将所有的语言生成一个index.json文件，
			`
		}
	],
	temperature: 0.7
}
export const requestOpenAi = async (data = defaultData) => {
	options.data = data
	const result = await axios<ChatCompletion>(options)
	for (const choice of result.data.choices) {
		console.log(choice.message.content, "返回结果")
	}
	return result.data.choices
}
// export const requestOpenAi = (data = defaultData) => {
// 	const req = https.request(options, res => {
// 		res.on("data", chunk => {
// 			console.log(`BODY: ${chunk}`)
// 		})
// 		res.on("end", () => {
// 			console.log("No more data in response.")
// 		})
// 	})

// 	req.on("error", e => {
// 		console.error(`problem with request: ${e.message}`)
// 	})

// 	// Write data to request body
// 	req.write(data)
// 	req.end()
// }
