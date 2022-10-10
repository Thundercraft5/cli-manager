import type { MakeRequired, Narrow, ObjectKey } from "@thundercraft5/type-utils";

export function narrow<T>(value: Narrow<T>) {
	return value as T;
}