export function gatherValues<T extends unknown>(
	cond: (lastValue: T | undefined, count: number) => boolean,
	valueFunc: (lastValue: T | undefined, count: number) => T,
) {
	const res: T[] = [];
	let lastValue: T | undefined,
		count = -1;

	while (cond(lastValue, ++count))
		res.push(lastValue = valueFunc(lastValue, count));

	return res;
}