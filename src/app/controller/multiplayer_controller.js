import Controller from './controller';
import { NavigateMixinController } from '../navigate_controller';
import { INIT_EVENT, 
         START_GAME,
         DOWN_EVENT,
         END_DOWN_EVENT,
         UP_BLOCK_EVENT,
         FINISH_STEP_EVENT,
         OVER_BLOCK_EVENT,
         END_OVER_BLOCK_EVENT,
         FINISH_GAME_EVENT } from '../../modules/events';

export default class MultiplayerController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model: model, view: view, router: router});
        this._model.on(INIT_EVENT, ({root= {}, wait = true} = {}) => { this.render({root: root, data: {wait: wait}}) 
        this._model.on(START_GAME, ({wait = true, whoseTurn = 'Player1', me = 'Player1', players = []} = {}) => {
            this.startGame({wait, whoseTurn, me, players});
        })
    });
		this._view.on(DOWN_EVENT, ({block = null} = {}) => { this.doStartStep({block}) });
		this._model.on(END_DOWN_EVENT, ({player = 'Player1', ans = false} = {}) => { this.apply({player, ans}) });

		this._view.on(OVER_BLOCK_EVENT, ({block = null} = {}) => {this.doOverBlock({block})});
		this._model.on(END_OVER_BLOCK_EVENT, ({player = 'Player1', ans = false, steps = []} = {}) => {this.apply({player, ans, steps});});

		this._view.on(UP_BLOCK_EVENT, ({block = null} = {}) => {this.doFinishStep({block})});
        this._model.on(FINISH_STEP_EVENT, ({winner = null, player = 'Player1', whoseTurn = player ,steps = []} = {}) => {this.doEndStep({winner, player, whoseTurn ,steps})});
        
		this._model.on(FINISH_GAME_EVENT, ({ winner = null, player = 'Player1', whoseTurn = player, steps = []} = {}) => {this.doEndStep({winner, player, whoseTurn, steps})}); 
    }
    
    startGame(data) {
        this._view._render(data);
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

	apply({player = 'Player1', ans = false, steps = []} = {}) {
		this._view.apply({player, ans, steps});
	}

	doEndStep({winner = null, player = 'Player1', whoseTurn, steps = []} = {}) {
        this._view.endStep({winner, player, whoseTurn, steps});
	}
}