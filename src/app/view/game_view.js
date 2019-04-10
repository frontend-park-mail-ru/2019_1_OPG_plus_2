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

export default class MainPageView extends NavigateMixin(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.down = this.down.bind(this);
		this.up = this.up.bind(this);
		this.over = this.over.bind(this);
		this.out = this.out.bind(this);
	}

	_createEventListeners() {
		this._createOnLinkListener();
	}

	onTurnEvent(event) {
		if (event.target.classList.contains('block')) {
			event.target.classList.add('block_theme_left-active');
		}
	}

	down(event) {
		if (event.target.classList.contains('block')) {
			const filedBlock = this._root.querySelector('.field');
			this._game.points[1] = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];
			this._game.start = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];
			this.data.player === 'Player1' ? event.target.classList.add('block_theme_left-active') : event.target.classList.add('block_theme_right-active');
			filedBlock.addEventListener('mouseover', this.over, true); // появилась над элементов
			filedBlock.addEventListener('mouseout', this.out, true); // ушла с элемента
		}
	}

	up(event) {
		if (event.target.classList.contains('block')) {
			const filedBlock = this._root.querySelector('.field');
			filedBlock.removeEventListener('mouseover', this.over, true); // появилась над элементов
			filedBlock.removeEventListener('mouseout', this.out, true); // ушла с элемента
			this._game.end = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];
			this.emit('turn', {root: this._root, user: this.data.player, start: this._game.start, end: this._game.end});
		}
	}

	over(event) {
		if (event.target.classList.contains('block')) {
			this._game.points[1] = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];

			if(this._game.firstFlag !== true && this._game.points[0] !== null) {
				this._game.firstFlag = true;
				if (this._game.points[1][0] - this._game.points[0][0] && this._game.points[1][1] - this._game.points[0][1]) {
					return;
				}

				this._game.points[1][0] - this._game.points[0][0] ? this._game.x = false : this._game.y = false;
			}

			if (!this._game.x) {
				if (this._game.points[1][1] - this._game.points[0][1]) { 
					console.log('you can\'t move on x') 
				} else {
					this.data.player === 'Player1' ? event.target.classList.add('block_theme_left-active') : event.target.classList.add('block_theme_right-active');
				}
			} else if (!this._game.y) {
				if (this._game.points[1][0] - this._game.points[0][0]) { 
					console.log('you can\'t move on y')
				 } else { 
					this.data.player === 'Player1' ? event.target.classList.add('block_theme_left-active') : event.target.classList.add('block_theme_right-active');
				 }
			}
		}
	}

	out(event) {
		if (event.target.classList.contains('block')) {
			this._game.points[0] = [parseInt(+event.target.textContent / 5, 10), parseInt(+event.target.textContent % 5, 10)];
		}
	}

	_createTurnListener() {
		const filedBlock = this._root.querySelector('.field');
		filedBlock.removeEventListener('mousedown', this.down);
		filedBlock.removeEventListener('mouseup', this.up, true);
		filedBlock.addEventListener('mousedown', this.down);
		filedBlock.addEventListener('mouseup', this.up, true);
	}
    
	_render(data) {
		this._game = {
			start: [],
			end: [],
			x: true,
			y: true,
			firstFlag: false,
			points: [null, null],
		};
		const secondFiledBlock = this._root.querySelector('.field');
		this._root.innerHTML = '';
		this.data = data;
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
				modifiers: [`${data.player === 'Player1' ? 'side_theme_left-active' : 'side_theme_left-passive'}`],
			}),
			sideTemplate({
				modifiers: [`${data.player === 'Player2' ? 'side_theme_right-active' : 'side_theme_right-passive'}`],
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

		if(data.steps.length == 0) { // если уже ходили то не надо перендривать все поле
			genericBeforeEnd(contentBlock, 
				fieldTemplate({
					modifiers: [],
				})
			);
			const fieldBlock = this._root.querySelector('.field');
		
			const blocks = []; // TODO а вообще резонно рендерить 25 блоков???
			[...Array(25)].forEach((_, i) => {
				// if (data.del.indexOf( i ) != -1) {
					// blocks.push(blockTemplate({ modifiers: ['block_theme_del'], num: i }));
				// } else {
					blocks.push(blockTemplate({ modifiers: [''], num: i }));
				// }
			});
			genericBeforeEnd(fieldBlock, ...blocks);

			document.querySelectorAll('.block').forEach((el) => {
				if (data.del.indexOf( parseInt(el.textContent,10) ) != -1) {
					el.classList.add('block_theme_del');
				}
			});
		} else {
			contentBlock.appendChild(secondFiledBlock);
		}

		this._createTurnListener();

	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}