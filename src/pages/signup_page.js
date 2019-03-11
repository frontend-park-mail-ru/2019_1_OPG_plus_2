import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import errorTemplate from '../blocks/html/body/application/container/content/forms/error/error.pug';

import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';
import AjaxModule from '../modules/ajax';
import {validEmail, validLogin} from '../modules/utils.js';

export default class SignUpPage extends Page {
	constructor({
		router = {},
	} = {}) {
		super();
		this._router = router;
	}

	_createEventListener() {
		const formsBlock = this._el.querySelector('.forms');

		formsBlock.addEventListener('submit', (event) => {

			event.preventDefault();

			const name = formsBlock.elements[0].value;
			const email = formsBlock.elements[1].value;
			const password = formsBlock.elements[2].value;
			const password_repeat = formsBlock.elements[3].value;

			if (!validEmail(email) || !email) {
				this._el.innerHTML = '';
				this._renderSignUp({
					error: 'Invalid Email',
					modifier: 'container_theme_error',
				});
				return;
			}

			if (!validLogin(name) || !name) {
				this._el.innerHTML = '';
				this._renderSignUp({
					error: 'Invalid Name',
					modifier: 'container_theme_error',
				});
				return;
			} 

			if (password !== password_repeat || !password || !password_repeat) {
				this._el.innerHTML = '';
				this._renderSignUp({
					error: 'Passwords doesn\' not match',
					modifier: 'container_theme_error',
				});
				return;
			}
            
			AjaxModule.doPost({
				callback: () => {
					this._router.open('/me');

				},
				path: '/signup',
				body: {
					name: name,
					email: email,
					password: password,
				},
			});
		});
	}

	_renderSignUp(data) {
		genericBeforeEnd(this._el, containerTemplate({
			modifiers: [`container_theme_signup ${data.modifier || ' '}`],
		}));
		const containerBlock = document.querySelector('.container.container_theme_signup');

		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_signup'],
			}),
			contentTemplate({
				modifiers: ['content_theme_signup'],
			})
		);
		const headBlock = document.querySelector('.head.head_theme_signup');
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
				name: 'name',
				type: 'text',
				placeholder: 'Name',
				req: true,
			}),
			formTemplate({
				modifiers: [],
				name: 'email',
				type: 'email',
				placeholder: 'E-mail',
				req: true,
			}),
			formTemplate({
				modifiers: [],
				name: 'password',
				type: 'password',
				placeholder: 'Password',
				req: true,
			}),
			formTemplate({
				modifiers: [],
				name: 'repeat-password',
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

		this._createEventListener();
	}

	open(root) {
		this._el = root;
		this._renderSignUp({});
	}
}