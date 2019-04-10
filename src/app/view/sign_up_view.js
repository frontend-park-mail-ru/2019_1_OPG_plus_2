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
import { validEmail, validLogin, validPassword } from '../../modules/utils.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixin } from '../navigate';
import View from './view';

export default class SignUpView extends NavigateMixin(EventEmitterMixin(View)) {
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

		// if (!validEmail(email) || !email) {
		// 	this._root.innerHTML = '';
		// 	this._renderSignUp({
		// 		error: 'Invalid Email',
		// 		modifier: 'container_theme_error',
		// 	}, {
		// 		name: username,
		// 		email,
		// 	});
		// 	return;
		// }

		// if (!validLogin(username) || !username) {
		// 	this._root.innerHTML = '';
		// 	this._renderSignUp({
		// 		error: 'Invalid Name',
		// 		modifier: 'container_theme_error',
		// 	}, {
		// 		username: username,
		// 		email,
		// 	});
		// 	return;
		// } 

		// if (password !== password_repeat || !password || !password_repeat) {
		// 	this._root.innerHTML = '';
		// 	this._renderSignUp({
		// 		error: 'Passwords doesn\' not match',
		// 		modifier: 'container_theme_error',
		// 	},{
		// 		username: username,
		// 		email,
		// 	});
		// 	return;
		// }

		// if (!validPassword(password)) {
		// 	this._root.innerHTML = '';
		// 	this._renderSignUp({
		// 		error: 'Invalid password, must be more than 5 symbols',
		// 		modifier: 'container_theme_error',
		// 	},{
		// 		username,
		// 		email,
		// 	});
		// 	return;
		// }

		this.emit('signUpSubmit', {
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
		this._createSubmitListener();
		this._createOnLinkListener();
	}

	_removeEventListeners() {
		this._removeOnLinkListener();
	}

	_render(data) {
		this._root.innerHTML = '';
		console.log(data);
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: [`container_theme_signup ${data.error ? 'container_theme_error' : ' '}`],
		}));
		const containerBlock = document.querySelector('.container.container_theme_signup');

		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_signup'],
			})
		);
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		const contentBlock = document.querySelector('.content.content_theme_signup');

		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				href: '/',
				dataset: '/',
			}),
		);

		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SING UP',
				modifiers: ['title_theme_signup'],
			}),
			formsTemplate({
				modifiers: [],
				action: 'POST',
				name: 'signup',
			}),
			buttonsTemplate({
				modifiers: [],
			}),
		);
		const formsBlock = document.querySelector('.forms');
		const buttonsBlock = document.querySelector('.buttons');

		genericBeforeEnd(formsBlock,
			errorTemplate({
				modifiers: [],
				text: data.error,
			}), 
			formTemplate({
				modifiers: [],
				username: 'username',
				type: 'text',
				placeholder: 'Name',
				req: true,
				value: `${data.email ? data.email : ''}`,
			}),
			formTemplate({
				modifiers: [],
				username: 'email',
				type: 'email',
				placeholder: 'E-mail',
				req: true,
				value: `${data.name ? data.name: ''}`,
			}),
			formTemplate({
				modifiers: [],
				username: 'password',
				type: 'password',
				placeholder: 'Password',
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

		genericBeforeEnd(buttonsBlock, 
			sumbitTemplate({
				value: 'SIGN UP',
				form: 'signup',
				modifiers: [],
			}),
		);
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}