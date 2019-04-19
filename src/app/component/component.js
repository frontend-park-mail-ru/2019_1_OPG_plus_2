export default class Component {
    constructor({
        callback = () => {},
    }) {
        this._callback = callback;
    }

    _createEventListeners() {
    }

    _removeEventListeners() {
    }

    _render(data) {
    }

    create({root = {}, data = {}} = {}) {
        this._root = root;
        this._render(data);
        this._createEventListeners();
    }

    delete() {
        this.removeEventListeners();
    }
    
}