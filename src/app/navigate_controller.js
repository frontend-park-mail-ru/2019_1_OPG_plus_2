export const NavigateMixinController = (superclass) => class extends superclass {
	constructor(data) {
		super(data);
		this._router = data.router;
		
		if (data.view) {
			this.onNavigate = this.onNavigate.bind(this);
			data.view.on('onLinkClick', this.onNavigate);

			data.view.on('onBackClick', () => {
				this.back();
			});
		}
	}

	back() {
        this._router.back();
    }

	onNavigate({path = null, data = {}} = {}) {
        if (path !== null && typeof (path) === 'string') {
            this._router.navigate({path: path, data: data});
        }
    }
};