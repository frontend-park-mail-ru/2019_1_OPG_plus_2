import Model from './model';
import { EventEmitterMixin } from '../event_emitter';
import Game from '../../modules/game';
import { INIT_EVENT, 
		 END_DOWN_EVENT, 
		 FINISH_GAME_EVENT, 
		 FINISH_STEP_EVENT,
		 END_OVER_BLOCK_EVENT } from '../../modules/events';

export default class GameModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		this._game = new Game();

		this.emit(INIT_EVENT, {
			root: root, 
			firstPlayer: this._game.getFirstPlayer(), 
			disableBlocks: this._game.getDisableBlocks(),
		});
	}

	doStartStep({block = null} = {}) {
		let ans = this._game.doStartStep({block});
		this.emit(END_DOWN_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doOverStep({block = null} = {}) {
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doFinishStep({block = null} = {}) {
		let ans = this._game.doFinishStep({block}); // вернет true, если ход можно закончить
		let isWinner = this._game.isWinner(); // возвращает true если был win condition
		if (ans && isWinner) { // если ход можно закончить и победитель существует
			// издать событие конца игры
			this.emit(FINISH_GAME_EVENT, {
				winner: this._game.getWinner()}); // по окончании игры нам надо знать победителя
		} else if (ans) { // если ход можно закончить
			// издать событие конца хода
			this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn(), ans: ans}); // по окончании хода, 
																						// нам надо знать, 
																						// чей сейчас ход и можно ли его завершить
		}
	}
}