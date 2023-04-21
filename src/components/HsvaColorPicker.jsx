import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalColorObjects } from '../utils/compare';
import { roundHsva } from '../utils/convert';

const colorModel = {
	defaultColor: { h: 0, s: 0, v: 0, a: 1 },
	toHsva: (hsva) => hsva,
	fromHsva: roundHsva,
	equal: equalColorObjects
};

export function HsvaColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
