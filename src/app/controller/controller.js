export default class Controller {
    constructor({
                    model = {},
                    view = {},
                    router = {},
                } = {}) {
        this._model = model;
        this._view = view;
        this._router = router;
        this.onNavigate = this.onNavigate.bind(this);
    }

    render({root = {}, data = {}} = {}) {
        this._view.open({root, data});
    }

    open({root = {}, data = {}} = {}) {
        this._model.getData({root, data});
    }

    close() {
        this._view.close();
    }
}