export const round = (number, digits = 0, base = 10 ** digits) =>
	Math.round(base * number) / base;
