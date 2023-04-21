import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorString } from '../utils/compare';
import { rgbStringToHsva, hsvaToRgbString } from '../utils/convert';

const colorModel = {
	defaultColor: 'rgb(0, 0, 0)',
	toHsva: rgbStringToHsva,
	fromHsva: hsvaToRgbString,
	equal: equalColorString
};

export function RgbStringColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
