// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const db = require("./db.js");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"premake" is now active!');

	const functionCompletionProvider = vscode.languages.registerCompletionItemProvider(
		{ language: "lua", pattern: "**/premake5.lua" },
		{ provideCompletionItems: functionCompletionHandler },
		"."
	);

	const singleArgCompletionProvider = vscode.languages.registerCompletionItemProvider(
		{ language: "lua", pattern: "**/premake5.lua" },
		{ provideCompletionItems: singleArgCompletionHandler },
		" ", "\"", "'", "("
	);

	const tableArgCompletionProvider = vscode.languages.registerCompletionItemProvider(
		{ language: "lua", pattern: "**/premake5.lua" },
		{ provideCompletionItems: tableArgCompletionHandler },
		" ", "\"", "'", "{"
	);

	context.subscriptions.push(
		functionCompletionProvider,
		singleArgCompletionProvider,
		tableArgCompletionProvider
	);
}

// This method is called when your extension is deactivated
function deactivate() {}

/**
 * @param {vscode.TextDocument} document The document in which the command was invoked.
 * @param {vscode.Position} position The position at which the command was invoked.
 * @param {vscode.CancellationToken} token A cancellation token.
 * @param {vscode.CompletionContext} context How the completion was triggered.
 *
 * @returns An array of completions, a {@link CompletionList completion list}, or a thenable that resolves to either.
 * The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.
 */
