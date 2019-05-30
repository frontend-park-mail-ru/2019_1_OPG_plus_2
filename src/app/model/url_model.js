import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { INIT_EVENT, 
         INIT_ERROR_EVENT,
         FINISH_GENERATE_URL_EVENT
       } from '../../modules/events';

export default class UrlModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		API.isAuth()
			.then(() => {
                this.emit(INIT_EVENT, {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit(INIT_ERROR_EVENT);
			});
    }
    
    generateUrl() {
        API.getUrl()
            .then((response) => {
                response.isRender = false;
                this.emit(FINISH_GENERATE_URL_EVENT, response);
            })
            .catch((error) => {console.log(error)}); // TODO  обработка ошибки
    }
}