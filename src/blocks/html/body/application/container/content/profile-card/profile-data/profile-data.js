let template = require('./profile-data.pug');

export default class ProfileData {
    constructor({
        el = document.body,
        modifiers = [],
    } = {}) {
        this._el = el;
        this._modifiers = modifiers;
    }

    _renderProfileData() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
        });
    }

    render() {
        this._renderProfileData();
    }
}