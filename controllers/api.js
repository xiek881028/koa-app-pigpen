/*!
 * API
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

const Router = require('koa-router');

const router = module.exports = new Router();

router.prefix('/api');

// GET /api
// Router.api.tags.push({name: '/api', description: 'API展示页', externalDocs: {description: '链接', url: '/api'}});
router.get('/', async (ctx, next) => {
  if(ctx.app.env != 'development') return await next();

  ctx.render('api/index.html');
});

// GET /api/json
// Router.api.paths['/api/json'] = {};
// Router.api.paths['/api/json']['get'] = {
//   tags: ['/api'],
//   summary: 'API json',
//   operationId: 'post_api',
//   responses: {
//     '200': {description: '请求成功'},
//     '401': {description: '请先登录再访问'},
//   },
// };
router.get('/json', async (ctx, next) => {
  if(ctx.app.env != 'development') return await next();

  Router.api.definitions.CsrfParameter = {
    in: 'header',
    name: 'csrf-token',
    description: 'Csrf token',
    required: true,
    example: ctx.csrf,
    schema: {
      type: 'string',
    },
  };

  ctx.body = Router.api;
});
