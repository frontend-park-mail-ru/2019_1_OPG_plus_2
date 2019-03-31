import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';

export default class ScoreBoardModel extends EventEmitterMixin(Model) {
    constructor() {
        super();
    }

    getData({root = {}, data = {}} = {}) {
        API.getUsers({
			limit: 5,
			page: 1,
		})
		.then(users => {
            this.emit('getScore', {root: root, data: {users: users.data, page: 1}});
		});
    } 
}