import Model from './model';
import { EventEmitterMixin } from '../event_emitter';
import Game from '../../modules/game';
import User from '../../modules/user.js';
import API from '../../modules/API';
import { INIT_EVENT, 
         START_GAME,
         END_DOWN_EVENT,
         FINISH_STEP_EVENT,
         END_OVER_BLOCK_EVENT,
         FINISH_GAME_EVENT } from '../../modules/events';

export default class MultiplayerModel extends EventEmitterMixin(Model) {
	constructor() {
        super();
        this.me = null;
    }
    
    openConnection({root = {}, path = ''} = {}) {
        this._ws = new WebSocket(path);

		this._ws.onopen = ((event) => {
            console.log(event);

            this._ws.onmessage = (event) => {
                debugger;
                console.log(event.data);
                let strLines = event.data.split("\n");
                strLines.forEach(str => {
                    let obj = JSON.parse(str);

                    if (obj.type === 'game' && obj.user !== this.me) {
                        if (obj.data.coords) {
                            this._game.blocks = obj.data.coords;
                            this._game.changeSide();

                            this.emit(FINISH_STEP_EVENT, {
                                player: obj.user === this._game._listeners[0] ? 'Player1' : 'Player2', 
                                whoseTurn: this._game.getWhoseTurn(),
                                steps: obj.data.coords
                            })
                        }
                    }

                    if (obj.type === 'event' && obj.data.event_type === 'win') {
                        this.emit(FINISH_STEP_EVENT, {
                            winner: obj.data.event_data.winner,
                            player: '',
                            steps: [],
                        });

                        return;
                    }
                    
                    if (obj.user === 'SERVICE') {
                        console.log(this.me);
                        console.log(obj);
                        this._game = new Game({
                            listeners: obj.data.event_data.players, 
                            firstStep: obj.data.event_data.whose_turn
                        })
                        this.emit(START_GAME, {
                            wait: false, 
                            whoseTurn: obj.data.event_data.whose_turn === this._game._listeners[0] ? 'Player1' : 'Player2', 
                            me: this.me, 
                            players: obj.data.event_data.players
                        });
                    }

                    if (obj.type === 'register') {
                        this.user = obj.user;
                        this.emit(INIT_EVENT, {root: root, wait: true});
                    }
                });
            }

            this._ws.onclose = (event) => {
                console.log(event);
            }

            this.me = User._username;
            this._ws.send(JSON.stringify({
                user: User._username,
                type: 'register',
            }));

            // this._ws.close();
		});
	}

	init({root = {}} = {}) {
        console.log('init');
        this.openConnection({root: root, path: `${HOST_MULTIPLAYER_WS}/game/0/room`});
	}

	doStartStep({block = null} = {}) {
        console.log('do start step');
        let ans = this._game.doStartStep({block});
		this.emit(END_DOWN_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doOverStep({block = null} = {}) {
        console.log('do over step');
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans, steps: this._game.steps});
	}

	doFinishStep({block = null} = {}) {
        console.log('do finish step');
        this._game.doFinishStep({block}); // вернет true, если ход можно закончить
        
        console.log(this._game.multSteps);

        this._ws.send(JSON.stringify({
            user: this.me,
            type: 'game',
            data: {
                coords: this._game.multSteps
            }
        }));

        this._game.multSteps = {};
        this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn()});



		// let isWinner = this._game.isWinner(); // возвращает true если был win condition
		// if (isWinner) { // если ход можно закончить и победитель существует
		// 	// издать событие конца игры
		// 	this.emit(FINISH_GAME_EVENT, {
		// 		winner: this._game.getWinner()}); // по окончании игры нам надо знать победителя
		// } else { // если ход можно закончить
		// 	// издать событие конца хода
		// 	this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn()}); // по окончании хода, 
		// 	// нам надо знать, 
		// 	// чей сейчас ход и можно ли его завершить
		// }
	}
}