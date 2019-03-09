'use strict';
var template = require('./submit.pug');

export default class Submit {
    constructor({
        el = document.body,
        value = '',
        form = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._value = value;
        this._form = form;
        this._modifiers = modifiers;
    }

    _renderSubmit() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            form: this._form,
            value: this._value,
        });
    }

    render() {
        this._renderSubmit();
    }


}