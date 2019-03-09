'use strict';
var template = require('./photo-edit.pug');

export default class PhotoEdit {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderPhotoEdit() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderPhotoEdit();
    }
}