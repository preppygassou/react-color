import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorObjects } from '../utils/compare';
import { hsvaToHsv } from '../utils/convert';

const colorModel = {
	defaultColor: { h: 0, s: 0, v: 0 },
	toHsva: ({ h, s, v }) => ({ h, s, v, a: 1 }),
	fromHsva: hsvaToHsv,
	equal: equalColorObjects
};

export function HsvColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
