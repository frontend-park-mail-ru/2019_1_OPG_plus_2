import Controller from './controller';
import { ROOT, PROFILE } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';

export default class SignInController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('notSignIn', ({root = ''} = {}) => { this.render({ root: root }); });
		this._model.on('alreadySignIn', () => { this.onNavigate({path: ROOT, noHistory: true}); });
		this._model.on('signInOK', () => { this.onNavigate({path: PROFILE}); });
		this._model.on('signInError', ({root = {}, error = '', email = ''} = {}) => { this.render({root: root, data: {error, email}}); }); 
		this._view.on('signInSubmit', ({root = {}, email = '', password = ''} = {}) => { this.signIn({root, email, password }); });
	}

	signIn({root = {}, email = '', password = ''} = {}) {
		this._model.signIn({root, email, password});
	}
}