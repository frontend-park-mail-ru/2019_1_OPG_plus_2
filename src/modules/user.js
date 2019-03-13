/**
 * Singleton User structure that represents client
 */
class UserS {
	/**
	 * @constructor
	 */
	constructor() {
		this._avatar = null;
		this._username = null;
		this._email = null;
		this._score = null;
		this._games = 0;
		this._win = 0;
		this._lose = 0;

	}

	/**
	 * Checks whether user exists
	 * @return {boolean}
	 */
	exist() {
		if (!this._username || !this._email || !this._score) {
			return false;
		}

		return true;
	}

	/**
	 * Returns User data
	 * @return {{score: null, lose: number, username: null, games: number, win: number, email: null}}
	 */
	get() {
		return {
			photo: this._avatar,
			username: this._username,
			email: this._email,
			score: this._score,
			games: this._games,
			win: this._win,
			lose: this._lose,
		};
	}

	/**
	 * Sets User data
	 * @param data
	 */
	set(data) {
		console.log(data);
		this._avatar = data.avatar;
		this._username = data.username;
		this._email = data.email;
		this._score = data.score;
		this._games = data.games;
		this._win = data.win;
		this._lose = data.lose;
	}
}

/**
 * Singleton variable that represents user
 * @type {UserS}
 */
const User = new UserS();
export default User;