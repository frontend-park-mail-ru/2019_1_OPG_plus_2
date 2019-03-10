import containerTemplate from '../blocks/html/body/application/container/container.pug';
import headTemplate from '../blocks/html/body/application/container/head/head.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';
import backArrowTemplate from '../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import formsTemplate from '../blocks/html/body/application/container/content/forms/forms.pug';
import formTemplate from '../blocks/html/body/application/container/content/forms/form/form.pug';
import buttonsTemplate from '../blocks/html/body/application/container/content/buttons/buttons.pug';
import sumbitTemplate from '../blocks/html/body/application/container/content/buttons/submit/submit.pug';
import linkTemplate from '../blocks/html/body/application/container/content/buttons/link/link.pug';

import {genericBeforeEnd} from '../modules/helpers.js'

export default class SignInPage {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderSignIn() {

        genericBeforeEnd(this._el, containerTemplate({
            modifiers: ['container_theme_signin'],
        }));
        const containerBlock = document.querySelector('.container.container_theme_signin');

        genericBeforeEnd(containerBlock, 
            headTemplate({
                modifiers: ['head_theme_signin'],
            }),
            contentTemplate({
                modifiers: ['content_theme_signin'],
            })
        );
        const headBlock = document.querySelector('.head.head_theme_signin');
        const contentBlock = document.querySelector('.content.content_theme_signin');

        genericBeforeEnd(headBlock, 
            backArrowTemplate({
                modifiers: [],
                href: '/',
                dataset: 'menu',
            }),
        );

        genericBeforeEnd(contentBlock, 
            titleTemplate({
                title: 'SING IN',
                modifiers: ['title_theme_signin'],
            }),
            formsTemplate({
                modifiers: [],
                action: 'POST',
                name: 'signin',
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
                name: 'email',
                placeholder: 'E-mail',
                type: 'email',
                req: true,
            }),
            formTemplate({
                modifiers: [],
                name: 'password',
                placeholder: 'Password',
                type: 'password',
                req: true,
            }),
        );

        genericBeforeEnd(buttonsBlock, 
            sumbitTemplate({
                value: 'SIGN IN',
                form: 'signin',
                modifiers: [],
            }),
            linkTemplate({
                href: 'signup',
                title: 'SIGN UP',
                dataset: 'signup',
                modifiers: ['button_type_secondary'],
            }),
        );
    }

    render() {
        this._renderSignIn();
    }
}