import Controller from './controller';
import { PROFILE } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';

export default class SignUpController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('isAuthSignUp', ({root = '', isAuth = false}) => { this.render({root: root, data: isAuth});});
		this._model.on('signUpOK', () => { this.onNavigate({path: PROFILE});});
		this._model.on('signUpError', ({root = {}, error = '', name = '', email = ''} = {}) => {this.render({root: root, data: {error, name, email}});}); 
		this._view.on('signUpSubmit', ({root = {}, name = '', email = '', password = '', password_repeat = ''} = {}) => {this.signUp({root, name, email, password, password_repeat});});
	}

	signUp({root = {}, name = '', email = '', password = '', password_repeat = ''} = {}) {
		this._model.signUp({root, name, email, password, password_repeat});
	}
}