let template = require('./settings.pug');

export default class SettingsIcon {
    constructor({
        el = document.body,
        href = '/',
        dataset = 'menu',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._href = href;
        this._dataset = dataset;
        this._modifiers = modifiers;
    }

    _renderSettingsIcon() {
        this._el.innerHTML += template({
            hr: this._href,
            modifiers: this._modifiers,
            dataset: this._dataset,
        });
    }

    render() {
        this._renderSettingsIcon();
    }
}