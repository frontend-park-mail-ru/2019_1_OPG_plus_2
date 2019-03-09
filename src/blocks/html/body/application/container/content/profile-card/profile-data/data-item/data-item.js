'use strict';
var template = require('./data-item.pug');

export default class DataItem {
    constructor({
        el = document.body,
        title = '',
        data = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._title = title;
        this._data = data;
        this._modifiers = modifiers;
    }

    _renderDataItem() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            title: this._title,
            data: this._data,
        });
    }

    render() {
        this._renderDataItem();
    }


}