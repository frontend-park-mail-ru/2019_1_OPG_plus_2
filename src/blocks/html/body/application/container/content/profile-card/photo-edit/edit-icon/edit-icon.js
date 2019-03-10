let template = require('./edit-icon.pug');

export default class EditIcon {
    constructor({
        el = document.body,
        id = '',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._id = id;
        this._modifiers = modifiers;
    }

    _renderEditIcon() {
        this._el.innerHTML += template({
            modifiers: this._modifiers,
            id: this._id,
        });
    }

    render() {
        this._renderEditIcon();
    }
}