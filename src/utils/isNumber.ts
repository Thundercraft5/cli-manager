import { hexRegex, numberRegex } from "../regex";

export function isNumber<T>(x: T) {
	if (typeof x === "number") return true;
	const s = String(x);

	return hexRegex.test(s)
		? true
		: numberRegex.test(s);
}