'use strict';

export default class ProfileIcon {
    constructor({
        el = document.body,
        href = '/',
        dataset = 'menu',
    } = {}) {
        this._el = el;
        this._href = href;
        this._dataset = dataset;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderProfileIcon() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <a href="${this._href}" class="profile${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}" data-href="${this._dataset}"></a>
        `;
    }

    render() {
        this._renderProfileIcon();
    }
}