import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorString } from '../utils/compare';
import { rgbaStringToHsva, hsvaToRgbaString } from '../utils/convert';

const colorModel = {
	defaultColor: 'rgba(0, 0, 0, 1)',
	toHsva: rgbaStringToHsva,
	fromHsva: hsvaToRgbaString,
	equal: equalColorString
};

export function RgbaStringColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
