import {NavigateMixinView} from '../navigate_view';
import {EventEmitterMixin} from '../event_emitter';
import View from './view';
import {genericBeforeEnd} from '../../modules/helpers';
import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import titleTemplate from '../../blocks/html/body/application/container/content/title/title.pug';
import buttonsTemplate from "../../blocks/html/body/application/container/content/buttons/buttons.pug";
import linkTemplate from "../../blocks/html/body/application/container/content/buttons/link/link.pug";


export default class NotFoundView extends NavigateMixinView(EventEmitterMixin(View)){
	constructor() {
		super();
	}

	_createEventListeners() {
		this._createOnLinkListener();
	}

	_render() {
		this._renderMain();
		this._renderContent();
		this._renderButtons()
	}

	_renderMain() {
		this._root.innerHTML = '';
		genericBeforeEnd(this._root,
			containerTemplate({
				modifiers: ['container_theme_service']
			})
		);
	}

	_renderContent() {
		const containerBlock = document.querySelector('.container.container_theme_service');
		genericBeforeEnd(containerBlock,
			contentTemplate({
				modifiers: ['content_theme_service'],
			})
		);
		const contentBlock = document.querySelector('.content.content_theme_service');

		genericBeforeEnd(contentBlock,
			titleTemplate({
				title: '404 not found',
				modifiers: ['title_theme_service'],
			}),
		);

		genericBeforeEnd(contentBlock,
			buttonsTemplate({
				modifiers: [],
			}),
		);
	}

	_renderButtons() {


		const buttonsBlock = document.querySelector('.buttons');
		genericBeforeEnd(buttonsBlock,
			linkTemplate({
				href: '/',
				title: 'MENU',
				dataset: '/',
				hr: '/',
				modifiers: ['button_type_primary'],
			}),
		);
	}


	open({root = {}, data = {}}) {
		super.open({root, data});
	}
}
