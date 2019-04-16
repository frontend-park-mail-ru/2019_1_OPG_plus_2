import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { INIT_EVENT } from '../../modules/events';

export default class MainPageModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
		API.isAuth()
			.then(() => {
				this.emit(INIT_EVENT, {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit(INIT_EVENT, {root: root, isAuth: false});
			});
	} 
}