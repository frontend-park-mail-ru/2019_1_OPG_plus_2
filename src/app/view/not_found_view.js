import {NavigateMixin} from "../navigate";
import {EventEmitterMixin} from "../event_emitter";
import View from "./view";
import {genericBeforeEnd} from "../../modules/helpers";
import containerTemplate from "../../blocks/html/body/application/container/container.pug";
import headTemplate from "../../blocks/html/body/application/container/head/head.pug";
import contentTemplate from "../../blocks/html/body/application/container/content/content.pug";
import backArrowTemplate from "../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug";
import titleTemplate from "../../blocks/html/body/application/container/content/title/title.pug";


export default class NotFoundView extends NavigateMixin(EventEmitterMixin(View)){
    constructor() {
        super();
    }

    _createEventListeners() {
        this._createOnLinkListener();
    }

    _render(data) {
        this._root.innerHTML = '';
        genericBeforeEnd(this._root,
            containerTemplate({
                modifiers: ['container_theme_main']
            })
        );
        //////////////////////////////////////////////////////////////////////////////////////


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
