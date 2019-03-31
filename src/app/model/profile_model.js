import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import User from '../../modules/user.js';

export default class ProfileModel extends EventEmitterMixin(Model) {
    constructor() {
        super();
    }

    getData({root = {}, data = {}} = {}) {
        if (User.exist()) {
            this.emit('getProfile', {root: root, data: User.get()});
		} else {
			API.getUser()
				.then(() => this.emit('getProfile', {root: root, data: User.get()}) )
				.catch(() => this.emit('getProfileError'));
		}
    }

    logout() {
        API.logout()
        .then(() => { this.emit('logouted') })
        .catch(() => { this.emit('logouted') })
    }
}