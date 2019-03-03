'use strict';

export class Forms {
    constructor({
        el = document.body,
        action = 'GET',
        name = '',
    } = {}) {
        this._el = el;
        this._action = action;
        this._name = name;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderForms() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <form id="${this._name}" action="${this._action}" class="forms${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"></form>
        `;
    }

    render() {
        this._renderForms();
    }


}