/*
 * Publish/Subscribe Pattern
 */
export class PubSub {

	constructor() {
		this.handlers = []; //cases of how to react on events
		this.listeners = [];
	}

	on(eventName, handler, context) {
		if (typeof context === 'undefined') {
			context = handler;
		}
		this.handlers.push({event: eventName, handler: handler.bind(context)});
		return this;
	}

	//handlers содержит в себе пары <название события>:<функция-коллбек>
	publish(eventName, eventArgs) {
		this.listeners.forEach(listener =>{
			listener.getNotified(eventName, eventArgs);
		});
	}

	getNotified(eventName, eventArgs){
		this.handlers.forEach(topic => {
			if (topic.event === eventName) {
				topic.handler(eventArgs);
			}
		});
	}
}

/*
 * EventBus Pattern
 */
export default class EventBus extends PubSub {
	constructor() {
		super();
	}

	attachToObject(obj) {
		obj.handlers = [];
		obj.publish = this.publish;
		obj.on = this.on;
		obj.listeners = this.listeners;
		obj.getNotified = this.getNotified;
		obj.addListener = this.addListener;
	}

	addListener(listener) {
		this.listeners.push(listener);
	}
}