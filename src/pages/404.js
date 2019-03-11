import containerTemplate from '../blocks/html/body/application/container/container.pug';
import contentTemplate from '../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../blocks/html/body/application/container/content/title/title.pug';

import {genericBeforeEnd} from '../modules/helpers.js';
import Page from './page';

export default class NotFound extends Page {
	_renderMainPage() {
		genericBeforeEnd(this._el, containerTemplate({
			modifiers: ['container_theme_main'],
		}));
		const containerBlock = this._el.querySelector('.container.container_theme_main');

		genericBeforeEnd(containerBlock,
			contentTemplate({
				modifiers: ['content_theme_main'],
			})
		);
		const contentBlock = this._el.querySelector('.content.content_theme_main');

		genericBeforeEnd(contentBlock,
			titleTemplate({
				title: '404 Page not found',
				modifiers: ['title_theme_main'],
			}),
		);
	}

	open(root) {
		this._el = root;
		this._renderMainPage();
	}
}