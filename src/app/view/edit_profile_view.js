import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import profileCardTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-card.pug';
import profileHeadTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.pug';
import formsTemplates from '../../blocks/html/body/application/container/content/forms/forms.pug';
import avatarTemplate
	from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import editIconTemplate
	from '../../blocks/html/body/application/container/content/profile-card/photo-edit/edit-icon/edit-icon.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import submitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';

import formTemplate from '../../blocks/html/body/application/container/content/forms/form/form.pug';

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
		this.onChangeEvent = this.onChangeEvent.bind(this);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createLoadListener();
		this._createSubmitListener();
		this._createChangeListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeSubmitListener();
		this._removeLoadListener();
		this._removeChangeListener();
	}

	onLoadEvent() {
		const photo = this._root.querySelector('#file-input').files;
		const buttons = this._root.querySelector('.buttons');
		buttons.innerHTML = '';
		let form = new FormData();
		form.append('avatar', photo[0]);
		this.emit('avatarUpload', { root: this._root, avatar: form});
	}

	onChangeEvent() {
		const button = this._root.querySelector('.submit');
		if (!button) {
			this._renderProfileButtons();
		}
	}

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');
		event.preventDefault();

		const email = User.get().email;
		const username = User.get().username;
		const newUsername = formsBlock.elements[1].value;
		const newPassword = formsBlock.elements[2].value;
		const repeatNewPassword = formsBlock.elements[3].value;

		if (newUsername != username) {
			this.emit('userUpdate', { root: this._root, email: email, name: newUsername });
		} else if(newPassword != '' && newPassword === repeatNewPassword) {
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

	_createChangeListener() {
		const fields = this._root.querySelectorAll('.form__text-form');
		fields.forEach(field => {
			field.addEventListener('input', this.onChangeEvent, true);
		});
	}

	_removeChangeListener() {
		const fields = this._root.querySelectorAll('.form__text-form');
		fields.forEach(field => {
			field.removeEventListener('input', this.onChangeEvent, true);
		});
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
		);
	}

	_renderProfileCard() {
		const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
		genericBeforeEnd(profileCardBlock,
			profileHeadTemplate({
				modifiers: [],
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_edit-profile'],
			}),
		);
	}

	_renderProfileHead(data) {
		const profileHeadBlock = document.querySelector('.profile-head');
		genericBeforeEnd(profileHeadBlock,
			avatarTemplate({
				modifiers: ['avatar_theme_fade'],
				url: `${data.avatar ? HOST + data.avatar : ''}`,
			}),
			editIconTemplate({
				modifiers: [],
				name: 'photo-edit',
			}),
		);
	}

	_renderProfileData() {
		const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
		
		genericBeforeEnd(profileCardBlock,
			formsTemplates({
				modifiers: ['profile-card_theme_forms'],
				action: 'POST',
				name: 'profile-edit',
			}),
		);
	}

	_renderProfileForms(data) {
		const formsBlock = document.querySelector('.profile-card_theme_forms');

		genericBeforeEnd(formsBlock,
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('username') ? 'form_theme_error' : ''}`] : [],
				placeholder: 'Nick',
				type: 'text',
				name: 'username',
				value: `${data.username || ''}`,
				autofocus: true,
			}),
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('password') ? 'form_theme_error' : ''}`] : [],
				placeholder: 'Password',
				name: 'password',
				type: 'password',
				value: '',
			}),
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('repeat-password') ? 'form_theme_error' : ''}`] : [],
				placeholder: 'Repeat-password',
				name: 'repeat-password',
				type: 'password',
				value: '',
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
		if (data.isRender) {
			this._root.innerHTML = '';
			this._renderContainer();
			this._renderMain();
			this._renderBack();
			this._renderContent();
			this._renderProfileCard();
			this._renderProfileHead(data.data);
			this._renderProfileData();
			this._renderProfileForms(data.data);
		} else {
			const fields = this._root.querySelectorAll('.form__text-form');
			console.log(data.data, fields)
			fields.forEach(field => {
				if(data.data.data.includes(field.name)) {
					field.classList.add('form_theme_error');
				}
			})
		}
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}