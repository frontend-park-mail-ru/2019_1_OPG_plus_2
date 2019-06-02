import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import rulesImageTemplate from '../../blocks/html/body/application/container/content/rules-image/rules-image.pug';

import View from './view';
import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';

export default class RulesView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
	}

	_createEventListeners() {
		super._createEventListeners();
	}

	_removeEventListeners() {
		super._removeEventListeners();
	}

	_renderContainer() {
		genericBeforeEnd(this._root,
			containerTemplate({
				modifiers: ['container_theme_main']
			})
		);
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_main');
		genericBeforeEnd(containerBlock,
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_rules'],
			})
		);
	}

	_renderHead() {
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		genericBeforeEnd(headBlock,
			backArrowTemplate({
				modifiers: [],
				hr: '/',
				dataset: '/',
			}),
		);
	}

	_renderRules() {
		const contentBlock = document.querySelector('.content.content_theme_rules');

		genericBeforeEnd(contentBlock,
			rulesImageTemplate(),
		);

	}

	_render() {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain();
		this._renderRules();
		this._renderHead();
	}

	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}
