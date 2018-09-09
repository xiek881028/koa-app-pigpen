/*!
 * File
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

const devise = require('koa-devise');
const multer = require('koa-multer');
const Router = require('koa-router');

const router = module.exports = new Router();

router.prefix('/file');

// POST /file
Router.api.paths['/file'] = {};
Router.api.paths['/file']['post'] = {
  tags: [],
  summary: '文件上传',
  operationId: 'POST_file',
  parameters: [
    { '$ref': '#/definitions/CsrfParameter' },
  ],
  requestBody: {
    description: '请求数据',
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          required: ['file'],
          properties: {
            file: { type: 'string', format: 'binary' },
          },
        },
      },
    },
  },
  responses: {
    '200': { description: '请求成功' },
    '403': { description: '请求失败' },
  },
};
router.post('POST_file', '/',
  // devise.authenticate(false),
  multer({ dest: './tmp' }).single('file'),
  async (ctx, next) => {
    try {
      let file = await ctx.fileWrite(ctx.req.file);
      ctx.body = {
        id: file._id,
      };
    } catch (error) {
      ctx.status = 403;
      ctx.body = error;
    }
  });

// GET /file/:id
Router.api.paths['/file/{id}'] = {};
Router.api.paths['/file/{id}']['get'] = {
  tags: [],
  summary: '显示图片或下载文件',
  operationId: 'GET_file_id',
  parameters: [
    {
      in: 'path',
      name: 'id',
      description: 'mongoid',
      required: true,
      schema: {
        type: 'string',
      },
    },
    {
      in: 'query',
      name: 'download',
      description: '强制下载文件, 默认图片文件为直接显示, 非图片文件直接下载',
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': { description: '请求成功' },
    '403': { description: '请求失败' },
  },
};
router.get('GET_file_id', '/:id', async (ctx, next) => {
  let file = ctx.fileRead(ctx.params.id);
  let fileInfo;
  try {
    fileInfo = await ctx.fileFindById(ctx.params.id, 'filename contentType md5 uploadDate');
  } catch (error) {
    ctx.status = 403;
    ctx.body = error;
    return;
  }

  ctx.etag = fileInfo.md5;
  ctx.lastModified = fileInfo.uploadDate;
  ctx.status = 200;
  if (ctx.fresh) {
    return ctx.status = 304;
  }

  ctx.type = fileInfo.contentType;
  (ctx.query.download || !/^image\/.*$/.test(ctx.type)) && ctx.attachment(fileInfo.filename);
  ctx.body = file;
});
