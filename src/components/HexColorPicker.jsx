import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalHex } from '../utils/compare';
import { hexToHsva, hsvaToHex } from '../utils/convert';

const colorModel = {
	defaultColor: '000',
	toHsva: hexToHsva,
	fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
	equal: equalHex
};

export function HexColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
