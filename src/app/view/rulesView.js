import {genericBeforeEnd} from '../../modules/helpers.js';
import {EventEmitterMixin} from '../event_emitter';
import {NavigateMixin} from '../navigate';
import View from './view';
import containerTemplate from "../../blocks/html/body/application/container/container.pug";
import headTemplate from "../../blocks/html/body/application/container/head/head.pug";
import backArrowTemplate from "../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug";
import contentTemplate from "../../blocks/html/body/application/container/content/content.pug";
export default class RulesView extends NavigateMixin(EventEmitterMixin(View)) {
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
        const containerBlock = document.querySelector('.container.container_theme_main');
        genericBeforeEnd(containerBlock,
            headTemplate({
                modifiers: ['head_theme_back-arrow'],
            }),
            contentTemplate({
                modifiers: ['content_theme_rules'],
            })
        );

        const headBlock = document.querySelector('.head.head_theme_back-arrow');
        genericBeforeEnd(headBlock,
            backArrowTemplate({
                modifiers: [],
                hr: '/',
                dataset: '/',
            }),
        );
    }

    open({root = {}, data = {}}) {
        super.open({root, data});
    }
}