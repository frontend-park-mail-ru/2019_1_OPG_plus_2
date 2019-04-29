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
		this._render(data);
		this._createEventListeners();
	}

	close() {
		if (this._components) {
			this._components.forEach(component => {
				component.delete();
			});
		}
	}
}