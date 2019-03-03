'use strict'

export class Container {
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

    _renderContainer() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="container${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderContainer();
    }


}