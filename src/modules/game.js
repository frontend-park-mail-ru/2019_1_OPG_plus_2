export default class Game {
    constructor({
        listeners = ['Player1', 'Player2'], // игроки
        firstStep = null, // тот, кто будет ходить первым
        disableBlocks = [], // заблокированные блоки
    } = {}) {
        this._listeners = listeners; // игроки
        this._whoseTurn = firstStep; // тот, кто будет ходить первым
        this._disableBlocks = disableBlocks; // заблокированные блоки
        this._startPoint = []; // начальная позиция хода
        this._secondPoint = []; // вторая точка, для инициализации хода TODO сбросить при наведении на startPoint
        this._lastPoint = []; // последняя запоменная точка
        this._secondStepFlag = false; // флаг, есть ли второй шаг(это нужно для уравнения прямой)
        this._firstPlayerStep = 'x'; // обозначение хода первого игрока
        this._secondPlayerStep = 'o'; // обозначение хода второго игрока
        this._stepsMatrix = [['*', '*', '*', '*', '*'], // матрица ходов
                             ['*', '*', '*', '*', '*'],
                             ['*', '*', '*', '*', '*'],
                             ['*', '*', '*', '*', '*'],
                             ['*', '*', '*', '*', '*']];
        this._cellsCount = 25; // количество оставшихся шагов
        this._winner = null; // победитель
        this._stopFlag = false; // флаг для остановки отрисовки
    }


    // TODO документаци для функций игры

    doStartStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const coordinates = this.getCoordinates({block: intBlock});
        const isDiagonal = this.isDiagonal({coordinates});
        const isEnemyStep = this.isEnemyStep({coordinates});
        const isDisable = this.isDisable({block: intBlock});
        this._startPoint = coordinates;

        if (!isDiagonal && !isEnemyStep && !isDisable) {
            this._lastPoint = coordinates;
            let isSet = this.setStep({coordinates});

            return isSet;
        } else if (isDisable || isEnemyStep) {
            this._stopFlag = true;
        }

        return false;
    }

    doStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const coordinates = this.getCoordinates({block: intBlock});
        const isDiagonal = this.isDiagonal({coordinates});
        const isStep = this.isStep({coordinates});
        const isDisable = this.isDisable({block: intBlock});
        const isEnemyStep = this.isEnemyStep({coordinates});
        const isConsistStraight = this.isConsistStraight({point: coordinates});

        if (!this._secondStepFlag && !isDiagonal && isStep && !isDisable && !this._stopFlag) {
            this.setStep({coordinates});
            this._lastPoint = coordinates;
            this._secondPoint = coordinates;
            this._secondStepFlag = true;

            return true;
        } else if (isDisable || isEnemyStep || !isStep) {
            this._stopFlag = true;
        }

        if (!isDisable && isConsistStraight && isStep && !this._stopFlag) {
            this.setStep({coordinates});
            this._lastPoint = coordinates;

            return true;
        } else if (isDisable || isEnemyStep) {
            this._stopFlag = true;
        }

        return false;
    }

    doFinishStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const coordinates = this.getCoordinates({block: intBlock});
        const firstBlock = this.getBlock({coordinates: this._startPoint});
        const isFirstDisable = this.isDisable({block: firstBlock});
        const isDisable = this.isDisable({block: intBlock});
        const isFirstEnemyStep = this.isEnemyStep({coordinates: this._startPoint});
        const isPointsEqv = this.isPointsEqv({point1: this._startPoint, point2: coordinates});

        if ((isDisable && this._stopFlag && isPointsEqv) || isFirstDisable || isFirstEnemyStep) {
            this._stopFlag = false;             
        } else {
            if (!this.isEnd({finishPoint: this._lastPoint})) {
                this.changeSide();
            }
        }

        return true;
    }

    getCoordinates({block = null} = {}) {
        return [parseInt(block / 5, 10), parseInt(block % 5, 10)];
    }

    getBlock({coordinates = []} = {}) {
        return coordinates[0] * 5 + coordinates[1];
    }

    isPointsEqv({point1 = [], point2 = []} = {}) {
        return point1[0] === point2[0] && point1[1] === point2[1];
    }

    reset() {
        this._secondPoint = [];
        this._secondStepFlag = false;
        this._stopFlag = false;
    }

    getFirstPlayer() {
        if (!this._whoseTurn) {
            const rand = Math.floor(Math.random() *  this._listeners.length);
            this._whoseTurn = this._listeners[rand];
        }

        return this._whoseTurn;
    }

    getDisableBlocks() {
        if (!this._disableBlocks.length) {
            const min = 2; // минимальное количество блоков, которое можно заблокировать на поле
            const max = 8; // максимальное колчиество блоков, которое можно заблокировать на поле
            const rand = min + Math.floor(Math.random() * (max + 1 - min)); // рандомим колчиество
            this._cellsCount -= rand; // устанавливаем количество ходов до выигрыша 
                                     // в зависимости от количества заблокированных клеток

            const numBlocks = 24; // количество блоков на поле для рандома
            [...Array(rand)].forEach(() => { // рандомим заблокированные блоки
                let randomBlock = Math.floor(Math.random() * (numBlocks));
                this._disableBlocks.push(randomBlock);
            });
        }

        return this._disableBlocks;
    }

    isConsistStraight({point = []} = {}) {
        if (point.length) {
            let firstPart = point[0] * this._secondPoint[1] 
                - this._secondPoint[1] * this._startPoint[0] 
                - this._startPoint[1] * point[0]
                + this._startPoint[1] * this._startPoint[0];

            let secondPart = point[1] * this._secondPoint[0] 
                            - point[1] * this._startPoint[0] 
                            - this._startPoint[1] * this._secondPoint[0] 
                            + this._startPoint[1] * this._startPoint[0];

            return firstPart === secondPart;
        }

        return false;
    }

    isEnd({finishPoint = []} = {}) {
        if (this._startPoint.length) {
            let difference = this._startPoint[0] - finishPoint[0] 
                    ? Math.abs(this._startPoint[0] - finishPoint[0]) + 1 
                    : Math.abs(this._startPoint[1] - finishPoint[1]) + 1;
            
            if (this._cellsCount - difference <= 1) {
                this._winner = this._whoseTurn === this._listeners[0] 
                        ? this._listeners[1] 
                        : this._listeners[0];
                
                return true;
            }

            this._cellsCount -= difference;

            return false;
        }
    }

    changeSide() {
        this._whoseTurn === this._listeners[0] 
            ? this._whoseTurn = this._listeners[1] 
            : this._whoseTurn = this._listeners[0];
        this.reset();
    }

    isWinner() {
        return this._winner ? true : false;
    }

    getWinner() {
        return this._winner;
    }

    getWhoseTurn() {
        return this._whoseTurn;
    }

    isDiagonal({point = []} = {}) {
        return Math.abs(this._startPoint[0] - point[0]) === Math.abs(this._startPoint[1] - point[1]);
    }

    isDisable({block = null} = {}) {
        return this._disableBlocks.includes(block);
    }

    isStep({coordinates = []} = {}) {
        return this._stepsMatrix[coordinates[0]][coordinates[1]] === '*';
    }

    isEnemyStep({coordinates}) {
        if (this._whoseTurn === this._listeners[0]) {
            return this._stepsMatrix[coordinates[0]][coordinates[1]] === this._secondPlayerStep;
        } else {
            return this._stepsMatrix[coordinates[0]][coordinates[1]] === this._firstPlayerStep;
        }
    }

    setStep({coordinates = []} = {}) {
        if (this.isStep({coordinates})) {
            this._whoseTurn === this._listeners[0] 
                ? this._stepsMatrix[coordinates[0]][coordinates[1]] = this._firstPlayerStep 
                : this._stepsMatrix[coordinates[0]][coordinates[1]] = this._secondPlayerStep;
            return true;
        }

        return false;
    }
}