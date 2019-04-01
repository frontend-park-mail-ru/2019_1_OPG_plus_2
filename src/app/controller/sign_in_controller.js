import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class SignInController extends EventEmitterMixin(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('isAuthSignIn', ({root = '', isAuth = false}) => { this.render({root: root, data: isAuth});});
		this._model.on('signInOK', () => { this.onNavigate({path: '/me'});});
		this._model.on('signInError', ({root = '', error = ''}) => { this.render({root: root, data: error}); }); 
		this._view.on('signInSubmit', ({root = '', email = '', password = ''} = {}) => { this.signIn({ root, email, password }); });
	}

	signIn({root = '', email = '', password = ''} = {}) {
		this._model.signIn({root, email, password});
	}
}