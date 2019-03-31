import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import User from '../../modules/user.js';

export default class EditProfileModel extends EventEmitterMixin(Model) {
    constructor() {
        super();
    }

    getData({root = {}, data = {}} = {}) {        
        if (User.exist()) {
			this.emit('getEditProfile', {root: root, data: User.get()});
		} else {
			API.getUser()
				.then(() => this.emit('getEditProfile', {root: root, data: User.get()}))
				.catch(() => this.emit('getEditProfileError'));
		}
    }

    uploadAvatar({root = '', avatar = {}} = {}) {
      API.uploadAvatar({
			    avatar: avatar,
		  })
		  .then(() => { this.emit('userUpdated') })
		  .catch(() => { this.emit('getEditProfileError') });
		}

    userUpdate({ root = '', email = '', name = '' } = {}) {
        API.updateUser({
			email: email,
			username: name,
		})
		.then(() =>  { this.emit('userUpdated') })
		.catch(() => { this.emit('userUpdated') });
    }

    passwordUpdate({root = '', newPass = '', passConf = ''} = {}) {
        API.updatePassword({
			newPassword: newPass,
			passwordConfirm: passConf
		})
		.then(() => { this.emit('userUpdated') })
		.catch(() => { this.emit('userUpdated') });
		}
		
		logout() {
			API.logout()
			.then(() => { this.emit('logouted') })
			.catch(() => { this.emit('logouted') })
	  }
}