/*!
 * Home
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

import './common';
import '../css/home.scss';

import home from './components/home/home.vue';
import home_cn from './components/home/home_cn.vue';
import baseNotFound from './components/base/BaseNotFound.vue';

import BaseTransitionBox from './components/base/BaseTransitionBox.vue';

const Title = '八嘎猪';

const routes = [
	{path: '/', component: home, meta: {title: `首页 - ${Title}`}},
	{path: '/home_cn', component: home_cn, meta: {title: `首页中文版 - ${Title}`}},
	{name: '404', path: '*', redirect: res => {
    location.href = '/404';
  }},
];

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	//单页应用重置title(据说IOS的微信有bug，选择性无视)
	if(to.meta.title){
		document.title = to.meta.title;
	}
	next();
});

new Vue({
	el:'#home',
	router,
	components: {
		BaseTransitionBox
	},
	data: {
		Bus: new Vue(),
	},
});
