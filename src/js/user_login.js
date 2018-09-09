/*!
 * Login
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

import './common';
import '../css/user_login.scss';
import axios from 'axios';

document.getElementsByTagName('form')[0].onsubmit = function () {
  axios({
    url: '/user/login',
    method: 'post',
    data: {
      username: this.username.value,
      password: this.password.value,
    },
  }).then(d => {
    window.location.href = d.data.redirect_to;
  }).catch(err => {
    alert(err.errror);
  });

  return false;
};
