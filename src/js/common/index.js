/*!
 * Common
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

// css
import '../../css/common.scss';

// js
import axios from 'axios';
import 'core-js/fn/promise/finally';
// import 'core-js/modules/es6.object.assign';
// import 'core-js/shim';
import qs from 'qs';
// import 'regenerator-runtime/runtime';

// Axios
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [ data => qs.stringify(data) ];
axios.defaults.xsrfCookieName = 'csrf-token';
axios.defaults.xsrfHeaderName = 'x-csrf-token';
axios.interceptors.response.use(config => config, err => {
  let error = err.response;
  console.log(error);
  error.errror = error.data[Object.keys(error.data)[0]];
  return Promise.reject(error);
});

// Logout
let logout_button = document.querySelector('[data-user="logout"]');
if (logout_button) {
  document.querySelector('[data-user="logout"]').onclick = function () {
    axios({
      url: '/user/logout',
      method: 'post',
    }).then(d => {
      window.location.href = d.data.redirect_to;
    }).catch(e => {
      alert(e.response && e.response.data || e.message);
    });

    return false;
  };
}
