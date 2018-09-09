/*!
 * User
 * create: 2018/05/07
 * since: 0.0.1
 */
'use strict';

const Router = require('koa-router');
const User = require('../models/user');
const router = module.exports = new Router();

const publicFn = require('../publicFn');

router.prefix('/user');

// GET /user/login
Router.api.tags.push({ name: '/user/login', description: '用户登录页', externalDocs: { description: '链接', url: '/user/login' } });
router.get('GET_user_login', '/login', async (ctx, next) => {
  if (ctx.authenticate(false)) {
    return ctx.redirect(ctx.user_referrer || ctx.router.url('GET_dashboard'));
  }

  ctx.render('user/login.html');
});

// POST /user/login
Router.api.paths['/user/login'] = {};
Router.api.paths['/user/login']['post'] = {
  tags: ['/user/login'],
  summary: '登录提交',
  operationId: 'POST_user_login',
  parameters: [
    { '$ref': '#/definitions/CsrfParameter' },
  ],
  requestBody: {
    description: '请求数据',
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          // type: 'object',
          required: ['mobile', 'password'],
          properties: {
            username: { description: '用户名', type: 'string', example: 'Koa' },
            password: { description: '登录密码', type: 'string', example: '123456' },
          },
        },
      },
    },
  },
  responses: {
    '200': { description: '请求成功' },
    '403': { description: '请求失败' },
    '403.logined': { description: '用户已登录, 跳回首页' },
  },
};
router.post('POST_user_login', '/login', async (ctx, next) => {
  let user;

  if (ctx.authenticate(false)) {
    publicFn.errAdd(ctx, {logined: '用户已登录'});
    return;
  } else {
    try {
      user = await User.findByName(ctx.request.body.username);
    } catch (error) {
      publicFn.errAdd(ctx, error);
      return;
    }

    if(ctx.request.body.password != user.password){
      publicFn.errAdd(ctx, {logined: '密码错误'});
      return;
    }
  }

  ctx.login(user._id);

  ctx.body = {
    message: ctx.i18n.__('app.words.operation_succeeded'),
    redirect_to: ctx.user_referrer || ctx.router.url('GET_dashboard'),
  };
});

// POST /user/register
Router.api.paths['/user/register'] = {};
Router.api.paths['/user/register']['post'] = {
  tags: ['/user/login'],
  summary: '注册提交',
  operationId: 'POST_user_register',
  parameters: [
    { '$ref': '#/definitions/CsrfParameter' },
  ],
  requestBody: {
    description: '请求数据',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['mobile', 'password'],
          properties: {
            username: { description: '用户名', type: 'string', example: 'Koa' },
            password: { description: '密码', type: 'string', example: '123456' },
          },
        },
      },
    },
  },
  responses: {
    '200': { description: '请求成功' },
    '403': { description: '请求失败' },
    '200.registered': { description: '注册成功, 跳回首页' },
  },
};
router.post('POST_user_register', '/register', async (ctx, next) => {

  if(ctx.authenticate(false)) {
    publicFn.errAdd(ctx, {registered: '用户已登录'});
    return;
  }
  try {
    await User.addUser(ctx.request.permit(['username', 'password']));
  } catch (error) {
    publicFn.errAdd(ctx, error);
    return;
  }

  ctx.body = {
    message: ctx.i18n.__('app.words.operation_succeeded'),
  };
});

// POST /user/logout
Router.api.paths['/user/logout'] = {};
Router.api.paths['/user/logout']['post'] = {
  tags: ['/dashboard'],
  summary: '注销提交',
  operationId: 'POST_user_logout',
  parameters: [
    { '$ref': '#/definitions/CsrfParameter' },
  ],
  responses: {
    '200': { description: '请求成功' },
    '403': { description: '请求失败' },
  },
};
router.post('POST_user_logout', '/logout', async (ctx, next) => {
  ctx.logout();

  ctx.body = {
    message: ctx.i18n.__('app.words.operation_succeeded'),
    redirect_to: ctx.get('Referrer') || '/',
  };
});
