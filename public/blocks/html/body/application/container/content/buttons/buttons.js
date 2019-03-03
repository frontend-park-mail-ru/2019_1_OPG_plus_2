'use strict';

export class Buttons {
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

    _renderButtons() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="buttons${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderButtons();
    }


}