import Controller from './controller';
import { NavigateMixinController  } from '../navigate_controller';

export default class ScoreBoardController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('getScore', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
	}
}