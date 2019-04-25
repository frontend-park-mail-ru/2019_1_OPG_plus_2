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
import timeTemplate from '../../blocks/html/body/application/container/head/time/time.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd } from '../../modules/helpers.js';
import { debounce, throttle } from '../../modules/helpers.js';
import { DOWN_EVENT, 
		 UP_BLOCK_EVENT,
		 OVER_BLOCK_EVENT,
		 TIME_EVENT } from '../../modules/events';

export default class GameView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.down = this.down.bind(this);
		this.up = debounce(this.up.bind(this), 100);
		this.over = throttle(this.over.bind(this), 20);
		// this.time = debounce(this.time.bind(this), 1000);
	}

	down(event) {
		if (event.target.classList.contains('block') && !+event.target.dataset.isSet) {
			const app = document.querySelector('#application');
			app.addEventListener('pointermove', this.over, true);
			this._currentBlock = event.target;
			this.emit(DOWN_EVENT, {block: event.target.textContent});
		}
	}

	up(event) {
		const app = document.querySelector('#application');
		app.removeEventListener('pointermove', this.over, true);
		this._endBlock = event.target;
		this.emit(UP_BLOCK_EVENT, {block: event.target.textContent});
	}

	over(event) {
		const target = document.elementFromPoint(event.clientX, event.clientY);
		if (target.classList.contains('block')) {
			this._currentBlock = target;
			this.emit(OVER_BLOCK_EVENT, {block: target.textContent});
		} else {
			const app = document.querySelector('#application');
			app.removeEventListener('pointermove', this.over, true);
			this._endBlock = target;
			this.emit(UP_BLOCK_EVENT, {block: target.textContent});
		}
	}

	_createTurnListener() {
		const fieldBlock = document.querySelector('.field');
		// const appBlock = document.querySelector('#application');
		fieldBlock.addEventListener('pointerdown', this.down, true);
		fieldBlock.addEventListener('pointerup', this.up, true);
		window.addEventListener('contextmenu', function (e) { 
			e.preventDefault();
		}, false);
	}

	_removeTurnListener() {
		const fieldBlock = document.querySelector('.field');
		// const appBlock = document.querySelector('#application');
		fieldBlock.removeEventListener('pointerdown', this.down);
		fieldBlock.removeEventListener('pointerup', this.up, true);
		window.removeEventListener('contextmenu', function (e) {
			e.preventDefault();
		}, false);
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
			// playerTemplate({
			// 	modifiers: ['player_theme_player1'],
			// }),
			// playerTemplate({
			// 	modifiers: ['player_theme_player2'],
			// }),
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

		this._removeEventListeners();
		this._createEventListeners();
	}

	apply({player = 'Player1', ans = false, steps = []} = {}) {
		if (ans) {
			steps.forEach(el => {
				player === 'Player1' 
					? this._blocks[el].classList.add('block_theme_left-active') 
					: this._blocks[el].classList.add('block_theme_right-active');
				this._blocks[el].dataset.isSet = 1;
			});

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
			// this._renderTime({time: 10});
			// this.time({ans: true, player: player, time: 10});
		}
	}

	// time({ans = false, player = 'Player1', time = 10} = {}) {
	// 	if (ans) {
	// 		const number = this._root.querySelector('.number');
	// 		number.textContent = time;
	// 		this.emit(TIME_EVENT);
	// 	} else {
	// 		this.endStep({player: player});
	// 	}
	// }

	// _renderTime({time = 10} = {}) {
	// 	const headBlock = this._root.querySelector('.head.head_theme_game');
	// 	const number = this._root.querySelector('.number');
	// 	if (number) {
	// 		number.innerHTML = '';
	// 	}

	// 	genericBeforeEnd(headBlock, 
	// 		timeTemplate({
	// 			number: time,
	// 		}),
	// 	);
	// }

	_cacheBlocks() {
		this._blocks = [...document.querySelectorAll('.block')];
	}
	
	_render(data) {
		this._root.innerHTML = '';
		this._renderContainer();
		this._renderMain(data);
		this._renderHead(data);
		// this._renderTime({time: 10});
		// this._renderLeftPlayer(data);
		// this._renderRightPlayer(data);
		this._renderContent();
		this._renderField(data);
		this._cacheBlocks();
		// this.time({ans: true, data: data.whoseTurn, time: 10}); //TODO сюда можно передавать данные с тем, сколько секунд дается
	}

	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}