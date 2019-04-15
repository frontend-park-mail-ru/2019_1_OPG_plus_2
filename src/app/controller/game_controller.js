import Controller from './controller';
import { ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';

export default class GameController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('start', ({root = {}, gameState = {}} = {}) => {this.render({root: root, data: gameState})});
		this._view.on('startStep', ({ root = {}, block = [] } = {}) => {this.startStep({root: root, block})});
		this._model.on('endStartStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState})});
		this._view.on('overBlockStep', ({root = {}, block = [] } = {}) => {this.overBlockStep({root: root, block})});
		this._model.on('endOverBlockStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState})});
		this._view.on('outBlockStep', ({ root = {}, block = [] } = {}) => {this.outBlockStep({root: root, block})});
		this._model.on('endOutBlockStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState})});
		this._view.on('finishStep', ({ root = {}, block = [] } = {}) => {this.finishStep({root: root, block})});
		this._model.on('endFinishStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState})});
		this._model.on('endGame', ({ root = {}, gameState = {}} = {}) => {this.render({root: root, data: gameState})});
		// this._view.on('finish', () => {this.onNavigate({path: ROOT})});
	}

	startStep({root = {}, block = {}} = {}) {
		this._model.startStep({root, block});
	}

	overBlockStep({root = {}, block = []} = {}) {
		this._model.overBlockStep({root, block});
	}

	outBlockStep({root = {}, block = []} = {}) {
		this._model.outBlockStep({root, block});
	}

	finishStep({root = {}, block = []} = {}) {
		this._model.finishStep({root, block});
	}
}