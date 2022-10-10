import type { AbstractConstructor, Narrow } from "@thundercraft5/type-utils";

export type CliParserOptions<A extends string = string> = {};
type CliParserOptions2<A extends string> = {
	subcommands: {
		name: A;
	}[];
};