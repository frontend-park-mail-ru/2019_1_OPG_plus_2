import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import menuTemplate from '../blocks/html/body/application/container/head/menu/menu.pug';
import profileCardTemplate from '../blocks/html/body/application/container/content/profile-card/profile-card.pug';
import profileHeadTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.pug';
import nameTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/name/name.pug';
import profileDataTemplate from '../blocks/html/body/application/container/content/profile-card/profile-data/profile-data.pug';
import dataItemTemplate from '../blocks/html/body/application/container/content/profile-card/profile-data/data-item/data-item.pug';
import avatarTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import logoutIconTemplate from '../blocks/html/body/application/container/head/menu/logout/logout.pug';
import settingsIconTemplate from '../blocks/html/body/application/container/head/menu/settings/settings.pug';

import {genericBeforeEnd} from '../modules/helpers.js'
import { isTemplateElement } from 'babel-types';

export default class ProfilePage {
    constructor({
        el = document.body,
        name = '',
        email = '',
        score = '',
    } = {}) {
        this._el = el;
        this._name = name;
        this._email = email;
        this._score = score;
    }

    _renderProfilePage() {

        genericBeforeEnd(this._el, 
            containerTemplate({
                modifiers: ['container_theme_profile']
            })
        )
        const containerBlock = document.querySelector('.container.container_theme_profile');

        genericBeforeEnd(containerBlock, 
            headTemplate({
                modifiers: ['head_theme_profile'],
            }),
            contentTemplate({
                modifiers: ['content_theme_profile'],
            }),
            menuTemplate({
                modifiers: ['menu_theme_profile'],
            }),
        );
        const headBlock = document.querySelector('.head.head_theme_profile');
        const contentBlock = document.querySelector('.content.content_theme_profile');
        const menuBlock = document.querySelector('.menu.menu_theme_profile');

        genericBeforeEnd(headBlock, 
            backArrowTemplate({
                modifiers: [],
                href: '/',
                dataset: 'menu',
            }),
        );

        genericBeforeEnd(contentBlock, 
            profileCardTemplate({
                modifiers: ['profile-card_theme_main'],
            }),
        );
        const profileCardBlock = document.querySelector('.profile-card');

        genericBeforeEnd(profileCardBlock, 
            profileHeadTemplate({
                modifiers: ['profile-card_theme_main'],
            }),
            profileDataTemplate({
                modifiers: [],
            }),
        );
        const profileHeadBlock = document.querySelector('.profile-head.profile-card_theme_main');
        const profileDataBlock = document.querySelector('.profile-data');

        genericBeforeEnd(profileHeadBlock, 
            avatarTemplate({
                modifiers: [],
            }),
            nameTemplate({
                name: 'Vasya Pupkin',
                modifiers: [],
            }),
        );

        genericBeforeEnd(profileDataBlock, 
            dataItemTemplate({
                title: 'Score',
                data: '45',
                modifiers: ['data-item_type_score'],
            }),
            dataItemTemplate({
                title: 'Games played',
                data: '60',
                modifiers: ['data-item_type_games'],
            }),
            dataItemTemplate({
                title: 'Win',
                data: '47',
                modifiers: ['data-item_type_win'],
            }),
            dataItemTemplate({
                title: 'Lose',
                data: '13',
                modifiers: ['data-item_type_lose'],
            }),
        );

        genericBeforeEnd(menuBlock, 
            logoutIconTemplate({
                modifiers: [],
            }),
            settingsIconTemplate({
                href: 'editme',
                dataset: 'editme',
                modifiers: [],
            })
        );
    }

    render() {
        this._renderProfilePage();
    }
}