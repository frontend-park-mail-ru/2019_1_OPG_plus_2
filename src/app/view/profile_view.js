import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import profileCardTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-card.pug';
import profileHeadTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.pug';
import nameTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-head/name/name.pug';
import profileDataTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-data/profile-data.pug';
import profileFooterTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-footer/profile-footer.pug';
import dataItemTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-data/data-item/data-item.pug';
import avatarTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import logoutIconTemplate from '../../blocks/html/body/application/container/head/menu/logout/logout.pug';
import settingsIconTemplate from '../../blocks/html/body/application/container/head/menu/settings/settings.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import View from './view';

export default class ProfileView extends NavigateMixinView(EventEmitterMixin(View)) {
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
				modifiers: ['container_theme_profile']
			})
		);
	}

	_renderMain() {
		const containerBlock = document.querySelector('.container.container_theme_profile');

		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_profile'],
			}),
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

	_renderProfileCard() {
		const contentBlock = document.querySelector('.content.content_theme_profile');
		genericBeforeEnd(contentBlock, 
			profileCardTemplate({
				modifiers: ['profile-card_theme_main'],
			}),
		);
		const profileCardBlock = document.querySelector('.profile-card');

		genericBeforeEnd(profileCardBlock, 
			profileHeadTemplate({
				modifiers: [],
			}),
			profileDataTemplate({
				modifiers: [],
			}),
			profileFooterTemplate({
				modifiers: [],
			})
		);
	}

	_renderProfileHead(data) {
		const profileHeadBlock = document.querySelector('.profile-head');
		genericBeforeEnd(profileHeadBlock,
			menuTemplate({
				modifiers: ['menu_theme_profile'],
			}),
			avatarTemplate({
				modifiers: [],
				url: `${data.avatar ? HOST + data.avatar : ''}`,
			}),
			nameTemplate({
				name: data.username,
				modifiers: [],
			}),
		);
	}

	_renderProfileData(data) {
		const profileDataBlock = document.querySelector('.profile-data');
		genericBeforeEnd(profileDataBlock, 
			dataItemTemplate({
				title: 'Score',
				data: data.score,
				modifiers: ['data-item_type_score'],
			}),
			dataItemTemplate({
				title: 'Games played',
				data: data.games || 0,
				modifiers: ['data-item_type_games'],
			}),
			dataItemTemplate({
				title: 'Win',
				data: data.win || 0,
				modifiers: ['data-item_type_win'],
			}),
			dataItemTemplate({
				title: 'Lose',
				data: data.lose || 0,
				modifiers: ['data-item_type_lose'],
			}),
		);
	}

	_renderProfileFooter() {
		const profileFooterBlock = document.querySelector('.profile-footer');
		genericBeforeEnd(profileFooterBlock,
			logoutIconTemplate({
				modifiers: ['logout_theme_profile'],
				hr: '/logout',
				dataset: '/logout',
				content: 'Exit',
			})
		); 

	}

	_renderMenu() {
		const menuBlock = document.querySelector('.menu.menu_theme_profile');
		genericBeforeEnd(menuBlock, 
			settingsIconTemplate({
				hr: '/editme',
				dataset: '/editme',
				modifiers: [],
			}),
		);
	}

	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain();
		this._renderBack();
		this._renderProfileCard();
		this._renderProfileHead(data);
		this._renderProfileData(data);
		this._renderProfileFooter();
		this._renderMenu();
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}