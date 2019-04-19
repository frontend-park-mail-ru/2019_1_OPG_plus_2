import Controller from './controller';
import { NavigateMixinController  } from '../navigate_controller';
import { INIT_EVENT,
		 GET_NEXT_PAGE_EVENT,
		 GOT_NEXT_PAGE_EVENT } from '../../modules/events';

export default class ScoreBoardController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
		this._model.on(INIT_EVENT, ({root = {}, data = {}} = {}) => {this.render({root: root, data: data})});
		this._view.on(GET_NEXT_PAGE_EVENT, ({root = {}, page = 1}) => {this.getNextPage({root, page})});
		this._model.on(GOT_NEXT_PAGE_EVENT, ({root = {}, data = {}} = {}) => {this.render({root: root, data: data})});
	}

	getNextPage({root = {}, page = 1} = {}) {
		this._model.getNextPage({root: root, page: page});
	}
}