import Container from '../blocks/html/body/application/container/container.js';
import Head from '../blocks/html/body/application/container/head/head.js';
import BackArrow from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
import Content from '../blocks/html/body/application/container/content/content.js';
import Menu from '../blocks/html/body/application/container/head/menu/menu.js'
import ProfileCard from '../blocks/html/body/application/container/content/profile-card/profile-card.js';
import ProfileHead from '../blocks/html/body/application/container/content/profile-card/profile-head/profile-head.js';
import SettingsIcon from '../blocks/html/body/application/container/content/profile-card/profile-head/settings-icon/settings-icon.js';
import PhotoEdit from '../blocks/html/body/application/container/content/profile-card/photo-edit/photo-edit.js';
import LogoutIcon from '../blocks/html/body/application/container/head/menu/logout/logout.js';
import Forms from '../blocks/html/body/application/container/content/forms/forms.js';
import ProfileForm from '../blocks/html/body/application/container/content/profile-card/profile-data/profile-form/profile-form.js';
import Avatar from '../blocks/html/body/application/container/content/profile-card/profile-head/avatar/avatar.js';
import EditIcon from '../blocks/html/body/application/container/content/profile-card/photo-edit/edit-icon/edit-icon.js';
import Buttons from '../blocks/html/body/application/container/content/buttons/buttons.js';
import Submit from '../blocks/html/body/application/container/content/buttons/submit/submit.js';

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
            modifiers: ['content_theme_edit-profile'],
        });
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_edit-profile');

        const profileCard = new ProfileCard({
            el: contentBlock,
            modifiers: ['profile-card_theme_edit']
        });
        profileCard.render()
        const profileCardBlock = document.querySelector('.profile-card');

        const profileHead = new ProfileHead({
            el: profileCardBlock,
        });
        profileHead.render();
        const profileHeadBlock = document.querySelector('.profile-head');

        const settingsIcon = new SettingsIcon({
            el: profileHeadBlock,
        });
        settingsIcon.render();

        const photoEdit = new PhotoEdit({
            el: profileCardBlock,
        });
        photoEdit.render();
        const photoEditBlock = document.querySelector('.photo-edit');

        const avatar = new Avatar({
            el: photoEditBlock,
        });
        avatar.render();

        const editIcon = new EditIcon({
            el: photoEditBlock,
            id: 'profile-edit',
        });
        editIcon.render();

        const forms = new Forms({
            el: profileCardBlock,
            modifiers: ['profile-card_theme_forms'],
            action: 'POST',
            name: 'profile-edit'
        });
        forms.render();
        const formsBlock = document.querySelector('.profile-card_theme_forms');

        const formsInput = [
            {
                name: 'name',
                type: 'text',
                placeholder: 'Name',
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'E-mail',
            },
            {
                name: 'password',
                type: 'password',
                placeholder: 'Password',
            },
            {
                name: 'repeat-password',
                type: 'password',
                placeholder: 'Repeat password',
            },
        ];

        formsInput.forEach(function (item) {
            const profileForm = new ProfileForm({
                el: formsBlock,
                name: item.name,
                title: item.placeholder,
                type: item.type,
            });
            profileForm.render();
        });

        renderButtonsBlock({
            el: contentBlock, 
            modifiers: ['buttons_theme_edit-profile'],
        });
        const buttonsBlock = document.querySelector('.buttons.buttons_theme_edit-profile');

        const submit = new Submit({
            el: buttonsBlock,
            value: 'GOD SAVE AND BLESS US',
            form: 'profile-edit',
            modifiers: ['submit_theme_edit-profile'],
        });
        submit.render();

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
}

    render() {
        this._renderEditProfilePage();
    }
}