import EventBus from "./eventBus";

// по сути состояния выигрыша и проигрыша определяются двумя фактами:
//  Чья очередь ходить
//  Сколько клеток осталось (в оригинале одна)
const cellsLeftForEnd = 12;
const chars = {
    'user1': '1',
    'bot': '2',
};

class GameService {
    constructor() {
        this.whoseTurn = null;
        this.field = [
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*']
        ];
        this.cellsCount = this.field.length * this.field[0].length;
        let bus = new EventBus();
        bus.attachToObject(this);
    };

    check() {
        if (this.cellsCount === cellsLeftForEnd) {
            console.group("Game");
            console.log(`${this.whoseTurn.name} won!!!`);
            console.groupEnd();
            this.publish('win', {winner: this.whoseTurn.name});
        }
    }

    start() {
        console.group("Game");
        console.log("Game started!!!");
        this.publish('Game:start', {players_num: this.listeners.length});
        this.whoseTurn = this.listeners[0];
        console.log(`Now is ${this.whoseTurn.name}'s turn`);
        console.groupEnd();
    }

    performTurn(){
        this.whoseTurn.doTurn();
    }
}


let Game = new GameService();

Game.on('turn', function (args) {
    if (args.user === this.whoseTurn) {
        console.group("Game");
        this.field[args.d1][args.d2] = chars[this.whoseTurn.name];
        this.field.forEach(value => {
            console.log(value);
        });
        console.groupEnd();

        if (this.whoseTurn === this.listeners[0]) {
            this.whoseTurn = this.listeners[1];
        } else {
            this.whoseTurn = this.listeners[0];
        }
        this.cellsCount--;
    }
}, Game);

export default Game;