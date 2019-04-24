import pagesTemplate from '../../blocks/html/body/application/container/content/main/pages/pages.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import Component from './component';

export default class Paginate extends Component {
	constructor({
		callback = () => {},
	} = {}) {
		super({callback});
	}

	_createEventListeners() {
		super._createEventListeners();
		this._root.addEventListener('click', this._callback, true);
	}

	_removeEventListener() {
		super._removeEventListeners();
		this._root.removeEventListener('click', this._callback, true);
	}

	_render(data) {
		genericBeforeEnd(this._root, 
			pagesTemplate({
				modifiers: [],
				page_num: data.page,
			})
		);
	}

	create({root = {}, data = {}} = {}) {
		super.create({root, data});
	}

	delete() {
		super.delete();
	}
}