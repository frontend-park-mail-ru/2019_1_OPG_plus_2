import AjaxModule from './ajax.js';
import User from './user.js';

export default class Auth {
	static isAuth() {
		return new Promise((resolve, reject) => {
			AjaxModule.doGet({
				callback: (xhr) => {
					if (xhr.status === 200) {
						User.set(xhr);
						resolve(User.get());
					} else {
						reject(null);
					}
				},
				path: 'https://api.colors.hackallcode.ru/api/session',
			});
		});
	}
}