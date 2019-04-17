import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../../blocks/html/body/application/container/content/main/main.pug';
import rowTemplate from '../../blocks/html/body/application/container/content/main/row/row.pug';
import pagesTemplate from '../../blocks/html/body/application/container/content/main/pages/pages.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { GET_NEXT_PAGE_EVENT } from '../../modules/events';
import View from './view';

export default class ScoreBoardView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onNextPageClick = this.onNextPageClick.bind(this);
	}

	onNextPageClick(event) {
		let pageNum = parseInt(document.querySelector('.pages__num').textContent);
		if (event.target.classList.contains('pages__next')) {
			this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum + 1});
		} else if (event.target.classList.contains('pages__back')) {
			this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum - 1});
		}
	}

	_createNextPListener() {
		const pages = this._root.querySelector('.pages');
		pages.addEventListener('click', this.onNextPageClick, true);
	}

	_removeNextPListener() {
		const pages = this._root.querySelector('.pages');
		pages.removeEventListener('click', this.onNextPageClick, true);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createNextPListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeNextPListener();
	}

	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_scoreboard'],
		}));
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_scoreboard');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_scoreboard'],
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

	_renderContent(data) {
		const contentBlock = document.querySelector('.content.content_theme_scoreboard');
		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SCOREBOARD',
				modifiers: ['title_theme_scoreboard'],
			}),
			mainTemplate({
				modifiers: ['main_theme_scoreboard'],
			}),
			pagesTemplate({
				modifiers: [],
				page_num: data.page,
			})
		);
	}

	_renderUsers(data) {
		const mainBlock = document.querySelector('.main.main_theme_scoreboard');

		genericBeforeEnd(mainBlock, 
			rowTemplate({
				page: data.page,
				modifiers: [],
				lst: [...data.users.users],
				host: HOST,
			}),
		);
	}

	_render(data) {
		if(data.isRender) {
			this._root.innerHTML = '';
			this._renderContainer();
			this._renderMain();
			this._renderBack();
			this._renderContent(data);
			this._renderUsers(data);
		} else if (data.users.users && data.page > 0) {
			const contentBlock = document.querySelector('.content.content_theme_scoreboard');
			contentBlock.innerHTML = '';
			this._renderContent(data);
			const mainBlock = document.querySelector('.main.main_theme_scoreboard');
			mainBlock.innerHTML = '';
			this._renderUsers(data);
		}
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}