'use strict';

import Container from '../blocks/html/body/application/container/container.js';
import Head from '../blocks/html/body/application/container/head/head.js';
import Menu from '../blocks/html/body/application/container/head/menu/menu.js';
import ScoreBoard from '../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.js';
import Rules from '../blocks/html/body/application/container/head/menu/rules/rules.js';
import ProfileIcon from '../blocks/html/body/application/container/head/menu/profile/profile.js';
import Content from '../blocks/html/body/application/container/content/content.js';
import Title from '../blocks/html/body/application/container/content/title/title.js';
import Main from '../blocks/html/body/application/container/content/main/main.js';
import Play from '../blocks/html/body/application/container/content/main/play/play.js';
import Buttons from '../blocks/html/body/application/container/content/buttons/buttons.js';
import Link from '../blocks/html/body/application/container/content/buttons/link/link.js';

export default class MainPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderMainPage() {
        const container = new Container({
            el: this._el,
            modifiers: ['container_theme_main'],
        });
        container.render();
        const containerBlock = document.querySelector('.container.container_theme_main');

        const head = new Head({
            el: containerBlock,
            modifiers: ['head_theme_main'],
        });
        head.render();
        const headBlock = document.querySelector('.head');

        const menu = new Menu({
            el: headBlock,
            modifiers: ['menu_theme_main'],
        });
        menu.render();
        const menuBlock = document.querySelector('.menu');

        const profileIcon = new ProfileIcon({
            el: menuBlock,
            href: '/',
            dataset: 'me',
        });
        profileIcon.render();

        const scoreboardIcon = new ScoreBoard({
            el: menuBlock,
            href: '/',
            dataset: 'leaders',
        });
        scoreboardIcon.render();

        const rulesIcon = new Rules({
            el: menuBlock,
            href: '/',
            dataset: 'rules',
        });
        rulesIcon.render();

        const content = new Content({
            el: containerBlock,
            modifiers: ['content_theme_main'],
        });
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_main');

        const title = new Title({
            el: contentBlock,
            title: 'colors',
            modifiers: ['title_theme_main'],
        });
        title.render();

        const main = new Main({
            el: contentBlock,
            modifiers: ['main_theme_index'],
        });
        main.render();
        const mainBlock = document.querySelector('.main.main_theme_index');

        const play = new Play({
            el: mainBlock,
            href: 'game',
            dataset: 'game',
        });
        play.render();

        const buttons = new Buttons({
            el: contentBlock,
            modifiers: ['buttons_theme_main'],
        });
        buttons.render();
        const buttonsBlock = document.querySelector('.buttons.buttons_theme_main');

        const titles = {
            multiplayer: 'MULTIPLAYER',
            signin: 'SING IN',
            signup: 'SIGN UP',
        };

        Object.entries(titles).forEach((entry) => {
            const href = entry[ 0 ];
            const title = entry[ 1 ];
            
            const link = new Link({
                el: buttonsBlock,
                href: href,
                title: title,
                dataset: href,
            });
            link.render();
        });
    }

    render() {
        this._renderMainPage();
    }
}