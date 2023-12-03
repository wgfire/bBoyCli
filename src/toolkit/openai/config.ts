import { ConfigProvider } from "./type"

module.exports = {
	locals: {
		CN: {
			name: "中文",
			path: "./locals/cn.json",
			content: {
				Yong_Hu_Shi_Li: "用户实例"
			}
		},
		EN: {
			name: "英文",
			path: "./locals/en.json",
			content: {
				Yong_Hu_Shi_Li: "User Instance"
			}
		}
	}
} as ConfigProvider

// const data: ResponseData = {
// 	fileContent: "XX"
// }

// console.log(data)
