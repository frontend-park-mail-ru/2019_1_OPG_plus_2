import Controller from './controller';
import { ROOT } from '../paths';
import { NavigateMixinController } from '../navigate_controller';
import { INIT_EVENT, 
		 DOWN_EVENT, 
		 END_DOWN_EVENT, 
		 UP_BLOCK_EVENT, 
		 FINISH_STEP_EVENT, 
		 FINISH_GAME_EVENT,
		 OVER_BLOCK_EVENT,
		 END_OVER_BLOCK_EVENT} from '../../modules/events';

export default class GameController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
		this._model.on(INIT_EVENT, ({root = {}, firstPlayer = 'Player1', disableBlocks = []} = {}) => {
			this.render({ 
				root: root, 
				data: {
					whoseTurn: firstPlayer, 
					disableBlocks: disableBlocks
				}
			})
		});
		this._view.on(DOWN_EVENT, ({block = null} = {}) => {this.doStartStep({block})});
		this._model.on(END_DOWN_EVENT, ({player = 'Player1', ans = false} = {}) => {this.apply({player, ans})});

		this._view.on(OVER_BLOCK_EVENT, ({block = null} = {}) => {this.doOverBlock({block})});
		this._model.on(END_OVER_BLOCK_EVENT, ({player = 'Player1', ans = false} = {}) => {this.apply({player, ans})});

		this._view.on(UP_BLOCK_EVENT, ({block = null} = {}) => {this.doFinishStep({block})});
		this._model.on(FINISH_STEP_EVENT, ({winner = null, player = 'Player1', ans = false} = {}) => {this.doEndStep({winner, player, ans})});
		this._model.on(FINISH_GAME_EVENT, ({winner = null, ans = false, player = 'Player1'} = {}) => {this.doEndStep({winner, ans, player})}); 
	}

	doStartStep({block = null} = {}) {
		this._model.doStartStep({block});
	}

	doOverBlock({block = null} = {}) {
		this._model.doOverStep({block}); 
	}

	doFinishStep({block = null} = {}) {
		this._model.doFinishStep({block});
	}

	apply({player = 'Player1', ans = false} = {}) {
		this._view.apply({player, ans});
	}

	doEndStep({winner = null, ans = false, player = 'Player1'} = {}) {
		this._view.endStep({winner, ans, player});
	}
}