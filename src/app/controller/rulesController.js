import Controller from './controller';

export default class RulesController extends Controller {
    constructor({
                    model = {},
                    view = {},
                    router = {},
                } = {}) {
        super({model: model, view: view, router: router});
        this._model.on('OK', ({root = {}} = {}) => { this.render({root: root})});
    }
}