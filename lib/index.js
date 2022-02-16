const Koa = require('koa');

function init(params) {
  const app = new Koa();
  return app;
}

module.exports = {
  init,
};
