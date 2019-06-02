import Controller from './controller';
import { NavigateMixinController } from '../navigate_controller';
import { SIGN_IN } from '../paths';
import { INIT_EVENT, 
         START_GAME,
         DOWN_EVENT,
         END_DOWN_EVENT,
         UP_BLOCK_EVENT,
         FINISH_STEP_EVENT,
         OVER_BLOCK_EVENT,
         END_OVER_BLOCK_EVENT,
		 FINISH_GAME_EVENT,
		 INIT_ERROR_EVENT } from '../../modules/events';

export default class MultiplayerController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({model, view, router});

		this._model.on(INIT_EVENT, ({root = {}, wait = true} = {}) => this.render({
			root, 
			data: {
				wait
			}
		}));
		
		this._model.on(INIT_ERROR_EVENT, () => this.onNavigate({path: SIGN_IN, redirect: true}));

		this._model.on(START_GAME, (data = {}) => this.startGame(data));
		this._view.on(DOWN_EVENT, ({block = null} = {}) => { this.doStartStep({block}) });
		this._model.on(END_DOWN_EVENT, ({player = 'Player1', ans = false} = {}) => { this.apply({player, ans}) });

		this._view.on(OVER_BLOCK_EVENT, ({block = null} = {}) => {this.doOverBlock({block})});
		this._model.on(END_OVER_BLOCK_EVENT, ({player = 'Player1', ans = false, steps = []} = {}) => {this.apply({player, ans, steps});});

		this._view.on(UP_BLOCK_EVENT, ({block = null} = {}) => {this.doFinishStep({block})});
        // this._model.on(FINISH_STEP_EVENT, ({winner = null, inc = 0, dec = 0, player = 'Player1', whoseTurn = player ,steps = []} = {}) => {this.doEndStep({winner, inc, dec, player, whoseTurn ,steps})});
        this._model.on(FINISH_STEP_EVENT, (data = {}) => this.doEndStep(data));
        
		// this._model.on(FINISH_GAME_EVENT, ({ me,winner = null, player = 'Player1', whoseTurn = player, steps = []} = {}) => {this.doEndStep({winner, player, whoseTurn, steps})}); 
		this._model.on(FINISH_GAME_EVENT, (data = {}) => this.doEndStep(data)); 
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

	doEndStep(data = {}) {
        this._view.endStep(data);
	}
}