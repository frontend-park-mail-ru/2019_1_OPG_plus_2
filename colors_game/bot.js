export default class Bot {
    constructor(){
    }

    generateTurn() {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        return [x, y];
    }
}