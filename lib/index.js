const Koa = require('koa');
const logger = require('koa-logger');
const html = require('./html');

function init(params) {
  const app = new Koa();
  app.use(logger());
  // app.use(mtop());
  app.use(html());
  // app.use(ajax());
  return app;
}

module.exports = {
  init,
};
