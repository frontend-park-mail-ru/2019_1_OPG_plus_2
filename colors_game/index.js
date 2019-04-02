import Game from "./game";
import {BotPlayer, ClientPlayer} from "./player";


let isEnded = false;

let player1 = new ClientPlayer("user1", Game);
let player2 = new BotPlayer("bot", Game);

[player1, player2].forEach(player => {
    player.on('notification', args => {
        console.group(player.name);
        console.log(`${player.name} has been notified`);
        console.log(args);
        console.groupEnd();
    }).on('Game:start', () => {
        console.group(player.name);
        console.log(`${player.name} is ready for battle!`);
        console.groupEnd();
    }).on('win', () => {
        if (player.name === Game.whoseTurn.name) {
            console.group(player.name);
            console.log(`I WON!!!!!!`);
            console.groupEnd();
        }
        isEnded = true;
    })
});


Game.addListener(player1);
Game.addListener(player2);
// Game.publish('notification', {qwe: "qwe"});

Game.start();

while (true) {
    Game.performTurn();
    Game.check();
    if (isEnded) {
        console.log('GAME ENDED');
        break;
    }
}