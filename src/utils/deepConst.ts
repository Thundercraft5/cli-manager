import type { DeepReadonly, Narrow } from "@thundercraft5/type-utils";

export function deepConst<A = undefined>(value: Narrow<A>) {
	if (typeof value !== "object" || value === null) return value as DeepReadonly<A>;

	for (const v of Object.values(value))
		if (typeof v === "object" && v !== null) deepConst(v);

	return Object.freeze(value) as DeepReadonly<A>;
}