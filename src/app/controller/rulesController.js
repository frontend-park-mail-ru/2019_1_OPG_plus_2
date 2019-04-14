import Controller from './controller';
import { NavigateMixinController  } from '../navigate_controller';

export default class RulesController extends NavigateMixinController(Controller) {
    constructor({
                    model = {},
                    view = {},
                    router = {},
                } = {}) {
        super({model: model, view: view, router: router});
        this._model.on('OK', ({root = {}} = {}) => { this.render({root: root})});
    }
}