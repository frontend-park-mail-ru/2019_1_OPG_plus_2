import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import profileIconTemplate from '../../blocks/html/body/application/container/head/menu/profile/profile.pug';
import scoreBoardTemplate from '../../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.pug';
import rulesTemplate from '../../blocks/html/body/application/container/head/menu/rules/rules.pug';
import separatorTemplate from '../../blocks/html/body/application/container/head/menu/separator/separator.pug';
import themeTemplate from '../../blocks/html/body/application/container/head/menu/night/night.pug';
import defaultTemplate from '../../blocks/html/body/application/container/head/menu/deafult/default.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import mainButtonTemplate from '../../blocks/html/body/application/container/content/main-button/main-button.pug';
import linesUpTemplate from '../../blocks/html/body/application/container/lines/lines-up/lines-up.pug';
import linesDownLeftTemplate from '../../blocks/html/body/application/container/lines/lines-down-left/lines-down-left.pug';
import linesDownRightTemplate from '../../blocks/html/body/application/container/lines/lines-down-right/lines-down-right.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd, colorLuminance, setColors } from '../../modules/helpers.js';
import { APP_PALLETS } from '../../modules/utils';

export default class MainPageView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.onChangeTheme = this.onChangeTheme.bind(this);
		this.onDefaultTheme = this.onDefaultTheme.bind(this);
	}

	onChangeTheme() {
		let hide = this._root.querySelectorAll('.hide');
		hide.forEach(item => {
			item.classList.remove('hide');
		});
		let row = APP_PALLETS[Math['floor'](Math['random']() * 2000)]
		let root = document.documentElement;
		let colors = [`#${row[0]}`, `#${row[1]}`, `#${row[2]}`,
					 `${colorLuminance(row[2], -0.2)}`, `${colorLuminance(row[2], -0.4)}`,
					 'white', `${colorLuminance(row[1], -0.3)}`, `${colorLuminance(row[2], -0.4)}`];

		let variables = ['--first-color','--second-color', 
						'--third-color', '--fourth-color',
						'--disable-block', '--text-color', 
						'--secondary-button','--box-shadow'];

		setColors({root: root, colors: colors, variables: variables});
		window.localStorage.setItem('colors', JSON.stringify(row));
	}

	onDefaultTheme() {
		let clear = this._root.querySelector('.default');
		let separator = clear.previousElementSibling;
		[clear, separator].forEach((item) => {
			item.classList.add('hide');
		});
		let root = document.documentElement;
		let colors = ['#FF9E00', '#005FF9', '#F7F9F9',
					  '#EDEDED', '#ADADAD',
					  'black', 'white', 'gray'];
					 
		let variables = ['--first-color','--second-color', 
						'--third-color', '--fourth-color',
						'--disable-block', '--text-color', 
						'--secondary-button','--box-shadow'];
		
		setColors({root: root, colors: colors, variables: variables});
		window.localStorage.clear();
	}

	_createChangeListener() {
		let night = this._root.querySelector('.night');
		night.addEventListener('click', this.onChangeTheme, true);
	}

	_removeChangeListener() {
		let night = this._root.querySelector('.night');
		night.removeEventListener('click', this.onChangeTheme, true);
	}

	_createDefaultListener() {
		let night = this._root.querySelector('.default');
		night.addEventListener('click', this.onDefaultTheme, true);
	}

	_removeDefaultListener() {
		let night = this._root.querySelector('.default');
		night.removeEventListener('click', this.onDefaultTheme, true);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createChangeListener();
		this._createDefaultListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeChangeListener();
		this._removeDefaultListener
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
				modifiers: ['main-button_theme_play'],
				dataset: '/game',
				label: 'Singleplayer',
				type: 'singleplayer',
			}),
			mainButtonTemplate({
				hr: `${data.isAuth ? '/multiplayer' : '/signin'}`,
				modifiers: [`${data.isAuth ? 'main-button_theme_multiplayer' : 'main-button_theme_signin'}`],
				dataset: `${data.isAuth ? '/multiplayer' : '/signin'}`,
				label: `${data.isAuth ? 'Multiplayer' : 'Sign In'}`,
				type: `${data.isAuth ? 'multiplayer' : 'signin'}`,
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
			}),
			separatorTemplate({
				modifiers: [],
			}),
			themeTemplate({
				modifiers: [],
			}),
			separatorTemplate({
				modifiers: [`${window.localStorage.getItem('colors') ? '' : 'hide'}`],
			}),
			defaultTemplate({
				modifiers: [`${window.localStorage.getItem('colors') ? '' : 'hide'}`],
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