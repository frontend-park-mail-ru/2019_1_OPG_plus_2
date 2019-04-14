import Controller from './controller';
import { SIGN_IN, EDIT_ME, PROFILE, ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';

export default class EditProfileController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on('getEditProfile', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
		this._model.on('getEditProfileError', () => { this.onNavigate({path: SIGN_IN}); });
		this._view.on('avatarUpload', ({avatar = {} }) => { this.avatarUpload({avatar: avatar});});
		this._model.on('avatarUploaded', () => { this.onNavigate({path: EDIT_ME}); });
		this._view.on('userUpdate', ({email = '', name = ''}) => { this.userUpdate({email, name}); });
		this._model.on('userUpdated', () => { this.onNavigate({path: PROFILE}); });
		this._view.on('passwordUpdate', ({newPass = '', passConf = ''}) => { this.passwordUpdate(newPass, passConf); });
		this._view.on('logout', () => { this.logout(); });
		this._model.on('logouted', () => { this.onNavigate({path: ROOT}); });
	}

	avatarUpload({avatar = {} } = {}) {
		this._model.avatarUpload({avatar });
	}

	userUpdate({email = '', name = ''} = {}) {
		this._model.userUpdate({email, name });
	}

	passwordUpdate({newPass = '', passConf = ''} = {}) {
		this._model.passwordUpdate({newPass, passConf});
	}

	logout() {
		this._model.logout();
	}
}