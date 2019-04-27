import containerTemplate from '../../blocks/html/body/application/container/container.pug';
import headTemplate from '../../blocks/html/body/application/container/head/head.pug';
import backArrowTemplate from '../../blocks/html/body/application/container/head/back-arrow/back_arrow.pug';
import contentTemplate from '../../blocks/html/body/application/container/content/content.pug';
import chatTemplate from '../../blocks/html/body/application/container/content/chat/chat.pug';

import View from './view';
import Paginate from '../component/paginate';
import { EventEmitterMixin } from '../event_emitter';
import { NavigateMixinView } from '../navigate_view';
import { genericBeforeEnd } from '../../modules/helpers.js';
import { POST_MESSAGE_EVENT, GET_NEXT_PAGE_EVENT } from '../../modules/events';

export default class ChatView extends NavigateMixinView(EventEmitterMixin(View)) {
	constructor() {
        super();
		this.onSendListener = this.onSendListener.bind(this);
		
		this.onNextPageClick = this.onNextPageClick.bind(this);
		this.onPrevPageClick = this.onPrevPageClick.bind(this);
		
		this._paginate = new Paginate({
			onNextPage: this.onNextPageClick, 
			onPrevPage: this.onPrevPageClick, 
			modifiers: ['pages_theme_chat']});
		this._components = [];
		this._components.push(this._paginate);
	}
	
	onNextPageClick(event, pageNum) {
		this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum + 1});
	}

	onPrevPageClick(event, pageNum) {
		this.emit(GET_NEXT_PAGE_EVENT, {root: this._root, page: pageNum - 1});
	}

    onSendListener(event) {
        const formsBlock = this._root.querySelector('.chat__form');
		event.preventDefault();
            	
		const message = formsBlock.elements[0].value;
		this.emit(POST_MESSAGE_EVENT, {message: message});
    }
    
    _createSendListener() {
        const sendButton = this._root.querySelector('.chat__form');
        sendButton.addEventListener('submit', this.onSendListener, true);
    }

    _removeSendListener() {
        const sendButton = this._root.querySelector('.chat__form');
        sendButton.removeEventListener('submit', this.onSendListener, true);
    }

	_createEventListeners() {
        super._createEventListeners();
        this._createSendListener();
	}

	_removeEventListeners() {
        super._removeEventListeners();
        this._removeSendListener();
	}

	_renderContainer() {
		genericBeforeEnd(this._root, containerTemplate({
			modifiers: ['container_theme_chat'],
		}));
	}

	_renderMain() {
		const containerBlock = this._root.querySelector('.container.container_theme_chat');
		genericBeforeEnd(containerBlock, 
			headTemplate({
				modifiers: ['head_theme_back-arrow'],
			}),
			contentTemplate({
				modifiers: ['content_theme_chat'],
			}),
		);
	}

	_renderBack() {
		const headBlock = this._root.querySelector('.head.head_theme_back-arrow');
		genericBeforeEnd(headBlock, 
			backArrowTemplate({
				modifiers: [],
				hr: '/',
				dataset: '/',
			}),
		);
	}

	_renderChat(data) {
		const contentBlock = this._root.querySelector('.content.content_theme_chat');
		genericBeforeEnd(contentBlock,
			chatTemplate({
				modifiers: [],
				lst: data.messages.data.messages ? [...data.messages.data.messages] : [],
			})
		);

		const chatBlock = this._root.querySelector('.chat');
		this._paginate.create({root: chatBlock, data: data});
	}

	_addMessage(data) {
		const messages = this._root.querySelector('.chat__messages');
		console.log(data);
		debugger;
		if (data.messages.messages) {
			messages.innerHTML = '';
			this._renderChat(data);
		} else {
			messages.insertAdjacentHTML('beforeend', `<span class="chat__mes">${data.data.content}</span></br>`);
		}
	}


	
	_render(data) {
		if(data.isRender) {
			this._root.innerHTML = '';
			this._renderContainer();
			this._renderMain();
			this._renderBack();
			this._renderChat(data);
		} else {
			this._addMessage(data);
		}
	}

	open({ root = {}, data = {} }) {
		super.open({root, data});
	}
}