'use strict';

export class Button {
    constructor({
        el = document.body,
        title = '',
    } = {}) {
        this._el = el;
        this._title = title;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderButton() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <button class="button${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}">${this._title}</button>
        `;
    }

    render() {
        this._renderButton();
    }
} 