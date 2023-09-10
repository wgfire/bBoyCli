import { QuestionCollection, Answers } from "inquirer"

export const questions: QuestionCollection<Answers> = [
	{
		type: "list",
		name: "type",
		message: "选择提交的类型 (必须):",
		choices: [
			{ name: "feat:      一个新特性", value: "feat" },
			{ name: "update:    日常修改", value: "update" },
			{ name: "fix:       bug修复", value: "fix" },
			{ name: "style:     代码样式调整", value: "style" },
			{ name: "refactor:  代码重构", value: "refactor" },
			{ name: "build:     构建相关", value: "build" },
			{ name: "test:      测试相关", value: "test" }
		],
		validate: function (input: string) {
			return !!input || "必须选择一个提交类型"
		}
	},
	{
		type: "input",
		name: "featScope",
		message: "输入开启新特性的名称(如:增加权限模块):",
		when(answers) {
			return (answers.type as string).startsWith("feat")
		},
		validate: function (input: string) {
			return !!input || "必须输入特性名称"
		}
	},
	{
		type: "input",
		name: "updateScope",
		message: "输入更改所属的特性名称(如:增加权限模块):(可选)",
		when(answers) {
			return (answers.type as string).startsWith("update")
		}
		// validate: function (input: string) {
		// 	return !!input || "必须输入所属的特性名称"
		// }
	},
	{
		type: "input",
		name: "scope",
		message: "输入提交的作用范围:",
		validate: function (input: string) {
			return !!input || "必须输入相关文件范围"
		}
	},

	{
		type: "input",
		name: "description",
		message: "输入提交的描述:",
		validate: function (input: string) {
			return !!input || "必须输入提交描述"
		}
	}
]
