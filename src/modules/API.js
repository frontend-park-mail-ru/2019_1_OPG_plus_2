import AjaxModule from './ajax.js'
import User from './user.js'

export default class API {
    /**
     * This method logs user in and sets cookie
     * @param Object object with user login or email
     * @returns {Promise} object with user login or email
     */
    static signIn({
        login = '',
        password = '',
    } = {}) {
        return new Promise((resolve, reject) => {
            AjaxModule.doPost({
                path: `${HOST}/api/session`,
                body: {
                    login: login,
                    password: password,
                }
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => reject(error));
                } else {
                    resolve();
                }
            })
        });
    }

    /**
     * Checks whether user is signed in or signed out
     */
    static isAuth() {
        return new Promise((resolve, reject) => {
            AjaxModule.doGet({
                path: `${HOST}/api/session`,
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => reject(error));
                } else {
                    resolve();
                }
            })
        })
    }

    /**
     * This method logs user out and deletes cookie
     * @param Object object with user login or email
     */
    static logout() {
        return new Promise(function(resolve, reject) {
            AjaxModule.doDelete({
                path: `${HOST}/api/session`,
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => {
                        reject(error);
                    });
                } else {
                    resolve();
                }
            });
        });

    } 

    /**
     * This method provides client with scoreboard limited with {limit} 
     * entries per page and offset of {offset} from the first position
     */
    // static getUsers() {
    //     return new Promise(function(resolve, reject) {
    //         AjaxModule.doGet({
    //             path: `${HOST}/api/score`,
    //         }).then(response => {
    //             if (response.status !== 200) {
    //                 response.json().then(error => {
    //                     reject(error);
    //                 });
    //             } else {
    //                 response.json().then(user => {
    //                     reject(user);
    //                 });
    //             }
    //         });
    //     });
    // }

    /**
     * This method updates info in user and auth-db record of user, 
     * who is making a query
     * @param Object object with user avatar, email, password and username
     */
    static updateUser({
        // avatar = '',
        email = '',
        // password = '',
        username = '', 
    } = {}) {
        return new Promise((resolve, reject) => {
            AjaxModule.doPut({
                path: `${HOST}/api/user`,
                body: {
                    // avatar: avatar,
                    email: email,
                    // password: password,
                    username: username,
                }
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => {
                        reject(error);
                    });
                } else {
                    resolve();
                }
            });
        });
        // AjaxModule.doPut({
        //     path: `${HOST}/api/score`,
        //     body: {
        //         avatar: avatar,
        //         email: email,
        //         password: password,
        //         username: username,
        //     },
        // });
    }

    /**
     * This method creates records about new user in auth-bd and user-db 
     * and then sends cookie to user in order to identify
     * @param Object object with avatar, email, password and username
     */
    static signUp({
        avatar = '',
        email = '',
        password = '',
        username = '',
    } = {}) {
        return new Promise((resolve, reject) => {
            AjaxModule.doPost({
                path: `${HOST}/api/user`,
                body: {
                    avatar: avatar,
                    email: email,
                    password: password,
                    username: username,
                },
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => {
                        reject(error);
                    });
                } else {
                    resolve();
                }
            });
        })
    }

    /**
     * This method deletes all information about user, making a query, 
     * including user, game stats and authorization info
     */
    static deleteUser() {
        AjaxModule.doDelete({
            path: `${HOST}/api/user`,
        });
    }

    /**
     * This method provides client with user data, matching required ID
     */
    static getUser() {
        return new Promise((resolve, reject) => {
            AjaxModule.doGet({
                path: `${HOST}/api/user`,
            }).then(response => {
                if (response.status !== 200) {
                    response.json().then(error => reject(error));
                } else {
                    response.json().then(user => User.set(user.data));
                    resolve();
                }
            })
        });
    }

    /**
     * This method saves avatar image in server storage and sets it as clients user avatar
     */
    static getAvatar() {
        AjaxModule.doGet({
            path: `${HOST}/api/avatar`,
        });
    }

    /**
     * This method updates info in profile and auth-db record of user, who is making a query
     */
    static updatePassword({
        new_password = '',
        password_confirm = '',
    } = {}) {
        AjaxModule.doPut({
            path: `${HOST}/api/password`,
            body: {
                new_password: new_password,
                password_confirm: password_confirm,
            },
        });
    }

}