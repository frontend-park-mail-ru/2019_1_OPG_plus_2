let template = require('./settings-icon.pug');

export default class SettingsIcon {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderSettingsIcon() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderSettingsIcon();
    }


}