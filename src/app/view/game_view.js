import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import playerTemplate from '../../blocks/html/body/application/container/player/player.pug';
import sideTemplate from '../../blocks/html/body/application/container/head/side/side.pug';
import nicknameTemplate from '../../blocks/html/body/application/container/player/nickname/nickname.pug';
import avatarTemplate from '../../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import fieldTemplate from '../../blocks/html/body/application/container/content/field/field.pug';
import blockTemplate from '../../blocks/html/body/application/container/content/field/block/block.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixin } from '../navigate';
import { genericBeforeEnd } from '../../modules/helpers.js';

export default class GameView extends NavigateMixin(EventEmitterMixin(View)) {
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
			this.emit('startStep', {block: event.target.textContent});
		}
	}

	// событие, возникающее при отпускании ЛКМ
	up(event) {
		if (event.target.classList.contains('block')) {
			const filedBlock = document.querySelector('.field');
			filedBlock.removeEventListener('mouseover', this.over, true); // появилась над элементов
			filedBlock.removeEventListener('mouseout', this.out, true); // ушла с элемента
			this.emit('finishStep', {block: event.target.textContent});
		}
	}

	// событие, возникающее при наведении на блок (0: out, 1: over , 0: y, 1: x)
	over(event) {
		if (event.target.classList.contains('block')) { // если блок
			this.emit('overBlockStep', {block: event.target.textContent});
		}
	}

	// событие, возникающее при "уходе" мыши с блока
	out(event) {
		if (event.target.classList.contains('block')) {
			this.emit('outBlockStep', {block: event.target.textContent});
		}
	}


	_createTurnListener() {
		const filedBlock = document.querySelector('.field');
		filedBlock.removeEventListener('mousedown', this.down);
		filedBlock.removeEventListener('mouseup', this.up, true);
		filedBlock.addEventListener('mousedown', this.down);
		filedBlock.addEventListener('mouseup', this.up, true);
	}
    
	_render(data) {
		// debugger;
		if (!data.isStart) {
			this._root.innerHTML = '';
			genericBeforeEnd(this._root, containerTemplate({
				modifiers: ['container_theme_game'],
			}));
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
			const headBlock = this._root.querySelector('.head.head_theme_game');
			const playerLeftBlock = this._root.querySelector('.player.player_theme_player1');
			const playerRightBlock = this._root.querySelector('.player.player_theme_player2');
			const contentBlock = this._root.querySelector('.content.content_theme_game');

			// чтобы поменять сторону просто поменять классы
			genericBeforeEnd(headBlock, 
				sideTemplate({
					modifiers: [`${data.whoseTurn === 'Player1' ? 'side_theme_left-active' : 'side_theme_left-passive'}`],
				}),
				sideTemplate({
					modifiers: [`${data.whoseTurn === 'Player2' ? 'side_theme_right-active' : 'side_theme_right-passive'}`],
				})
			);

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

			genericBeforeEnd(contentBlock, 
				fieldTemplate({
					modifiers: [],
				})
			);

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

			this._createTurnListener();
		} else {
			// console.log(data.whoseTurn);
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