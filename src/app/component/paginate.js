import pagesTemplate from '../../blocks/html/body/application/container/content/main/pages/pages.pug';

import { genericBeforeEnd } from '../../modules/helpers.js';
import Component from './component';

export default class Paginate extends Component {
	constructor({
		callback = () => null,
		onNextPage = () => null,
		onPrevPage = () => null,
		modifiers = [],
	}) {
		super({callback});
		
		this._onNextPage = onNextPage;
		this._onPrevPage = onPrevPage;

		this.onNextPage = this.onNextPage.bind(this);
		this.onPrevPage = this.onPrevPage.bind(this);

		this._modifiers = modifiers;
	}

	_createEventListeners() {
		super._createEventListeners();
		this._root.querySelector('.pages__next').addEventListener('click', this.onNextPage, true);
		this._root.querySelector('.pages__back').addEventListener('click', this.onPrevPage, true);
	}

	_removeEventListener() {
		super._removeEventListeners();
		this._root.querySelector('.pages__next').removeEventListener('click', this.onNextPage, true);
		this._root.querySelector('.pages__back').removeEventListener('click', this.onPrevPage, true);
	}

	onNextPage(event) {
		const pageNum = parseInt(this._root.querySelector('.pages__num').textContent);
		this._onNextPage(event, pageNum);
	}

	onPrevPage(event) {
		const pageNum = parseInt(this._root.querySelector('.pages__num').textContent);
		this._onPrevPage(event, pageNum);
	}

	_render(data) {
		genericBeforeEnd(this._root, 
			pagesTemplate({
				modifiers: this._modifiers,
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