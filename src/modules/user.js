class User {
    constructor() {
        this._name = null;
        this._email = null;
        this._score = null;
        this._games = 0;
        this._win = 0;
        this._lose = 0;

    }

    exist() {
        if (this._name === null || this._email === null || this._score === null) {
            return false;
        }

        return true;
    }

    get() {
        return {
            name: this._name,
            email: this._email,
            score: this._score,
            games: this._games,
            win: this._win,
            lose: this._lose,
        }
    }

    set(data) {
        this._name = data.name;
        this._email = data.email;
        this._score = data.score;
        this._games = data.games;
        this._win = data.win;
        this._lose = data.lose;
    }
};

export default User = new User();