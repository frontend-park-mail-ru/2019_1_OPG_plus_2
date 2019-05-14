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
const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gi;
const nameRe = /^[\w.-_@$]{1,14}$/gi;

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
	string = string.toLowerCase();
	return !!string.match(emailRe);
}

/**
 * Validates login
 * @param {string} string
 * @return {boolean}
 */
export function validLogin(string = '') {
	string = string.toLowerCase();
	return !!string.match(nameRe);
}

/**
 * Validates password
 * @param {string} string
 * @return {boolean}
 */
export function validPassword(string = '') {
	return string.length > 5;
}

export const APP_PALETTES = [["000000","fca311","ffffff"],["000000","ffffff","fca311"],["14213d","fca311","ffffff"],["14213d","ffffff","fca311"],["fca311","000000","ffffff"],["fca311","14213d","ffffff"],["fca311","ffffff","000000"],["fca311","ffffff","14213d"],["ffffff","000000","fca311"],["ffffff","14213d","fca311"],["ffffff","fca311","000000"],["ffffff","fca311","14213d"],["011627","f71735","fdfffc"],["011627","fdfffc","f71735"],["f71735","011627","fdfffc"],["f71735","fdfffc","011627"],["fdfffc","011627","f71735"],["fdfffc","f71735","011627"],["0c0f0a","fbff12","ffffff"],["0c0f0a","ffffff","fbff12"],["fbff12","0c0f0a","ffffff"],["fbff12","ffffff","0c0f0a"],["ffffff","0c0f0a","fbff12"],["ffffff","fbff12","0c0f0a"],["ff6700","ebebeb","004e98"],["ff6700","004e98","ebebeb"],["ebebeb","ff6700","004e98"],["ebebeb","004e98","ff6700"],["004e98","ff6700","ebebeb"],["004e98","ebebeb","ff6700"],["011627","ff0022","fdfffc"],["011627","fdfffc","ff0022"],["ff0022","011627","fdfffc"],["ff0022","fdfffc","011627"],["fdfffc","011627","ff0022"],["fdfffc","ff0022","011627"],["ffe900","fcfff7","046865"],["ffe900","046865","fcfff7"],["fcfff7","ffe900","046865"],["fcfff7","046865","ffe900"],["046865","ffe900","fcfff7"],["046865","fcfff7","ffe900"],["b80c09","01baef","fbfbff"],["b80c09","fbfbff","01baef"],["01baef","b80c09","fbfbff"],["01baef","fbfbff","b80c09"],["fbfbff","b80c09","01baef"],["fbfbff","01baef","b80c09"],["fdfffc","f1d302","020100"],["fdfffc","020100","f1d302"],["f1d302","fdfffc","020100"],["f1d302","020100","fdfffc"],["020100","fdfffc","f1d302"],["020100","f1d302","fdfffc"],["000000","fffffc","ff7f11"],["000000","fffffc","ff3f00"],["000000","ff7f11","fffffc"],["000000","ff3f00","fffffc"],["fffffc","000000","ff7f11"],["fffffc","000000","ff3f00"],["fffffc","ff7f11","000000"],["fffffc","ff3f00","000000"],["ff7f11","000000","fffffc"],["ff7f11","fffffc","000000"],["ff3f00","000000","fffffc"],["ff3f00","fffffc","000000"],["ffa400","009ffd","eaf6ff"],["ffa400","eaf6ff","009ffd"],["009ffd","ffa400","eaf6ff"],["009ffd","eaf6ff","ffa400"],["eaf6ff","ffa400","009ffd"],["eaf6ff","009ffd","ffa400"],["12355b","ffffff","ff570a"],["12355b","ff570a","ffffff"],["ffffff","12355b","ff570a"],["ffffff","ff570a","12355b"],["ff570a","12355b","ffffff"],["ff570a","ffffff","12355b"],["010400","fffbfc","ec058e"],["010400","ec058e","fffbfc"],["fffbfc","010400","ec058e"],["fffbfc","ec058e","010400"],["ec058e","010400","fffbfc"],["ec058e","fffbfc","010400"],["fdfffc","f1d302","020100"],["fdfffc","020100","f1d302"],["f1d302","fdfffc","020100"],["f1d302","020100","fdfffc"],["020100","fdfffc","f1d302"],["020100","f1d302","fdfffc"],["084887","f58a07","f7f5fb"],["084887","f7f5fb","f58a07"],["f58a07","084887","f7f5fb"],["f58a07","f7f5fb","084887"],["f7f5fb","084887","f58a07"],["f7f5fb","f58a07","084887"],["000000","fffffc","ff7f11"],["000000","ff7f11","fffffc"],["fffffc","000000","ff7f11"],["fffffc","ff7f11","000000"],["ff7f11","000000","fffffc"],["ff7f11","fffffc","000000"],["000000","1098f7","ffffff"],["000000","ffffff","1098f7"],["1098f7","000000","ffffff"],["1098f7","ffffff","000000"],["ffffff","000000","1098f7"],["ffffff","1098f7","000000"],["fffeff","ff01fb","02a9ea"],["fffeff","ff01fb","faff00"],["fffeff","ff01fb","000300"],["fffeff","02a9ea","ff01fb"],["fffeff","02a9ea","faff00"],["fffeff","02a9ea","000300"],["fffeff","faff00","ff01fb"],["fffeff","faff00","02a9ea"],["fffeff","faff00","000300"],["fffeff","000300","ff01fb"],["fffeff","000300","02a9ea"],["fffeff","000300","faff00"],["ff01fb","fffeff","02a9ea"],["ff01fb","fffeff","faff00"],["ff01fb","fffeff","000300"],["ff01fb","02a9ea","fffeff"],["ff01fb","02a9ea","faff00"],["ff01fb","02a9ea","000300"],["ff01fb","faff00","fffeff"],["ff01fb","faff00","02a9ea"],["ff01fb","faff00","000300"],["ff01fb","000300","fffeff"],["ff01fb","000300","02a9ea"],["ff01fb","000300","faff00"],["02a9ea","fffeff","ff01fb"],["02a9ea","fffeff","faff00"],["02a9ea","fffeff","000300"],["02a9ea","ff01fb","fffeff"],["02a9ea","ff01fb","faff00"],["02a9ea","ff01fb","000300"],["02a9ea","faff00","fffeff"],["02a9ea","faff00","ff01fb"],["02a9ea","faff00","000300"],["02a9ea","000300","fffeff"],["02a9ea","000300","ff01fb"],["02a9ea","000300","faff00"],["faff00","fffeff","ff01fb"],["faff00","fffeff","02a9ea"],["faff00","fffeff","000300"],["faff00","ff01fb","fffeff"],["faff00","ff01fb","02a9ea"],["faff00","ff01fb","000300"],["faff00","02a9ea","fffeff"],["faff00","02a9ea","ff01fb"],["faff00","02a9ea","000300"],["faff00","000300","fffeff"],["faff00","000300","ff01fb"],["faff00","000300","02a9ea"],["000300","fffeff","ff01fb"],["000300","fffeff","02a9ea"],["000300","fffeff","faff00"],["000300","ff01fb","fffeff"],["000300","ff01fb","02a9ea"],["000300","ff01fb","faff00"],["000300","02a9ea","fffeff"],["000300","02a9ea","ff01fb"],["000300","02a9ea","faff00"],["000300","faff00","fffeff"],["000300","faff00","ff01fb"],["000300","faff00","02a9ea"],["050505","004fff","ff007f"],["050505","ff007f","004fff"],["004fff","050505","ff007f"],["004fff","ff007f","050505"],["ff007f","050505","004fff"],["ff007f","004fff","050505"]];
export const COLOR_NAMES = ['--primary-color', '--primary-2-color', '--primary-3-color', '--primary-text-color', '--secondary-color', '--secondary-2-color', '--secondary-3-color', '--secondary-text-color', '--bg-color', '--bg-2-color', '--bg-3-color', '--bg-text-color' ];