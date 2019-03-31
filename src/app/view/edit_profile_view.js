import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import profileCardTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-card.pug';
import profileHeadTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.pug';
import settingsIconTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/settings-icon/settings-icon.pug';
import photoEditTemplate
	from '../../blocks/html/body/application/container/content/profile-card/photo-edit/photo-edit.pug';
import logoutIconTemplate from '../../blocks/html/body/application/container/head/menu/logout/logout.pug';
import formsTemplates from '../../blocks/html/body/application/container/content/forms/forms.pug';
import profileFormTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-data/profile-form/profile-form.pug';
import avatarTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import editIconTemplate
	from '../../blocks/html/body/application/container/content/profile-card/photo-edit/edit-icon/edit-icon.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import submitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';

import {genericBeforeEnd} from '../../modules/helpers.js';
import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import User from '../../modules/user.js';

export default class EditProfileView extends EventEmitterMixin(View) {
	constructor() {
		super();
		this.onLogoutEvent = this.onLogoutEvent.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onLoadEvent = this.onLoadEvent.bind(this);
	}

	onLoadEvent() {
		const photo = this._root.querySelector('#file-input').files;
		let form = new FormData();
		form.append('avatar', photo[0]);
		this.emit('avatarUpload', { root: this._root, avatar: form});
	}

	onLogoutEvent(event) {
		event.preventDefault();
		this.emit('logout');
	}

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');
		event.preventDefault();

		const email = User.get().email;
		const username = User.get().username;
		const newUsername = formsBlock.elements[0].value;
		const newPassword = formsBlock.elements[1].value;
		const repeatNewPassword = formsBlock.elements[2].value;

		debugger;
		if (newUsername != username) {
			this.emit('userUpdate', {root: this._root, email: email, name: newUsername});
		} else if(newPassword != '' && newPassword === repeatNewPassword) {
            this.emit('passwordUpdate', {root: this._root, newPassword, repeatNewPassword});
		}
	}

	_createLogoutListener() {
		document.querySelector('.logout').addEventListener('click', this.onLogoutEvent, true);
	}

	_removeLogoutListener() {
		document.querySelector('.logout').removeEventListener('click', this.onLogoutEvent, true);
	}

	_createEventListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.addEventListener('submit', this.onFormSubmit, true);
	}

	_removeEventListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.removeEventListener('submit', this.onFormSubmit, true);
	}

	_createLoadListener() {
		const photoBlock = this._root.querySelector('#file-input');
		photoBlock.addEventListener('change', this.onLoadEvent, true);
	}

	_removeLoadListener() {
		const photoBlock = this._root.querySelector('#file-input');
		photoBlock.removeEventListener('change', this.onLoadEvent, true);
	}

	_renderEditProfilePage(data) {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_profile'],
		}));
		const containerBlock = document.querySelector('.container.container_theme_profile');

		genericBeforeEnd(containerBlock,
			headTemplate({
				modifiers: ['head_theme_profile'],
			}),
			contentTemplate({
				modifiers: ['content_theme_edit-profile'],
			}),
			menuTemplate({
				modifiers: ['menu_theme_profile'],
			}),
		);
		const headBlock = document.querySelector('.head.head_theme_profile');
		const contentBlock = document.querySelector('.content.content_theme_edit-profile');
		const menuBlock = document.querySelector('.menu.menu_theme_profile');

		genericBeforeEnd(headBlock,
			backArrowTemplate({
				modifiers: [],
				href: '/',
				dataset: '/',
			}),
		);

		genericBeforeEnd(contentBlock,
			profileCardTemplate({
				modifiers: ['profile-card_theme_edit'],
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_edit-profile'],
			}),
		);
		const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
		const buttonsBlock = document.querySelector('.buttons.buttons_theme_edit-profile');

		genericBeforeEnd(profileCardBlock,
			profileHeadTemplate({
				modifiers: [],
			}),
		);
		const profileHeadBlock = document.querySelector('.profile-head');

		genericBeforeEnd(profileHeadBlock,
			settingsIconTemplate({
				modifiers: [],
			})
		);

		genericBeforeEnd(profileCardBlock,
			photoEditTemplate({
				modifiers: [],
			}),
			formsTemplates({
				modifiers: ['profile-card_theme_forms'],
				action: 'POST',
				name: 'profile-edit',
			}),
		);
		const photoEditBlock = document.querySelector('.photo-edit');
		const formsBlock = document.querySelector('.profile-card_theme_forms');

		genericBeforeEnd(photoEditBlock,
			avatarTemplate({
				modifiers: [],
				url: `${data.photo ? HOST + data.photo : ''}`,
			}),
			editIconTemplate({
				modifiers: [],
				name: 'photo-edit',
			}),
		);

		genericBeforeEnd(formsBlock,
			profileFormTemplate({
				modifiers: [],
				name: 'username',
				type: 'text',
				title: 'Name',
				val: data.username,
			}),
			profileFormTemplate({
				modifiers: [],
				name: 'password',
				type: 'password',
				title: 'Password',
				val: '',
			}),
			profileFormTemplate({
				modifiers: [],
				name: 'repeat-password',
				type: 'password',
				title: 'Repeat password',
				val: '',
			}),
		);

		genericBeforeEnd(buttonsBlock,
			submitTemplate({
				el: buttonsBlock,
				value: 'SAVE',
				form: 'profile-edit',
				modifiers: ['submit_theme_edit-profile'],
			}),
		);

		genericBeforeEnd(menuBlock,
			logoutIconTemplate({
				modifiers: [],
				href: '/logout',
				dataset: '/logout',
			}),
		);
		
		this._removeLogoutListener();
		this._removeEventListener();
		this._removeLoadListener();
		this._createLoadListener();
		this._createLogoutListener();
		this._createEventListener();
	}

	open({root = {}, data = {}}) {
        this._root = root;
        this._root.innerHTML = '';
        this._renderEditProfilePage(data);
	}
}