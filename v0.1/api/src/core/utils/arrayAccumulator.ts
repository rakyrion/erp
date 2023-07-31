export const arrayAccumulator = <T>(value: T, previous: T[]): T[] => {
	previous.push(value)
	return previous
}
