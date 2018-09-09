/*!
 * Home
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

import './common';
import '../css/home.scss';
import BaseNotFound from './components/base/BaseNotFound.vue';

new Vue({
	el:'#error',
	components: {
		BaseNotFound
	},
});
