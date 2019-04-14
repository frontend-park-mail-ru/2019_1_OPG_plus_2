import Controller from './controller';

export default class MainPageController extends Controller {
    constructor({
                    model = {},
                    view = {},
                    router = {},
                } = {}) {
        super({model: model, view: view, router: router});
        this._model.on('isAuth', ({root = '', isAuth = false}) => {
            this.render({root: root, data: {isAuth: isAuth}});
        });
    }
}