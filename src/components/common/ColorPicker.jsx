import React, { useRef } from 'react';

import { Hue } from './Hue';
import { Saturation } from './Saturation';

import { useColorManipulation } from '../../hooks/useColorManipulation';
import { useStyleSheet } from '../../hooks/useStyleSheet';
import { formatClassName } from '../../utils/format';

export function ColorPicker({
	className,
	colorModel,
	color = colorModel.defaultColor,
	onChange,
	...rest
}) {
	const nodeRef = useRef(null);
	useStyleSheet(nodeRef);

	const [hsva, updateHsva] = useColorManipulation(colorModel, color, onChange);

	const nodeClassName = formatClassName(['react-colorful', className]);

	return (
		<div {...rest} ref={nodeRef} className={nodeClassName}>
			<Saturation hsva={hsva} onChange={updateHsva} />
			<Hue
				hue={hsva.h}
				onChange={updateHsva}
				className="react-colorful__last-control"
			/>
		</div>
	);
}
