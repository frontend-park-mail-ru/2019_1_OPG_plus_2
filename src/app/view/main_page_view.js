import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import profileIconTemplate from '../../blocks/html/body/application/container/head/menu/profile/profile.pug';
import scoreBoardTemplate from '../../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.pug';
import rulesTemplate from '../../blocks/html/body/application/container/head/menu/rules/rules.pug';
import separatorTemplate from '../../blocks/html/body/application/container/head/menu/separator/separator.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import mainButtonTemplate from '../../blocks/html/body/application/container/content/main-button/main-button.pug';
import linesUpTemplate from '../../blocks/html/body/application/container/lines/lines-up/lines-up.pug';
import linesDownLeftTemplate from '../../blocks/html/body/application/container/lines/lines-down-left/lines-down-left.pug';
import linesDownRightTemplate from '../../blocks/html/body/application/container/lines/lines-down-right/lines-down-right.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd } from '../../modules/helpers.js';

export default class MainPageView extends NavigateMixinView(EventEmitterMixin(View)) {
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
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_main'],
		}));
	}

	_renderMain() {
		const containerBlock = this._root.querySelector('.container.container_theme_main');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_main'],
			}),
			contentTemplate({
				modifiers: ['content_theme_main'],
			}),
			linesUpTemplate({
				modifiers: ['lines-up_theme_right'],
			}),
			linesDownLeftTemplate({
				modifiers: [],
			}),
			linesDownRightTemplate({
				modifiers: [],
			})
		);
	}

	_renderMenu(data) {
		const headBlock = this._root.querySelector('.head.head_theme_main');
		const contentBlock = this._root.querySelector('.content.content_theme_main');

		genericBeforeEnd(headBlock, 
			menuTemplate({
				modifiers: ['menu_theme_main'],
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
				label: 'Singleplayer',
			}),
			mainButtonTemplate({
				hr: `${data.isAuth ? '/multiplayer' : '/signin'}`,
				modifier: [`${data.isAuth ? 'main-button_theme_multiplayer' : 'main-button_theme_signin'}`],
				dataset: `${data.isAuth ? '/multiplayer' : '/signin'}`,
				label: `${data.isAuth ? 'Multiplayer' : 'Sign In'}`,
			}),
		);

	}

	_renderHeadMenu(data) {
		const menuBlock = this._root.querySelector('.menu.menu_theme_main');
		genericBeforeEnd(menuBlock, 
			profileIconTemplate({
				modifiers: [`${data.isAuth ? '' : 'profile_theme_hidden'}`],
				href: '/',
				dataset: '/me',
			}),
			separatorTemplate({
				modifiers: [`${data.isAuth ? '' : 'separator_theme_hidden'}`],
			}),
			scoreBoardTemplate({
				modifiers: [],
				hr: '/score',
				dataset: '/leaders',
			}),
			separatorTemplate({
				modifiers: [],
			}),
			rulesTemplate({
				modifiers: [],
				hr: '/rules',
				dataset: '/rules',
			})
		);

	}
	
	// TODO вынести innerHTML = '' в базовый класс
	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain();
		this._renderMenu(data);
		this._renderHeadMenu(data);
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}