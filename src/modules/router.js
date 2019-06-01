export default class Router {
	constructor({
		routes = {},
		mode = null,
		root = document.getElementById('application'),
	} = {}) {
		this.routes = routes;
		this.mode = mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
		this.root = root;
		window.onpopstate = () => {
			this.navigate({path: location.pathname});
		};
	}

	back() {
		history.back();
	}

	add({re = '/', handler} = {}) {
		this.routes[re] = handler;
	}

	navigate({path = '/', data = {}, redirect = false} = {}) {
		if (this.mode === 'history') {
			if (window.location.pathname !== path) {
				if (redirect) {
					history.replaceState(null, null, path);
				}
				else {
					history.pushState(null, null, path);
				}
			}
			
			debugger;
			if (path.split('/')[1] === 'multiplayer') {
				const route = '/' + path.split('/')[1];
				const room = path.split('/')[2];
				
				this.currentRoute = this.routes[route];
				this.currentRoute.open({root: this.root, data: room});
				return;
			}

			if (!this.routes[path]) {
				this.currentRoute = this.routes['/notfound'];
				this.currentRoute.open({root: this.root, data: data});
				return;
			}

			if (this.currentRoute) {
				this.currentRoute.close();
			}
			this.currentRoute = this.routes[path];
			this.currentRoute.open({root: this.root, data: data});
		} else {
			window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		}
	}

	start() {
		if (this.mode === 'history') {
			this.navigate({path: location.pathname, redirect: true});
		}
	}
}
