import type { MakeRequired, ObjectKey } from "@thundercraft5/type-utils";

export function hasOwn<
 	T extends object,
 	K extends (keyof T)[],
>(value: MakeRequired<T, K[number]> | T, ...fields: [...K]): value is MakeRequired<T, K[number]> {
 	return fields.length === 1
 		? fields[0] as ObjectKey in value
 		: fields.every(property => Object.hasOwn(value, property));
}