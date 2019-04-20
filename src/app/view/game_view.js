import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import playerTemplate from '../../blocks/html/body/application/container/player/player.pug';
import sideTemplate from '../../blocks/html/body/application/container/head/side/side.pug';
import nicknameTemplate from '../../blocks/html/body/application/container/player/nickname/nickname.pug';
import avatarTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import fieldTemplate from '../../blocks/html/body/application/container/content/field/field.pug';
import blockTemplate from '../../blocks/html/body/application/container/content/field/block/block.pug';
import modalTemplate from '../../blocks/html/body/application/container/modal/modal.pug';
import linkTemplate from '../../blocks/html/body/application/container/content/buttons/link/link.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd } from '../../modules/helpers.js';
import { DOWN_EVENT, 
		 UP_BLOCK_EVENT,
		 OVER_BLOCK_EVENT } from '../../modules/events';

export default class GameView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.down = this.down.bind(this);
		this.up = this.up.bind(this);
		this.over = this.over.bind(this);
	}

	down(event) {console.log('down');
		// if (event.target.classList.contains('block') && !Boolean(+event.target.dataset.isSet)) {
		// 	const app = document.querySelector('#application');
		// 	app.addEventListener('pointerdown', this.over, true);
		// 	this._currentBlock = event.target;
		// 	this.emit(DOWN_EVENT, {block: event.target.textContent});
		// }
	}

	up(event) {
		console.log('up')
		// const app = document.querySelector('#application');
		// app.removeEventListener('mouseover', this.over, true);
		// this._endBlock = event.target;
		// this.emit(UP_BLOCK_EVENT, {block: event.target.textContent});
	}

	over(event) {
		console.log('over');
		// if (event.target.classList.contains('block')) {
		// 	this._currentBlock = event.target;
		// 	this.emit(OVER_BLOCK_EVENT, {block: event.target.textContent});
		// } else {
		// 	const app = document.querySelector('#application');
		// 	app.removeEventListener('mouseover', this.over, true);
		// 	this._endBlock = event.target;
		// 	this.emit(UP_BLOCK_EVENT, {block: event.target.textContent});
		// }
	}

	_createTurnListener() {
		const filedBlock = document.querySelector('.field');
		const appBlock = document.querySelector('#application');
		// filedBlock.addEventListener('mousedown', this.down, true);
		// appBlock.addEventListener('mouseup', this.up, true);
		// const app = document.querySelector('#application');
		// debugger;
		appBlock.addEventListener('pointerdown', this.down, true);
		appBlock.removeEventListener('pointerover', this.over, true);
		appBlock.removeEventListener('pointerup', this.up, true);
	}

	_removeTurnListener() {
		const filedBlock = document.querySelector('.field');
		const appBlock = document.querySelector('#application');
		filedBlock.removeEventListener('mousedown', this.down);
		appBlock.removeEventListener('mouseup', this.up, true);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createTurnListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeTurnListener();
	}

	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_game'],
		}));
	}

	_renderMain(data) {
		const containerBlock = this._root.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_game'],
			}),
			contentTemplate({
				modifiers: ['content_theme_game'],
			}),
			playerTemplate({
				modifiers: ['player_theme_player1'],
			}),
			playerTemplate({
				modifiers: ['player_theme_player2'],
			}),
		);
	}

	_renderHead(data) {
		const headBlock = this._root.querySelector('.head.head_theme_game');
		// чтобы поменять сторону просто поменять классы
		genericBeforeEnd(headBlock, 
			sideTemplate({
				modifiers: [`${data.whoseTurn === 'Player1' ? 'side_theme_left-active' : 'side_theme_left-passive'}`],
			}),
			sideTemplate({
				modifiers: [`${data.whoseTurn === 'Player2' ? 'side_theme_right-active' : 'side_theme_right-passive'}`],
			})
		);
	}

	_renderLeftPlayer(data) {
		const playerLeftBlock = this._root.querySelector('.player.player_theme_player1');
		genericBeforeEnd(playerLeftBlock, 
			avatarTemplate({
				modifiers: ['avatar_theme_game'],
				url: `${data.avatar ? HOST + data.avatar : ''}`,
			}),
			nicknameTemplate({
				modifiers: ['nickname_theme_left'],
				nickname: data.username, // TODO передача никнейма пользователя
			}),
		);
	}

	_renderRightPlayer(data) {
		const playerRightBlock = this._root.querySelector('.player.player_theme_player2');
		genericBeforeEnd(playerRightBlock, 
			avatarTemplate({
				modifiers: ['avatar_theme_game'],
				url: `${data.avatar ? HOST + data.avatar : ''}`,
			}),
			nicknameTemplate({
				modifiers: ['nickname_theme_right'],
				nickname: 'Player2', // TODO передача никнейма пользователя
			}),
		);
	}

	_renderContent() {
		const contentBlock = this._root.querySelector('.content.content_theme_game');
		genericBeforeEnd(contentBlock, 
			fieldTemplate({
				modifiers: [],
			})
		);
	}

	_renderField(data) {
		const fieldBlock = this._root.querySelector('.field');
		const numBlocks = 25;
		const blocks = [];

		[...Array(numBlocks)].forEach((_, i) => {
			if (data.disableBlocks.indexOf( i ) != -1) {
				blocks.push(blockTemplate({ modifiers: ['block_theme_del'], num: i }));
			} else {
				blocks.push(blockTemplate({ modifiers: [''], num: i }));
			}
		});

		genericBeforeEnd(fieldBlock, ...blocks);
	}

	_renderModal(winner) {
		const containerBlock = document.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			modalTemplate({
				modifiers: [],
				winner: winner,
			}),
		);

		const modalBlock = document.querySelector('.modal__window');
		genericBeforeEnd(modalBlock, 
			linkTemplate({
				title: 'PlAY AGAIN',
				dataset: '/game',
				hr: '/game',
				modifiers: ['button_type_secondary'],
			}),
			linkTemplate({
				title: 'EXIT',
				dataset: '/',
				hr: '/',
				modifiers: [],
			}),
		);
	}

	apply({player = 'Player1', ans = false}) {
		if (ans) {
			player === 'Player1' 
				? this._currentBlock.classList.add('block_theme_left-active') 
				: this._currentBlock.classList.add('block_theme_right-active'); 
				this._currentBlock.dataset.isSet = 1;
		}
	}

	endStep({winner = null, player = 'Player1'} = {}) {
		if (winner) {
			this._removeTurnListener();
			this._renderModal(winner);
		} else {
			const headBlock = this._root.querySelector('.head.head_theme_game');
			headBlock.innerHTML = '';
			this._renderHead({whoseTurn: player});
		}
	}
	
	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain(data);
		this._renderHead(data);
		this._renderLeftPlayer(data);
		this._renderRightPlayer(data);
		this._renderContent();
		this._renderField(data);
	}

	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}