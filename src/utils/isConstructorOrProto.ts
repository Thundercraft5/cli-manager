import type { ObjectKey } from "../types";

export function isConstructorOrProto(value: {}, key: ObjectKey) {
	return key === "constructor" && typeof value[key] === "function" || key === "__proto__";
}