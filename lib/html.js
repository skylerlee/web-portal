const router = require('koa-path-match');
const config = require('config');
const httpProxy = require('http-proxy');
const { until } = require('./utils');

const route = router();
const proxy = httpProxy.createProxy({
  changeOrigin: true,
  autoRewrite: true,
  protocolRewrite: 'http',
  // cookieDomainRewrite
});

function html(params) {
  const host = config.get('proxy.host');
  return route(['/', '/apps/:seg*']).get(async (ctx, next) => {
    const path = ctx.path;
    const forwardUrl = new URL(path, host).href;
    console.log('  --- Forward', forwardUrl);
    proxy.web(ctx.req, ctx.res, {
      target: forwardUrl,
    });
    const proxyRes = await until(proxy, 'proxyRes');
    console.log('  --- Receive', proxyRes.statusCode);
  });
}

module.exports = html;
