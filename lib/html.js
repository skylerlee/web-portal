const router = require('koa-path-match');
const config = require('config');
const httpProxy = require('http-proxy');
const { until } = require('./utils');

const route = router();
const host = config.get('proxy.host');
const proxy = httpProxy.createProxy({
  target: host,
  changeOrigin: true,
  autoRewrite: true,
  protocolRewrite: 'http',
  // cookieDomainRewrite
});

function html(params) {
  return route(['/', '/apps/:seg*']).get(async (ctx, next) => {
    const path = ctx.path;
    const forwardUrl = new URL(path, host).href;
    console.log('  --> Forward', ctx.method, forwardUrl);
    proxy.web(ctx.req, ctx.res);
    const proxyRes = await until(proxy, 'proxyRes');
    console.log('  <-- Receive', proxyRes.statusCode);
    await until(proxy, 'end');
  });
}

module.exports = html;
