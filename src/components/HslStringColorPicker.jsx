import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorString } from '../utils/compare';
import { hslStringToHsva, hsvaToHslString } from '../utils/convert';

const colorModel = {
	defaultColor: 'hsl(0, 0%, 0%)',
	toHsva: hslStringToHsva,
	fromHsva: hsvaToHslString,
	equal: equalColorString
};

export function HslStringColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
