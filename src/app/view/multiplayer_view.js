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
import menuTemplate from '../../blocks/html/body/application/container/head/menu/menu.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import themeTemplate from '../../blocks/html/body/application/container/head/menu/night/night.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/menu/back-arrow/back-arrow.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd, colorBrightness, colorLuminance, setColors } from '../../modules/helpers.js';
import { debounce, throttle } from '../../modules/helpers.js';
import { DOWN_EVENT, 
		 UP_BLOCK_EVENT,
		 OVER_BLOCK_EVENT} from '../../modules/events';
import { APP_PALETTES, COLOR_NAMES } from '../../modules/utils';

export default class MultiplayerView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
		super();
		this.down = this.down.bind(this);
		this.up = debounce(this.up.bind(this), 100);
		this.over = throttle(this.over.bind(this), 20);
		this.onChangeTheme = this.onChangeTheme.bind(this);
	}

	onChangeTheme() {
        let root = document.documentElement;

        let row = APP_PALETTES[Math.floor(Math.random() * APP_PALETTES.length)];

        let colors = [];
        for (let r = 0; r < row.length; ++r) {
            let lumSign = colorBrightness(row[r]) < 128 ? 1 : -1;
            let variants = [row[r], colorLuminance(row[r], lumSign * 0.15), colorLuminance(row[r], lumSign * 0.4)];

            for (let v = 0; v < variants.length; ++v) {
                colors.push(`#${variants[v]}`);
                let isDark = colorBrightness(variants[v]) < 128;
                colors.push(isDark ? 'var(--light-text-color)' : 'var(--dark-text-color)');
            }
        }

        let color_names = COLOR_NAMES;

        setColors({root: root, colors: colors, variables: color_names});
        window.localStorage.setItem('colors', JSON.stringify(colors));
        window.localStorage.setItem('color_names', JSON.stringify(color_names));
	}
	
	_createChangeListener() {
        let night = this._root.querySelector('.night');
        night.addEventListener('click', this.onChangeTheme, true);
    }

    _removeChangeListener() {
        let night = this._root.querySelector('.night');
        night.removeEventListener('click', this.onChangeTheme, true);
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
		const filedBlock = document.querySelector('.field');
		const appBlock = document.querySelector('#application');
		filedBlock.addEventListener('pointerdown', this.down, true);
		appBlock.addEventListener('pointerup', this.up, true);
		window.addEventListener('contextmenu', function (e) { 
			e.preventDefault();
		}, false);
	}

	_removeTurnListener() {
		const filedBlock = document.querySelector('.field');
		const appBlock = document.querySelector('#application');
		filedBlock.removeEventListener('pointerdown', this.down);
		appBlock.removeEventListener('pointerup', this.up, true);
		window.removeEventListener('contextmenu', function (e) {
			e.preventDefault();
		}, false);
	}

	_createEventListeners() {
		super._createEventListeners();
		this._createTurnListener();
		this._createChangeListener();
	}

	_removeEventListeners() {
		super._removeEventListeners();
		this._removeTurnListener();
		this._removeChangeListener();
	}

	_renderContainer(data) {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_game'],
		}));
	}

	_renderMain() {
		const containerBlock = this._root.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_play'],
			}),
			playerTemplate({
				modifiers: ['player_theme_player1 player_theme_hidden']
			}),
			contentTemplate({
				modifiers: ['content_theme_game'],
			}),
			playerTemplate({
				modifiers: ['player_theme_player2 player_theme_hidden']
			})
		);
	}

	_renderHead(data) {
		const headBlock = this._root.querySelector('.head.head_theme_play');
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

	_renderMenu() {
		const headBlock = this._root.querySelector('.head.head_theme_play');

		genericBeforeEnd(headBlock,
            menuTemplate({
                modifiers: ['menu_theme_game'],
            })
		);
		
		const menuBlock = this._root.querySelector('.menu.menu_theme_game');
		genericBeforeEnd(menuBlock,
			backArrowTemplate({
				modifiers: [],
				hr: '/back',
                dataset: '/back',
			}),
			titleTemplate({
                title: 'colors',
                modifiers: ['title_theme_game'],
			}),
			themeTemplate({
                modifiers: [],
            }),
        );
	}

	_renderLeftPlayer(data) {
		const playerLeftBlock = this._root.querySelector('.player.player_theme_player1');
		genericBeforeEnd(playerLeftBlock, 
			avatarTemplate({
				modifiers: ['avatar_theme_game'],
				url: `${data.players[0].avatar ? HOST + data.players[0].avatar : ''}`,
			}),
			nicknameTemplate({
				modifiers: ['nickname_theme_left'],
				nickname: data.players[0].username,
			}),
		);
	}

	_renderRightPlayer(data) {
		const playerRightBlock = this._root.querySelector('.player.player_theme_player2');
		genericBeforeEnd(playerRightBlock, 
			avatarTemplate({
				modifiers: ['avatar_theme_game'],
				url: `${data.players[1].avatar ? HOST + data.players[1].avatar : ''}`,
			}),
			nicknameTemplate({
				modifiers: ['nickname_theme_right'],
				nickname: data.players[1].username,
				
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

	_renderField() {
		const fieldBlock = this._root.querySelector('.field');
		const numBlocks = 25;
		const blocks = [];

		[...Array(numBlocks)].forEach((_, i) => {
			blocks.push(blockTemplate({ modifiers: [''], num: i }));
		});

		genericBeforeEnd(fieldBlock, ...blocks);
	}

	_renderModal(winner) {
		if (document.querySelector('.modal__window')) {
			return;
		}

		const containerBlock = document.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			modalTemplate({
				modifiers: [],
				winner: winner.username,
			}),
		);

		const modalBlock = document.querySelector('.modal__window');
		genericBeforeEnd(modalBlock, 
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

			if (this._currentBlock) { 
				player === 'Player1' 
					? this._currentBlock.classList.add('block_theme_left-active') 
					: this._currentBlock.classList.add('block_theme_right-active'); 
				this._currentBlock.dataset.isSet = 1;
			}
		}
	}

	endStep({winner = null, player = 'Player1', whoseTurn = player, steps=[]} = {}) {
		if (winner) {
			this._removeTurnListener();
			this._renderModal(winner);
		} else {
			steps.forEach(el => {
				player === 'Player1' 
					? this._blocks[el].classList.add('block_theme_left-active') 
					: this._blocks[el].classList.add('block_theme_right-active');
				this._blocks[el].dataset.isSet = 1;
			});

			const containerBlock = this._root.querySelector('.container.container_theme_game');
			if (whoseTurn === 'Player1') {
				containerBlock.classList.remove('container_theme_right-step');
				containerBlock.classList.add('container_theme_left-step');
			} else {
				containerBlock.classList.remove('container_theme_left-step');
				containerBlock.classList.add('container_theme_right-step');
			}
		}
	}

	_renderLoader() {
		const containerBlock = document.querySelector('.container.container_theme_game');
		genericBeforeEnd(containerBlock, 
			modalTemplate({
				modifiers: [],
				winner: 'Player1',
				loader: true,
			}),
		);
	}

	_renderSide(data) {
		const containerBlock = this._root.querySelector('.container.container_theme_game');
		if (data.whoseTurn === 'Player1') {
			containerBlock.classList.remove('container_theme_right-step');
			containerBlock.classList.add('container_theme_left-step');
		} else {
			containerBlock.classList.remove('container_theme_left-step');
			containerBlock.classList.add('container_theme_right-step');
		}
	}

	_setDisableBlocks({blocks = []} = {}) {
		blocks.forEach(block => {
			this._blocks[block].classList.add('block_theme_del')
		})
	}

	_cacheBlocks() {
		this._blocks = [...document.querySelectorAll('.block')];
	}
	
	_render(data) {
		if (data.wait) {
			this._root.innerHTML = '';
			this._renderContainer(data);
			this._renderMain();
			this._renderMenu();
			this._renderContent();
			this._renderField();
			this._renderLoader();
		} else {
			const containerBlock = this._root.querySelector('.container.container_theme_game');
			const modal = this._root.querySelector('.modal');
			if (modal) {
				containerBlock.removeChild(this._root.querySelector('.modal'));
			}
			this._renderSide(data);
			this._setDisableBlocks({blocks: data.disableBlocks});
			this._renderLeftPlayer(data);
			this._renderRightPlayer(data);
		}

		this._cacheBlocks();
	}

	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}
