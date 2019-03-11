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
import Page from './page';
import User from '../modules/user.js'
import AjaxModule from '../modules/ajax';

export default class ProfilePage extends Page {
    constructor({
        router = {},
    } = {}) {
        super();
        this._router = router;
    }

    _renderProfilePage(data) {
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
                dataset: '/',
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
                name: data.name,
                modifiers: [],
            }),
        );
        
        genericBeforeEnd(profileDataBlock, 
            dataItemTemplate({
                title: 'Score',
                data: data.score,
                modifiers: ['data-item_type_score'],
            }),
            dataItemTemplate({
                title: 'Games played',
                data: data.games || 0,
                modifiers: ['data-item_type_games'],
            }),
            dataItemTemplate({
                title: 'Win',
                data: data.win || 0,
                modifiers: ['data-item_type_win'],
            }),
            dataItemTemplate({
                title: 'Lose',
                data: data.lose || 0,
                modifiers: ['data-item_type_lose'],
            }),
        );

        genericBeforeEnd(menuBlock, 
            logoutIconTemplate({
                modifiers: [],
            }),
            settingsIconTemplate({
                href: '/editme',
                dataset: '/editme',
                modifiers: [],
            })
        );
    }

    open(root) {
        if (User.exist()) {
            this._el = root;
            this._renderProfilePage(User.get());
        } else {
        AjaxModule.doGet({
            callback: (xhr) => {
                if (!xhr) {
                    alert('Unauthorized');
                    this._router.open('/');
                    return;
                }

                User.set(xhr);
                this._router.open('/me');
            },
            path: '/me',
        });

        }
    }
}