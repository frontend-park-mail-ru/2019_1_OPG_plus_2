export default class Game {
    constructor({
        listeners = ['Player1', 'Player2'], // игроки
        whoseTurn = null, // тот, кто будет ходить первым
        disableBlocks = [], // заблокированные блоки
    } = {}) {
        this._listeners = listeners;
        this._whoseTurn = whoseTurn;
        this._disableBlocks = disableBlocks;
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

            const numBlocks = 24; // количество блоков на поле для рандома
            [...Array(rand)].forEach((_, i) => { // рандомим заблокированные блоки
                let randomBlock = Math.floor(Math.random() * (numBlocks));
                this._disableBlocks.push(randomBlock);
            });
        }

        return this._disableBlocks;
    }
}