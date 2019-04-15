import Controller from './controller';
import { NavigateMixinController } from '../navigate_controller';

export default class MainPageController extends NavigateMixinController(Controller) {
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