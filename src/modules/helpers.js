/**
 * Extend element el with templates
 * @param {Element} el Element to extend with templates
 * @param {Array.<string>} templates Templates inserted into el with "beforeend" attribute
 */
export const genericBeforeEnd = (el, ...templates) => el.insertAdjacentHTML('beforeend', templates.join('\n'));

export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function throttle(func, ms) {

    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

export function colorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = '', c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (255 * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }

    return rgb;
}

export function colorBrightness(hex) {
    let c1 = parseInt(hex.substr(0, 2), 16);
    let c2 = parseInt(hex.substr(2, 2), 16);
    let c3 = parseInt(hex.substr(4, 2), 16);
    return Math.round((c1 + c2 + c3) / 3);
}

export function getColors() {
    let colors = JSON.parse(window.localStorage.getItem('colors'));
    let variables = JSON.parse(window.localStorage.getItem('color_names'));

    if (colors && variables) {
        let root = document.documentElement;
        setColors({root: root, colors: colors, variables: variables});
    }
}

export function setColors({root = {}, colors = [], variables = []} = {}) {
    [...variables].forEach((item, i) => {
        root.style.setProperty(item, colors[i]);
    });
}

export function resetColors({root = {}, variables = []} = {}) {
    [...variables].forEach((item) => {
        root.style.removeProperty(item);
    });
}

export function invertHex(hexnum) {
    if (hexnum.length != 6) {
        alert('Hex color must be six hex numbers in length.');
        return false;
    }

    hexnum = hexnum.toUpperCase();
    let splitnum = hexnum.split('');
    let resultnum = '';
    let simplenum = 'FEDCBA9876'.split('');
    let complexnum = new Array();
    complexnum.A = '5';
    complexnum.B = '4';
    complexnum.C = '3';
    complexnum.D = '2';
    complexnum.E = '1';
    complexnum.F = '0';

    for (let i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            alert('Hex colors must only include hex numbers 0-9, and A-F');
            return false;
        }
    }

    return resultnum;
}