'use strict';

export class Avatar {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderAvatar() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <img src="img/pers1.svg" class="avatar${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"/>
        `;
    }

    render() {
        this._renderAvatar();
    }


}