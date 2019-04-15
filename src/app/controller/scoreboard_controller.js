import Controller from './controller';
import { NavigateMixinController  } from '../navigate_controller';

export default class ScoreBoardController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
		this._model.on('getScore', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
		this._view.on('getNextPage', ({root = {}, page = 1}) => { this.getNextPage({root, page} );});
		this._model.on('gotNextPage', ({root = {}, data = {}} = {}) => {this.render({root: root, data: data}); });
	}

	getNextPage({root = {}, page = 1} = {}) {
		this._model.getNextPage({root: root, page: page});
	}
}