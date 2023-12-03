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
export type ResponseData = {
	codeContent: string
} & ConfigProvider

export interface ConfigProvider {
	locals: {
		[key: string]: {
			name: string
			path: string
			content: {
				[key: string]: string
			}
		}
	}
}
