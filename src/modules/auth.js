import AjaxModule from './ajax.js';
import User from './user.js'

export default class Auth {
    static isAuth() {
        return new Promise((resolve, reject) => {
            AjaxModule.doGet({
                callback: (xhr) => {
                    if (xhr.email) {
                        User.set(xhr);
                        resolve(User.get());
                    } else {
                        reject(null);
                    }
                },
                path: '/me',
            });
        });
    }
}