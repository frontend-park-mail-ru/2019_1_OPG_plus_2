'use strict'

import {AjaxModule} from './modules/ajax.js';
import {MainPage} from './pages/main_page.js'
import {SignInPage} from './pages/signin_page.js'
import {SignUpPage} from './pages/signup_page.js'
import {LeaderBoard} from './pages/scoreboard_page.js'
import {ProfilePage} from './pages/profile_page.js'

const ajax = new AjaxModule();

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

    const formsBlock = document.querySelector('.forms');
    formsBlock.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = formsBlock.elements['email'].value;
        const password = formsBlock.elements['password'].value;

        ajax.doPost({
            callback() {
                application.innerHTML = '';
                createProfile();
            },
            path: '/login',
            body: {
                email: email,
                password: password,
            },
        });
    });
}

function createSignUp() {
    const signup = new SignUpPage({
        el: application,
    });
    signup.render();

    // const formsBlock = document.querySelector('.forms');

    // formsBlock.addEventListener('submit', function (event) {
	// 	event.preventDefault();

    //     const name = formsBlock.elements[ 'name' ].value;
	// 	const email = formsBlock.elements[ 'email' ].value;
	// 	const password = formsBlock.elements[ 'password' ].value;
	// 	const password_repeat = formsBlock.elements[ 'repeat-password' ].value;

	// 	if (password !== password_repeat) {
	// 		alert('Passwords is not equals');
	// 		return;
	// 	}

	// 	ajax.doPost({
	// 		callback() {
	// 			application.innerHTML = '';
	// 			createProfile();
	// 		},
	// 		path: '/signup',
	// 		body: {
    //             name: name,
	// 			email: email,
	// 			password: password,
	// 		},
	// 	});
	// });
}

function createLeaderBoard() {
    const leaderboard = new LeaderBoard({
        el: application,
    });
    leaderboard.render();
}

function createProfile(me) {
    if (me) {
        const profile = new ProfilePage({
            el: application,
            name: me.name,
            email: me.email,
            score: me.score,
        });
        profile.render();
    } else {
        const profile = new ProfilePage({
            el: application,
        });
        profile.render();

        ajax.doGet({
			callback(xhr) {
				if (!xhr.responseText) {
					alert('Unauthorized');
					application.innerHTML = '';
					createMenu();
					return;
				}

				const user = JSON.parse(xhr.responseText);
                application.innerHTML = '';
				createProfile(user);
			},
			path: '/me',
		});
    }
}

function createSignout() {
    ajax.doPost({
        callback() {
            application.innerHTML = '';
            createMenu();
        },
        path: '/signout'
    });
}

const pages = {
    menu: createMenu,
    signin: createSignIn,
    signup: createSignUp,
    leaders: createLeaderBoard,
    me: createProfile,
    signout: createSignout,
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