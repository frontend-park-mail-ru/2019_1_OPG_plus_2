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
				this.emit('alreadySignIn');
			})
			.catch(() => {
				this.emit('notSignIn', {root: root, isAuth: true});
			});
	}

	signIn({root = {}, email = '', password = ''} = {}) {
		API.signIn({
			login: email,
			password: password,
		})
			.then(() => {this.emit('signInOK')})
			.catch(err => {debugger;
				this.emit('signInError', {root: root, error: err, email: email});
			});
	}
}