function functionCompletionHandler(document, position, token, context) {
	const text = document.getText(new vscode.Range(0, 0, position.line, position.character));

	const isWorkspace = text.search(/\bworkspace *(\(|")/) != -1;
	const isProject = text.search(/\bproject *(\(|")/) != -1;

	let range = document.getWordRangeAtPosition(position) ?? new vscode.Range(position, position);
	const line = document.lineAt(position).text;
	const pre = line.slice(0, range.start.character);
	const post = line.slice(range.end.character);
	
	const completions = [];
	const edits = [];

	// make sure we are not inside a string
	for (const string of line.matchAll(/"(\\"|[^"])*"?|'(\\'|[^'])*'?/g)) {
		const start = string.index;
		const end = start + string[0].length;

		if (position.character > string.index && position.character <= end)
			return;
	}

	// make sure we are at a valid position
	const preMatch = pre.match(/(^|;)(\s*)\.?$/);
	if (!preMatch)
		return [];

	// extend range to replace previous arguments
	const postMatch = post.match(/^\s*\(?\s*("(\\"|[^"])*"?|'(\\'|[^'])*'?)(\s*\))?/);
	if (postMatch) {
		range = new vscode.Range(range.start.line, range.start.character,
			range.end.line, range.end.character + postMatch[0].length);
	}

	if (context.triggerCharacter == ".") {
		edits.push(vscode.TextEdit.delete(
			new vscode.Range(position.line, position.character - 1, position.line, position.character)
		));
	}

	completions.push(...db.functions);
	return completions.map((item) => ({
		label: item.label,
		kind: item.kind || vscode.CompletionItemKind.Function,
		insertText: new vscode.SnippetString(item.snippet.join?.("\n") ?? item.snippet),
		sortText: item.sortText,
		range: range,
		additionalTextEdits: edits
	}));
}

/**
 * @param {vscode.TextDocument} document The document in which the command was invoked.
 * @param {vscode.Position} position The position at which the command was invoked.
 * @param {vscode.CancellationToken} token A cancellation token.
 * @param {vscode.CompletionContext} context How the completion was triggered.
 *
 * @returns An array of completions, a {@link vscode.CompletionItem}, or a thenable that resolves to either.
 * The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.
 */
function singleArgCompletionHandler(document, position, token, context) {
	let range = document.getWordRangeAtPosition(position) ?? new vscode.Range(position, position);
	const line = document.lineAt(position).text;

	let stringStart = null;
	for (const string of line.matchAll(/"(\\"|[^"])*"?|'(\\'|[^'])*'?/g)) {
		const start = string.index;
		const end = start + string[0].length;

		if (position.character > string.index && position.character < end) {
			stringStart = start + 1;
			break;
		}
	}

	const pre = line.slice(0, stringStart ?? range.start.character);
	const post = stringStart ? "" : line.slice(range.end.character);

	const preMatch = pre.match(/([A-Za-z_]\w*)\s*(\(?)\s*(["']?)$/);
	if (!preMatch)
		return [];

	const postMatch =  post.match(/^\s*(\(?)\s*("(\\"|[^"])*"?|'(\\'|[^'])*'?)?(\s*\))?/);
	if (postMatch) {		
		// preserve closing bracket
		const off = (preMatch[2].length && postMatch[5]?.length) ? 1 : 0;
		// remove old
		range = new vscode.Range(range.start.line, range.start.character,
			range.end.line, range.end.character + postMatch[0].length - off);
	}

	const enclose = !stringStart && !preMatch[2] && (postMatch?.at(1) || postMatch?.at(5));
	const close = !stringStart && preMatch[2] && !(postMatch?.at(5));

	// console.log("line:", line);
	// console.log("word:", document.getText(document.getWordRangeAtPosition(position) ??
	// 	new vscode.Range(position, position)));
	// console.log("pre:", pre);
	// console.log("preMatch:", preMatch?.at(1));
	// console.log("post:", post);
	// console.log("postMatch:", postMatch?.at(0));
	// console.log("close:", close);
	// console.log("enclose:", enclose);

	const prefix = [
		(enclose ? "(" : ""),
		(stringStart ? "" : "\"")
	].join("");

	const suffix = [
		(stringStart ? "" : "\""),
		(enclose || close ? ")" : "")
	].join("");

	const args = db.args[preMatch[1]];
	return args?.map(name => ({
		label: name,
		kind: vscode.CompletionItemKind.Enum,
		insertText: prefix + name + suffix,
		range: range
	}));
}

/**
 * @param {vscode.TextDocument} document The document in which the command was invoked.
 * @param {vscode.Position} position The position at which the command was invoked.
 * @param {vscode.CancellationToken} token A cancellation token.
 * @param {vscode.CompletionContext} context How the completion was triggered.
 *
 * @returns An array of completions, a {@link vscode.CompletionItem}, or a thenable that resolves to either.
 * The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.
 */
function tableArgCompletionHandler(document, position, token, context) {
	let name = getTableNameFromPosition(document, position);
	
	if (!name) return [];
	
	let range = document.getWordRangeAtPosition(position) ?? new vscode.Range(position, position);
	const line = document.lineAt(position).text;
	const pre = line.slice(0, range.start.character);
	const post = line.slice(range.end.character);
	
	let isInString = false;
	for (const m of line.matchAll(/"(\\"|[^"])*"?|'(\\'|[^'])*'?/g)) {
		if (position.character > m.index && position.character < m.index + m[0].length) {
			isInString = true;
			break;
		}
	}

	const postMatch =  post.match(/^\s*("(\\"|[^"])*"|'(\\'|[^'])*')/);
	if (!isInString && postMatch) {
		range = new vscode.Range(range.start.line, range.start.character,
			range.end.line, range.end.character + postMatch[0].length);
	}
	
	const arguments = db.args[name];
	return arguments?.map(name => ({
		label: name,
		kind: vscode.CompletionItemKind.Enum,
		insertText: isInString ? name : `"${name}"`,
		range: range
	}));
}

function getTableNameFromPosition(document, position) {
	for (let line = position.line; line >= 0; line--) {
		const lineText = document.lineAt(line).text;

		// get strings in line
		const stringsRanges = [];
		for (const m of lineText.matchAll(/"(\\"|[^"])*"?|'(\\'|[^'])*'?/g))
			stringsRanges.push({ start: m.index, end: m.index + m[0].length });

		// for possible matches
		for (const m of [...lineText.matchAll(/(^|;)\s*([A-Z-a-z_]\w*)\s*([({"'])|([}])/g)].reverse()) {
			// test if the match is inside a string
			const isString = false;
			for (const range of stringsRanges) {
				if (m.index > range.start && m.index < range.end) {
					isString = true;
					break;
				}
			}
			if (m[4]) {
				if (line < position.line || (line == position.line && m.index < position.character))
					return null;
				continue;
			}
			// make sure it is the start of a table
			if (m[3] != "{")
				return null;
			// get name
			return m[2];
		}
	}	
	return null;
}

module.exports = {
	activate,
	deactivate
}
