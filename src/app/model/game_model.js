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

<<<<<<< HEAD
	doOverStep({block = null} = {}) {
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
=======
	check(root) {
		let difference = 0;
		if (this._game.start.length) {
			this._game.start[0] - this._game.end[0] ? difference = Math.abs(this._game.start[0] - this._game.end[0]) + 1 : difference = Math.abs(this._game.start[1] - this._game.end[1]) + 1;
			if (this._game.cellsCount - difference === 0) {
				this._game.whoseTurn === 'Player1' ? this._game.winner = 'Player2' : this._game.winner = 'Player1'; 
				this.emit('endGame', {root: root, gameState: this._game});
			}
		}

		this._game.cellsCount -= difference;
>>>>>>> 9878cebfb65e3b2efd3fd62f8a5c20fea73e09a9
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
<<<<<<< HEAD
=======

		this.emit('endStartStep', {root: root, gameState: this._game});
	}

	overBlockStep({root = {}, block = []} = {}) {
		if (block) {
			this._game.points[1] = [parseInt(+block / 5, 10), parseInt(+block% 5, 10)]; // записали значение в over

			if (this._game.firstFlag !== true && this._game.points[0] !== null) {
				this._game.firstFlag = true;
				if (this._game.points[1][0] - this._game.points[0][0] && this._game.points[1][1] - this._game.points[0][1]) {
					return;
				}

				this._game.points[1][0] - this._game.points[0][0] 
					? this._game.x = false 
					: this._game.y = false;

				if (!this._game.y) {
					if (this._game.points[1][1] - this._game.points[0][1] > 0) {
						this._game.forward = true;
					} else {
						this._game.forward = false;
					}
				} else if (!this._game.x) {
					if (this._game.points[1][0] - this._game.points[0][0] > 0) {
						this._game.forward = true;
					} else {
						this._game.forward = false;
					}
				}
			}

			if (!this._game.y) { // случаи для движения по x
				if ((this._game.points[1][1] - this._game.points[0][1] > 0 && this._game.forward) 
							|| (this._game.points[1][1] - this._game.points[0][1] < 0 
								&& !this._game.forward)) { // шли вправо идем вправа

					if (this._game.close.indexOf(parseInt(event.target.textContent, 10)) === -1 
								&& !this._game.stopFlag 
								&& this._game.steps.indexOf(parseInt(event.target.textContent, 10)) === -1) {
						this._game.steps.push(parseInt(block ,10));

						this._game.whoseTurn === 'Player1' 
							? this._game.firstPlayerSteps.push(parseInt(block ,10)) 
							: this._game.secondPlayerSteps.push(parseInt(block ,10));
						
						if (this._game.del.indexOf(parseInt(block, 10)) != -1) { 
							delete this._game.del[this._game.del.indexOf(parseInt(block, 10))];
						}

						this.emit('endOverBlockStep', {root: root, gameState: this._game});
					} else {
						this._game.stopFlag = true;
					}

				} else if ((this._game.points[1][1] - this._game.points[0][1] < 0 && this._game.forward) 
							|| (this._game.points[1][1] - this._game.points[0][1] > 0 
								&& !this._game.forward)) { // шли вправо идем влево
				
					if (this._game.whoseTurn === 'Player1' 
						&& this._game.firstPlayerSteps.indexOf( this._game.points[0][0] * 5 + this._game.points[0][1] ) != -1) {
						this._game.del.push(this._game.points[0][0] * 5 + this._game.points[0][1]);
						delete this._game.steps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
						delete this._game.firstPlayerSteps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
					} 
					if (this._game.whoseTurn === 'Player2'
								&& this._game.secondPlayerSteps.indexOf( this._game.points[0][0] * 5 + this._game.points[0][1] ) != -1) {
						this._game.del.push(this._game.points[0][0] * 5 + this._game.points[0][1]);
						delete this._game.steps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
						delete this._game.secondPlayerSteps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
					}

					if (this._game.close.indexOf(parseInt(block, 10)) != -1 && this._game.stopFlag) {
						this._game.stopFlag = false;
					} else if (this._game.steps.indexOf( parseInt(block, 10) != -1)
								&& this._game.stopFlag) {
						this._game.stopFlag = false;
					}
						

					this.emit('endOverBlockStep', {gameState: this._game});
				}

			} else if (!this._game.x) { // случаи для движения по y
				if ((this._game.points[1][0] - this._game.points[0][0] > 0 && this._game.forward) 
					|| (this._game.points[1][0] - this._game.points[0][0] < 0 && !this._game.forward)) { // шли вправо идем вперед

					if (this._game.close.indexOf(parseInt(block, 10)) === -1 
							&& !this._game.stopFlag 
							&& this._game.steps.indexOf(parseInt(event.target.textContent, 10)) === -1) {
						this._game.steps.push(parseInt(block ,10));

						this._game.whoseTurn === 'Player1' 
							? this._game.firstPlayerSteps.push(parseInt(block ,10)) 
							: this._game.secondPlayerSteps.push(parseInt(block ,10));

						if (this._game.del.indexOf(parseInt(block, 10)) != -1) { 
							delete this._game.del[this._game.del.indexOf(parseInt(block, 10))];
						}

						this.emit('endOverBlockStep', {root: root, gameState: this._game});
					} else {
						this._game.stopFlag = true;
					}
				} else if ((this._game.points[1][0] - this._game.points[0][0] < 0 && this._game.forward) 
						|| (this._game.points[1][0] - this._game.points[0][0] > 0 
							&& !this._game.forward)) { // шли вправо идем назад

					if (this._game.whoseTurn === 'Player1' 
						&& this._game.firstPlayerSteps.indexOf( this._game.points[0][0] * 5 + this._game.points[0][1] ) != -1) {
						this._game.del.push(this._game.points[0][0] * 5 + this._game.points[0][1]);
						delete this._game.steps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
						delete this._game.firstPlayerSteps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
					} 
					if (this._game.whoseTurn === 'Player2'
								&& this._game.secondPlayerSteps.indexOf( this._game.points[0][0] * 5 + this._game.points[0][1] ) != -1) {
						this._game.del.push(this._game.points[0][0] * 5 + this._game.points[0][1]);
						delete this._game.steps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
						delete this._game.secondPlayerSteps[this._game.steps.indexOf(this._game.points[0][0] * 5 + this._game.points[0][1])];
					}

					if (this._game.close.indexOf(parseInt(block, 10)) != -1 && this._game.stopFlag) {
						this._game.stopFlag = false;
					} else if (this._game.steps.indexOf( parseInt(block, 10) != -1)
								&& this._game.stopFlag) {
						this._game.stopFlag = false;
					}

					this.emit('endOverBlockStep', {root: root, gameState: this._game});
				}
			}
		}
	}

	outBlockStep({root = {}, block = []} = {}) {
		if (block) {
			this._game.points[0] = [parseInt(+block / 5, 10), parseInt(+block % 5, 10)];
			this.emit('endOutBlockStep', {root: root, gameState: this._game});
		}
	}

	finishStep({root = {}, block = []} = {}) {
		let intBlock = +block;
		if (intBlock && !this._game.stopFlag) {
			this._game.end = [parseInt(intBlock / 5, 10), parseInt(intBlock % 5, 10)];
		} else {
			let lastStep = this._game.steps[this._game.steps.length - 1];
			this._game.end = [parseInt(lastStep / 5, 10), parseInt(lastStep % 5, 10)];
		}

		this.check(root);
		if (this._game.whoseTurn === this.listeners[0]) {
			this._game.whoseTurn = this.listeners[1];
		} else {
			this._game.whoseTurn = this.listeners[0];
		}

		this.reset();
		this.emit('endFinishStep', {root: root, gameState: this._game});
>>>>>>> 9878cebfb65e3b2efd3fd62f8a5c20fea73e09a9
	}
}