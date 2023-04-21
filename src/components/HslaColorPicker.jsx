import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorObjects } from '../utils/compare';
import { hslaToHsva, hsvaToHsla } from '../utils/convert';

const colorModel = {
	defaultColor: { h: 0, s: 0, l: 0, a: 1 },
	toHsva: hslaToHsva,
	fromHsva: hsvaToHsla,
	equal: equalColorObjects
};

export function HslaColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
