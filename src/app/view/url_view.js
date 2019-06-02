import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import buttonTemplate from '../../blocks/html/body/application/container/content/buttons/button/button.pug';
import errorTemplate from '../../blocks/html/body/application/container/content/forms/error/error.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import View from './view';
import { GENERATE_URL_EVENT, 
		 START_GAME 
	   } from '../../modules/events';

export default class UrlView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
        super();
        this.onGenerateUrl = this.onGenerateUrl.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    onGenerateUrl() {
        this.emit(GENERATE_URL_EVENT);
    }

    _createGenerateListener() {
        const buttonBlock = this._root.querySelector('.button.button_type_primary');
        buttonBlock.addEventListener('click', this.onGenerateUrl, false);
    }

    _removeGenerateListener() {
        const buttonBlock = this._root.querySelector('.button.button_type_primary');
        buttonBlock.removeEventListener('click', this.onGenerateUrl, false);
    }

	onFormSubmit(event) {
		const formsBlock = this._root.querySelector('.forms');
		event.preventDefault();
		this.emit(START_GAME, {path: '/' + formsBlock.elements[0].value.split('/').slice(3,6).join('/'), redirect: true});
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
		super._createEventListeners();
        this._createSubmitListener();
        this._createGenerateListener();
	}

	_removeEventListeners() {
        super._removeEventListeners();
        this._removeGenerateListener();
		this._removeSubmitListener();
	}

	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_url'],
		}));
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_url');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_url'],
			})
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
		const contentBlock = document.querySelector('.content.content_theme_url');

		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'GENERATE URL',
				modifiers: ['title_theme_url'],
			}),
			formsTemplate({
				modifiers: [],
				name: 'url',
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_url'],
			}),
		);
	}

	_renderForms(data) {
		const formsBlock = document.querySelector('.forms');

		genericBeforeEnd(formsBlock, 
			formTemplate({
				modifiers: ['forms_theme_url'],
				formModifiers: [''],
				username: 'url',
				placeholder: 'Url',
				type: 'text',
                value: `${data.id ? MY_HOST + '/multiplayer/' + data.id : ''}`,
				req: true,
				help: true,
			}),
		);

		let helpBlock = document.querySelector('.form__help');
		helpBlock.classList.add('help-hidden');
	}

	_renderButtons() {
		const buttonsBlock = document.querySelector('.buttons');
		genericBeforeEnd(buttonsBlock, 
			buttonTemplate({
				modifiers: ['button_type_primary'],
				text: 'GENERATE URL',
            }),
            sumbitTemplate({
				value: 'PLAY',
				form: 'url',
				modifiers: ['button_type_secondary'],
			})
		);
	}

	_renderHelp() {
		// debugger;
		let helpBlock = document.querySelector('.form__help');
		helpBlock.classList.remove('help-hidden');

		setTimeout(() => {helpBlock.classList.add('help-hidden')}, 5000);
	}

	_render(data) {
        if (data.isRender) {
            this._root.innerHTML = '';
            this._renderContainer(data);
            this._renderMain();
            this._renderBack();
            this._renderContent();
            this._renderForms(data);
            this._renderButtons();
        } else {
            const formsBlock = document.querySelector('.forms');
            formsBlock.innerHTML = '';
			this._renderForms(data);
			this._renderHelp();
        }
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}