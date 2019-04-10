import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { validEmail, validLogin, validPassword } from '../../modules/utils.js';

export default class SignUpModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	getData({root = {}} = {}) {
		API.isAuth()
			.then(() => {
				this.emit('isAuthSignUp', {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit('isAuthSignUp', {root: root, isAuth: false});
			});
	}

	signUp({root = {}, name='', email = '', password = '', password_repeat = ''} = {}) {
		if (!validEmail(email) || !email) {
			this.emit('signUpError', {root: root, error: 'Invalid Email', name: name, email: email});
			return;
		}
		
		if (!validLogin(name) || !name) {
			this.emit('signUpError', {root: root, error: 'Invalid Name', name: name, email: email});
			return;
		} 

		if (password !== password_repeat || !password || !password_repeat) {
			this.emit('signUpError', {root, error: 'Passwords doesn\'t match'});
			return;
		}

		if (!validPassword(password)) {
			this.emit('signUpError', {root, error: 'Invalid password, must be more than 5 symbols'});
			return;
		}

		API.signUp({
			email: email,
			password: password,
			username: name,
		})
			.then(() => {this.emit('signUpOK');})
			.catch(err => {
				this.emit('signUpError', {error: err});
			});
	}
}