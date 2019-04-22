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
        this._ans = true;
    }

    /**
     * Handles the first step
     * @param Object Object with block
     * @returns {bool} Return true if you can set the block
     */
    doStartStep({block = null} = {}) {
        if (this.isBlock({block})) {
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
        }

        return false;
    }

    /**
     * Handles each step between first and finish steps
     * @param Object Object with block
     * @returns {bool} Return true if you can set the block
     */
    doStep({block = null} = {}) {
        if (this.isBlock({block})) {
            const intBlock = parseInt(block, 10);
            const coordinates = this.getCoordinates({block: intBlock});
            const isDiagonal = this.isDiagonal({point: coordinates});
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

            if (!isDisable && isConsistStraight && isStep && !this._stopFlag && !isDiagonal) {
                this.setStep({coordinates});
                this._steps.push(intBlock);

                // this.check();

                return this.check();
            } else if (isDisable || isEnemyStep) {
                this._stopFlag = true;
            } else if (!isConsistStraight) {
                this._stopFlag = true;
            }

            return false;
        }
    }

    get steps() {
        return this._steps;
    }

    /**
     * Return array of missing values
     * @param {int} a start of slice
     * @param {int} b finish of slice
     * @returns {Array} Return array from a to b
     */
    getMissX(a, b) {
        let miss = [];
        if (b) {
            if (a < b) {
                for (let i = a+1; i < b; i++) {
                    if (!this._disableBlocks.includes(i) && !this.isSet({block: i})) {
                        miss.push(i)
                    } else {
                        this._ans = false;
                    }
                }
            } else {
                for (let i = a-1; i > b; i--) {
                    if (!this._disableBlocks.includes(i) && !this.isSet({block: i})) {
                        miss.push(i)
                    } else {
                        this._ans = false;
                    }
                }
            }
        }

        return miss;
    }

    /**
     * Return array of missing values
     * @param {int} a start of slice
     * @param {int} b finish of slice
     * @returns {Array} Return array from a to b
     */
    getMissY(a, b) {
        let miss = [];
        if (b) {
            if (a < b) {
                for (let i = a+5; i < b; i+=5) {
                    if (!this._disableBlocks.includes(i) && !this.isSet({block: i})) {
                        miss.push(i)
                    } else {
                        this._ans = false;
                    }
                }
            } else {
                for (let i = a-5; i > b; i-=5) {
                    if (!this._disableBlocks.includes(i) && !this.isSet({block: i})) {
                        miss.push(i)
                    } else {
                        this._ans = false;
                    }
                }
            }
        }
        
        return miss;
    }


    /**
     * Check integrity of step
     * @returns {bool} Return true if you can set this steps
     */
    check() {
        if (this._steps.length === 1) {
          return this._ans;
        }
        
        const begin = this._steps[0];
        const end = this._steps[this._steps.length - 1];
        const diff = Math.abs(end  - begin);

        if (diff < 5) {

            console.log("before: ", this._steps);

            this._steps.forEach((el, i) => {
                if (Math.abs(el-this._steps[i+1]) != 1) {
                  this._steps.splice(i+1, 0, ...this.getMissX(el, this._steps[i+1]));
                }
            });

            console.log("after: ", this._steps, this._ans);

            return this._ans;
        } else {
            this._steps.forEach((el, i) => {
                if (Math.abs(el-this._steps[i+1]) != 5) {
                  this._steps.splice(i+1, 0, ...this.getMissY(el, this._steps[i+1]))
                }
            });

            return this._ans;
        }
    }

    /**
     * Check is block set
     * @param Object Object with block 
     * @returns {bool} Return true if block doesn't set
     */
    isSet({block = []} = {}) {
        const coords = this.getCoordinates({block: block});
        return this._stepsMatrix[coords[0]][coords[1]] !== '*';
    }

    /**
     * Handles the finish step
     * @param Object Object with block
     * @returns {bool} Return true if you can set the block
     */
    doFinishStep({block = null} = {}) {
        const intBlock = parseInt(block, 10);
        const isDisable = this.isDisable({block: intBlock});
        const lastCoordinates = this.getCoordinates({block: this.getLastBlock()});

        if ((isDisable && this._steps.length === 0)
            || (this._steps.length === 0)) {
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

    /**
     * Checks if an item is a block
     * @param Object Object with block
     * @returns {bool} True if managed to convert into int
     */
    isBlock({block = null} = {}) {
        return !isNaN(+block);
    }

    /**
     * Concatenate two array and make union
     * @param Object Object with two arrays
     */
    concatUnion({arr1 = [], arr2 = []} = {}) {
        for (let i = 0; i < arr2.length; i++) {
            if (!arr1.includes(arr2)) {
                arr1.push(arr2[i]);
            }
        }
    }

    /**
     * Get last step from user array steps
     * @returns {int} Returns int block
     */
    getLastBlock() {
        return this._steps[this._steps.length - 1];
    }

    /**
     * Convert block in coordinates for 5 to 5 field
     * @param Object Object with block
     * @returns {Array} Returns array of coordinates [y, x]
     */
    getCoordinates({block = null} = {}) {
        return [parseInt(block / 5, 10), parseInt(block % 5, 10)];
    }

    /**
     * Convert coordinates to block for 5 to 5 field
     * @param Object Object with array of coordinates [y, x]
     * @returns {int} Returns int number
     */
    getBlock({coordinates = []} = {}) {
        return coordinates[0] * 5 + coordinates[1];
    }

    /**
     * Compares two points
     * @param Object Object with two points
     * @returns {bool} Returns true if x1 = x1 and y1 = y2
     */
    isPointsEqv({point1 = [], point2 = []} = {}) {
        return point1[0] === point2[0] && point1[1] === point2[1];
    }

    /**
     * Reset user game state
     */
    reset() {
        this._ans = true;
        this._steps = [];
        this._secondPoint = [];
        this._lastPoint = [];
        this._secondStepFlag = false;
        this._stopFlag = false;
    }

    /**
     * Get palyer what start the game
     * @returns {int} Returns true if x1 == x1 and y1 == y2
     */
    getFirstPlayer() {
        if (!this._whoseTurn) {
            const rand = Math.floor(Math.random() *  this._listeners.length);
            this._whoseTurn = this._listeners[rand];
        }

        return this._whoseTurn;
    }

    /**
     * Get disabled blocks for field
     * @returns {Array} Returns array of blocks
     */
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

    /**
     * Check is point consist to straight(need in two init point)
     * @param Object Object with point
     * @returns {bool} Returns true consist else false
     */
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

    /**
     * Check is win condition happend and if not reduces stepsCount
     * @param Object Object with point
     * @returns {bool} Returns true if happend
     */
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

    /**
     * Change side for turn
     */
    changeSide() {
        this._whoseTurn === this._listeners[0] 
            ? this._whoseTurn = this._listeners[1] 
            : this._whoseTurn = this._listeners[0];
        this.reset();
    }

    /**
     * Check is winner set
     * @returns {bool} Returns true if set
     */
    isWinner() {
        return this._winner ? true : false;
    }

    /**
     * Get winner
     * @returns {string} Returns nick of winner
     */
    getWinner() {
        return this._winner;
    }

    /**
     * Get whose turn is now
     * @returns {string} Returns nickname of player who turn now
     */
    getWhoseTurn() {
        return this._whoseTurn;
    }

    /**
     * Check is point consist diagonal
     * @param Object Object with point
     * @returns {bool} Returns true if consists
     */
    isDiagonal({point = []} = {}) {
        let startPoint = this.getCoordinates({block: this._steps[0]});
        return Math.abs(startPoint[0] - point[0]) === Math.abs(startPoint[1] - point[1]);
    }

    /**
     * Check is block disabled
     * @param Object Object with block
     * @returns {bool} Returns true if disable
     */
    isDisable({block = null} = {}) {
        return this._disableBlocks.includes(block);
    }

    /**
     * Check state of point
     * @param Object Object with point
     * @returns {bool} Returns true if point is empty
     */
    isStep({coordinates = []} = {}) {
        return this._stepsMatrix[coordinates[0]][coordinates[1]] === '*';
    }

    /**
     * Check is step consists to enemy
     * @param Object Object with point
     * @returns {bool} Returns true if it is point consists enemy
     */
    isEnemyStep({coordinates = []} = {}) {
        if (this._whoseTurn === this._listeners[0]) {
            return this._stepsMatrix[coordinates[0]][coordinates[1]] === this._secondPlayerStep;
        } else {
            return this._stepsMatrix[coordinates[0]][coordinates[1]] === this._firstPlayerStep;
        }
    }

    /**
     * Set point to field
     * @param Object Object with point
     * @returns {bool} Returns true if managed to set the point
     */
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
