import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../blocks/html/body/application/container/content/buttons/submit/submit.pug';

import {genericBeforeEnd} from '../modules/helpers.js'

export default class SignUpPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderSignUp() {

        genericBeforeEnd(this._el, containerTemplate({
            modifiers: ['container_theme_signup'],
        }));
        const containerBlock = document.querySelector('.container.container_theme_signup');

        genericBeforeEnd(containerBlock, 
            headTemplate({
                modifiers: ['head_theme_signup'],
            }),
            contentTemplate({
                modifiers: ['content_theme_signup'],
            })
        );
        const headBlock = document.querySelector('.head.head_theme_signup');
        const contentBlock = document.querySelector('.content.content_theme_signup');

        genericBeforeEnd(headBlock, 
            backArrowTemplate({
                modifiers: [],
                href: '/',
                dataset: 'menu',
            }),
        );

        genericBeforeEnd(contentBlock, 
            titleTemplate({
                title: 'SING UP',
                modifiers: ['title_theme_signup'],
            }),
            formsTemplate({
                modifiers: [],
                action: 'POST',
                name: 'signup',
            }),
            buttonsTemplate({
                modifiers: [],
            }),
        );
        const formsBlock = document.querySelector('.forms');
        const buttonsBlock = document.querySelector('.buttons');

        genericBeforeEnd(formsBlock, 
            formTemplate({
                modifiers: [],
                name: 'name',
                type: 'text',
                placeholder: 'Name',
                req: true,
            }),
            formTemplate({
                modifiers: [],
                name: 'email',
                type: 'email',
                placeholder: 'E-mail',
                req: true,
            }),
            formTemplate({
                modifiers: [],
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                req: true,
            }),
            formTemplate({
                modifiers: [],
                name: 'repeat-password',
                type: 'password',
                placeholder: 'Repeat password',
                req: true,
            }),
        );

        genericBeforeEnd(buttonsBlock, 
            sumbitTemplate({
                value: 'SIGN UP',
                form: 'signup',
                modifiers: [],
            }),
        );
    }

    render() {
        this._renderSignUp();
    }
}