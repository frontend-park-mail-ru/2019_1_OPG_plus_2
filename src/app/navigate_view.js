export const NavigateMixinView = (superclass) => class extends superclass {
	constructor(data) {
		super(data);
		this.onLinkClick = this.onLinkClick.bind(this);
	}
    
	onLinkClick(event) {
		if (!(event.currentTarget instanceof HTMLAnchorElement)) {
			return;
		}
		event.preventDefault();
		if (event.currentTarget.classList.contains('back-arrow')) {
			this.emit('onBackClick');
		} else if (event.currentTarget.classList.contains('logout')) {
			this.emit('logout');
		} else {
			this.emit('onLinkClick', { path: event.currentTarget.dataset.href });
		}
	}

	_createOnLinkListener() {
		const linksCollection = document.getElementsByTagName('a');
		const links = [...linksCollection];
		links.forEach(link => {
			link.addEventListener('click', this.onLinkClick, false);
		});
	}
    
	_removeOnLinkListener() {
		const linksCollection = document.getElementsByTagName('a');
		const links = [...linksCollection];
		links.forEach(link => {
			link.removeEventListener('click', this.onLinkClick, false);
		});
	}

    _createOnLinkListener() {
        this._root.addEventListener('click', this.onLinkClick, true);
    }

    _removeOnLinkListener() {
        this._root.removeEventListener('click', this.onLinkClick, true);
    }

    _createEventListeners() {
        super._createEventListeners();
        this._createOnLinkListener();
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._removeOnLinkListener();
    }

    close() {
        if (!this._root) {
            return;
        }
        this._removeEventListeners();
        delete this._root;
    }
};