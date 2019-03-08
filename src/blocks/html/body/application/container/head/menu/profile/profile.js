'use strict';
var template = require('./profile.pug');

export default class ProfileIcon {
    constructor({
        el = document.body,
        href = '/',
        dataset = 'menu',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._href = href;
        this._dataset = dataset;
        this._modifiers = modifiers;
    }

    _renderProfileIcon() {
        this._el.innerHTML += template({
            hr: this._href,
            modifiers: this._modifiers,
            dataset: this._dataset,
        });
    }

    render() {
        this._renderProfileIcon();
    }
}