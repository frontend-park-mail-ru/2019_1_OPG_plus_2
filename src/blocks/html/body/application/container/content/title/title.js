'use strict';
var template = require('./title.pug');

export default class Title {
    constructor({
        el = document.body,
        title = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._title = title;
        this._modifiers = modifiers;
    }

    _renderTitle() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            title: this._title,
        });
    }

    render() {
        this._renderTitle();
    }


}