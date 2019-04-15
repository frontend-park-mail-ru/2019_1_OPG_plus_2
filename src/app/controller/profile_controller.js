import Controller from './controller';
import { SIGN_IN, ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';

export default class ProfileController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('getProfile', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
		this._model.on('getProfileError', () => { this.onNavigate({path: SIGN_IN}); });
		this._view.on('logout', () => { this.logout(); });
		this._model.on('logouted', () => { this.onNavigate({path: ROOT}); });
	}

	logout() {
		this._model.logout();
	}
}