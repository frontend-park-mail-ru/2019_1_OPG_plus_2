import { NavigateMixinView } from '../navigate_view';
import { EventEmitterMixin } from '../event_emitter';
import View from './view';
import { genericBeforeEnd } from '../../modules/helpers';
import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';


export default class NotFoundView extends NavigateMixinView(EventEmitterMixin(View)){
	constructor() {
		super();
	}

	_createEventListeners() {
		this._createOnLinkListener();
	}

	_render() {
		this._root.innerHTML = '';
		genericBeforeEnd(this._root,
			containerTemplate({
				modifiers: ['container_theme_main']
			})
		);


		const containerBlock = document.querySelector('.container.container_theme_main');
		genericBeforeEnd(containerBlock,
			contentTemplate({
				modifiers: ['content_theme_main'],
			})
		);
		const contentBlock = document.querySelector('.content.content_theme_main');

		genericBeforeEnd(contentBlock,
			titleTemplate({
				title: '404 Page not found',
				modifiers: ['title_theme_main'],
			}),
		);
	}

	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}
