const noop = () => null;

export default class AjaxModule {
    static doGet({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        fetch(path, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(function(response) {
            if (response.status === 401) {
                throw '';
            }
            return response.json();
        }).then(json => callback(json))
        .catch(err => callback(err));
    }

    static doPost({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        fetch(path, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        }).then(function(response) {
            return response.json();
        }).then(json => callback(json));
    }
}