import app from "./example";
import { longArgumentRegex, shortArgumentRegex } from "./regex";
import { gatherValues } from "./utils";

import type { CliArgMap, CliParserOptions, CommandParameterValue } from "./types";
class CliArgsParser<M extends CliArgMap = CliArgMap> {
	#rawArgs: string[];
	#currentPos = -1;
	#argSize = 0;
	#arguments = new Map<keyof M, CommandParameterValue>();
	#subCommandIdentifiers: string[] = [];
	#options: CliParserOptions;
	#entrypoint: string;
	#executablePath: string;

	get rawArgs() { return this.#rawArgs; }

	get arguments() { return this.#arguments; }
	get #isDone() { return this.#currentPos + 1 === this.#argSize; }

	constructor(rawArgs: string[], {}: Partial<CliParserOptions> = {}) {
		const [execPath, entrypoint, ...cliArgs] = rawArgs as [string, string, ...string[]];

		this.#rawArgs = cliArgs;
		this.#argSize = cliArgs.length;
		this.#options = {};
		this.#executablePath = execPath;
		this.#entrypoint = entrypoint;
	}

	parse() {
		return this.#parse();
	}

	#parse() {
		while (!this.#isDone) {
			const next = this.#moveToNextArgument();

			if (!next) break;

			if (next.match(shortArgumentRegex)) {
				const [, name, value] = shortArgumentRegex.exec(next)!,
					nextValue = (!this.#nextIsValue()
						? true
						: this.#moveToNextNamedArgument()) as CommandParameterValue;

				this.#arguments.set(name!, this.#resolveValue(value ?? nextValue) as CommandParameterValue);
			} else if (next.match(longArgumentRegex)) {
				const [, name, value] = longArgumentRegex.exec(next)!,
					nextValue = (!this.#nextIsValue()
						? true
						: this.#moveToNextNamedArgument()) as CommandParameterValue;

				this.#arguments.set(name!, this.#resolveValue(value ?? nextValue) as CommandParameterValue);
			} else this.#subCommandIdentifiers.push(next);
		}

		return Object.fromEntries(this.#arguments);
	}

	#resolveValue(val: unknown) {
		switch (typeof val) {
			case "string": if (!isNaN(+val)) return +val;
			default: return val;
		}
	}

	#peekNextArgument() {
		if (this.#currentPos === -1) return this.#rawArgs[0];

		return this.#currentPos + 1 in this.#rawArgs
			? this.#rawArgs[this.#currentPos + 1]
			: undefined;
	}

	#moveToNextArgument() {
		if (this.#currentPos + 1 in this.#rawArgs) return this.#rawArgs[++this.#currentPos];
		if (this.#currentPos + 1 === this.#argSize) return this.#rawArgs[++this.#currentPos];

		return undefined;
	}

	#moveToNextNamedArgument() {
		return gatherValues(() => this.#nextIsValue(), () => this.#moveToNextArgument()!);
	}

	#nextIsValue() {
		const next = this.#peekNextArgument();

		if (!next) return false;

		return !(next.match(shortArgumentRegex) ?? next.match(longArgumentRegex));
	}
}

app.executeCommand("test", ["0"], new CliArgsParser(process.argv, app.getCommand("test")).parse());