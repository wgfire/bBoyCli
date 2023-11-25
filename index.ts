#!/usr/bin/env node
/**
 * cli 运行时入口，负责注册命令
 */
import { Command } from "commander"
import { toolKitCommand } from "./src"
const program = new Command()

program.addCommand(toolKitCommand.gitCommand)
program.addCommand(toolKitCommand.viteCommand)
program.addCommand(toolKitCommand.openAiCommand)
program.parse(process.argv)
