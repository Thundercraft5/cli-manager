import { makeErrors, TypeError } from "@thundercraft5/node-errors";

import { formatWordList, toRepresentation } from "../utils";

import type { Command } from "../builders";
export { TypeError };

export const {
	VersionError,
	OptionsError,
	CommandError,
} = makeErrors({
	VersionError: {
		INVALID_SEMVER_VERSION: (version: string) => `Invalid SemVer version "${ version }" (see https://semver.org for valid syntax).`,
	},
	OptionsError: {
		EMPTY_COMMAND_NAME: "Command names must not be null or empty.",
	},
	CommandError: {
		INVALID_NAMED_PARAMETER: (name: string, invalid: string, parameters: string[]) => `Invalid named parameter "${ invalid }" to command "${ name }". Valid parameters: ${ formatWordList(parameters, true) }`,
		INVALID_PARAMETER_VALUE: (name: string, command: string, value: any, allowedValues: any[]) => `Invalid parameter value ${ toRepresentation(value, true) } to parameter "${ name }" in "${ command }".\nAllowed values: ${ formatWordList(allowedValues.map(v => toRepresentation(v))) }`,
		COMMAND_NOT_FOUND: (name: string, validCommands: Command[]) => `Command "${ name }" was not found in the list of commands. Valid commands: ${ formatWordList(validCommands.map(({ name }) => name), true) }`,

	},
}, {
	VersionError: class VersionError extends SyntaxError {},
	OptionsError: class OptionsError extends Error {},
	CommandError: class CommandError extends Error {},
});