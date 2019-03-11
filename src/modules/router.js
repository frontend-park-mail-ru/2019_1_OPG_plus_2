export default class Router {
	/**
	 * @constructor
	 * @param root
	 */
	constructor({
		root = document.body,
	} = {}) {
		this._root = root;
		this._routes = {};
		this._prevPath = '';
	}

	/**
	 * Adds controller to routing
	 * @param {string} path Path on which controller is routed
	 * @param {Page} view Controller served by route
	 */
	add(path, view) {
		this._routes[path] = view;
	}

	/**
	 * Renders page routed by path
	 * @param path Path to be rendered
	 */
	open(path) {
		if (this._prevPath) {
			this.close();
		}

<<<<<<< HEAD
        if (!this._routes[path]) {
            this._routes['/not_found'].open(this._root);
            this._prevPath = '/not_found';
            return;
        }

        this._routes[path].open(this._root);
        this._prevPath = path;
    }

    start() {
        console.log(window.location.pathname);
        this.open(window.location.pathname);
        this._root.addEventListener('click', function (event) {
            if (!(event.target instanceof HTMLAnchorElement) || event.target.dataset.href === '/logout') {
                return;
            }
            event.preventDefault();
=======
		if (!this._routes[path]){
			this._routes['/not_found'].open(this._root);
			this._prevPath = path;
			return;
		}

		this._routes[path].open(this._root);
		this._prevPath = path;
	}

	/**
	 * Starts routing
	 */
	start() {
		this.open(window.location.pathname);
		this._root.addEventListener('click', function (event) {
			if (!(event.target instanceof HTMLAnchorElement) || event.target.dataset.href === '/logout') {
				return;
			}
			event.preventDefault();
>>>>>>> c72122b284ea85360af1ac80b13efc514aff6ae4
            
			this.open(event.target.dataset.href);
		}.bind(this));
	}

	/**
	 * Closes page
	 */
	close() {
		this._root.innerHTML = '';
	}
}