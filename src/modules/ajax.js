export default class AjaxModule {
	/**
     * Performs asynchronous GET request
     * @param Object with path of the request
     * @returns {Promise} fetch promise
     */
	static doGet({
		path = '/',
	} = {}) {
		return fetch(path, {
			method: 'GET',
			headers: {
				'Origin' : ORIGIN,
			},
			mode: 'cors',
			credentials: 'include',
		});
	}

	/**
     * Performs asynchronous POST request with body
     * @param Object with path and body of the request
     * @returns {Promise} fetch promise
     */
	static doPost({
		path = '/',
		body = {},
		headers = {
			'Content-type' : 'application/json; charset=utf-8',
			'Origin' : ORIGIN,
		}
	} = {}) {
		return fetch(path, {
			method: 'POST',
			headers: headers,
			mode: 'cors',
			credentials: 'include',
			body: body,
		});
	}

	/**
     * Performs asynchronous PUT request with body
     * @param Object with path and body of the request
     * @returns {Promise} fetch promise
     */
	static doPut({
		path = '/',
		body = {}
	} = {}) {
		return fetch(path, {
			method: 'PUT',
			headers: {
				'Content-type' : 'application/json; charset=utf-8',
				'Origin' : ORIGIN,
			},
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
		});
	}

	/**
     * Performs asynchronous DELETE request with body
     * @param Object with path and body of the request
     * @returns {Promise} fetch promise
     */
	static doDelete({
		path = '/',
	} = {}) {
		return fetch(path, {
			method: 'DELETE',
			headers: {
				'Origin' : ORIGIN,
			},
			mode: 'cors',
			credentials: 'include',
		});
	}
}