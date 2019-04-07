import Controller from './controller';
import { EventEmitterMixin } from '../event_emitter';

export default class GameController extends Controller {
	constructor({
		model = {},
		view = {},
		router = {},
	} = {}) {
		super({ model: model, view: view, router: router });
	}
}