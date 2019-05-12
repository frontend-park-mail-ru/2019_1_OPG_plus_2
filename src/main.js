import 'normalize.css';
import './scss/style.scss';

import { getColors } from './modules/helpers'; 

import Router from './modules/router.js';

import MainPageModel from './app/model/main_page_model';
import MainPageView from './app/view/main_page_view';
import MainPageController from './app/controller/main_page_controller';

import ScoreBoardModel from './app/model/scoreboard_model';
import ScoreBoardView from './app/view/scoreboard_view';
import ScoreBoardController from './app/controller/scoreboard_controller';

import SignInModel from './app/model/sign_in_model';
import SignInView from './app/view/sign_in_view';
import SignInController from './app/controller/sign_in_controller';

import ProfileModel from './app/model/profile_model';
import ProfileView from './app/view/profile_view';
import ProfileController from './app/controller/profile_controller';

import SignUpModel from './app/model/sign_up_model';
import SignUpView from './app/view/sign_up_view';
import SignUpController from './app/controller/sign_up_controller';

import EditProfileModel from './app/model/edit_profile_model';
import EditProfileView from './app/view/edit_profile_view';
import EditProfileController from './app/controller/edit_profile_controller';

import GameModel from './app/model/game_model';
import GameView from './app/view/game_view';
import GameController from './app/controller/game_controller';
import RulesView from './app/view/rulesView';
import RulesController from './app/controller/rules_controller';
import NotFoundView from './app/view/not_found_view';
import NotFoundController from './app/controller/not_found_controller';
import InDevelopmentView from './app/view/in_development_view';
import InDevelopmentController from './app/controller/in_development_controller';

document.addEventListener('DOMContentLoaded', function () {

	// if ('serviceWorker' in navigator) {
	//     navigator.serviceWorker.register('/sw.js')
	//         .then(function (registration) {
	//             console.log('Registration successful, scope is:', registration.scope);
	//         })
	//         .catch(function (error) {
	//             console.log('Service worker registration failed, error:', error);
	//         });
	// }


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

	const signInModel = new SignInModel();
	const signInView = new SignInView();
	const signInController = new SignInController({model: signInModel, view: signInView, router: router});

	const profileModel = new ProfileModel();
	const profileView = new ProfileView();
	const profileController = new ProfileController({model: profileModel, view: profileView, router: router});

	const signUpModel = new SignUpModel();
	const signUpView = new SignUpView();
	const signUpController = new SignUpController({model: signUpModel, view: signUpView, router: router});

	const editProfileModel = new EditProfileModel();
	const editProfileView = new EditProfileView();
	const editProfileController = new EditProfileController({
		model: editProfileModel,
		view: editProfileView,
		router: router
	});

	const rulesModel = {};
	const rulesView = new RulesView();
	const rulesController = new RulesController({model: rulesModel, view: rulesView, router: router});

	const gameModel = new GameModel();
	const gameView = new GameView();
	const gameController = new GameController({model: gameModel, view: gameView, router: router});

	const nfModel = {};
	const nfView = new NotFoundView();
	const nfController = new NotFoundController({model: nfModel, view: nfView, router: router});

	const multiplaterModel = {};
	const multiplayerView = new InDevelopmentView();
	const multiplayerController = new InDevelopmentController({
		model: multiplaterModel,
		view: multiplayerView,
		router: router
	});

	router.add({handler: mainController});
	router.add({re: '/leaders', handler: scoreController});
	router.add({re: '/signin', handler: signInController});
	router.add({re: '/me', handler: profileController});
	router.add({re: '/signup', handler: signUpController});
	router.add({re: '/editme', handler: editProfileController});
	router.add({re: '/game', handler: gameController});
	router.add({re: '/multiplayer', handler: multiplayerController});

	router.add({re: '/rules', handler: rulesController});
	router.add({re: '/notfound', handler: nfController});

	router.start();

	getColors();
});
