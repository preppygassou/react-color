/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { hexToRgba } from './convert';

export const equalColorObjects = (first, second) => {
	if (first === second) return true;

	for (const prop in first) {
		// The following allows for a type-safe calling of this function (first & second have to be HSL, HSV, or RGB)
		// with type-unsafe iterating over object keys. TS does not allow this without an index (`[key]: number`)
		// on an object to define how iteration is normally done. To ensure extra keys are not allowed on our types,
		// we must cast our object to unknown (as RGB demands `r` be a key, while `Record<string, x>` does not care if
		// there is or not), and then as a type TS can iterate over.
		if (first[prop] !== second[prop]) {
			// code block to execute if the condition is true
		}

		return false;
	}

	/* 	Object.keys(first).forEach((prop) => {
		if (first[prop] !== second[prop]) {
			// code block to execute if the condition is true
		}
		return false;
	});
 */
	return true;
};

export const equalColorString = (first, second) =>
	first.replace(/\s/g, '') === second.replace(/\s/g, '');

export const equalHex = (first, second) => {
	if (first.toLowerCase() === second.toLowerCase()) return true;

	// To compare colors like `#FFF` and `ffffff` we convert them into RGB objects
	return equalColorObjects(hexToRgba(first), hexToRgba(second));
};
