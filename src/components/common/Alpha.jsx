import React from 'react';

import { Interactive } from './Interactive';

import { hsvaToHslaString } from '../../utils/convert';
import { formatClassName } from '../../utils/format';
import { clamp } from '../../utils/clamp';
import { round } from '../../utils/round';
import { Pointer } from './Pointer';

export function Alpha({ className, hsva, onChange }) {
	const handleMove = (interaction) => {
		onChange({ a: interaction.left });
	};

	const handleKey = (offset) => {
		// Alpha always fit into [0, 1] range
		onChange({ a: clamp(hsva.a + offset.left) });
	};

	// We use `Object.assign` instead of the spread operator
	// to prevent adding the polyfill (about 150 bytes gzipped)
	const colorFrom = hsvaToHslaString({ ...hsva, a: 0 });
	const colorTo = hsvaToHslaString({ ...hsva, a: 1 });

	const gradientStyle = {
		backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
	};

	const nodeClassName = formatClassName(['react-colorful__alpha', className]);
	const ariaValue = round(hsva.a * 100);

	return (
		<div className={nodeClassName}>
			<div className="react-colorful__alpha-gradient" style={gradientStyle} />
			<Interactive
				onMove={handleMove}
				onKey={handleKey}
				aria-label="Alpha"
				aria-valuetext={`${ariaValue}%`}
				aria-valuenow={ariaValue}
				aria-valuemin="0"
				aria-valuemax="100"
			>
				<Pointer
					className="react-colorful__alpha-pointer"
					left={hsva.a}
					color={hsvaToHslaString(hsva)}
				/>
			</Interactive>
		</div>
	);
}
