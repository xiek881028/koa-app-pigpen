/*!
 * User
 * xiekai
 * create: 2018/09/06
 * since: 0.0.1
 */
'use strict';

const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: '用户名已经存在',
    required: '用户名不能为空',
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: '用户名长度只能为3-20位',
      }),
      validate({
        validator: 'isAscii',
        message: '用户名含有非法字符',
      }),
    ],
  },
  password: {
    type: String,
    required: '用户密码不能为空',
    validate: [
      validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: '用户密码长度只能为3-20位',
      }),
      validate({
        validator: 'isAscii',
        message: '用户密码含有非法字符',
      }),
    ],
  },
});

userSchema.plugin(beautifyUnique);

module.exports.default = module.exports = mongoose.model('user', userSchema);
