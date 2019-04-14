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
import View from './view';

export default class ScoreBoardView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
	}

	// onClick(event) {
	// 	if (event.target.classList.contains('pages__first')) {
	// 		API.getUsers({
	// 			limit: 5,
	// 			pages: 1,
	// 		})
	// 			.then(users => {
	// 				this._root.innerHTML = '';
	// 				this._renderScoreBoard(users.data, 1);
	// 			});
	// 	} else if (event.target.classList.contains('pages__back')) {
	// 		const pagesNum = parseInt(document.querySelector('.pages__num').textContent) - 1;
	// 		API.getUsers({
	// 			limit: 5,
	// 			page: pagesNum > 0 ? pagesNum : 1,
	// 		})
	// 			.then(users => {
	// 				this._root.innerHTML = '';
	// 				this._renderScoreBoard(users.data, pagesNum > 0 ? pagesNum : 1);
	// 			});
	// 	} else if (event.target.classList.contains('pages__next')) {
	// 		const pagesNum = parseInt(document.querySelector('.pages__num').textContent) + 1;
	// 		API.getUsers({
	// 			limit: 5,
	// 			page: pagesNum,
	// 		})
	// 			.then(users => {
	// 				this._root.innerHTML = '';
	// 				this._renderScoreBoard(users.data, pagesNum);
	// 			})
	// 			.catch(() => this._router.open('/leaders'));
	// 	}
	// }

	// _createEventListener() {
	// 	const pages = this._root.querySelector('.pages');
	// 	pages.addEventListener('click', this.onClick, true);
	// }

	// _removeEventListener() {
	// 	const pages = this._root.querySelector('.pages');
	// 	pages.removeEventListener('click', this.onClick, true);
	// }

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

	_renderContent() {
		const contentBlock = document.querySelector('.content.content_theme_scoreboard');
		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SCOREBOARD',
				modifiers: ['title_theme_scoreboard'],
			}),
			mainTemplate({
				modifiers: ['main_theme_scoreboard'],
			}),
			// pagesTemplate({
			// 	modifiers: [],
			// 	page_num: data.page,
			// })
		);
	}

	_renderUsers(data) {
		const mainBlock = document.querySelector('.main.main_theme_scoreboard');

		genericBeforeEnd(mainBlock, 
			rowTemplate({
				modifiers: [],
				lst: [...data.users.users],
				host: HOST,
			}),
		);
	}

	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain();
		this._renderBack();
		this._renderContent();
		this._renderUsers(data);
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}