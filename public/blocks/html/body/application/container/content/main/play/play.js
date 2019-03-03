'use strict';

export class Play {
    constructor({
        el = document.body,
        iconSrc = './img/play.svg',
    } = {}) {
        this._el = el;
        this._iconSrc = iconSrc;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderPlay() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML = `
            <button class="play${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}">
                <img class="play__icon" src="${this._iconSrc}"/>
            </button>
        `;
    }

    render() {
        this._renderPlay();
    }
}