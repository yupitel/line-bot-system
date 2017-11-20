'use strict';

const http = require('http');
const App  = require('./_app');

const app = App.create();

console.log(app.get('port'));

module.exports = http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
