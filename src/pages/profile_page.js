'use strict';

import Container from '../blocks/html/body/application/container/container.js';
import Head from '../blocks/html/body/application/container/head/head.js';
import BackArrow from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
import Content from '../blocks/html/body/application/container/content/content.js';
import Menu from '../blocks/html/body/application/container/head/menu/menu.js'
import LogoutIcon from '../blocks/html/body/application/container/head/menu/logout/logout.js';
import SettingsIcon from '../blocks/html/body/application/container/head/menu/settings/settings.js';
// import ProfileCard from '../blocks/html/body/application/container/content/profile-card/profile-card.js';
// import {ProfileHead} from '../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.js';
// import {Avatar} from '../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.js';
// import {EditIcon} from '../blocks/html/body/application/container/content/profile-card/profile-head/edit/edit.js';
// import {Data} from '../blocks/html/body/application/container/content/profile-card/data/data.js';
// import {Item} from '../blocks/html/body/application/container/content/profile-card/data/item/item.js';
// import {makeSafe} from '../utils/utils.js';

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
        const container = new Container({
            el: this._el,
            modifiers: ['container_theme_profile'],
        });
        container.render();
        const containerBlock = document.querySelector('.container.container_theme_profile');

        const head = new Head({
            el: containerBlock,
            modifiers: ['head_theme_profile'],
        });
        head.render();
        const headBlock = document.querySelector('.head');

        const backArrow = new BackArrow({
            el: headBlock,
            href: '/',
            dataset: 'menu',
        });
        backArrow.render();

        const content = new Content({
            el: containerBlock,
            modifiers: ['content_theme_profile'],
        });
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_profile');

        const menu = new Menu({
            el: containerBlock,
            modifiers: ['menu_theme_profile'],
        });
        menu.render();
        const menuBlock = document.querySelector('.menu');

        const logout = new LogoutIcon({
            el: menuBlock,
        });
        logout.render();

        const settings = new SettingsIcon({
            el: menuBlock,
        });
        settings.render();
    }

    render() {
        this._renderProfilePage();
    }
}