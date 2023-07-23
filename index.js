import { readFileSync, readdirSync, statSync, writeFileSync, appendFileSync } from 'fs';
import { join, parse } from 'path';
import { format } from 'prettier';

const header = `
    // ==UserScript==
    // @name The Script
    // @description A script for grepolis
    // @version 0.0.1
    // @author Sau1707
    // @match https://*.grepolis.com/game/*
    // @require http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
    // ==/UserScript==
`
	.replace(/^\s+/g, '')
	.replace(/^[ \t]+/gm, '');

/* Clear the given file */
function clearFile(filePath) {
	writeFileSync(filePath, '');
}

async function wrapFileContentInIIFE(filePath) {
	var content = readFileSync(filePath, 'utf8');
	content = `(() => {\n${content}\n})();`;

	const prettierOptions = {
		semi: true,
		tabWidth: 4,
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		bracketSpacing: true,
		jsxBracketSameLine: false,
		parser: 'babel',
		printWidth: 120,
	};

	const formattedContent = await format(content, prettierOptions);
	writeFileSync(filePath, header + '\n' + formattedContent);
}

/* Handle a file */
class File {
	constructor(filePath) {
		this.filePath = filePath;
		this.content = readFileSync(filePath, 'utf8');
		this.lines = this.content.split('\n');

		this.removeComments();
		this.removeImports();
		this.removeExports();
		this.removeBlankLines();
	}

	removeComments() {
		const contentWithoutSingleLineComments = this.content.replace(/\/\/.*/g, '');
		const contentWithoutAllComments = contentWithoutSingleLineComments.replace(
			/\/\*[\s\S]*?\*\//g,
			'',
		);
		this.lines = contentWithoutAllComments.split('\n');
	}

	removeBlankLines() {
		let wasLastLineBlank = false;
		this.lines = this.lines.reduce((newLines, line) => {
			const isThisLineBlank = line.trim() === '';
			if (!isThisLineBlank || !wasLastLineBlank) {
				newLines.push(line);
			}
			wasLastLineBlank = isThisLineBlank;
			return newLines;
		}, []);
	}

	removeImports() {
		this.lines = this.lines.filter((line) => !/^import\s/.test(line));
	}

	removeExports() {
		this.lines = this.lines.filter((line) => !/^\s*export(\s+default)?\s*/.test(line));
	}

	getContent() {
		return this.lines.join('\n');
	}
}

/* Handle a module */
class Module extends File {
	hasActivateMethod() {
		const activateMethodRegEx = /\bactivate\s*\(/;
		for (const line of this.lines) {
			if (activateMethodRegEx.test(line)) {
				return true;
			}
		}
		return false;
	}

	hasDeactivateMethod() {
		const activateMethodRegEx = /\bdeactivate\s*\(/;
		for (const line of this.lines) {
			if (activateMethodRegEx.test(line)) {
				return true;
			}
		}
		return false;
	}

	getClassName() {
		for (const line of this.lines) {
			const match = line.match(/^class\s+(\w+)/);
			if (match) return match[1];
		}
		return null;
	}

	isModule() {
		const className = this.getClassName();
		const activateMethod = this.hasActivateMethod();
		const deactivateMethod = this.hasDeactivateMethod();

		if (!className) console.warn(`${this.filePath} does not have a class name`);
		if (className && className !== parse(this.filePath).name)
			console.warn(`${this.filePath} class name does not match file name`);
		if (!activateMethod) console.warn(`${this.filePath} does not have an activate method`);
		if (!deactivateMethod) console.warn(`${this.filePath} does not have a deactivate method`);

		return className && activateMethod && deactivateMethod;
	}
}

/* Function to recursively read files in a directory, process and merge the content */
function mergeModules(directoryPath, outputFilePath) {
	const files = readdirSync(directoryPath);

	const mergedContent = files.reduce((accumulator, file_name) => {
		const filePath = join(directoryPath, file_name);
		const file = new Module(filePath);

		if (!file.isModule()) return accumulator;
		return accumulator + file.getContent();
	}, '');

	appendFileSync(outputFilePath, mergedContent);
}

function merge(directoryPath, outputFilePath) {
	const files = readdirSync(directoryPath);

	const mergedContent = files.reduce((accumulator, file_name) => {
		const filePath = join(directoryPath, file_name);
		const file = new File(filePath);

		return accumulator + file.getContent();
	}, '');

	appendFileSync(outputFilePath, mergedContent);
}

const outputFile = 'dist/newTool.user.js';
clearFile(outputFile);
merge('src', outputFile);
mergeModules('modules', outputFile);
wrapFileContentInIIFE(outputFile);
