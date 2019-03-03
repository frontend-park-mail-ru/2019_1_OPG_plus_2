'use strict';

import {Container} from '../blocks/html/body/application/container/container.js';
import {Head} from '../blocks/html/body/application/container/head/head.js';
import {Menu} from '../blocks/html/body/application/container/head/menu/menu.js';
import {ScoreBoard} from '../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.js';
import {Rules} from '../blocks/html/body/application/container/head/menu/rules/rules.js';
import {Content} from '../blocks/html/body/application/container/content/content.js';
import {Title} from '../blocks/html/body/application/container/content/title/title.js';
import {Main} from '../blocks/html/body/application/container/content/main/main.js';
import {Play} from '../blocks/html/body/application/container/content/main/play/play.js';
import {Buttons} from '../blocks/html/body/application/container/content/buttons/buttons.js';
import {Button} from '../blocks/html/body/application/container/content/buttons/button/button.js';


export class MainPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderMainPage() {
        const container = new Container({
            el: this._el,
        });
        container.modifiers = ['container_theme_main']
        container.render();
        const containerBlock = document.querySelector('.container.container_theme_main');

        const head = new Head({
            el: containerBlock,
        });
        head.render();
        const headBlock = document.querySelector('.head');

        const menu = new Menu({
            el: headBlock,
        });
        menu.render();
        const menuBlock = document.querySelector('.menu');

        const scoreboardIcon = new ScoreBoard({
            el: menuBlock,
        });
        scoreboardIcon.render();

        const rulesIcon = new Rules({
            el: menuBlock,
        });
        rulesIcon.render();

        const content = new Content({
            el: containerBlock,
        });
        content.modifiers = ['content_theme_main']
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_main');

        const title = new Title({
            el: contentBlock,
            title: 'colors',
        });
        title.modifiers = ['title_theme_main'];
        title.render();

        const main = new Main({
            el: contentBlock,
        });
        main.modifiers = ['main_theme_index'];
        main.render();
        const mainBlock = document.querySelector('.main.main_theme_index');

        const play = new Play({
            el: mainBlock,
            iconSrc: './img/play.svg',
        });
        play.render();

        const buttons = new Buttons({
            el: contentBlock,
        });
        buttons.modifiers = ['buttons_theme_main'];
        buttons.render();
        const buttonsBlock = document.querySelector('.buttons.buttons_theme_main');

        const buttonMultiplayer = new Button({
            el: buttonsBlock,
            title: 'MULTIPLAYER',
        });
        buttonMultiplayer.render();

        const buttonSignIn = new Button({
            el: buttonsBlock,
            title: 'SIGN IN',
        });
        buttonSignIn.render();

        const buttonSignUp = new Button({
            el: buttonsBlock,
            title: 'SIGN UP',
        });
        buttonSignUp.render();
    }

    render() {
        this._renderMainPage();
    }
}