import Controller from './controller';
import { ROOT, PROFILE } from '../paths';
import { NavigateMixinController  } from '../navigate_controller';
import { INIT_EVENT,
         INIT_ERROR_EVENT,
         GENERATE_URL_EVENT,
         FINISH_GENERATE_URL_EVENT,
         START_GAME 
        } from '../../modules/events';

export default class UrlController extends NavigateMixinController(Controller) {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
		this._model.on(INIT_EVENT, ({root = {}, isRender = true} = {}) => {this.render({ root: root, data: { isRender } })});
		this._model.on(INIT_ERROR_EVENT, () => {this.onNavigate({ path: ROOT, redirect: true })});
		this._view.on(GENERATE_URL_EVENT, () => {this.generateUrl()});
        this._model.on(FINISH_GENERATE_URL_EVENT, data => this.finishGenerate(data));
        this._view.on(START_GAME, data => this.onNavigate(data));
    }
    
    generateUrl() {
        this._model.generateUrl();
    }

    finishGenerate(data) {
        this._view._render(data);
    }
}