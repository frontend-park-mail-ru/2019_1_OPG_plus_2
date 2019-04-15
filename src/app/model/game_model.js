import Model from './model';
import { EventEmitterMixin } from '../event_emitter';

// TODO сделать без перерендринга страницы при одном ходе, для этого надо разсепарэйтить компоненты странички
// TODO сделать запрещенные шаги
// пока что храню массив с шагами и просто отдаю его на рендер(это очень большой недостаток)

export default class GameModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
		this.whoseTurn = null; // какой игрок ходит
		this.cellsCount = 25; // TODO сделать так, чтобы это был не хардкод, 
							  // а вообще это такая штука которая отвечает за заполненность клеток
		this.listeners = ['Player1', 'Player2']; // игроки
		this.steps = []; // сделанные шаги
	}

	getData({root = {}} = {}) {
		this.cellsCount = 21;
		this.whoseTurn = this.listeners[0];
		// инициализируем игру
		this._game = { // состояние игры
			start: [], // начальная позиция
			end: [], // конечная позиция
			x: true, // можно ли ходить по x
			y: true, // можно ли ходить по y
			firstFlag: false, // данная клетка обрабатывается впервые
			points: [null, null], // каретка, которая отслеживает предыдущую точку и последуюущую точку
			forward: null, // направление движения (true - вверх или вправо, false - вниз или влево)
			close: [1, 13, 15, 8], // заблокированные клетки TODO подумать как их генерировать
			del: [], // удаленные клетки
			whoseTurn: this.whoseTurn,
			cellsCount: this.cellsCount,
			steps: [],
			firstPlayerSteps: [],
			secondPlayerSteps: [],
			stopFlag: false,
			isStart: false,
			winner: false,
		};

		this.emit('start', { root: root, gameState: this._game });
	}

	reset() {
		this._game.stopFlag = false;
		this._game.del = [];
		this._game.x = true;
		this._game.y = true;
		this._game.firstFlag = false,
		this._game.start = [];
		this._game.end = [];
		this._game.forward = null;
		this._game.winner = false;
	}

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
	}

	startStep({root = {}, block = []} = {}) {
		if (block) {
			let point = [parseInt(+block / 5, 10), parseInt(+block % 5, 10)];
			this._game.isStart = true;
			if (this._game.steps.indexOf( +block ) === -1 && this._game.close.indexOf( +block ) === -1) {
				this._game.steps.push(+block);
				this._game.points[1] = point;
				this._game.start = point;
			} else if (this._game.close.indexOf( +block ) !== -1) {
				this.emit('endFinishStep', {root: root, gameState: this._game});
			}

		}

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
							delete this._game.del[this._game.del.indexOf(parseInt(block, 10))]
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
				} else if (this._game.points[1][0] - this._game.points[0][0]) {
					console.log('you can\'t move on y');
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
							delete this._game.del[this._game.del.indexOf(parseInt(block, 10))]
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
				} else if (this._game.points[1][1] - this._game.points[0][1]) { // идем по x, чего делать нельзя
					console.log('you can\'t move on x');
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
		if (block && !this._game.stopFlag) {
			this._game.end = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];
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
	}
}