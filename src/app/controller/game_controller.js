import Controller from './controller';

export default class GameController extends Controller {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('OK', ({ root = {} } = {}) => {this.render({root: root})});
	}
}