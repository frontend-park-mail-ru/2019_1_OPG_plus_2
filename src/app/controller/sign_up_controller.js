import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class SignUpController extends EventEmitterMixin(Controller) {
    constructor({
        model = {},
        view = {},
        router = {},
    } = {}) {
        super({ model: model, view: view, router: router });
        this._model.on('isAuthSignUp', ({root = '', isAuth = false}) => { this.render({root: root, data: isAuth})});
        this._model.on('signUpOK', () => { this.onNavigate({path: '/me'})});
        this._model.on('signUpError', ({root = '', error = ''}) => { this.render({root: root, data: error}) }); 
        this._view.on('signUpSubmit', ({root = '', name = '', email = '', password = ''} = {}) => { this.signUp({ root, name, email, password }) });
    }

    signUp({root = '', name = '', email = '', password = ''} = {}) {
        this._model.signUp({root, name, email, password});
    }
}