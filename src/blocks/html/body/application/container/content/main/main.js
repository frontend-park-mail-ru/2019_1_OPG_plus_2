'use strict'

export default class Main {
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

    _renderMain() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="main ${this._modifiers.map((modifier) => {
                return modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderMain();
    }


}