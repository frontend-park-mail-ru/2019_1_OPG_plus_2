'use strict';

export class Title {
    constructor({
        el = document.body,
        title = '',
    } = {}) {
        this._el = el;
        this._title = title;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderTitle() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="title ${this._modifiers.map((modifier) => {
                return modifier;
            })}">${this._title}</div>
        `;
    }

    render() {
        this._renderTitle();
    }


}