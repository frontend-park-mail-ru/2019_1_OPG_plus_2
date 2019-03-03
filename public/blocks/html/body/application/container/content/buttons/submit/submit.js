'use strict';

export class Submit {
    constructor({
        el = document.body,
        value = '',
        form = '',
    } = {}) {
        this._el = el;
        this._value = value;
        this._form = form;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderSubmit() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <input form="${this._form}" type="submit" class="submit${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}" value="${this._value}"/>
        `;
    }

    render() {
        this._renderSubmit();
    }


}