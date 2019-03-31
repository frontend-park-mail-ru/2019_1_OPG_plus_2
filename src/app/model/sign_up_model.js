import Model from './model';
import { EventEmitterMixin } from '../event_emitter'; 
import API from '../../modules/API';

export default class SignUpModel extends EventEmitterMixin(Model) {
    constructor() {
        super();
    }

    getData({root = {}, data = {}} = {}) {
        API.isAuth()
			.then(() => {
                this.emit('isAuthSignUp', {root: root, isAuth: true});
			})
			.catch(() => {
				this.emit('isAuthSignUp', {root: root, isAuth: false});
			});
    }

    signUp({root = '', name='', email = '', password = ''} = {}) {
        API.signUp({
            email: email,
            password: password,
            username: name,
        })
        .then(() => { this.emit('signUpOK'); })
        .catch(err => {
            this.emit('signUpError', {root: root, error: err});
            // this._el.innerHTML = '';
            // this._renderSignUp(err, {
            //     username,
            //     email,
            // }
            // );
        });
    }
}