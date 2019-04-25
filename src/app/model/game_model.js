import Model from './model';
import { EventEmitterMixin } from '../event_emitter';
import Game from '../../modules/game';
import User from '../../modules/user.js';
import API from '../../modules/API';
import { INIT_EVENT, 
		 END_DOWN_EVENT, 
		 FINISH_GAME_EVENT, 
		 FINISH_STEP_EVENT,
		 END_OVER_BLOCK_EVENT,
		 CHANGE_TIME_EVENT } from '../../modules/events';

export default class GameModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		this._game = new Game();

		if (User.exist()) {
			this.emit(INIT_EVENT, {
				root: root, 
				username: User._username,
				firstPlayer: this._game.getFirstPlayer(), 
				disableBlocks: this._game.getDisableBlocks(),
			});
		} else {
			API.getUser()
				.then((user) => {
					User.set(user);
					this.emit(INIT_EVENT, {
						root: root, 
						username: User._username,
						firstPlayer: this._game.getFirstPlayer(), 
						disableBlocks: this._game.getDisableBlocks(),
					});
				})
				.catch(() => {
					this.emit(INIT_EVENT, {
						root: root, 
						username: 'Player1',
						firstPlayer: this._game.getFirstPlayer(), 
						disableBlocks: this._game.getDisableBlocks(),
					});
				});
		}
	}

	time() {
		let ans = this._game.changeTime();
		this.emit(CHANGE_TIME_EVENT, {ans, player: this._game.getWhoseTurn(), time: this._game.time});
	}

	doStartStep({block = null} = {}) {
		let ans = this._game.doStartStep({block});
		this.emit(END_DOWN_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doOverStep({block = null} = {}) {
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans, steps: this._game.steps});
	}

	doFinishStep({block = null} = {}) {
		this._game.doFinishStep({block}); // вернет true, если ход можно закончить
		let isWinner = this._game.isWinner(); // возвращает true если был win condition
		if (isWinner) { // если ход можно закончить и победитель существует
			// издать событие конца игры
			this.emit(FINISH_GAME_EVENT, {
				winner: this._game.getWinner()}); // по окончании игры нам надо знать победителя
		} else { // если ход можно закончить
			// издать событие конца хода
			this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn()}); // по окончании хода, 
			// нам надо знать, 
			// чей сейчас ход и можно ли его завершить
		}
	}
}