import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import menuTemplate from '../blocks/html/body/application/container/head/menu/menu.pug';
import profileCardTemplate from '../blocks/html/body/application/container/content/profile-card/profile-card.pug';
import profileHeadTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.pug';
import settingsIconTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/settings-icon/settings-icon.pug';
import photoEditTemplate from '../blocks/html/body/application/container/content/profile-card/photo-edit/photo-edit.pug';
import logoutIconTemplate from '../blocks/html/body/application/container/head/menu/logout/logout.pug';
import formsTemplates from '../blocks/html/body/application/container/content/forms/forms.pug';
import profileFormTemplate from '../blocks/html/body/application/container/content/profile-card/profile-data/profile-form/profile-form.pug';
import nameTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/name/name.pug';
import profileDataTemplate from '../blocks/html/body/application/container/content/profile-card/profile-data/profile-data.pug';
import dataItemTemplate from '../blocks/html/body/application/container/content/profile-card/profile-data/data-item/data-item.pug';
import avatarTemplate from '../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.pug';
import editIconTemplate from '../blocks/html/body/application/container/content/profile-card/photo-edit/edit-icon/edit-icon.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import submitTemplate from '../blocks/html/body/application/container/content/buttons/submit/submit.pug';

import {genericBeforeEnd} from '../modules/helpers.js'

export default class EditProfilePage {
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

    _renderEditProfilePage() {
        genericBeforeEnd(this._el, containerTemplate({
            modifiers: ['container_theme_profile'],
        }));
        const containerBlock = document.querySelector('.container.container_theme_profile');

        genericBeforeEnd(containerBlock, 
            headTemplate({
                modifiers: ['head_theme_profile'],
            }),
            contentTemplate({
                modifiers: ['content_theme_edit-profile'],
            }),
            menuTemplate({
                modifiers: ['menu_theme_profile'],
            }),
        );
        const headBlock = document.querySelector('.head.head_theme_profile');
        const contentBlock = document.querySelector('.content.content_theme_edit-profile');
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
                modifiers: ['profile-card_theme_edit'],
            }),
            buttonsTemplate({
                modifiers: ['buttons_theme_edit-profile'],
            }),
        );
        const profileCardBlock = document.querySelector('.profile-card.profile-card_theme_edit');
        const buttonsBlock = document.querySelector('.buttons.buttons_theme_edit-profile');

        genericBeforeEnd(profileCardBlock, 
            profileHeadTemplate({
                modifiers: [],
            }),
        );
        const profileHeadBlock = document.querySelector('.profile-head');

        genericBeforeEnd(profileHeadBlock, 
            settingsIconTemplate({
                modifiers: [],
            })
        );

        genericBeforeEnd(profileCardBlock, 
            photoEditTemplate({
                modifiers: [],
            }),
            formsTemplates({
                modifiers: ['profile-card_theme_forms'],
                action: 'POST',
                name: 'profile-edit'
            }),
        );
        const photoEditBlock = document.querySelector('.photo-edit');
        const formsBlock = document.querySelector('.profile-card_theme_forms');

        genericBeforeEnd(photoEditBlock, 
            avatarTemplate({
                modifiers: [],
            }),
            editIconTemplate({
                modifiers: [],
                id: 'profile-edit',
            }),
        );

        genericBeforeEnd(formsBlock, 
            profileFormTemplate({
                modifiers: [],
                name: 'name',
                type: 'text',
                title: 'Name',
            }),
            profileFormTemplate({
                modifiers: [],
                name: 'email',
                type: 'email',
                title: 'E-mail',
            }),
            profileFormTemplate({
                modifiers: [],
                name: 'password',
                type: 'password',
                title: 'Password',
            }),
            profileFormTemplate({
                modifiers: [],
                name: 'repeat-password',
                type: 'password',
                title: 'Repeat password',
            }),
        );

        genericBeforeEnd(buttonsBlock, 
            submitTemplate({
                el: buttonsBlock,
                value: 'GOD SAVE AND BLESS US',
                form: 'profile-edit',
                modifiers: ['submit_theme_edit-profile'],
            }),
        );

        genericBeforeEnd(menuBlock, 
            logoutIconTemplate({
                modifiers: [],
            }),
        );
    }

    render() {
        this._renderEditProfilePage();
    }
}