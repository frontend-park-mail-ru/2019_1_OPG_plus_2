'use strict';

export class ScoreBoard {
    constructor({
        el = document.body,
        href = '/',
        dataset = 'menu',
    } = {}) {
        this._el = el;
        this._href = href;
        this._dataset = dataset;
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
            <a href="${this._href}" class="scoreboard${this._modifiers.map((modifier) => {
                return ' ' + modifier;
            })}" data-href="${this._dataset}"></a>
        `;
    }

    render() {
        this._renderScoreboardIcon();
    }
}