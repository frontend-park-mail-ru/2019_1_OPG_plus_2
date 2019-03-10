let template = require('./link.pug');

export default class Link {
    constructor({
        el = document.body,
        title = '',
        href = '/',
        dataset = 'menu',
        modifiers = [],
    } = {}) {
        this._el = el;
        this._title = title,
        this._href = href;
        this._dataset = dataset;
        this._modifiers = modifiers;
    }

    _renderLink() {
        this._el.innerHTML += template({
            hr: this._href,
            title: this._title,
            modifiers: this._modifiers,
            dataset: this._dataset,
        });
    }

    render() {
        this._renderLink();
    }


}