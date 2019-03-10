let template = require('./profile-head.pug');

export default class ProfileHead {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderProfileHead() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderProfileHead();
    }


}