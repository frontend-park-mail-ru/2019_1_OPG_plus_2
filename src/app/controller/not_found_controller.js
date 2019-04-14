import Controller from "./controller";

export default class NotFoundController extends Controller{
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
