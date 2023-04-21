import React from 'react';

import { AlphaColorPicker } from './common/AlphaColorPicker';
import { equalHex } from '../utils/compare';
import { hexToHsva, hsvaToHex } from '../utils/convert';

const colorModel = {
	defaultColor: '0001',
	toHsva: hexToHsva,
	fromHsva: hsvaToHex,
	equal: equalHex
};

export function HexAlphaColorPicker(props) {
	return <AlphaColorPicker {...props} colorModel={colorModel} />;
}
