import {PubSub} from './eventBus';
// import Bot from "./bot";


class Player extends PubSub {
	constructor(name, game) {
		super();
		this.name = name;
		this.listeners.push(game);
	}

	//Game is actually containing an event bus, handling messages sent by users
	doTurn() {
	}
}

export class ClientPlayer extends Player {
	constructor(name, game) {
		super(name, game);
	}

	//Game is actually containing an event bus, handling messages sent by users
	doTurn() {
		let x = prompt(`${this.name}, take your turn: x`);
		let y = prompt(`${this.name}, take your turn: y`);
		this.publish('turn', {user: this, d1: x, d2: y});
	}
}

// export class BotPlayer extends Player {
//     constructor(name, game) {
//         super("bot", game);
//         this.bot = new Bot();
//     }

//     doTurn() {
//         let turn = this.bot.generateTurn();
//         this.publish('turn', {user: this, d1: turn[0], d2: turn[1]});
//     }
// }

export class NetworkPlayer extends Player {

}