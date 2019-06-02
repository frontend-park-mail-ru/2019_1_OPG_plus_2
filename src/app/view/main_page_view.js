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
import linesDownLeftTemplate
    from '../../blocks/html/body/application/container/lines/lines-down-left/lines-down-left.pug';
import linesDownRightTemplate
    from '../../blocks/html/body/application/container/lines/lines-down-right/lines-down-right.pug';

import View from './view';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { colorBrightness, colorLuminance, genericBeforeEnd, resetColors, setColors } from '../../modules/helpers.js';
import { APP_PALETTES, COLOR_NAMES } from '../../modules/utils';

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

    onDefaultTheme() {
        let clear = this._root.querySelector('.default');
        let separator = clear.previousElementSibling;
        [clear, separator].forEach((item) => {
            item.classList.add('hide');
        });

        let root = document.documentElement;

        let color_names = COLOR_NAMES;

        resetColors({root: root, variables: color_names});
        window.localStorage.removeItem('colors');
        window.localStorage.removeItem('color_names');
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
        this._removeDefaultListener();
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
                hr: `${data.isAuth ? '/url' : '/signin'}`,
                modifiers: [`${data.isAuth ? 'main-button_theme_multiplayer' : 'main-button_theme_signin'}`],
                dataset: `${data.isAuth ? '/url' : '/signin'}`,
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

    _render(data) {
        this._root.innerHTML = '';
        this._renderContainer();
        this._renderMain();
        this._renderMenu(data);
        this._renderHeadMenu(data);
    }

    open({root = {}, data = {}}) {
        super.open({root, data});
    }
}