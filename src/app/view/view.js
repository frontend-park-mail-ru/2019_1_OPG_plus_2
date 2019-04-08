/*eslint no-empty-pattern:0 no-unused-vars:0*/
export default class View {
	constructor({} = {}) {
	}

	_createEventListeners() {
	}

	_removeEventListeners() {
	}

	_render(data) {
	}

	open({ root = {}, data = {} }) {
		this._root = root;
		this._root.innerHTML = '';
		this._render(data);
		this._removeEventListeners();
		this._createEventListeners();
	}
}