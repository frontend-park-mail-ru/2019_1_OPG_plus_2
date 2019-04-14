import Controller from "./controller";
import {NavigateMixinController} from '../navigate_controller';

export default class NotFoundController extends NavigateMixinController(Controller) {
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
