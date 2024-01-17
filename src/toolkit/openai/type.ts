export interface languageItem {
	language: string
	languageName: string
	fileName: string
	content: {
		[key: `${string}`]: string
	}
}

export interface ResponseData {
	codeContent: string
	language: languageItem[]
}
