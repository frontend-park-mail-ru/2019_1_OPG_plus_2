import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import menuTemplate from '../blocks/html/body/application/container/head/menu/menu.pug';
import profileIconTemplate from '../blocks/html/body/application/container/head/menu/profile/profile.pug';
import scoreBoardTemplate from '../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.pug';
import rulesTemplate from '../blocks/html/body/application/container/head/menu/rules/rules.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../blocks/html/body/application/container/content/main/main.pug';
import playTemplate from '../blocks/html/body/application/container/content/main/play/play.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import linkTemplate from '../blocks/html/body/application/container/content/buttons/link/link.pug';

import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';
import API from '../modules/API.js';

export default class MainPage extends Page {
	constructor({
		router = {},
	} = {}) {
		super();
		this._router = router;
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	onLinkClick(event) {
		if (!(event.target instanceof HTMLAnchorElement) || event.target.dataset.href === '/logout') {
			return;
		}
		event.preventDefault();
		this._router.open(event.target.dataset.href);
	}

	_createEventListener() {
		this._el.addEventListener('click', this.onLinkClick, true);
	}

	_removeEventListener() {
		this._el.removeEventListener('click', this.onLinkClick, true);
	}

	_renderMainPage(data) {
		genericBeforeEnd(this._el, containerTemplate({
			modifiers: ['container_theme_main'],
		}));
		const containerBlock = this._el.querySelector('.container.container_theme_main');

		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_main'],
			}),
			contentTemplate({
				modifiers: ['content_theme_main'],
			})
		);
		const headBlock = this._el.querySelector('.head.head_theme_main');
		const contentBlock = this._el.querySelector('.content.content_theme_main');
		genericBeforeEnd(headBlock, 
			menuTemplate({
				modifiers: ['menu_theme_main'],
			})
		);
		const menuBlock = this._el.querySelector('.menu.menu_theme_main');

		genericBeforeEnd(menuBlock, 
			profileIconTemplate({
				modifiers: [`${data ? '' : 'profile_theme_hidden'}`],
				href: '/',
				dataset: '/me',
			}),
			scoreBoardTemplate({
				modifiers: [],
				href: '/',
				dataset: '/leaders',
			}),
			rulesTemplate({
				modifiers: [],
				href: '/',
				dataset: '/rules',
			})
		);

		genericBeforeEnd(contentBlock, 
			titleTemplate({
				title: 'colors',
				modifiers: ['title_theme_main'],
			}),
			mainTemplate({
				modifiers: ['main_theme_index'],
			}),
			buttonsTemplate({
				modifiers: ['buttons_theme_main'],
			})
		);
		const mainBlock = this._el.querySelector('.main.main_theme_index');
		const buttonsBlock = this._el.querySelector('.buttons.buttons_theme_main');

		genericBeforeEnd(mainBlock, 
			playTemplate({
				href: 'game',
				dataset: '/game',
				modifiers: [],
			})
		);
      
		genericBeforeEnd(buttonsBlock, 
			linkTemplate({
				href: 'multiplayer',
				title: 'MULTIPLAYER',
				dataset: 'multiplayer',
				modifiers: [],
			}),
			linkTemplate({
				href: 'signin',
				title: 'SING IN',
				dataset: '/signin',
				modifiers: [`${data ? 'link_theme_hidden' : ''}`],
			}),
			linkTemplate({
				href: 'signup',
				title: 'SIGN UP',
				dataset: '/signup',
				modifiers: [`${data ? 'link_theme_hidden' : ''}`],
			}),
		);
		
		this._removeEventListener();
		this._createEventListener();
	}

	open(root) {
		this._el = root;
		API.isAuth()
			.then(() => {
				this._el.innerHTML = '';
				this._renderMainPage(true);
			})
			.catch(() => {
				this._el.innerHTML = '';
				this._renderMainPage(false);
			});
	}
}