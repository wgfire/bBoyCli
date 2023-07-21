#!/usr/bin/env/ node

const shell = require("shelljs")

const build = async () => {
	try {
		shell.rm("-rf", "dist")
	} catch (error) {
		console.log(error)
	} finally {
		shell.exec("npm run tsc:build")
	}
}

build()
