import React from 'react';

import { Interactive } from './Interactive';
import { Pointer } from './Pointer';

import { hsvaToHslString } from '../../utils/convert';
import { formatClassName } from '../../utils/format';
import { clamp } from '../../utils/clamp';
import { round } from '../../utils/round';

function HueBase({ className, hue, onChange }) {
	const handleMove = (interaction) => {
		onChange({ h: 360 * interaction.left });
	};

	const handleKey = (offset) => {
		// Hue measured in degrees of the color circle ranging from 0 to 360
		onChange({
			h: clamp(hue + offset.left * 360, 0, 360)
		});
	};

	const nodeClassName = formatClassName(['react-colorful__hue', className]);

	return (
		<div className={nodeClassName}>
			<Interactive
				onMove={handleMove}
				onKey={handleKey}
				aria-label="Hue"
				aria-valuenow={round(hue)}
				aria-valuemax="360"
				aria-valuemin="0"
			>
				<Pointer
					className="react-colorful__hue-pointer"
					left={hue / 360}
					color={hsvaToHslString({ h: hue, s: 100, v: 100, a: 1 })}
				/>
			</Interactive>
		</div>
	);
}

export const Hue = React.memo(HueBase);
