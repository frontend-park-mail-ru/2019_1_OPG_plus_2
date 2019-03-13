import AjaxModule from './ajax.js'

export class API {
    /**
     * This method logs user in and sets cookie
     * @param Object object with user login or email
     */
    static signIn({
        login = '',
        password = '',
    } = {}) {
        AjaxModule.doPost({
            path: 'https://api.colors.hackallcode.ru/api/session',
            body: {
                login: login,
                password: password,
            }
        });
    }

    /**
     * Checks whether user is signed in or signed out
     */
    static isAuth() {
        AjaxModule.doGet({
            path: 'https://api.colors.hackallcode.ru/api/session',
        });
    }

    /**
     * This method logs user out and deletes cookie
     * @param Object object with user login or email
     */
    static logout() {
        AjaxModule.doDelete({
            path: 'https://api.colors.hackallcode.ru/api/session',
            body: {
                login: login,
                password: password,
            },
        });
    } 

    /**
     * This method provides client with scoreboard limited with {limit} 
     * entries per page and offset of {offset} from the first position
     */
    static getUsers() {
        AjaxModule.doGet({
            path: 'https://api.colors.hackallcode.ru/api/score',
        })
    }

    /**
     * This method updates info in user and auth-db record of user, 
     * who is making a query
     * @param Object object with user avatar, email, password and username
     */
    static updateUser({
        avatar = '',
        email = '',
        password = '',
        username = '', 
    } = {}) {
        AjaxModule.doPut({
            path: 'https://api.colors.hackallcode.ru/api/score',
            body: {
                avatar: avatar,
                email: email,
                password: password,
                username: username,
            },
        });
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
        AjaxModule.doPost({
            path: 'https://api.colors.hackallcode.ru/api/user',
            body: {
                avatar: avatar,
                email: email,
                password: password,
                username: username,
            },
        });
    }

    /**
     * This method deletes all information about user, making a query, 
     * including user, game stats and authorization info
     */
    static deleteUser() {
        AjaxModule.doDelete({
            path: 'https://api.colors.hackallcode.ru/api/user',
        });
    }

    /**
     * This method provides client with user data, matching required ID
     */
    static getUser({
        id = '',
    } = {}) {
        AjaxModule.doGet({
            path: `https://api.colors.hackallcode.ru/api/user/${id}`,
        });
    }

    /**
     * This method saves avatar image in server storage and sets it as clients user avatar
     */
    static getAvatar() {
        AjaxModule.doGet({
            path: 'https://api.colors.hackallcode.ru/api/avatar',
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
            path: 'https://api.colors.hackallcode.ru/api/password',
            body: {
                new_password: new_password,
                password_confirm: password_confirm,
            },
        });
    }

}