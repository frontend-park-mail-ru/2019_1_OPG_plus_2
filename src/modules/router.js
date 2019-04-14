import Controller from '../app/controller/controller';

export default class Router {
	constructor({
		routes = {},
		mode = null,
		root = document.getElementById('application'),
	} = {}) {
		this.routes = routes;
		this.mode = mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
		this.root = root;
		window.onpopstate = () => {
			this.routes[location.pathname].open({root: this.root});
		};
	}

	back() {
		history.back();
	}

	add({re = '/', handler} = {}) {
		this.routes[re] = handler;
	}

	navigate({ path = '/', data = {} } = {}) {
		if(this.mode === 'history') {
		  history.pushState(null, null, path);

		  if (!this.routes[path]) {
			  return;
		  }

		  this.routes[path].open({root: this.root, data: data});
		} else {
		  window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
		}
	}

	start() {
		if(this.mode === 'history') {
		  this.navigate({ path: location.pathname });
		}
	}
}