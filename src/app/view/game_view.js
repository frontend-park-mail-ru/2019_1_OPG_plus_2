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

export default class GameView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.down = this.down.bind(this);
		this.up = this.up.bind(this);
		this.over = this.over.bind(this);
		this.out = this.out.bind(this);
	}

	// событие, возникающее при нажатии ЛКМ
	down(event) {
		if (event.target.classList.contains('block')) { // если данный элемент блок
			const filedBlock = document.querySelector('.field');
			filedBlock.addEventListener('mouseover', this.over, true); // навесили событие, что курсор появился над элементом
			filedBlock.addEventListener('mouseout', this.out, true); // навесили событие, что курсор ушел с элемента
			this.emit('startStep', {root: this._root, block: event.target.textContent});
		}
	}

	// событие, возникающее при отпускании ЛКМ
	up(event) {
			const filedBlock = document.querySelector('.field');
			filedBlock.removeEventListener('mouseover', this.over, true); // появилась над элементов
			filedBlock.removeEventListener('mouseout', this.out, true); // ушла с элемента
			this.emit('finishStep', {root: this._root, block: event.target.textContent});
	}

	// событие, возникающее при наведении на блок (0: out, 1: over , 0: y, 1: x)
	over(event) {
		if (event.target.classList.contains('block')) { // если блок
			this.emit('overBlockStep', {root: this._root, block: event.target.textContent});
		}
	}

	// событие, возникающее при "уходе" мыши с блока
	out(event) {
		if (event.target.classList.contains('block')) {
			this.emit('outBlockStep', {root: this._root, block: event.target.textContent});
		}
	}

	_createTurnListener() {
		const filedBlock = document.querySelector('.field');
		filedBlock.addEventListener('mousedown', this.down);
		filedBlock.addEventListener('mouseup', this.up, true);
	}

	_removeTurnListener() {
		const filedBlock = document.querySelector('.field');
		filedBlock.removeEventListener('mousedown', this.down);
		filedBlock.removeEventListener('mouseup', this.up, true);
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

	_renderMain() {
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
				nickname: 'Player1', // TODO передача никнейма пользователя
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
		const blocks = []; // TODO а вообще резонно рендерить 25 блоков???

		[...Array(25)].forEach((_, i) => {
			if (data.close.indexOf( i ) != -1) {
				blocks.push(blockTemplate({ modifiers: ['block_theme_del'], num: i }));
			} else {
				blocks.push(blockTemplate({ modifiers: [''], num: i }));
			}
		});
		genericBeforeEnd(fieldBlock, ...blocks);
	}

	_renderModal(data) {
		const containerBlock = document.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			modalTemplate({
				modifiers: [],
				winner: data.winner,
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
	
	// TODO переделать else и вообще подумать насчет перендеринга
	_render(data) {
		if (!data.isStart) {
			this._root.innerHTML = '';
			this._renderContainer();
			this._renderMain();
			this._renderHead(data);
			this._renderLeftPlayer(data);
			this._renderRightPlayer(data);
			this._renderContent();
			this._renderField(data);
		} else if (data.winner) {
			this._renderModal(data);
		} else {
			const headBlock = document.querySelector('.head.head_theme_game');
			headBlock.innerHTML = '';
			genericBeforeEnd(headBlock, 
				sideTemplate({
					modifiers: [`${data.whoseTurn === 'Player1' ? 'side_theme_left-active' : 'side_theme_left-passive'}`],
				}),
				sideTemplate({
					modifiers: [`${data.whoseTurn === 'Player2' ? 'side_theme_right-active' : 'side_theme_right-passive'}`],
				})
			);
			const blocks = document.querySelectorAll('.block');
			blocks.forEach((el, i) => {
				if (data.steps.indexOf( i ) != -1) {
					if (data.whoseTurn === 'Player1' && !el.classList.contains('block_theme_left-active') && !el.classList.contains('block_theme_right-active')) {
						el.classList.add('block_theme_left-active');
					} else if (data.whoseTurn === 'Player2' && !el.classList.contains('block_theme_right-active') && !el.classList.contains('block_theme_left-active')) {
						el.classList.add('block_theme_right-active');
					}
				} 
				if (data.del.indexOf( i ) != -1) {
					if (el.classList.contains('block_theme_left-active')) {
						el.classList.remove('block_theme_left-active');
					} else {
						el.classList.remove('block_theme_right-active'); 
					}
				}
			});
		}

	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}