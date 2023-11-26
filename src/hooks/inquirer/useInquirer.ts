/**
 * 使用 inquirer 创建 交互式命令行
 */
import inquirer from "inquirer"
import { questions } from "./questions"

type CommitType = "feat" | "fix" | "style" | "refactor" | "build" | "test" | "update"

type commitMessage = {
	type: CommitType
	updateScope: string
	featScope: string
	description: string
	scope: string
}
type commitHeadMap = {
	[key in CommitType]?: string
}
const createCommitHade = (answers: commitMessage) => {
	const { type, updateScope, featScope } = answers
	const commitHeadMap: commitHeadMap = {
		feat: `[${featScope}]${type}`,
		update: `${updateScope ? `[${updateScope}]` : ``} ${type}`,
		fix: `${type}`,
		style: `${type}`,
		refactor: `${type}`,
		build: `${type}`,
		test: `${type}`
	}
	return commitHeadMap[type]
}
const createInquirer = async () => {
	const answers = await inquirer.prompt(questions)
	const { scope, description } = answers
	const commitHead = createCommitHade(answers as commitMessage)

	const commitMessage = `${commitHead}(${scope}):${description}`
	// 输出生成的提交消息
	console.log("生成的提交消息:")
	console.log(commitMessage)
	return commitMessage
}
export const useInquirer = async () => {
	const m = await createInquirer()
	return m
}
