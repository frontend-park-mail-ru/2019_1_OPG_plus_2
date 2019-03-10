const noop = () => null;

export default class AjaxModule {
    doGet({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        fetch(path, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(function(response) {
            return response.json();
        }).then(json => callback(json));
    }

    doPost({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        fetch(path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: body,
        }).then(function(response) {
            return response.json();
        }).then(json => callback(json));
    }
}