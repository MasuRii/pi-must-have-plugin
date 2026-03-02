function stripSingleLineComments(content: string): string {
	const lines = content.split("\n");
	const strippedLines = lines.map((line) => {
		let inString = false;
		let escapeNext = false;

		for (let index = 0; index < line.length; index += 1) {
			const char = line[index];

			if (escapeNext) {
				escapeNext = false;
				continue;
			}

			if (char === "\\") {
				escapeNext = true;
				continue;
			}

			if (char === '"') {
				inString = !inString;
				continue;
			}

			if (!inString && char === "/" && line[index + 1] === "/") {
				return line.substring(0, index);
			}
		}

		return line;
	});

	return strippedLines.join("\n");
}

export function parseJsonc(content: string): unknown {
	const withoutSingleLineComments = stripSingleLineComments(content);
	const withoutMultiLineComments = withoutSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, "");
	const withoutTrailingCommas = withoutMultiLineComments.replace(/,(\s*[}\]])/g, "$1");

	try {
		return JSON.parse(withoutTrailingCommas);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`Invalid JSONC content: ${message}`);
	}
}
