/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';

import { useEventCallback } from '../../hooks/useEventCallback';

export function ColorInput(props) {
	const {
		color = '',
		onChange,
		onBlur,
		escape,
		validate,
		format,
		process,
		...rest
	} = props;
	const [value, setValue] = useState(() => escape(color));

	const onChangeCallback = useEventCallback((value) => onChange(value));
	const onBlurCallback = useEventCallback((event) => onBlur(event));

	// Trigger `onChange` handler only if the input value is a valid color
	const handleChange = useCallback(
		(e) => {
			const inputValue = escape(e.target.value);
			setValue(inputValue);
			if (validate(inputValue))
				onChangeCallback(process ? process(inputValue) : inputValue);
		},
		[escape, process, validate, onChangeCallback]
	);

	// Take the color from props if the last typed color (in local state) is not valid
	const handleBlur = useCallback(
		(e) => {
			if (!validate(e.target.value)) setValue(escape(color));
			onBlurCallback(e);
		},
		[color, escape, validate, onBlurCallback]
	);

	// Update the local state when `color` property value is changed
	useEffect(() => {
		setValue(escape(color));
	}, [color, escape]);

	return (
		<input
			{...rest}
			value={format ? format(value) : value}
			spellCheck="false" // the element should not be checked for spelling errors
			onChange={handleChange}
			onBlur={handleBlur}
		/>
	);
}
