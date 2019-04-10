import Controller from './controller';
import { ROOT } from '../paths';

export default class GameController extends Controller {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('start', ({ root = {}, player = {}, steps = [], del = []} = {}) => {this.render({root: root, data: {player: player, steps: steps, del: del}})});
		this._view.on('turn', ({ root = {}, user = {}, start = [], end = []} = {}) => {this.doTurn({root, user, start, end})});
		this._model.on('doTurn', ({ root = {}, player = {}, steps = []} = {}) => {this.render({root, data: {player: player, steps: steps}})});
		this._model.on('endGame', ({ winner = {}} = {}) => { alert(`Player: ${winner} win`); this.onNavigate({path: ROOT}); });
	}

	doTurn({root = {}, user = {}, start = [], end = []} = {}) {
		this._model.doTurn({root, user, start, end});
	}
}