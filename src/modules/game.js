export default class Game {
    constructor({
        listeners = ['Player1', 'Player2'], // игроки
        firstStep = null, // тот, кто будет ходить первым
        disableBlocks = [], // заблокированные блоки
    } = {}) {
        this._listeners = listeners; // игроки
        this._whoseTurn = firstStep; // тот, кто будет ходить первым
        this._disableBlocks = disableBlocks; // заблокированные блоки
        this._steps = []; // шаги текущего игрока(в блоках)
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
        this._pastSteps = []; // массив учета всех шагов
        this._forwards = true;
        this._nextBlock = null;
    }


    // TODO документаци для функций игры

    doStartStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const coordinates = this.getCoordinates({block: intBlock});
        const isDiagonal = this.isDiagonal({coordinates});
        const isEnemyStep = this.isEnemyStep({coordinates});
        const isDisable = this.isDisable({block: intBlock});

        if (!isDiagonal && !isEnemyStep && !isDisable) {
            let isSet = this.setStep({coordinates});
            this._steps.push(intBlock);

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
            this._secondStepFlag = true;
            this._steps.push(intBlock);

            return true;
        } else if (isDisable || isEnemyStep || !isStep) {
            this._stopFlag = true;
        }

        if (!isDisable && isConsistStraight && isStep && !this._stopFlag) {
            this.setStep({coordinates});
            this._steps.push(intBlock);

            return true;
        } else if (isDisable || isEnemyStep) {
            this._stopFlag = true;
        } else if (!isConsistStraight) {
            this._stopFlag = true;
        }

        return false;
    }

    doFinishStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const isDisable = this.isDisable({block: intBlock});
        const lastCoordinates = this.getCoordinates({block: this.getLastBlock()});
        const isBlock = this.isBlock({block: block});

        if ((isDisable && this._steps.length === 0)
            || (this._steps.length === 0)
            || (this._steps.length === 1 && this._pastSteps.includes( intBlock ) && isBlock)) {
            this._stopFlag = false;
            this.reset();

            return false;
        } else {
            this.concatUnion({arr1: this._pastSteps, arr2: this._steps});
            if (!this.isEnd({finishPoint: lastCoordinates})) {
                this.changeSide();
            }
        }

        return true;
    }

    isBlock({block = null} = {}) {
        return !isNaN(+block);
    }

    concatUnion({arr1 = [], arr2 = []} = {}) {
        for (let i = 0; i < arr2.length; i++) {
            if (!arr1.includes(arr2)) {
                arr1.push(arr2[i]);
            }
        }
    }

    getLastBlock(){
        return this._steps[this._steps.length - 1];
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
        this._steps = [];
        this._secondPoint = [];
        this._lastPoint = [];
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
            let rand = 2 + Math.floor(Math.random() * 7); // рандомим колчиество заблокированных блоков

            const numBlocks = 24; // количество блоков на поле для рандома
            [...Array(rand)].forEach(() => { // рандомим заблокированные блоки
                let randomBlock = Math.floor(Math.random() * (numBlocks));
                if (!this._disableBlocks.includes( randomBlock )) {
                    this._disableBlocks.push(randomBlock);
                } else {
                    rand--;
                }
            });

            this._cellsCount -= rand; // устанавливаем количество ходов до выигрыша 
            // в зависимости от количества заблокированных клеток
        }

        return this._disableBlocks;
    }

    isConsistStraight({point = []} = {}) {
        if (point.length) {
            const startPoint = this.getCoordinates({block: this._steps[0]});
            const secondPoint = this.getCoordinates({block: this._steps[1]});

            let firstPart = point[0] * secondPoint[1] 
                - secondPoint[1] * startPoint[0] 
                - startPoint[1] * point[0]
                + startPoint[1] * startPoint[0];

            let secondPart = point[1] * secondPoint[0] 
                        - point[1] * startPoint[0] 
                        - startPoint[1] * secondPoint[0] 
                        + startPoint[1] * startPoint[0];


            return firstPart === secondPart;
        }

        return false;
    }

    isEnd({finishPoint = []} = {}) {
        const startPoint = this.getCoordinates({block: this._steps[0]});
        if (startPoint.length) {
            let difference = startPoint[0] - finishPoint[0] 
                    ? Math.abs(startPoint[0] - finishPoint[0]) + 1 
                    : Math.abs(startPoint[1] - finishPoint[1]) + 1;

            if (this._cellsCount - difference === 0) {
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
        let startPoint = this.getCoordinates({block: this._steps[0]});
        return Math.abs(startPoint[0] - point[0]) === Math.abs(startPoint[1] - point[1]);
    }

    isDisable({block = null} = {}) {
        return this._disableBlocks.includes(block);
    }

    isStep({coordinates = []} = {}) {
        return this._stepsMatrix[coordinates[0]][coordinates[1]] === '*';
    }

    isEnemyStep({coordinates = []} = {}) {
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