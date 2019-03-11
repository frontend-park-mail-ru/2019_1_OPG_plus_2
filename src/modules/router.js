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
            
            this.open(event.target.dataset.href);
        }.bind(this));
    }

    close() {
        this._root.innerHTML = '';
    }
}