'use strict'

import {AjaxModule} from './modules/ajax.js';
import {MainPage} from './pages/main_page.js'

const application = document.getElementById('application');

const main = new MainPage({
    el: application,
});

main.render();

console.log('HI');