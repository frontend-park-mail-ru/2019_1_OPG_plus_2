import Model from './model';
import { EventEmitterMixin } from '../event_emitter';
import API from '../../modules/API';
import User from '../../modules/user.js';

import Game from "../game";
import { ClientPlayer } from "../player";

// TODO сделать без перерендринга страницы при одном ходе, для этого надо разсепарэйтить компоненты странички
// TODO сделать запрещенные шаги
// пока что храню массив с шагами и просто отдаю его на рендер(это очень большой недостаток)

export default class GameModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
		this.whoseTurn = null;
		this.cellsCount = 25; // TODO сделать так, чтобы это был не хардкод, 
							  // а вообще это такая штука которая отвечает за заполненность клеток
		this.listeners = ['Player1', 'Player2'];
		this.steps = [];
	}

	getData({root = {}} = {}) {
		debugger;
		this.cellsCount = 23;
		this.whoseTurn = this.listeners[0];
		this.emit('start', { root: root, player: this.whoseTurn, del: [1, 8] });
	}

	check({start = [], end = []} = {}) {
		let difference = 0;
		start[0] - end[0] ? difference = Math.abs(start[0] - end[0]) + 1 : difference = Math.abs(start[1] - end[1]) + 1;
		if (this.cellsCount - difference <= 1) {
			this.emit('endGame', {winner: this.whoseTurn});
		}

		this.cellsCount -= difference;
		console.log(this.cellsCount);
		this.steps.push([start, end]);
	}
	
	performTurn(){
        this.whoseTurn.doTurn();
    }

	doTurn({root = {}, user = {}, start = [], end = []} = {}) {
		if (user === this.whoseTurn) {
			this.check({start, end});
			if (this.whoseTurn === this.listeners[0]) {
				this.whoseTurn = this.listeners[1];
			} else {
				this.whoseTurn = this.listeners[0];
			}

			this.emit('doTurn', {root: root, player: this.whoseTurn, steps: this.steps});
		}
	}
}