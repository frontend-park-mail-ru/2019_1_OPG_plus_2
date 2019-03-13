const noop = () => null;


export default class AjaxModule {
    /**
     * Performs asynchronous GET request
     * @param callback Function called as callback
     * @param path Path of the request
     */
    static doGet({
                     callback = noop,
                     path = '/',
                 } = {}) {
        fetch(path, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Origin': 'https://colors.hackallcode.ru',
            },
            credentials: 'include',
        }).then(function (response) {
            if (response.status === 401) {
                throw '';
            }
            return response.json();
        }).then(json => callback(json))
            .catch(err => callback(err));
    }

    /**
     * Performs asynchronous POST request with body
     * @param callback Function called as callback
     * @param path Path of the request
     * @param body Body of the request
     */
    static doPost({
                      callback = noop,
                      path = '/',
                      body = {},
                  } = {}) {
        fetch(path, {
            method: 'POST',
            mode: 'cors',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Origin': 'https://colors.hackallcode.ru',
            },
            credentials: 'include',
            body: JSON.stringify(body),
            // body: JSON.stringify(body),
        }).then(function (response) {
            return response.json();
        }).then(json => callback(json));
    }

// 	fetch('http://https://api.colors.hackallcode.ru/api/session', {method: 'POST', mode: 'cors', credentials: 'include', headers: {
// 	'Origin' : 'https://colors.hackallcode.ru',
// }, body: {
// 	login: 'test@mail.ru',
// 	password: 'test',
// }});

    /**
     * Performs asynchronous PUT request with body
     * @param callback Function called as callback
     * @param path Path of the request
     * @param body Body of the request
     */
    static doPut({
                     callback = noop,
                     path = '/',
                     body = {},
                 } = {}) {
        fetch(path, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Origin': 'https://colors.hackallcode.ru',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        }).then(function (response) {
            return response.json();
        }).then(json => callback(json));
    }

    /**
     * Performs asynchronous DELETE request with body
     * @param callback Function called as callback
     * @param path Path of the request
     * @param body Body of the request
     */
    static doDelete({
                        callback = noop,
                        path = '/',
                        body = {},
                    } = {}) {
        fetch(path, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Origin': 'https://colors.hackallcode.ru',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        }).then(function (response) {
            return response.json();
        }).then(json => callback(json));
    }
}