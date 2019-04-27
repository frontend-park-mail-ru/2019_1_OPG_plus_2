import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { INIT_EVENT } from '../../modules/events';
import User from '../../modules/user.js';

export default class ChatModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
	}

	init({root = {}} = {}) {
        // TODO соединение с вебсоктом будет открываться здесь
		if (User.exist()) {
			this.emit(INIT_EVENT, {
				root: root, 
                user: User.get(),
                isRender: true,
			});
		} else {
			API.getUser()
				.then((user) => {
					User.set(user);
					this.emit(INIT_EVENT, {
						root: root, 
                        user: User.get(),
                        isRender: true,
					});
				})
				.catch(() => {
					this.emit(INIT_EVENT, {
						root: root, 
						user: {
                            user: 'Anonymus',
                            isRender: true,
                        }
					});
				});
		}
	} 
}