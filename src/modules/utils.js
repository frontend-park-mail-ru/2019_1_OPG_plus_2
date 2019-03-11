/**
 * Blacklist of tags for XSS protection
 * @type {string[]}
 */
const BLACKLIST_TAGS = [
	'iframe',
	'script',
];

/**
 * Whitelist of tags for XSS protection
 * @type {string[]}
 */
const WHITELIST_ATTRS = [
	'src',
	'alt',
];

/**
 * Regexp for validating tags
 * @type {RegExp}
 */
const R_TAG = /<(\w+)\s?(.*?)>.*?(<\/(.*?)>)?/;
/**
 * Regexp for validating attributes
 * @type {RegExp}
 */
const R_ATTRIBUTES = /(\w+\s*)=(\s*".*?")/g;
/**
 * Regexp for validating email
 * @type {RegExp}
 */
const emailRe = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

/**
 * Makes passed string safe
 * @param {string} unsafeString
 * @return {string}
 */
export function makeSafe(unsafeString = '') {
	return unsafeString
		.replace(R_TAG, (match, g1) => {
			return BLACKLIST_TAGS.includes(g1) ? '' : match;
		})
		.replace(R_ATTRIBUTES, (match, g1) => {
			return WHITELIST_ATTRS.includes(g1) ? match : '';
		})
	;
}

/**
 * Validates email
 * @param {string} string
 * @return {boolean}
 */
export function validEmail(string = '') {
	return emailRe.test(string.toLowerCase());
}

/**
 * Validates login
 * @param {string} string
 * @return {boolean}
 */
export function validLogin(string = '') {
	return string.length < 15;
}