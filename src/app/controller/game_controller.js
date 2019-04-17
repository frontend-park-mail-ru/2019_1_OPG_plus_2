import Controller from './controller';
<<<<<<< HEAD
import { NavigateMixinController } from '../navigate_controller';
import { INIT_EVENT, 
		 DOWN_EVENT, 
		 END_DOWN_EVENT, 
		 UP_BLOCK_EVENT, 
		 FINISH_STEP_EVENT, 
		 FINISH_GAME_EVENT,
		 OVER_BLOCK_EVENT,
		 END_OVER_BLOCK_EVENT } from '../../modules/events';
=======
import { NavigateMixinController  } from '../navigate_controller';
>>>>>>> 9878cebfb65e3b2efd3fd62f8a5c20fea73e09a9

export default class GameController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
<<<<<<< HEAD
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
		this._model.on(FINISH_STEP_EVENT, ({winner = null, player = 'Player1'} = {}) => {this.doEndStep({winner, player})});
		this._model.on(FINISH_GAME_EVENT, ({winner = null, player = 'Player1'} = {}) => {this.doEndStep({winner, player})}); 
	}

	doStartStep({block = null} = {}) {
		this._model.doStartStep({block});
=======
		super({ model: model, view: view, router: router });
		this._model.on('start', ({root = {}, gameState = {}} = {}) => {this.render({root: root, data: gameState});});
		this._view.on('startStep', ({ root = {}, block = [] } = {}) => {this.startStep({root: root, block});});
		this._model.on('endStartStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState});});
		this._view.on('overBlockStep', ({root = {}, block = [] } = {}) => {this.overBlockStep({root: root, block});});
		this._model.on('endOverBlockStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState});});
		this._view.on('outBlockStep', ({ root = {}, block = [] } = {}) => {this.outBlockStep({root: root, block});});
		this._model.on('endOutBlockStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState});});
		this._view.on('finishStep', ({ root = {}, block = [] } = {}) => {this.finishStep({root: root, block});});
		this._model.on('endFinishStep', ({ root = {}, gameState = {} } = {}) => {this.render({root: root, data: gameState});});
		this._model.on('endGame', ({ root = {}, gameState = {}} = {}) => {this.render({root: root, data: gameState});});
>>>>>>> 9878cebfb65e3b2efd3fd62f8a5c20fea73e09a9
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

	doEndStep({winner = null, player = 'Player1'} = {}) {
		this._view.endStep({winner, player});
	}
}