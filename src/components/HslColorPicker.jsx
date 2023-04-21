import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorObjects } from '../utils/compare';
import { hslaToHsva, hsvaToHsla, hslaToHsl } from '../utils/convert';

const colorModel = {
	defaultColor: { h: 0, s: 0, l: 0 },
	toHsva: ({ h, s, l }) => hslaToHsva({ h, s, l, a: 1 }),
	fromHsva: (hsva) => hslaToHsl(hsvaToHsla(hsva)),
	equal: equalColorObjects
};

export function HslColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
