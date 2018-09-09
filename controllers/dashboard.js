/*!
 * Dashboard
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/12/13
 * since: 0.0.1
 */
'use strict';

const devise = require('koa-devise');
const Router = require('koa-router');

const router = module.exports = new Router();

router.prefix('/dashboard');

// GET /dashboard
Router.api.tags.push({ name: '/dashboard', description: '仪表盘', externalDocs: { description: '链接', url: '/dashboard' } });
router.get( 'GET_dashboard', '/',
            devise.authenticate(),
            async (ctx, next) => {
              ctx.body = ctx.user;
              ctx.render('dashboard/index.html');
            });
