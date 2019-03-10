let template = require('./main.pug');

export default class Main {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderMain() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderMain();
    }


}