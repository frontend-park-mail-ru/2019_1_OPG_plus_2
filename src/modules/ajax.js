const noop = () => null;

export class AjaxModule {
    _ajax({
        callback = noop,
        method = 'GET',
        path = '/',
        body = {},
    } = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, path, true); // метод, путь по которому идет запрос, асинхронно
        xhr.withCredentials = true; // отправляем cookies

        if (body) {
            xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
        }

        /* проверяет состояние запроса (
            UNSENT = 0 - начальное состояние
            OPENED = 1 - вызван open
            HEADERS_RECEIVED = 2 - получены заголовки
            LOADING = 3 - загружается тело
            DONE = 4 - запрос завершен)*/
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            callback(xhr);
        };

        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    }

    doGet({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        this._ajax({
            callback,
            path,
            body,
            method: 'GET',
        });
    }

    doPost({
        callback = noop,
        path = '/',
        body = {},
    } = {}) {
        this._ajax({
            callback,
            path,
            body,
            method: 'POST',
        });
    }
}