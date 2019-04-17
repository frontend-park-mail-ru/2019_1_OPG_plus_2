import Controller from './controller';
import { SIGN_IN, ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT, 
		 LOGOUT_EVENT,
		 LOGOUTED_EVENT } from '../../modules/events';

export default class ProfileController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on(INIT_EVENT, ({root = {}, data = {}} = {}) => {this.render({root: root, data: data})});
		this._model.on(INIT_ERROR_EVENT, () => {this.onNavigate({path: SIGN_IN})});
		this._view.on(LOGOUT_EVENT, () => {this.logout()});
		this._model.on(LOGOUTED_EVENT, () => {this.onNavigate({path: ROOT})});
	}

	logout() {
		this._model.logout();
	}
}