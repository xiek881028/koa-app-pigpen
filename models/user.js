/*!
 * User
 * xiekai
 * create: 2018/09/06
 * since: 0.0.1
 */
'use strict';

const UserSchema = require('../schema/user');
const validator = require('validator');
const publicFn = require('../publicFn');

const valid = {
  username: (name) => {
    let username = name + '';
    let result = true;
    if(name == undefined || name == null || validator.isEmpty(username) || !validator.isLength(username, {min: 3, max: 20}) || !validator.isAscii(username)){
      result = false;
    }
    return result;
  },
};

module.exports.default = module.exports = class User {

  constructor(attributes = {}, options = {}) {
    // this.model = new UserSchema(attributes);
    // this.attributes = attributes;
    Object.keys(attributes).map(item => {
      this[item] = attributes[item];
    });
  }

  static findByName(username) {
    return new Promise((resolve, reject) => {
      if(!valid.username(username)){
        reject({username: '用户名只能是3至20位的字符串'});
        return;
      }
      UserSchema.findOne({username}).exec((err, cb) => {
        if(err || !cb){
          reject({login: '用户不存在'});
          return;
        }
        resolve(new this(cb.toObject()));
      });
    });
  }

  static findById(userId) {
    return new Promise((resolve, reject) => {
      UserSchema.findById(userId).exec((err, cb) => {
        if(err || !cb){
          reject({login: '用户不存在'});
          return;
        }
        resolve(new this(cb.toObject()));
      });
    });
  }

  static addUser(user = {}) {
    return new Promise((resolve, reject) => {
      UserSchema.create(user, (err, cb) => {
        if(err){
          reject(publicFn.errFormat(err.errors));
          return;
        }
        resolve(new this(cb.toObject()));
      });
    });
  }
}
