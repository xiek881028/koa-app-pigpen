/*!
 * Controllers
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/12/13
 * since: 0.0.1
 */
'use strict';

const Router = require('koa-router');
const pkg = require('../package.json');

const router = module.exports = new Router();

Router.api = {
  openapi: '3.0.0',
  info: {
    title: pkg.description,
    description: pkg.name,
    version: pkg.version,
  },
  servers: [ { url: '/', description: 'Development environment' } ],
  tags: [],
  paths: {},
  definitions: {},
};

[
  require('./api'),
  require('./dashboard'),
  require('./file'),
  require('./home'),
  require('./user'),
].forEach(controller => router.use(controller.routes(), controller.allowedMethods()));

router.redirect('/', 'GET_home');
