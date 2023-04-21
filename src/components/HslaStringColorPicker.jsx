import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorString } from '../utils/compare';
import { hslaStringToHsva, hsvaToHslaString } from '../utils/convert';

const colorModel = {
	defaultColor: 'hsla(0, 0%, 0%, 1)',
	toHsva: hslaStringToHsva,
	fromHsva: hsvaToHslaString,
	equal: equalColorString
};

export function HslaStringColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
