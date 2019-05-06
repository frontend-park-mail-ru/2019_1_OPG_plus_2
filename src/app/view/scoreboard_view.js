import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../../blocks/html/body/application/container/content/main/main.pug';
import rowTemplate from '../../blocks/html/body/application/container/content/main/row/row.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { GET_NEXT_PAGE_EVENT } from '../../modules/events';
import Paginate from '../component/paginate';
import View from './view';

export default class ScoreBoardView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onNextPageClick = this.onNextPageClick.bind(this);
		this.onPrevPageClick = this.onPrevPageClick.bind(this);
		
		this._paginate = new Paginate({onNextPage: this.onNextPageClick, onPrevPage: this.onPrevPageClick});
		this._components = [];
		this._components.push(this._paginate);
	}

	onNextPageClick(event, pageNum) {
		this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum + 1});
	}

	onPrevPageClick(event, pageNum) {
		this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum - 1});
	}

	_createEventListeners() {
		super._createEventListeners();
	}

	_removeEventListeners() {
		super._removeEventListeners();
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
		);

		this._paginate.create({root: contentBlock, data: data});
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