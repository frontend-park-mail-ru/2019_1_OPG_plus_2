import 'normalize.css';
import './scss/style.scss';

import Router from './modules/router.js';
// import NotFound from './pages/404.js';

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
	const editProfileController = new EditProfileController({model: editProfileModel, view: editProfileView, router: router});

	router.add(mainController);
	router.add('/leaders', scoreController);
	router.add('/signin', signInController);
	router.add('/me', profileController);
	router.add('/signup', signUpController);
	router.add('/editme', editProfileController);

	router.start();
});
