import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class EditProfileController extends EventEmitterMixin(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('getEditProfile', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
		this._model.on('getEditProfileError', () => { this.onNavigate({path: '/signin'}); });
		this._view.on('avatarUpload', ({ root = '', avatar = {} }) => { this.avatarUpload({root: root, avatar: avatar});});
		this._model.on('avatarUploaded', () => { this.onNavigate({path: '/editme'}); });
		this._view.on('userUpdate', ({root = '', email = '', name = ''}) => { this.userUpdate({root, email, name}); });
		this._model.on('userUpdated', () => { this.onNavigate({path: '/me'}); });
		this._view.on('passwordUpdate', ({root = '', newPass = '', passConf = ''}) => { this.passwordUpdate(root, newPass, passConf); });
		this._view.on('logout', () => { this.logout(); });
		this._model.on('logouted', () => { this.onNavigate({path: '/'}); });
	}

	avatarUpload({ root = '', avatar = {} } = {}) {
		this._model.avatarUpload({ root, avatar });
	}

	userUpdate({root = '', email = '', name = ''} = {}) {
		this._model.userUpdate({ root, email, name });
	}

	passwordUpdate({root = '', newPass = '', passConf = ''} = {}) {
		this._model.passwordUpdate({root, newPass, passConf});
	}

	logout() {
		this._model.logout();
	}
}