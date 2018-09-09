/*!
 * Ability
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2018/01/11
 * since: 0.0.1
 */
'use strict';

const rbac = require('koa-rbac');

// Rules
const rules = {
  roles: {
    guest: {},
    reader: {
      permissions: [ 'read' ],
      inherited: [ 'guest' ],
    },
    writer: {
      permissions: [ 'create' ],
      inherited: [ 'reader' ],
    },
    editor: {
      permissions: [ 'update' ],
      inherited: [ 'reader' ],
      attributes: [ 'dailySchedule' ],
    },
    director: {
      permissions: [ 'delete' ],
      inherited: [ 'reader', 'editor' ],
    },
    admin: {
      permissions: [ 'manage' ],
      inherited: [ 'director' ],
      attributes: [ 'hasSuperPrivilege' ],
    },
  },
  users: {
    'Koa': [ 'editor' ],
    'root': [ 'admin' ],
  },
}

// Permissions
module.exports.permissions = [
  'create',
  'delete',
  'manage',
  'read',
  'update',
];

// Attributes
const attributes = new rbac.RBAC.AttributesManager();

attributes.set(function dailySchedule(user, role, params) {
  // console.log('dailySchedule');
  // console.log(user);
  // console.log(role);
  // console.log(params);

  return true;
});

attributes.set(function hasSuperPrivilege(user, role, params) {
  // console.log('hasSuperPrivilege');
  // console.log(user);
  // console.log(role);
  // console.log(params);

  return true;
});

// Provider
const _ability = new rbac.RBAC.providers.JsonProvider(rules);

class AbilityProvider extends rbac.RBAC.Provider {

  // constructor() {
  //   super();
  // }

  getRoles(user) {
    return _ability.getRoles(user);
    // return {};
  }

  getPermissions(role) {
    return _ability.getPermissions(role);
    // return [];
  }

  getAttributes(role) {
    return _ability.getAttributes(role);
    // return [];
  }

};

module.exports = new rbac.RBAC({
  provider: new AbilityProvider(),
  attributes,
});
