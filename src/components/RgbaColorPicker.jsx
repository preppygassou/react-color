import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorObjects } from '../utils/compare';
import { rgbaToHsva, hsvaToRgba } from '../utils/convert';

const colorModel = {
	defaultColor: { r: 0, g: 0, b: 0, a: 1 },
	toHsva: rgbaToHsva,
	fromHsva: hsvaToRgba,
	equal: equalColorObjects
};

export function RgbaColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
