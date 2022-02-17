const Koa = require('koa');
const html = require('./html');

function init(params) {
  const app = new Koa();
  // app.use(mtop());
  app.use(html());
  // app.use(ajax());
  return app;
}

module.exports = {
  init,
};
