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

export function colorLuminance(hex, lum = 0) {
    // validate hex string
    if (typeof hex !== "string") {
        return '';
    }
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return '';
    }

    // convert to decimal and change luminosity
    let rgb = '';
    for (let i = 0; i < 3; i++) {
        let c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (255 * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }

    return rgb;
}

export function colorBrightness(hex) {
    if (typeof hex !== "string") {
        return '';
    }
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return 0;
    }

    let avg = 0;
    for (let i = 0; i < 3; i++) {
        avg += parseInt(hex.substr(i * 2, 2), 16);
    }
    return Math.round(avg / 3);
}

export function getColors() {
    try {
        let colors = JSON.parse(window.localStorage.getItem('colors'));
        let variables = JSON.parse(window.localStorage.getItem('color_names'));

        if (colors && variables) {
            let root = document.documentElement;
            setColors({root: root, colors: colors, variables: variables});
        }
    }
    catch(e) {
        console.error("Unknown theme in local storage: " + e);
    }
}

export function setColors({root = {}, colors = [], variables = []} = {}) {
    if (!root || !root.style || !root.style.setProperty) {
        return;
    }
    variables.forEach((item, i) => {
        root.style.setProperty(item, colors[i]);
    });
}

export function resetColors({root = {}, variables = []} = {}) {
    if (!root || !root.style || !root.style.setProperty) {
        return;
    }
    variables.forEach((item) => {
        root.style.removeProperty(item);
    });
}
