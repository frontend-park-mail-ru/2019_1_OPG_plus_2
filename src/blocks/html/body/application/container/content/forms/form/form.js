'use strict';

export class Form {
    constructor({
        el = document.body,
        name = '',
        placeholder = '',
        type = 'text',
        req = false,
    } = {}) {
        this._el = el;
        this._name = name;
        this._placeholder = placeholder;
        this._type = type;
        this._req = req;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderForm() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._req ? this._req = true : this._req = false;
        this._el.innerHTML += `
        <div class="form${this._modifiers.map((modifier) => {
            return ' ' + modifier;
        })}">
            <label class="form__form-title" for="${this._name}">${this._placeholder}</label>
            <input type="${this._type}" id="${this._name}" class="form__text-form" ${this._req ? 'required' : ''}/>
        </div>
    `;
    }

    render() {
        this._renderForm();
    }
}