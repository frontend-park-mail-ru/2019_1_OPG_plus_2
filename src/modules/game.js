export default class Game {
    constructor() {
        this.listeners = ['Player1', 'Player2']; // игроки
		// инициализируем игру
        this._startStep = []; // начальная позиция
        this._secondStep = [] // второй ход, чтобы понять, куда можно ходить, а куда нет
		this._endStep = []; // конечная позиция
		this._x = true; // можно ли ходить по x
	    this._y = true; // можно ли ходить по y
		this._firstFlag = false; // данная клетка обрабатывается впервые
		this._points = [null, null]; // каретка, которая отслеживает предыдущую точку и последуюущую точку
		this._forwards = null; // направление движения (true - вверх или вправо, false - вниз или влево)
		this._close = [1, 13, 15, 8]; // заблокированные клетки TODO подумать как их генерировать
		this._del = []; // удаленные клетки
		this._whoseTurn = this.listeners[0];
		this._cellsCount = 21;
		this._steps = [];
		this._firstPlayerSteps = [];
		this._secondPlayerSteps = [];
		this._stopFlag = false;
        this._isStart = false;
        this._isRender = true; // призвано заменить isStart
        this._winner = false;
    }

    getGameState() {
        return {
            start: this._start,
            end: this._end,
            x: this._x,
            y: this._y,
            firstFlag: this._firstFlag,
            points: this._points,
            forwards: this._forwards,
            close: this._close,
            del: this._del,
            whoseTurn: this._whoseTurn,
            cellsCount: this._cellsCount,
            steps: this._steps,
            firstPlayerSteps: this._firstPlayerSteps,
            secondPlayerSteps: this._secondPlayerSteps,
            stopFlag: this._stopFlag,
            isStart: this._isStart,
            isRender: this._isRender,
            winner: this._winner,
        }
    }

    reset() {
        this._stopFlag = false;
		this._del = [];
		this._x = true;
		this._y = true;
		this._firstFlag = false,
		this._start = [];
		this._end = [];
		this._forward = null;
		this._winner = false;
    }

    check() {
        let difference = 0;
		if (this._start.length) {
			this._start[0] - this._end[0] ? difference = Math.abs(this._start[0] - this._end[0]) + 1 : difference = Math.abs(this._start[1] - this._end[1]) + 1;
			if (this._cellsCount - difference <= 1) {
                this._winner = this._whoseTurn;
                return true;
				// this.emit('endGame', {root: root, gameState: this._game});
			}
        }
        
        this._cellsCount -= difference;
        return false;
    }

    startStep(block) {
        if (block) {
            let intBlock = parseInt(block);
            let point = [parseInt( intBlock  / 5, 10 ), parseInt( intBlock  % 5, 10 )]; // получили значение точки в матричных коорд
            this._isRender = false;

            if (this._steps.indexOf( intBlock ) == -1 && this._close.indexOf( intBlock  ) === -1) {
                this._steps.push( intBlock );
                this._points[1] = point;
                this._start = point;
            } else if (this._close.indexOf( intBlock ) !== -1) {
                return false;
            }

            return true;
        }
    }

    overBlockStep(block) {
        if (block) {
            let intBlock = parseInt(block, 10);
            let point = [parseInt(intBlock / 5, 10), parseInt(intBlock % 5, 10)];

            if (!this._firstFlag && !this._points[0]) {
                this._firstFlag = true;
                // случай, если сходили по диагонали
                if (this._points[1][0] - this._points[0][0] && this._points[1][1] - this._points[0][1]) {
                    return;
                }

                this._secondStep = point;
                return true;
            }
        }

        // if (block) {
		// 	this._points[1] = [parseInt(+block / 5, 10), parseInt(+block% 5, 10)]; // записали значение в over

		// 	if (this._firstFlag !== true && this._points[0] !== null) {
		// 		this._firstFlag = true;
		// 		if (this._points[1][0] - this._points[0][0] && this._points[1][1] - this._points[0][1]) {
		// 			return;
		// 		}

		// 		this._points[1][0] - this._points[0][0] 
		// 				? this._x = false 
		// 				: this._y = false;

		// 		if (!this._y) {
		// 			if (this._points[1][1] - this._points[0][1] > 0) {
		// 				this._forward = true;
		// 			} else {
		// 				this._forward = false;
		// 			}
		// 		} else if (!this._x) {
		// 			if (this._points[1][0] - this._points[0][0] > 0) {
		// 				this._forward = true;
		// 			} else {
		// 				this._forward = false;
		// 			}
		// 		}
		// 	}

		// 	if (!this._y) { // случаи для движения по x
		// 		if ((this._points[1][1] - this._points[0][1] > 0 && this._forward) 
		// 					|| (this._points[1][1] - this._points[0][1] < 0 
		// 						&& !this._forward)) { // шли вправо идем вправа

		// 			if (this._close.indexOf(parseInt(block, 10)) === -1 
		// 						&& !this._stopFlag 
		// 						&& this._steps.indexOf(parseInt(block, 10)) === -1) {
		// 				this._steps.push(parseInt(block ,10));

		// 				this._whoseTurn === 'Player1' 
		// 						? this._firstPlayerSteps.push(parseInt(block ,10)) 
		// 						: this._secondPlayerSteps.push(parseInt(block ,10));
						
		// 				if (this._del.indexOf(parseInt(block, 10)) != -1) { 
		// 					delete this._del[this._del.indexOf(parseInt(block, 10))]
		// 				}

		// 				// this.emit('endOverBlockStep', {root: root, gameState: this._game});
		// 			} else {
		// 				this._stopFlag = true;
		// 			}

		// 		} else if ((this._points[1][1] - this._points[0][1] < 0 && this._forward) 
		// 					|| (this._points[1][1] - this._points[0][1] > 0 
		// 						&& !this._forward)) { // шли вправо идем влево
				
		// 			if (this._whoseTurn === 'Player1' 
		// 				&& this._firstPlayerSteps.indexOf( this._points[0][0] * 5 + this._points[0][1] ) != -1) {
		// 				this._del.push(this._points[0][0] * 5 + this._points[0][1]);
		// 				delete this._steps[this._steps.indexOf(this._points[0][0] * 5 + this._.points[0][1])];
		// 				delete this._firstPlayerSteps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 			} 
		// 			if (this._whoseTurn === 'Player2'
		// 						&& this._secondPlayerSteps.indexOf( this._points[0][0] * 5 + this._points[0][1] ) != -1) {
		// 				this._del.push(this._points[0][0] * 5 + this._points[0][1]);
		// 				delete this._steps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 				delete this._secondPlayerSteps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 			}

		// 			if (this._close.indexOf(parseInt(block, 10)) != -1 && this._stopFlag) {
		// 				this._stopFlag = false;
		// 			} else if (this._steps.indexOf( parseInt(block, 10) != -1)
		// 						&& this._stopFlag) {
		// 				this._stopFlag = false;
		// 			}
						

		// 			// this.emit('endOverBlockStep', {gameState: this._game});
		// 		} else if (this._points[1][0] - this._points[0][0]) {
		// 			console.log('you can\'t move on y');
		// 		}

		// 	} else if (!this._x) { // случаи для движения по y
		// 		if ((this._points[1][0] - this._points[0][0] > 0 && this._forward) 
		// 			|| (this._points[1][0] - this._points[0][0] < 0 && !this._forward)) { // шли вправо идем вперед

		// 			if (this._close.indexOf(parseInt(block, 10)) === -1 
		// 					&& !this._stopFlag 
		// 					&& this._steps.indexOf(parseInt(event.target.textContent, 10)) === -1) {
		// 				this._steps.push(parseInt(block ,10));

		// 				this._whoseTurn === 'Player1' 
		// 						? this._firstPlayerSteps.push(parseInt(block ,10)) 
		// 						: this._secondPlayerSteps.push(parseInt(block ,10));

		// 				if (this._del.indexOf(parseInt(block, 10)) != -1) { 
		// 					delete this._del[this._del.indexOf(parseInt(block, 10))]
		// 				}

		// 				this.emit('endOverBlockStep', {root: root, gameState: this._game});
		// 			} else {
		// 				this._stopFlag = true;
		// 			}
		// 		} else if ((this._points[1][0] - this._points[0][0] < 0 && this._forward) 
		// 				|| (this._points[1][0] - this._points[0][0] > 0 
		// 					&& !this._forward)) { // шли вправо идем назад

		// 			if (this._whoseTurn === 'Player1' 
		// 				&& this._firstPlayerSteps.indexOf( this._points[0][0] * 5 + this._points[0][1] ) != -1) {
		// 				this._del.push(this._points[0][0] * 5 + this._points[0][1]);
		// 				delete this._steps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 				delete this._firstPlayerSteps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 			} 
		// 			if (this._whoseTurn === 'Player2'
		// 						&& this._secondPlayerSteps.indexOf( this._points[0][0] * 5 + this._points[0][1] ) != -1) {
		// 				this._del.push(this._points[0][0] * 5 + this._points[0][1]);
		// 				delete this._steps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 				delete this._secondPlayerSteps[this._steps.indexOf(this._points[0][0] * 5 + this._points[0][1])];
		// 			}

		// 			if (this._close.indexOf(parseInt(block, 10)) != -1 && this._stopFlag) {
		// 				this._stopFlag = false;
		// 			} else if (this._steps.indexOf( parseInt(block, 10) != -1)
		// 						&& this._stopFlag) {
		// 				this._stopFlag = false;
		// 			}

		// 			// this.emit('endOverBlockStep', {root: root, gameState: this._game});
		// 		} else if (this._points[1][1] - this._points[0][1]) { // идем по x, чего делать нельзя
		// 			console.log('you can\'t move on x');
		// 		}
		// 	}
		// }
    }

    outBlockStep(block) {
        if (block) {
			this._game.points[0] = [parseInt(+block / 5, 10), parseInt(+block % 5, 10)];
			this.emit('endOutBlockStep', {root: root, gameState: this._game});
		}
    }

    finishStep(block) {
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