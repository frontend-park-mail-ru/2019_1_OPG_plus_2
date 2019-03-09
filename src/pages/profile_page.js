'use strict';

import Container from '../blocks/html/body/application/container/container.js';
// import {Head} from '../blocks/html/body/application/container/head/head.js';
// import {BackArrow} from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
// import {Content} from '../blocks/html/body/application/container/content/content.js';
// import {Title} from '../blocks/html/body/application/container/content/title/title.js';
// import {ProfileCard} from '../blocks/html/body/application/container/content/profile-card/profile-card.js';
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

        // const head = new Head({
        //     el: containerBlock,
        // });
        // head.modifiers = ['head_theme_profile'];
        // head.render();
        // const headBlock = document.querySelector('.head');

        // const backArrow = new BackArrow({
        //     el: headBlock,
        //     href: '/',
        //     dataset: 'menu',
        // });
        // backArrow.render();

        // const content = new Content({
        //     el: containerBlock,
        // });
        // content.modifiers = ['content_theme_profile']
        // content.render();
        // const contentBlock = document.querySelector('.content.content_theme_profile');

        // const title = new Title({
        //     el: contentBlock,
        //     title: 'PROFILE',
        // });
        // title.render();

        // const profile = new ProfileCard({
        //     el: contentBlock
        // });
        // profile.render();
        // const profileBlock = document.querySelector('.profile-card');

        // const profileHead = new ProfileHead({
        //     el: profileBlock,
        // });
        // profileHead.render();
        // const profileHeadBlock = document.querySelector('.profile-head');

        // const href = 'signout';
        // const t = 'signout';
    
        // const a = document.createElement('a');
        // a.href = href;
        // a.dataset.href = href;
        // a.textContent = t;
        // a.classList.add('link');
    
        // profileBlock.appendChild(a);

        // const avatar = new Avatar({
        //     el: profileHeadBlock,
        // });
        // avatar.render();

        // const edit = new EditIcon({
        //     el: profileHeadBlock,
        //     href: '/',
        //     dataset: 'menu',
        // });
        // edit.render();

        // const data = new Data({
        //     el: profileBlock,
        // });
        // data.render();
        // const dataBlock = document.querySelector('.data');

        // const itemName = new Item({
        //     el: dataBlock,
        //     title: 'Name',
        //     data: makeSafe(this._name),
        // });
        // itemName.render();

        // const itemEmail= new Item({
        //     el: dataBlock,
        //     title: 'E-mail',
        //     data: this._email,
        // });
        // itemEmail.render();

        // const itemScore = new Item({
        //     el: dataBlock,
        //     title: 'Score',
        //     data: this._score,
        // });
        // itemScore.render();
    }

    render() {
        this._renderProfilePage();
    }
}