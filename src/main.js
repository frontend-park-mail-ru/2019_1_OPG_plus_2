import 'normalize.css';
import './scss/style.scss';

// import MainPage from './pages/main_page.js';
import SignInPage from './pages/signin_page.js';
import SignUpPage from './pages/signup_page.js';
import ScoreBoard from './pages/scoreboard_page.js';
import ProfilePage from './pages/profile_page.js';
import EditProfilePage from './pages/edit_profile_page.js';
import Router from './modules/router.js';
import NotFound from './pages/404.js';

import MainPageModel from './app/model/main_page_model';
import MainPageView from './app/view/main_page_view';
import MainPageController from './app/controller/main_page_controller';

import ScoreBoardModel from './app/model/scoreboard_model';
import ScoreBoardView from './app/view/scoreboard_view';
import ScoreBoardController from './app/controller/scoreboard_controller';

document.addEventListener('DOMContentLoaded', function() {
	const router = new Router({
		mode: 'history',
		root: document.getElementById('application'),
	});

	const mainModel = new MainPageModel();
	const mainView = new MainPageView();
	const mainController = new MainPageController({model: mainModel, view: mainView, router: router});

	const scoreModel = new ScoreBoardModel();
	const scoreView = new ScoreBoardView();
	const scoreController = new ScoreBoardController({model: scoreModel, view: scoreView, router: router});

	router.add(mainController);
	router.add('/leaders', scoreController);

	router.start();

	// const router = new Router({
	// 	root: document.getElementById('application'),
	// });
	// router.add('/', new MainPage({
	// 	router: router,
	// }));
	// router.add('/signin', new SignInPage({
	// 	router: router,
	// }));
	// router.add('/me', new ProfilePage({
	// 	router: router,
	// }));
	// router.add('/signup', new SignUpPage({
	// 	router: router,
	// }));
	// router.add('/editme', new EditProfilePage({
	// 	router: router,
	// }));
	// router.add('/leaders', new LeaderBoard({
	// 	router: router,
	// }));

	// router.add('/not_found', new NotFound());

	// router.start();
});
