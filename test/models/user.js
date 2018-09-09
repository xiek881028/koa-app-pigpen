/*!
 * User
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

const assert = require('assert');
const User = require('../../models/user');

const user = new User;

describe(`Model User - 用户`, async () => {

  it(`login({ username: 'Koa', password: '123456' }) - 用户登录`, async () => {
    await user.login({ username: 'Koa', password: '123456' });
    assert.equal(user.is_valid, true, user.error_messages.join(','));
  });

  it(`static find(1) - 根据ID查询单条记录`, async () => {
    let _user = await User.find(1);
    assert.notEqual(_user, null, '用户不存在');
  });

});
