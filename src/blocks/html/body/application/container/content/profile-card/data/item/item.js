'use strict';

export class Item {
    constructor({
        el = document.body,
        title = '',
        data = '',
    } = {}) {
        this._el = el;
        this._title = title;
        this._data = data;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderItem() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="item${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}">
                <div class="item__title">${this._title}</div>
                <div class="item__data">${this._data}</div>
        `;
    }

    render() {
        this._renderItem();
    }
}