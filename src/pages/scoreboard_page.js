import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../blocks/html/body/application/container/content/main/main.pug';
import rowTemplate from '../blocks/html/body/application/container/content/main/row/row.pug';

import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';
import API from '../modules/API.js';

export default class LeaderBoard extends Page {

	_renderLeaderBoard(data) {
		genericBeforeEnd(this._el, containerTemplate({
			modifiers: ['container_theme_scoreboard'],
		}));
		const containerBlock = document.querySelector('.container.container_theme_scoreboard');


		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_scoreboard'],
			})
		);
		const headBlock = document.querySelector('.head.head_theme_back-arrow');
		const contentBlock = document.querySelector('.content.content_theme_scoreboard');

		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				href: '/',
				dataset: '/',
			}),
		);
		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'SCOREBOARD',
				modifiers: ['title_theme_scoreboard'],
			}),
			mainTemplate({
				modifiers: ['main_theme_scoreboard'],
			}),
		);
		const mainBlock = document.querySelector('.main.main_theme_scoreboard');

		genericBeforeEnd(mainBlock, 
			rowTemplate({
				modifiers: [],
				lst: [...data],
			})
		);
	}


	open(root) {
		this._el = root;
		API.getUsers()
			.then(users => this._renderLeaderBoard(users.data))
			.catch(() => this._router.open('/'));
	}
}