import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import profileIconTemplate from '../../blocks/html/body/application/container/head/menu/profile/profile.pug';
import scoreBoardTemplate from '../../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.pug';
import rulesTemplate from '../../blocks/html/body/application/container/head/menu/rules/rules.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import mainButtonTemplate from '../../blocks/html/body/application/container/content/main-button/main-button.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixin } from '../navigate';
import { genericBeforeEnd } from '../../modules/helpers.js';

export default class MainPageView extends NavigateMixin(EventEmitterMixin(View)) {
	constructor() {
		super();
	}

	_createEventListeners() {
		this._createOnLinkListener();
	}
    
	_render(data) {
		this._root.innerHTML = '';
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_main'],
		}));
		const containerBlock = this._root.querySelector('.container.container_theme_main');

		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_main'],
			}),
			contentTemplate({
				modifiers: ['content_theme_main'],
			})
		);
		const headBlock = this._root.querySelector('.head.head_theme_main');
		const contentBlock = this._root.querySelector('.content.content_theme_main');
		genericBeforeEnd(headBlock, 
			menuTemplate({
				modifiers: ['menu_theme_main'],
			})
		);
		const menuBlock = this._root.querySelector('.menu.menu_theme_main');

		genericBeforeEnd(menuBlock, 
			profileIconTemplate({
				modifiers: [`${data.isAuth ? '' : 'profile_theme_hidden'}`],
				href: '/',
				dataset: '/me',
			}),
			scoreBoardTemplate({
				modifiers: [],
				href: 'score',
				dataset: '/leaders',
			}),
			rulesTemplate({
				modifiers: [],
				href: 'rules',
				dataset: '/rules',
			})
		);

		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'colors',
				modifiers: ['title_theme_main'],
			}),
			mainButtonTemplate({
				hr: '/game',
				modifier: ['main-button_theme_play'],
				dataset: '/game',
			}),
			mainButtonTemplate({
				hr: `${data.isAuth ? '/multiplayer' : '/signin'}`,
				modifier: [`${data.isAuth ? 'main-button_theme_multiplayer' : 'main-button_theme_signin'}`],
				dataset: `${data.isAuth ? '/multiplayer' : '/signin'}`,
			}),
		);
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}