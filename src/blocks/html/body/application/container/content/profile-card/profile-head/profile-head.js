'use strict';

export class ProfileHead {
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

    _renderProfileHead() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="profile-head${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderProfileHead();
    }


}