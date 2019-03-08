'use strict';
var template = require('./buttons.pug');

export default class Buttons {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }
    _renderButtons() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderButtons();
    }


}