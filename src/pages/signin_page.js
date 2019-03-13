import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import linkTemplate from '../blocks/html/body/application/container/content/buttons/link/link.pug';
import errorTemplate from '../blocks/html/body/application/container/content/forms/error/error.pug';

import AjaxModule from '../modules/ajax.js';
import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';

export default class SignInPage extends Page {
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
            	
			const email = formsBlock.elements[0].value;
			const password = formsBlock.elements[1].value;
            
			AjaxModule.doPost({
				callback: (xhr) => {
					console.log(xhr);
					if (xhr.status === 200) {
						this._router.open('/me');
					} else {
						this._el.innerHTML = '';
						this._renderSignIn(xhr, email);
					}
				},
				path: 'https://api.colors.hackallcode.ru/api/session',
				body: {
					login: email,
					password: password,
				},
			});
		});
	}

	_renderSignIn(data, email) {
		genericBeforeEnd(this._el, containerTemplate({
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
				href: '/',
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
				text: data.error,
			}),
			formTemplate({
				modifiers: [],
				name: 'email',
				placeholder: 'E-mail',
				type: 'email',
				req: true,
				value: `${email || ''}`,
			}),
			formTemplate({
				modifiers: [],
				name: 'password',
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
				dataset: 'signup',
				modifiers: ['button_type_secondary'],
			}),
		);

		this._createEventListener();
	}

	open(root) {
		this._el = root;
		this._renderSignIn({});
	}
}