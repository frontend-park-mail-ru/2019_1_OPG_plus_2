import Controller from './controller';
import { ROOT } from '../paths';

export default class GameController extends Controller {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('start', ({root = {}, gameState = {}} = {}) => {this.render({root: root, data: gameState})});
		this._view.on('startStep', ({ block = [] } = {}) => {this.startStep({block})});
		this._model.on('endStartStep', ({ gameState = {} } = {}) => {this.render({data: gameState})});
		this._view.on('overBlockStep', ({ block = [] } = {}) => {this.overBlockStep({block})});
		this._model.on('endOverBlockStep', ({ gameState = {} } = {}) => {this.render({data: gameState})});
		this._view.on('outBlockStep', ({ block = [] } = {}) => {this.outBlockStep({block})});
		this._model.on('endOutBlockStep', ({ gameState = {} } = {}) => {this.render({data: gameState})});
		this._view.on('finishStep', ({ block = [] } = {}) => {this.finishStep({block})});
		this._model.on('endFinishStep', ({ gameState = {} } = {}) => {this.render({data: gameState})});
		this._model.on('endGame', ({ winner = {}} = {}) => { alert(`Player: ${winner} win`); this.onNavigate({path: ROOT}); });
	}

	doTurn({root = {}, user = {}, start = [], end = [], del = []} = {}) {
		this._model.doTurn({root, user, start, end, del});
	}

	startStep({block = {}} = {}) {
		this._model.startStep({block});
	}

	overBlockStep({block = []} = {}) {
		this._model.overBlockStep({block});
	}

	outBlockStep({block = []} = {}) {
		this._model.outBlockStep({block});
	}

	finishStep({block = []} = {}) {
		this._model.finishStep({block});
	}
}