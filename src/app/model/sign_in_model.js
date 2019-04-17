import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { INIT_EVENT, INIT_ERROR_EVENT } from '../../modules/events';

export default class SignInModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		API.isAuth()
			.then(() => {
				this.emit(INIT_ERROR_EVENT);
			})
			.catch(() => {
				this.emit(INIT_EVENT, {root: root, isAuth: true});
			});
	}

	signIn({root = {}, email = '', password = ''} = {}) {
		API.signIn({
			login: email,
			password: password,
		})
			.then(() => {this.emit('signInOK');})
			.catch(err => {
				this.emit('signInError', {root: root, error: err, email: email});
			});
	}
}