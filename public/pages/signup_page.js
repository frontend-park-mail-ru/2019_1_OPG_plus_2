'use strict';

import {Container} from '../blocks/html/body/application/container/container.js';
import {Head} from '../blocks/html/body/application/container/head/head.js';
import {BackArrow} from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
import {Content} from '../blocks/html/body/application/container/content/content.js';
import {Title} from '../blocks/html/body/application/container/content/title/title.js';
import {Forms} from '../blocks/html/body/application/container/content/forms/forms.js';
import {Form} from '../blocks/html/body/application/container/content/forms/form/form.js';
import {Buttons} from '../blocks/html/body/application/container/content/buttons/buttons.js';
import {Submit} from '../blocks/html/body/application/container/content/buttons/submit/submit.js';
import {Foot} from '../blocks/html/body/application/container/foot/foot.js';

export class SignUpPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderSignUp() {
        const container = new Container({
            el: this._el,
        });
        container.modifiers = ['container_theme_signup']
        container.render();
        const containerBlock = document.querySelector('.container.container_theme_signup');

        const head = new Head({
            el: containerBlock,
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
        });
        content.modifiers = ['content_theme_signup']
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_signup');

        const title = new Title({
            el: contentBlock,
            title: 'SIGN UP',
        });
        title.render();

        const forms = new Forms({
            el: contentBlock,
            action: 'POST',
            name: 'signup',
        });
        forms.render();
        const formsBlock = document.querySelector('.forms');

        const formsInput = [
            {
                name: 'name',
                type: 'text',
                placeholder: 'Name',
            },
            {
                name: 'e-mail',
                type: 'e-mail',
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
            const input = new Form({
                el: formsBlock,
                name: item.name,
                placeholder: item.placeholder,
                type: item.type,
            });
            input.render();
        });

        const buttons = new Buttons({
            el: contentBlock,
        });
        buttons.render();
        const buttonsBlock = document.querySelector('.buttons');

        const submit = new Submit({
            el: buttonsBlock,
            value: 'SIGN UP',
            form: 'signup',
        });
        submit.render();

        // Ссылка, надо переделать под блок!!!!
        const a = document.createElement('a');
        a.href = 'signin';
        a.dataset.href = '/signin';
        a.textContent = 'SIGN IN';
        a.classList.add('link');
        a.classList.add('button_type_secondary');
        buttonsBlock.appendChild(a);

        // в foot надо будет добавить линии
        const foot = new Foot({
            el: containerBlock,
        });
        foot.render();
    }

    render() {
        this._renderSignUp();
    }
}