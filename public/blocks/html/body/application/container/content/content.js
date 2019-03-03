'use strict'

export class Content {
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

    _renderContent() {
        this._el.innerHTML += `
            <div class="content ${this._modifiers.map((modifier) => {
                return modifier;
            })}"></div>
        `;
    }

    render() {
        this._renderContent();
    }


}