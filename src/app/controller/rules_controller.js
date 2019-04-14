import Controller from './controller';

export default class RulesController extends Controller {
    constructor({
                    model = {},
                    view = {},
                    router = {},
                } = {}) {
        super({model: model, view: view, router: router});
    }

    open({root = {}, data = {}} = {}) {
        super.render({root, data})
    }
}
