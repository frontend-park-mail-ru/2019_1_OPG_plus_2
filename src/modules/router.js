export default class Router {
	constructor({
		root = document.body,
	} = {}) {
		this._root = root;
		this._routes = {};
		this._prevPath = '';
	}

	/**
     * 
     * @param {Page} view
    */
	add(path, view) {
		this._routes[path] = view;
	} 

	open(path) {
		if (this._prevPath) {
			this.close();
		}

		this._routes[path].open(this._root);
		this._prevPath = path;
	}

	start() {
		this.open(window.location.pathname);

		this._root.addEventListener('click', function (event) {
			if (!(event.target instanceof HTMLAnchorElement)) {
				return;
			}
			event.preventDefault();
            
			this.open(event.target.dataset.href);
		}.bind(this));
	}

	close() {
		this._root.innerHTML = '';
	}
}