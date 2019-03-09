'use strict';
var template = require('./form.pug');

export default class Form {
    constructor({
        el = document.body,
        name = '',
        placeholder = '',
        type = 'text',
        req = false,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._name = name;
        this._placeholder = placeholder;
        this._type = type;
        this._req = req;
        this._modifiers = modifiers;
    }

    _renderForm() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            id: this._name,
            placeholder: this._placeholder,
            type: this._type,
            req: this._req,
        });
    }

    render() {
        this._renderForm();
    }
}