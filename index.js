import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

// Function to read the content of a file and remove import statements
function removeImportsFromFile(filePath) {
	const content = readFileSync(filePath, 'utf-8');
	const lines = content.split('\n');

	const filteredLines = lines.filter((line) => !/^import\s/.test(line));
	return filteredLines.join('\n');
}

// Function to read the content of a file and remove export statements
function removeExportsAndCheckClass(content) {
	const lines = content.split('\n');

	let className = null;
	let hasActivateMethod = false;
	let hasDeactivateMethod = false;

	const filteredLines = lines.filter((line) => {
		if (className === null && /^class\s+(\w+)/.test(line)) {
			className = line.match(/^class\s+(\w+)/)[1];
		}

		if (/^\s*activate\s*\(/.test(line)) {
			hasActivateMethod = true;
		}

		if (/^\s*deactivate\s*\(/.test(line)) {
			hasDeactivateMethod = true;
		}

		return !/^\s*export(\s+default)?\s*/.test(line);
	});

	if (hasActivateMethod && hasDeactivateMethod) {
		return { content: filteredLines.join('\n'), className };
	} else {
		return { content: '', className: null };
	}
}

// Function to recursively read files in a directory and merge the content
function mergeFilesFromDirectory(directoryPath, outputFilePath) {
	const files = readdirSync(directoryPath);

	const mergedContent = files.reduce((accumulator, file) => {
		const filePath = join(directoryPath, file);
		if (statSync(filePath).isFile()) {
			const fileContent = removeImportsFromFile(filePath);
			const { content, className } = removeExportsAndCheckClass(fileContent);

			if (className && className === parse(file).name) {
				return accumulator + '\n' + content;
			} else {
				console.warn(
					`File ${filePath} does not have a class named ${
						parse(file).name
					} or does not have activate and deactivate methods`,
				);
			}
		}
		return accumulator;
	}, '');

	writeFileSync(outputFilePath, mergedContent);
}

// Directory containing the module scripts
const moduleDirectory = 'modules';

// Output file where merged content will be written
const outputFile = 'outputFile.js';

mergeFilesFromDirectory(moduleDirectory, outputFile);
