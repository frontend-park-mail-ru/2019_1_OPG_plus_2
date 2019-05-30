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
                console.log(event.data);
                let strLines = event.data.split("\n");
                strLines.forEach(str => {
                    let obj = JSON.parse(str);

                    if (obj.type === 'game' && obj.user !== this.me) {
                        debugger;
                        if (obj.data.coords) {
                            let blocks = this.getBlockArray({arr: obj.data.coords});
                            this._game.blocks = blocks
                            if (Math.abs(blocks[0] - blocks[1]) < 5) {
                                blocks.splice(1, 0, ...this._game.getMissX(blocks[0], blocks[1]));
                            } else {
                                blocks.splice(1, 0, ...this._game.getMissY(blocks[0], blocks[1]));
                            }
                            this._game.changeSide();

                            this.emit(FINISH_STEP_EVENT, {
                                player: obj.user === this._game._listeners[0] ? 'Player1' : 'Player2', 
                                whoseTurn: this._game.getWhoseTurn(),
                                steps: blocks,
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
                        let disableBlocks = this.getBlockArray({arr: obj.data.event_data.locked});

                        this._game = new Game({
                            listeners: obj.data.event_data.players,
                            firstStep: obj.data.event_data.whose_turn,
                            disableBlocks: disableBlocks,
                        });

                        this.emit(START_GAME, {
                            wait: false, 
                            whoseTurn: obj.data.event_data.whose_turn === this._game._listeners[0] ? 'Player1' : 'Player2', 
                            me: this.me, 
                            players: obj.data.event_data.players,
                            disableBlocks: disableBlocks,
                        });
                    }

                    if (obj.type === 'register') {
                        this.user = obj.user;
                        this.emit(INIT_EVENT, {root: root, wait: true});
                    }
                });
            }

            // this._ws.onclose = (event) => {
            //     console.log(event);
            // }

            this.me = User._username;
            this._ws.send(JSON.stringify({
                user: User._username,
                type: 'register',
            }));

            // this._ws.close();
		});
	}

	init({root = {}, data = {}} = {}) {
        console.log('init');
        console.log(`${HOST_MULTIPLAYER_WS}/${data}/room`);
        API.getUser()
		.then((user) => {
            User.set(user);
            this.openConnection({root: root, path: `${HOST_MULTIPLAYER_WS}/${data}/room`});
		})
		.catch(() => {
            debugger; // TODO убрать debugger и emit
			this.emit(INIT_ERROR_EVENT);
		});
	}

	doStartStep({block = null} = {}) {
        let ans = false;

        if (this._game._whoseTurn === this.me) {
            ans = this._game.doStartStep({block});
        }

		this.emit(END_DOWN_EVENT, {player: this._game.getWhoseTurn(), ans: ans});
	}

	doOverStep({block = null} = {}) {
		let ans = this._game.doStep({block});
		this.emit(END_OVER_BLOCK_EVENT, {player: this._game.getWhoseTurn(), ans: ans, steps: this._game.steps});
	}

	doFinishStep({block = null} = {}) {
        let ans = this._game.doFinishStep({block}); // вернет true, если ход можно закончить
        
        if (ans) { 
            let coords = this._game.multSteps.map(block => {
                return [parseInt(block / 5, 10), parseInt(block % 5, 10)];
            })

            debugger;
            this._ws.send(JSON.stringify({
                user: this.me,
                type: 'game',
                data: {
                    coords: [
                        {
                            x: coords[0][0], 
                            y: coords[0][1],
                        },
                        {
                            x: coords[coords.length - 1][0], 
                            y: coords[coords.length - 1][1],
                        },
                    ],
                }
            }));

            this._game.multSteps = {};
            this.emit(FINISH_STEP_EVENT, {player: this._game.getWhoseTurn()});
        }
    }
    
    getBlockArray({arr = []} = {}) {
        return arr.map(item => {
          return item.x * 5 + item.y;
        })
    }
}