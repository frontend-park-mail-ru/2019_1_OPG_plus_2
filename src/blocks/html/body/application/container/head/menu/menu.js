let template = require('./menu.pug');

export default class Menu {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderMenu() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderMenu();
    }
}