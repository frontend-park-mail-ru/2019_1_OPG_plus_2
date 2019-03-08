'use strict';

export class Data {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderData() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="data${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderData();
    }
}