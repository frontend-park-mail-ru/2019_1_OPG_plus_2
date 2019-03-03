'use strict';

export class ScoreBoard {
    constructor({
        el = document.body,
        iconSrc = 'img/scoreboard.svg',
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

    _renderScoreboardIcon() {
        this._modifiers = this._modifiers ? this._modifiers : [];
        this._el.innerHTML += `
            <div class="scoreboard${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}">
                <img class="scoreboard__icon" src="${this._iconSrc}"/>
            </div>
        `;
    }

    render() {
        this._renderScoreboardIcon();
    }
}