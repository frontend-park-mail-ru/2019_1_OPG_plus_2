import Controller from './controller';
import { NavigateMixinController } from '../navigate_controller';
import { INIT_EVENT } from '../../modules/events';

export default class ChatController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
		this._model.on(INIT_EVENT, ({root = '', user = {}, isRender = true} = {}) => {
			this.render({root: root, data: {user: user, isRender}});
		});
	}
}