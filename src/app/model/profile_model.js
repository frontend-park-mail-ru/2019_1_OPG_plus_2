import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import User from '../../modules/user.js';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT,
		 LOGOUTED_EVENT } from '../../modules/events';

export default class ProfileModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		if (User.exist()) {
			this.emit(INIT_EVENT, {root: root, data: User.get()});
		} else {
			API.getUser()
				.then((user) => {
					User.set(user);
					this.emit(INIT_EVENT, { root: root, data: user });
				})
				.catch(() => this.emit(INIT_ERROR_EVENT));
		}
	}

	logout() {
		API.logout()
			.then(() => {this.emit(LOGOUTED_EVENT)})
			.catch(() => {this.emit(LOGOUTED_EVENT)});
	}
}