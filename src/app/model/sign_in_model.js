import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';

export default class SignInModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	getData({root = {}} = {}) {
		API.isAuth()
			.then(() => {
				this.emit('isAuthSignIn', {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit('isAuthSignIn', {root: root, isAuth: false});
			});
	}

	signIn({root = '', email = '', password = ''} = {}) {
		API.signIn({
			login: email,
			password: password,
		})
			.then(() => { this.emit('signInOK'); })
			.catch(err => {
				this.emit('signInError', {root: root, error: err});
			});
	}
}