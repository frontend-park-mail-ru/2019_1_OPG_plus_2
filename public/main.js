'use strict'

import {AjaxModule} from './modules/ajax.js';
import {MainPage} from './pages/main_page.js'
import {SignInPage} from './pages/signin_page.js'

const application = document.getElementById('application');


function createMenu() {
    const main = new MainPage({
        el: application,
    });
    main.render();
}

function createSignIn() {
    const singin = new SignInPage({
        el: application,
    });
    singin.render();
}

const pages = {
    menu: createMenu,
    signin: createSignIn,
    // sign_up: createSignUp,
    // leaders: createLeaderBoard,
    // me: createProfile,
};

createMenu();

application.addEventListener('click', function (event) {
    if (!(event.target instanceof HTMLAnchorElement)) {
        return;
    }

    event.preventDefault();
    const link = event.target;

    console.log({
        href: link.href,
        dataHref: link.dataset.href,
    });

    application.innerHTML = '';

    pages[link.dataset.href]();
});

console.log('HI');