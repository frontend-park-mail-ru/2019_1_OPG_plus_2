import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';

export default class MainPageModel extends EventEmitterMixin(Model) {
    constructor() {
        super();
    }

    getData({root = {}, data = {} } = {}) {
        API.isAuth()
			.then(() => {
                this.emit('isAuth', {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit('isAuth', {root: root, isAuth: false});
			});
    } 
}