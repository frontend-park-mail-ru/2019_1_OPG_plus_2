import Controller from './controller';
import { SIGN_IN, EDIT_ME, PROFILE, ROOT } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';
import { INIT_EVENT, 
		 INIT_ERROR_EVENT,
		 USER_UPDATED_ERROR_EVENT } from '../../modules/events';

export default class EditProfileController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on(INIT_EVENT, ({root = {}, data = {}, isRender = true} = {}) => { this.render({root: root, data: {data, isRender}}) });
		this._model.on(INIT_ERROR_EVENT, () => { this.onNavigate({path: SIGN_IN, redirect: true}); });
		this._view.on('avatarUpload', ({avatar = {} }) => { this.avatarUpload({avatar: avatar});});
		this._model.on('avatarUploaded', () => { this.onNavigate({path: EDIT_ME}); });
		this._view.on('userUpdate', ({email = '', name = ''}) => { this.userUpdate({email, name}); });
		this._model.on('userUpdated', () => { this.onNavigate({path: PROFILE}); });
		this._model.on(USER_UPDATED_ERROR_EVENT, ({data = {}, isRender = true} = {}) => { this.userUpdatedError({data, isRender})});
		this._view.on('passwordUpdate', ({newPass = '', passConf = ''}) => { this.passwordUpdate({newPass, passConf}); });
		this._view.on('logout', () => { this.logout(); });
		this._model.on('logouted', () => { this.onNavigate({path: ROOT}); });
	}

	avatarUpload({avatar = {} } = {}) {
		this._model.avatarUpload({avatar });
	}

	userUpdate({email = '', name = ''} = {}) {
		this._model.userUpdate({email, name });
	}

	userUpdatedError(data) {
		this._view._render(data);
	}

	passwordUpdate({newPass = '', passConf = ''} = {}) {
		this._model.passwordUpdate({newPass, passConf});
	}

	logout() {
		this._model.logout();
	}
}