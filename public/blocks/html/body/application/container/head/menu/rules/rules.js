'use strict';

export class Rules{
    constructor({
        el = document.body,
        iconSrc = 'img/rules.svg',
    } = {}) {
        this._el = el;
        this._iconSrc = iconSrc;
    }

    get modifiers() {
        return this._modifiers;
    }

    set modifiers(m = []) {
        this._modifiers = m;
    }

    _renderRulesIcon() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="rules${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}">
                <img class="rules__icon" src="${this._iconSrc}"/>
            </div>
        `;
    }

    render() {
        this._renderRulesIcon();
    }
}