export const NavigateMixin = (superclass) => class extends superclass {
	constructor(data) {
		super(data);
		this.onLinkClick = this.onLinkClick.bind(this);
	}
    
	onLinkClick(event) {
		if (!(event.target instanceof HTMLAnchorElement)) {
			return;
		}
		event.preventDefault();
		this._removeOnLinkListener();
		if (event.target.classList.contains('back-arrow')) {
			this.emit('onBackClick');
		} else if (event.target.classList.contains('logout')) {
			this.emit('logout');
		} else {
			this.emit('onLinkClick', { path: event.target.dataset.href });
		}
	}
    
	_createOnLinkListener() {
		this._root.addEventListener('click', this.onLinkClick, true);
	}
    
	_removeOnLinkListener() {
		this._root.removeEventListener('click', this.onLinkClick, true);
	}
};