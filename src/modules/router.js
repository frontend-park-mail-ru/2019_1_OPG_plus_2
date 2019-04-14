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

    navigate({path = '/', data = {}, noHistory = false} = {}) {
      if (this.mode === 'history') {
          if (window.location.pathname !== path && !noHistory) {
              history.pushState(null, null, path);
          }
          
          if (!this.routes[path]) {
              this.routes['/notfound'].open({root: this.root, data: data});
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
            this.navigate({path: location.pathname, noHistory: true});
        }
    }
}
