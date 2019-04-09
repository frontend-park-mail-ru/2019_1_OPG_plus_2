import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import linkTemplate from '../../blocks/html/body/application/container/content/buttons/link/link.pug';
import errorTemplate from '../../blocks/html/body/application/container/content/forms/error/error.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixin } from '../navigate';
import View from './view';

export default class SignInView extends NavigateMixin(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');
		event.preventDefault();
            	
		const email = formsBlock.elements[0].value;
		const password = formsBlock.elements[1].value;
		this.emit('signInSubmit', {root: this._root, email: email, password: password });
	}

	_createSubmitListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.addEventListener('submit', this.onFormSubmit, false);
	}

	_removeSubmitListener() {
		const formsBlock = this._root.querySelector('.forms');
		formsBlock.removeEventListener('submit', this.onFormSubmit, false);
	}

	_createEventListeners() {
		this._createSubmitListener();
		this._createOnLinkListener();
	}

	_removeEventListeners() {
		this._removeSubmitListener();
	}

	_render(data) {
		this._root.innerHTML = '';
		console.log(data.error);
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: [`container_theme_signin ${data.error ? 'container_theme_error' : ' '}`],
		}));
		const containerBlock = document.querySelector('.container.container_theme_signin');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_signin'],
			}),
			contentTemplate({
				modifiers: ['content_theme_signin'],
			})
		);
		const headBlock = document.querySelector('.head.head_theme_signin');
		const contentBlock = document.querySelector('.content.content_theme_signin');

		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				hr: '/',
				dataset: '/',
			}),
		);

		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SING IN',
				modifiers: ['title_theme_signin'],
			}),
			formsTemplate({
				modifiers: [],
				name: 'signin',
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
				text:  data.error ? `${data.error.message}: ${data.error.data[0]}` : '',
			}),
			formTemplate({
				modifiers: [],
				username: 'email',
				placeholder: 'E-mail',
				type: 'email',
				req: true,
				value: `${data.email || ''}`,
			}),
			formTemplate({
				modifiers: [],
				username: 'password',
				placeholder: 'Password',
				type: 'password',
				req: true,
			}),
		);
		
		genericBeforeEnd(buttonsBlock, 
			sumbitTemplate({
				value: 'SIGN IN',
				form: 'signin',
				modifiers: [],
			}),
			linkTemplate({
				href: 'signup',
				title: 'SIGN UP',
				dataset: '/signup',
				hr: '/signup',
				modifiers: ['button_type_secondary'],
			}),
		);
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}