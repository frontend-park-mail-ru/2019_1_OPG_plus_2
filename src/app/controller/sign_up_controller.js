import Controller from './controller';
import { PROFILE, ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT,
		 SIGN_UP_OK_EVENT,
		 SIGN_UP_ERROR_EVENT,
		 SIGN_UP_SUBMIT_EVENT } from '../../modules/events';

export default class SignUpController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on(INIT_EVENT, ({root = '', isAuth = false}) => {this.render({root: root, data: isAuth})});
		this._model.on(INIT_ERROR_EVENT, () => {this.onNavigate({path: ROOT, redirect: true})});
		this._model.on(SIGN_UP_OK_EVENT, () => {this.onNavigate({path: PROFILE})});
		this._model.on(SIGN_UP_ERROR_EVENT, ({root = {}, error = '', name = '', email = ''} = {}) => {this.render({root: root, data: {error, name, email}})}); 
		this._view.on(SIGN_UP_SUBMIT_EVENT, ({root = {}, name = '', email = '', password = '', password_repeat = ''} = {}) => {this.signUp({root, name, email, password, password_repeat})});
	}

	signUp({root = {}, name = '', email = '', password = '', password_repeat = ''} = {}) {
		this._model.signUp({root, name, email, password, password_repeat});
	}
}