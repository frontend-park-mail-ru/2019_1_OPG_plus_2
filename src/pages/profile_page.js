import Container from '../blocks/html/body/application/container/container.js';
import Head from '../blocks/html/body/application/container/head/head.js';
import BackArrow from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
import Content from '../blocks/html/body/application/container/content/content.js';
import Menu from '../blocks/html/body/application/container/head/menu/menu.js'
import ProfileCard from '../blocks/html/body/application/container/content/profile-card/profile-card.js';
import ProfileHead from '../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.js';
import Name from '../blocks/html/body/application/container/content/profile-card/profile-head/name/name.js';
import ProfileData from '../blocks/html/body/application/container/content/profile-card/profile-data/profile-data.js';
import DataItem from '../blocks/html/body/application/container/content/profile-card/profile-data/data-item/data-item.js';
import Avatar from '../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.js';
import LogoutIcon from '../blocks/html/body/application/container/head/menu/logout/logout.js';
import SettingsIcon from '../blocks/html/body/application/container/head/menu/settings/settings.js';

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

        const profileCard = new ProfileCard({
            el: contentBlock,
            modifiers: ['profile-card_theme_main'],
        });
        profileCard.render()
        const profileCardBlock = document.querySelector('.profile-card');

        const profileHead = new ProfileHead({
            el: profileCardBlock,
        });
        profileHead.render();
        const profileHeadBlock = document.querySelector('.profile-head');

        const avatar = new Avatar({
            el: profileHeadBlock,
        });
        avatar.render();

        const name = new Name({
            el: profileHeadBlock,
            name: 'Vasya Pupkin',
        });
        name.render();

        const profileData = new ProfileData({
            el: profileCardBlock,
        });
        profileData.render();
        const profileDataBlock = document.querySelector('.profile-data');

        const titles = {
            'Score' : 45,
            'Games played': 60,
            'Win': 47,
            'Lose': 13,
        }

        const modifiers = {
            'Score' : 'data-item_type_score',
            'Games played': 'data-item_type_games',
            'Win': 'data-item_type_win',
            'Lose': 'data-item_type_lose',
        }

        Object.entries(titles).forEach((entry) => {
            const title = entry[0];
            const data = entry[1];

            const dataItem = new DataItem({
                el: profileDataBlock,
                title: title,
                data: data,
                modifiers: [modifiers[title]],
            });
            dataItem.render();
        });

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
            href: 'editme',
            dataset: 'editme',
        });
        settings.render();
    }

    render() {
        this._renderProfilePage();
    }
}