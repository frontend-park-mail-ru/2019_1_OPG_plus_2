import Controller from '../app/controller/controller';

export default class Router {
	constructor({
		routes = {},
		mode = null,
		root = document.getElementById('application'),
	} = {}) {
		this.routes = routes;
		this.mode = mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
		this.root = root
	}

	add(re, handler) {
		if(re instanceof Controller) {
	      this.routes["/"] = re;
		}
		this.routes[re] = handler;
	}

	navigate({ path = null, data = {} } = {}) {
		path = path ? path : '';
		if(this.mode === 'history') {
		  history.pushState(null, null, path);

		  if (!this.routes[path]) {
			  return;
			// this.routes['/not_found'].open(this.root);
		  }

		  this.routes[path].open({ root: this.root, data: data});
		} else {
		  window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		}
	}

	start() {
		if(this.mode === 'history') {
		  this.navigate({path: location.pathname});
		}
	  }
}

// export default class Router {
// 	/**
// 	 * @constructor
// 	 * @param root
// 	 */
// 	constructor({
// 		root = document.body,
// 	} = {}) {
// 		this._root = root;
// 		this._routes = {};
// 		this._prevPath = '';
// 	}

// 	/**
// 	 * Adds controller to routing
// 	 * @param {string} path Path on which controller is routed
// 	 * @param {Page} view Controller served by route
// 	 */
// 	add(path, view) {
// 		this._routes[path] = view;
// 	}

// 	/**
// 	 * Renders page routed by path
// 	 * @param path Path to be rendered
// 	 */
// 	open(path) {
// 		if (this._prevPath) {
// 			this.close();
// 		}


// 		if (!this._routes[path]){
// 			this._routes['/not_found'].open(this._root);
// 			this._prevPath = path;
// 			return;
// 		}

// 		this._routes[path].open(this._root);
// 		this._prevPath = path;
// 	}

// 	/**
// 	 * Starts routing
// 	 */
// 	start() {
// 		this.open(window.location.pathname);
// 	}

// 	/**
// 	 * Closes page
// 	 */
// 	close() {
// 		this._root.innerHTML = '';
// 	}
// }