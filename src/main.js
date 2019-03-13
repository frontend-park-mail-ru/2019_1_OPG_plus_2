import 'normalize.css';
import './scss/style.scss';

import MainPage from './pages/main_page.js';
import SignInPage from './pages/signin_page.js';
import SignUpPage from './pages/signup_page.js';
import LeaderBoard from './pages/scoreboard_page.js';
import ProfilePage from './pages/profile_page.js';
import EditProfilePage from './pages/edit_profile_page.js';
import Router from './modules/router.js';
import NotFound from './pages/404.js';

document.addEventListener('DOMContentLoaded', function() {
	const router = new Router({
		root: document.getElementById('application'),
	});
	router.add('/', new MainPage({
		router: router,
	}));
	router.add('/signin', new SignInPage({
		router: router,
	}));
	// router.add('/me', new ProfilePage({
	// 	router: router,
	// }));
	// router.add('/signup', new SignUpPage({
	// 	router: router,
	// }));
	// router.add('/editme', new EditProfilePage({
	// 	router: router,
	// }));
	// router.add('/leaders', new LeaderBoard());

	router.add('/not_found', new NotFound());

	router.start();
});
