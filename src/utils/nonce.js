/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
let __webpack_nonce__;
let nonce;

/**
 * Returns a nonce hash included by Webpack or the one defined manually by developer.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce
 * https://webpack.js.org/guides/csp/
 */
export const getNonce = () => {
	if (nonce) return nonce;
	if (typeof __webpack_nonce__ !== 'undefined') return __webpack_nonce__;
	return undefined;
};

/**
 * Signs the style tag with a base64-encoded string (nonce) to conforms to Content Security Policies.
 * This function has to be invoked before any picker is rendered if you aren't using Webpack for CSP.
 */
export const setNonce = (hash) => {
	nonce = hash;
};
