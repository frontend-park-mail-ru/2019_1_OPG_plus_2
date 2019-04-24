import Controller from './controller';
import { ROOT, PROFILE } from '../paths';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT,
		 SIGN_IN_OK_EVENT,
		 SIGN_IN_ERROR_EVENT,
		 SIGN_IN_SUBMIT_EVENT } from '../../modules/events';
import { NavigateMixinController  } from '../navigate_controller';

export default class SignInController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on(INIT_EVENT, ({root = ''} = {}) => {this.render({ root: root });});
		this._model.on(INIT_ERROR_EVENT, () => {this.onNavigate({path: ROOT, noHistory: true});});
		this._model.on(SIGN_IN_OK_EVENT, () => {this.onNavigate({path: PROFILE});});
		this._model.on(SIGN_IN_ERROR_EVENT, ({root = {}, error = '', email = ''} = {}) => {this.render({root: root, data: {error, email}});}); 
		this._view.on(SIGN_IN_SUBMIT_EVENT, ({root = {}, email = '', password = ''} = {}) => {this.signIn({root, email, password });});
	}

	signIn({root = {}, email = '', password = ''} = {}) {
		this._model.signIn({root, email, password});
	}
}