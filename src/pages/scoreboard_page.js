import {Container} from '../blocks/html/body/application/container/container.js';
import {Head} from '../blocks/html/body/application/container/head/head.js';
import {BackArrow} from '../blocks/html/body/application/container/head/back-arrow/back_arrow.js';
import {Content} from '../blocks/html/body/application/container/content/content.js';
import {Title} from '../blocks/html/body/application/container/content/title/title.js';
import {Main} from '../blocks/html/body/application/container/content/main/main.js';

export class LeaderBoard {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    _renderLeaderBoard() {
        const container = new Container({
            el: this._el,
        });
        container.modifiers = ['container_theme_scoreboard']
        container.render();
        const containerBlock = document.querySelector('.container.container_theme_scoreboard');

        const head = new Head({
            el: containerBlock,
        });
        head.render();
        const headBlock = document.querySelector('.head');

        const backArrow = new BackArrow({
            el: headBlock,
            href: '/',
            dataset: 'menu',
        });
        backArrow.render();

        const content = new Content({
            el: containerBlock,
        });
        content.modifiers = ['content_theme_scoreboard']
        content.render();
        const contentBlock = document.querySelector('.content.content_theme_scoreboard');

        const title = new Title({
            el: contentBlock,
            title: 'SCOREBOARD',
        });
        title.render();

        const main = new Main({
            el: contentBlock,
        });
        main.modifiers = ['main_theme_scoreboard'];
        main.render();
    }

    render() {
        this._renderLeaderBoard();
    }
}