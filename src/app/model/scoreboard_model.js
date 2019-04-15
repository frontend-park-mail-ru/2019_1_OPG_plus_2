import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';

export default class ScoreBoardModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	getData({root = {}} = {}) {
		API.getUsers({
			limit: 5,
			page: 1,
		})
			.then(users => {
				this.emit('getScore', {root: root, data: {users: users.data, page: 1, isRender: true}});
			});
	} 

	getNextPage({root = {}, page = 1} = {}) {
		API.getUsers({
			limit: 5,
			page: page,
		})
		.then(users => {
			this.emit('gotNextPage', { root: root, data: {page:page, isRender: false, users: users.data} });
		})
	}
}