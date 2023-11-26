export interface ConfigProvider {
	locals: {
		[key: string]: {
			name: string
			path: string
		}
	}
}
module.exports = {
	locals: {
		CN: {
			name: "中文",
			path: "./locals/cn.json"
		},
		EN: {
			name: "英文",
			path: "./locals/en.json"
		}
	}
} as ConfigProvider
