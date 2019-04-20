import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import User from '../../modules/user';
import { INIT_EVENT, INIT_ERROR_EVENT } from '../../modules/events';

export default class EditProfileModel extends EventEmitterMixin(Model) {
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
					  this.emit(INIT_EVENT, {root: root, data: user}); 
				})
				.catch(() => this.emit(INIT_ERROR_EVENT));
		  }
	}

	avatarUpload({avatar = {}} = {}) {
		API.uploadAvatar({
			    avatar: avatar,
		  })
		  .then((user) => {
				User.set({
					avatar: user.data, 
				});
				this.emit('avatarUploaded');
			})
		  .catch(() => {this.emit('getEditProfileError');});
	}

	userUpdate({email = '', name = '' } = {}) {
		API.updateUser({
			    email: email,
			    username: name,
		  })
		  .then((user) =>  { 
				User.set({ username: user });
				this.emit('userUpdated'); 
			})
		  .catch(() => {this.emit('userUpdated')});
	}

	passwordUpdate({newPass = '', passConf = ''} = {}) {
		API.updatePassword({
			newPassword: newPass,
			passwordConfirm: passConf
		})
			.then(() => {this.emit('userUpdated');})
			.catch(() => {this.emit('userUpdated');});
	}
		
	logout() {
		API.logout()
			.then(() => {this.emit('logouted');})
			.catch(() => {this.emit('logouted');});
	  }
}