const router = require('koa-path-match');
const config = require('config');
const httpProxy = require('http-proxy');

const route = router();
const proxy = httpProxy.createProxy();

function html(params) {
  const host = config.get('proxy.host');
  return route('/').get(async ctx => {
    const path = ctx.path;
    const forwardUrl = new URL(path, host).href;
    proxy.web(ctx.req, ctx.res, {
      target: forwardUrl,
    });
  });
}

module.exports = html;
