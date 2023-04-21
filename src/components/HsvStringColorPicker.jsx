import React from 'react';

import { ColorPicker } from './common/ColorPicker';
import { equalColorString } from '../utils/compare';
import { hsvStringToHsva, hsvaToHsvString } from '../utils/convert';

const colorModel = {
	defaultColor: 'hsv(0, 0%, 0%)',
	toHsva: hsvStringToHsva,
	fromHsva: hsvaToHsvString,
	equal: equalColorString
};

export function HsvStringColorPicker(props) {
	return <ColorPicker {...props} colorModel={colorModel} />;
}
