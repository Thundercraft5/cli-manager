import type { Narrow } from "@thundercraft5/type-utils";

export function omit<T extends {}, K extends (keyof T)[]>(value: Narrow<T>, ...keys: [...K]) {
	const keySet = new Set(keys);

	return Object.fromEntries(Object.entries(value).filter(([k]) => keySet.has(k as any))) as Omit<T, K[number]>;
}