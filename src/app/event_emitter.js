export const EventEmitterMixin = (superclass) => class extends superclass {
	constructor(data) {
		super(data);
		this._events = [];
	}
      
	on(evt, listener) {
		(this._events[evt] || (this._events[evt] = [])).push(listener);
	}

	remove(evt) {
		delete this._events[evt];
	}
    
	emit(evt, arg) {
		(this._events[evt] || []).forEach(lsn => lsn(arg));
	}
};