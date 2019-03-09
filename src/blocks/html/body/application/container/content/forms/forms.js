'use strict';
var template = require('./forms.pug');

export default class Forms {
    constructor({
        el = document.body,
        action = 'GET',
        name = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._action = action;
        this._name = name;
        this._modifiers = modifiers;
    }

    _renderForms() {
        this._el.innerHTML += template({
            id: this._name,
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderForms();
    }


}