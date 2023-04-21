import React, { useCallback } from 'react';

import { validHex } from '../utils/validate';
import { ColorInput } from './common/ColorInput';

/** Adds "#" symbol to the beginning of the string */
const prefix = (value) => `#${value}`;

export function HexColorInput(props) {
	const { prefixed, alpha, ...rest } = props;

	/** Escapes all non-hexadecimal characters including "#" */
	const escape = useCallback(
		(value) => value.replace(/([^0-9A-F]+)/gi, '').substring(0, alpha ? 8 : 6),
		[alpha]
	);

	/** Validates hexadecimal strings */
	const validate = useCallback((value) => validHex(value, alpha), [alpha]);

	return (
		<ColorInput
			{...rest}
			escape={escape}
			format={prefixed ? prefix : undefined}
			process={prefix}
			validate={validate}
		/>
	);
}
