import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import menuTemplate from '../blocks/html/body/application/container/head/menu/menu.pug';
import profileIconTemplate from '../blocks/html/body/application/container/head/menu/profile/profile.pug';
import scoreBoardTemplate from '../blocks/html/body/application/container/head/menu/scoreboard/scoreboard.pug';
import rulesTemplate from '../blocks/html/body/application/container/head/menu/rules/rules.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import mainTemplate from '../blocks/html/body/application/container/content/main/main.pug';
import playTemplate from '../blocks/html/body/application/container/content/main/play/play.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import linkTemplate from '../blocks/html/body/application/container/content/buttons/link/link.pug';

import {genericBeforeEnd} from '../modules/helpers.js'

export default class MainPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderMainPage() {
        genericBeforeEnd(this._el, containerTemplate({
            modifiers: ['container_theme_main'],
        }));
        const containerBlock = document.querySelector('.container.container_theme_main');

        genericBeforeEnd(containerBlock, 
            headTemplate({
                modifiers: ['head_theme_main'],
            }),
            contentTemplate({
                modifiers: ['content_theme_main'],
            })
        );
        const headBlock = document.querySelector('.head.head_theme_main');
        const contentBlock = document.querySelector('.content.content_theme_main');

        genericBeforeEnd(headBlock, 
            menuTemplate({
                modifiers: ['menu_theme_main'],
            })
        );
        const menuBlock = document.querySelector('.menu.menu_theme_main');

        genericBeforeEnd(menuBlock, 
            profileIconTemplate({
                modifiers: [],
                href: '/',
                dataset: 'me',
            }),
            scoreBoardTemplate({
                modifiers: [],
                href: '/',
                dataset: 'leaders',
            }),
            rulesTemplate({
                modifiers: [],
                hreaf: '/',
                dataset: 'rules',
            })
        );

        genericBeforeEnd(contentBlock, 
            titleTemplate({
                title: 'colors',
                modifiers: ['title_theme_main'],
            }),
            mainTemplate({
                modifiers: ['main_theme_index'],
            }),
            buttonsTemplate({
                modifiers: ['buttons_theme_main'],
            })
        );
        const mainBlock = document.querySelector('.main.main_theme_index');
        const buttonsBlock = document.querySelector('.buttons.buttons_theme_main');

        genericBeforeEnd(mainBlock, 
            playTemplate({
                href: 'game',
                dataset: 'game',
                modifiers: [],
            })
        );

        genericBeforeEnd(buttonsBlock, 
            linkTemplate({
                href: 'multiplayer',
                title: 'MULTIPLAYER',
                dataset: 'multiplayer',
                modifiers: [],
            }),
            linkTemplate({
                href: 'signin',
                title: 'SING IN',
                dataset: 'signin',
                modifiers: [],
            }),
            linkTemplate({
                href: 'signup',
                title: 'SIGN UP',
                dataset: 'signup',
                modifiers: [],
            }),
        );
    }

    render() {
        this._renderMainPage();
    }
}