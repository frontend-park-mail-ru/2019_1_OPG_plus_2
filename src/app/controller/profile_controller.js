import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class ProfileController extends EventEmitterMixin(Controller) {
    constructor({
        model = {},
        view = {},
        router = {},
    } = {}) {
        super({ model: model, view: view, router: router });
        this._model.on('getProfile', ({root = {}, data = {}} = {}) => { this.render({root: root, data: data}); });
        this._model.on('getProfileError', () => { this.onNavigate({path: '/signin'}); });
        this._view.on('logout', () => { this.logout() });
        this._model.on('logouted', () => { this.onNavigate({path: '/'}) });
    }

    logout() {
        this._model.logout();
    }
}