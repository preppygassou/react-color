import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorObjects } from '../utils/compare';
import { rgbaToHsva, hsvaToRgba, rgbaToRgb } from '../utils/convert';

const colorModel = {
	defaultColor: { r: 0, g: 0, b: 0 },
	toHsva: ({ r, g, b }) => rgbaToHsva({ r, g, b, a: 1 }),
	fromHsva: (hsva) => rgbaToRgb(hsvaToRgba(hsva)),
	equal: equalColorObjects
};

export function RgbColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
