'use strict';
var template = require('./name.pug');

export default class Name {
    constructor({
        el = document.body,
        name = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._name = name;
        this._modifiers = modifiers;
    }

    _renderName() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            name: this._name,
        });
    }

    render() {
        this._renderName();
    }


}