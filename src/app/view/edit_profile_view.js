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
import formsTemplates from '../../blocks/html/body/application/container/content/forms/forms.pug';
import profileFormTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-data/profile-form/profile-form.pug';
import avatarTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import editIconTemplate
	from '../../blocks/html/body/application/container/content/profile-card/photo-edit/edit-icon/edit-icon.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import submitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';

import View from './view';
import User from '../../modules/user.js';
import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';

export default class EditProfileView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onLoadEvent = this.onLoadEvent.bind(this);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createLoadListener();
		this._createSubmitListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeSubmitListener();
		this._removeLoadListener();
	}

	onLoadEvent() {
		const photo = this._root.querySelector('#file-input').files;
		let form = new FormData();
		form.append('avatar', photo[0]);
		this.emit('avatarUpload', { root: this._root, avatar: form});
	}

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');
		event.preventDefault();

		const email = User.get().email;
		const username = User.get().username;
		const newUsername = formsBlock.elements[0].value;
		const newPassword = formsBlock.elements[1].value;
		const repeatNewPassword = formsBlock.elements[2].value;

		if (newUsername != username) {
			this.emit('userUpdate', { root: this._root, email: email, name: newUsername });
		} else if(newPassword != '' && newPassword === repeatNewPassword) {
			// debugger;
			this.emit('passwordUpdate', {newPass: newPassword, passConf: repeatNewPassword });
		}
	}

	_createSubmitListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.addEventListener('submit', this.onFormSubmit, true);
	}

	_removeSubmitListener() {
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


	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_profile'],
		}));
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_profile');
		genericBeforeEnd(containerBlock,
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_edit-profile'],
			}),
		);
	}

	_renderBack() {
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		genericBeforeEnd(headBlock,
			backArrowTemplate({
				modifiers: [],
				hr: '/',
				dataset: '/',
			}),
		);
	}

	_renderContent() {
		const contentBlock = document.querySelector('.content.content_theme_edit-profile');
		genericBeforeEnd(contentBlock,
			profileCardTemplate({
				modifiers: ['profile-card_theme_edit'],
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_edit-profile'],
			}),
		);
	}

	_renderProfileCard() {
		const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
		genericBeforeEnd(profileCardBlock,
			profileHeadTemplate({
				modifiers: [],
			}),
		);
	}

	_renderProfileHead() {
		const profileHeadBlock = document.querySelector('.profile-head');
		genericBeforeEnd(profileHeadBlock,
			settingsIconTemplate({
				modifiers: [],
			})
		);
	}

	_renderProfileData() {
		const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
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
	}

	_renderProfileForms(data) {
		const photoEditBlock = document.querySelector('.photo-edit');
		const formsBlock = document.querySelector('.profile-card_theme_forms');

		genericBeforeEnd(photoEditBlock,
			avatarTemplate({
				modifiers: [],
				url: `${data.avatar ? HOST + data.avatar : ''}`,
			}),
			editIconTemplate({
				modifiers: [],
				name: 'photo-edit',
			}),
		);

		genericBeforeEnd(formsBlock,
			profileFormTemplate({
				modifiers: ['form_theme_profile '],
				name: 'username',
				type: 'text',
				title: 'Name',
				val: data.username,
			}),
			profileFormTemplate({
				modifiers: ['form_theme_profile '],
				name: 'password',
				type: 'password',
				title: 'Password',
				val: '',
			}),
			profileFormTemplate({
				modifiers: ['form_theme_profile '],
				name: 'repeat-password',
				type: 'password',
				title: 'Repeat password',
				val: '',
			}),
		);
	}

	_renderProfileButtons() {
		const buttonsBlock = document.querySelector('.buttons.buttons_theme_edit-profile');
		genericBeforeEnd(buttonsBlock,
			submitTemplate({
				el: buttonsBlock,
				value: 'SAVE',
				form: 'profile-edit',
				modifiers: ['submit_theme_edit-profile'],
			}),
		);
	}

	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain();
		this._renderBack();
		this._renderContent();
		this._renderProfileCard();
		this._renderProfileHead();
		this._renderProfileData();
		this._renderProfileForms(data);
		this._renderProfileButtons();
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}