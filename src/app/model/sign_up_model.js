import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { validEmail, validLogin, validPassword } from '../../modules/utils.js';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT,
		 SIGN_UP_OK_EVENT,
		 SIGN_UP_ERROR_EVENT } from '../../modules/events';

export default class SignUpModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		API.isAuth()
			.then(() => {
				this.emit(INIT_ERROR_EVENT);
			})
			.catch(() => {
				this.emit(INIT_EVENT, {root: root, isAuth: false});
			});
	}

	signUp({root = {}, name='', email = '', password = '', password_repeat = ''} = {}) {
		if (!validEmail(email) || !email) {
			this.emit(SIGN_UP_ERROR_EVENT, {root: root, error: 'Invalid Email', name: name, email: email});
			return;
		}
		
		if (!validLogin(name) || !name) {
			this.emit(SIGN_UP_ERROR_EVENT, {root: root, error: 'Invalid Name', name: name, email: email});
			return;
		} 

		if (password !== password_repeat || !password || !password_repeat) {
			this.emit(SIGN_UP_ERROR_EVENT, {root, error: 'Passwords doesn\'t match'});
			return;
		}

		if (!validPassword(password)) {
			this.emit(SIGN_UP_ERROR_EVENT, {root, error: 'Invalid password, must be more than 5 symbols'});
			return;
		}

		API.signUp({
			email: email,
			password: password,
			username: name,
		})
			.then(() => {this.emit(SIGN_UP_OK_EVENT);})
			.catch(err => {
				this.emit(SIGN_UP_ERROR_EVENT, {error: err});
			});
	}
}