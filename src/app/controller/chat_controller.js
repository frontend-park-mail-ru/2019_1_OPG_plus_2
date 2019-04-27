import Controller from './controller';
import { NavigateMixinController } from '../navigate_controller';
import { INIT_EVENT, GET_MESSAGE_EVENT, POST_MESSAGE_EVENT, GET_NEXT_PAGE_EVENT,GOT_NEXT_PAGE_EVENT } from '../../modules/events';

export default class ChatController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
		this._model.on(INIT_EVENT, ({root = '', messages = [], isRender = true, page = 1} = {}) => {
			this.render({root: root, data: {
				messages, 
				isRender,
				page,
			}
		});
		});
		this._view.on(POST_MESSAGE_EVENT, ({message = ''} = {}) => {this.post({message})});
		this._model.on(GET_MESSAGE_EVENT, ({data = {}, isRender = true} = {}) => {this.anotherRender({data: {data, isRender}})});
		this._view.on(GET_NEXT_PAGE_EVENT, ({root = {}, page = 1}) => {this.getNextPage({root, page});});
		this._model.on(GOT_NEXT_PAGE_EVENT, ({root = {}, data = {}} = {}) => {this.render({root: root, data: data});});
	}

	post({message = ''} = {}) {
		this._model.sendMessage({message});
	}

	anotherRender({data}) {
		this._view._render(data);
	}

	getNextPage({root = {}, page = 1} = {}) {
		this._model.getNextPage({root: root, page: page});
	}
}