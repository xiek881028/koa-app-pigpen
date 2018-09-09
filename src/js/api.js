/*!
 * API
 * create: 2018/07/25
 * since: 0.0.1
 */
'use strict';

import 'swagger-ui/dist/swagger-ui.css';
import SwaggerUI from 'swagger-ui';

console.log(SwaggerUI);
SwaggerUI({
  dom_id: '#app',
  url: '/api/json',
});
