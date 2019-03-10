let template = require('./logout.pug');

export default class LogoutIcon {
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

    _renderLogoutIcon() {
        this._el.innerHTML += template({
            hr: this._href,
            modifiers: this._modifiers,
            dataset: this._dataset,
        });
    }

    render() {
        this._renderLogoutIcon();
    }
}