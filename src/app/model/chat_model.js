import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';
import { INIT_EVENT,
		 GET_MESSAGE_EVENT,
		 GOT_NEXT_PAGE_EVENT } from '../../modules/events';
import User from '../../modules/user.js';

export default class ChatModel extends EventEmitterMixin(Model) {
	constructor() {
		super();
		this._messageIdCache = [];
	}

	openConnection({path = ''} = {}) {
		this._ws = new WebSocket(path);

		this._ws.onopen = (() => {
			this._ws.onmessage = (event) => {
				let msg = JSON.parse(event.data);
				this.emit(GET_MESSAGE_EVENT, {data: msg, isRender: false})
			}
			
		});
	}

	init({root = {}} = {}) {
		this.openConnection({path: `${HOST_CHAT_WS}/chat/0/room`});

		API.getMessages({
			limit: 10,
			page: 1,
		})
			.then((messages) => {
				this.emit(INIT_EVENT, {root: root, messages: messages, isRender: true, page: 1});
			})
			.catch((error) => { console.log(error); debugger});
	} 

	sendMessage({message = ''} = {}) {
		if (User.exist()) {
			let msg = {
				username: User._username,
				content: message,
				type: 'text',
				// random_id: Math.random() * (max - min) + min,
			};

			// TODO закешировать рандомный id
			this._ws.send(JSON.stringify(msg));
		} else {
			API.getUser()
				.then((user) => {
					User.set(user);

					let msg = {
						username: User._username,
						content: message,
						type: 'text',
					};

					this._ws.send(JSON.stringify(msg));
				})
				.catch(() => {
					let msg = {
						username: '',
						content: message,
						type: 'text',
					};

					this._ws.send(JSON.stringify(msg));
				});
		}
	}

	getNextPage({root = {}, page = 1} = {}) {
		API.getMessages({
			limit: 10,
			page: page,
		})
			.then(users => {
				this.emit(GOT_NEXT_PAGE_EVENT, { root: root, data: {page:page, isRender: false, messages: users.data} });
			});
	}
}