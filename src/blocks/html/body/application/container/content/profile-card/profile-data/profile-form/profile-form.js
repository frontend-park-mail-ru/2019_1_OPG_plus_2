let template = require('./profile-form.pug');

export default class ProfileForm {
    constructor({
        el = document.body,
        title = '',
        name = '',
        type = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._title = title,
        this._name = name,
        this._type = type,
        this._modifiers = modifiers;
    }

    _renderProfileForm() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            title: this._title,
            name: this._name,
            type: this._type,
        });
    }

    render() {
        this._renderProfileForm();
    }
}