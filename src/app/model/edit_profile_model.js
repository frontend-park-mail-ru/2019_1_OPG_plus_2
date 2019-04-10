import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import User from '../../modules/user.js';

export default class EditProfileModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	getData({root = {}} = {}) {        
		if (User.exist()) {
			  this.emit('getEditProfile', {root: root, data: User.get()});
		  } else {
			  API.getUser()
				  .then((user) => { 
					  User.set(user); 
					  this.emit('getEditProfile', {root: root, data: user}); 
				})
				.catch(() => this.emit('getEditProfileError'));
		  }
	}

	avatarUpload({avatar = {}} = {}) {
		API.uploadAvatar({
			    avatar: avatar,
		  })
		  .then((data) => {
				User.set({
					avatar: data.data, 
				});

				this.emit('avatarUploaded');

			})
		  .catch(() => { this.emit('getEditProfileError'); });
	}

	userUpdate({email = '', name = '' } = {}) {
		API.updateUser({
			    email: email,
			    username: name,
		  })
		  .then((username) =>  { 
				User.set({ username: username });
				this.emit('userUpdated'); 
			})
		  .catch(() => { this.emit('userUpdated'); });
	}

	passwordUpdate({newPass = '', passConf = ''} = {}) {
		API.updatePassword({
			newPassword: newPass,
			passwordConfirm: passConf
		})
			.then(() => { this.emit('userUpdated'); })
			.catch(() => { this.emit('userUpdated'); });
	}
		
	logout() {
		API.logout()
			.then(() => { this.emit('logouted'); })
			.catch(() => { this.emit('logouted'); });
	  }
}