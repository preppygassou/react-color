import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorString } from '../utils/compare';
import { hsvaStringToHsva, hsvaToHsvaString } from '../utils/convert';

const colorModel = {
	defaultColor: 'hsva(0, 0%, 0%, 1)',
	toHsva: hsvaStringToHsva,
	fromHsva: hsvaToHsvaString,
	equal: equalColorString
};

export function HsvaStringColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
