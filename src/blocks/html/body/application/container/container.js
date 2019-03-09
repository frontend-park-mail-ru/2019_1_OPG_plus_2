'use strict';
var template = require('./container.pug');

export default class Container {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderContainer() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        })
    }

    render() {
        this._renderContainer();
    }
}
