import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import errorTemplate from '../../blocks/html/body/application/container/content/forms/error/error.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import View from './view';
import { SIGN_UP_SUBMIT_EVENT } from '../../modules/events';

export default class SignUpView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');

		event.preventDefault();

		const username = formsBlock.elements[0].value;
		const email = formsBlock.elements[1].value;
		const password = formsBlock.elements[2].value;
		const password_repeat = formsBlock.elements[3].value;

		this.emit(SIGN_UP_SUBMIT_EVENT, {
			root: this._root,
			name: username, 
			email: email, 
			password: password, 
			password_repeat: password_repeat,
		});
	}

	_createSubmitListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.addEventListener('submit', this.onFormSubmit, true);
	}

	_removeSubmitListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.removeEventListener('submit', this.onFormSubmit, true);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createSubmitListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeSubmitListener();
	}

	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_signup'],
		}));
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_signup');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_signup'],
			})
		);
	}

	_renderBack() {
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				href: '/',
				dataset: '/',
			}),
		);
	}

	_renderContent() {
		const contentBlock = document.querySelector('.content.content_theme_signup');
		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SIGN UP',
				modifiers: ['title_theme_signup'],
			}),
			formsTemplate({
				modifiers: ['forms_theme_signup'],
				action: 'POST',
				name: 'signup',
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_signup'],
			}),
		);
	}

	_renderForms(data) {
		const formsBlock = document.querySelector('.forms');
		genericBeforeEnd(formsBlock,
			errorTemplate({
				modifiers: [],
				text: data.error ? data.error.message : '',
			}), 
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('name') ? 'form_theme_error' : ''}`] : [],
				username: 'username',
				type: 'text',
				placeholder: 'Name',
				req: true,
				value: `${data.name ? data.name : ''}`,
			}),
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('email') ? 'form_theme_error' : ''}`] : [],
				username: 'email',
				type: 'email',
				placeholder: 'E-mail',
				req: true,
				value: `${data.email ? data.email: ''}`,
			}),
			formTemplate({
				modifiers: [],
				formModifiers: data.error ? [`${data.error.data.includes('password') ? 'form_theme_error' : ''}`] : [],
				username: 'password',
				type: 'password',
				placeholder: 'Password (min 5 characters)',
				req: true,
			}),
			formTemplate({
				modifiers: [],
				username: 'repeat-password',
				type: 'password',
				placeholder: 'Repeat password',
				req: true,
			}),
		);
	}

	_renderButtons() {
		const buttonsBlock = document.querySelector('.buttons');
		genericBeforeEnd(buttonsBlock, 
			sumbitTemplate({
				value: 'SIGN UP',
				form: 'signup',
				modifiers: [],
			}),
		);
	}

	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer(data);
		this._renderMain();
		this._renderBack();
		this._renderContent();
		this._renderForms(data);
		this._renderButtons();
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}