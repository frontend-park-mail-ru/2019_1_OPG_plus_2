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

export const APP_PALETTES = [["2ec4b6","e71d36","011627"],["2ec4b6","e71d36","fdfffc"],["e71d36","2ec4b6","011627"],["e71d36","2ec4b6","fdfffc"],["06aed5","dd1c1a","fff1d0"],["dd1c1a","06aed5","fff1d0"],["06d6a0","ef476f","f8ffe5"],["ef476f","06d6a0","f8ffe5"],["ef476f","06d6a0","fffcf9"],["06d6a0","ef476f","fffcf9"],["ffe74c","35a7ff","ffffff"],["35a7ff","ffe74c","ffffff"],["ef476f","06d6a0","fcfcfc"],["06d6a0","ef476f","fcfcfc"],["fe4a49","2ab7ca","f4f4f8"],["2ab7ca","fe4a49","f4f4f8"],["ff206e","41ead4","0c0f0a"],["ff206e","41ead4","ffffff"],["41ead4","ff206e","0c0f0a"],["41ead4","ff206e","ffffff"],["25ced1","ea526f","ffffff"],["ea526f","25ced1","ffffff"],["07a0c3","dd1c1a","fff1d0"],["dd1c1a","07a0c3","fff1d0"],["ffe74c","35a7ff","ffffff"],["35a7ff","ffe74c","ffffff"],["30bced","fc5130","fffaff"],["30bced","fc5130","050401"],["fc5130","30bced","fffaff"],["fc5130","30bced","050401"],["ff3366","2ec4b6","011627"],["ff3366","2ec4b6","f6f7f8"],["ff3366","20a4f3","011627"],["ff3366","20a4f3","f6f7f8"],["2ec4b6","ff3366","011627"],["2ec4b6","ff3366","f6f7f8"],["20a4f3","ff3366","011627"],["20a4f3","ff3366","f6f7f8"],["ff4365","00d9c0","030301"],["ff4365","00d9c0","fffff3"],["00d9c0","ff4365","030301"],["00d9c0","ff4365","fffff3"],["17bebb","d62246","d4f4dd"],["d62246","17bebb","d4f4dd"],["fe4a49","009fb7","f4f4f8"],["009fb7","fe4a49","f4f4f8"],["3772ff","df2935","080708"],["3772ff","df2935","e6e8e6"],["3772ff","fdca40","080708"],["df2935","3772ff","080708"],["df2935","3772ff","e6e8e6"],["fdca40","3772ff","080708"],["256eff","ff495c","fcfcfc"],["3ddc97","ff495c","fcfcfc"],["ff495c","256eff","fcfcfc"],["ff495c","3ddc97","fcfcfc"],["ea526f","23b5d3","070600"],["ea526f","279af1","070600"],["23b5d3","ea526f","070600"],["279af1","ea526f","070600"],["db2763","b0db43","bce7fd"],["db2763","12eaea","bce7fd"],["b0db43","db2763","bce7fd"],["12eaea","db2763","bce7fd"],["3c91e6","a2d729","fafffd"],["3c91e6","fa824c","fafffd"],["a2d729","3c91e6","fafffd"],["fa824c","3c91e6","fafffd"],["f03a47","276fbf","f6f4f3"],["276fbf","f03a47","f6f4f3"],["ec4e20","016fb9","000000"],["016fb9","ec4e20","000000"],["0e79b2","bf1363","fbfef9"],["0e79b2","f39237","fbfef9"],["bf1363","0e79b2","fbfef9"],["f39237","0e79b2","fbfef9"],["3c91e6","fa824c","fafffd"],["fa824c","3c91e6","fafffd"],["4392f1","dc493a","ffffff"],["dc493a","4392f1","ffffff"],["e0ff4f","ff2ecc","00272b"],["ff2ecc","e0ff4f","00272b"]];
export const COLOR_NAMES = [
    '--primary-color', '--primary-text-color',
    '--primary-2-color', '--primary-2-text-color',
    '--primary-3-color', '--primary-3-text-color',
    '--secondary-color', '--secondary-text-color',
    '--secondary-2-color', '--secondary-2-text-color',
    '--secondary-3-color', '--secondary-3-text-color',
    '--bg-color', '--bg-text-color',
    '--bg-2-color', '--bg-2-text-color',
    '--bg-3-color', '--bg-3-text-color',
];