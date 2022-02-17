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

function ajax(params) {
  return route('(.*)', async (ctx, next) => {
    console.log('  ====== route: ajax ======');
    proxy.web(ctx.req, ctx.res);
    const proxyReq = await until(proxy, 'proxyReq');
    const forwardUrl = new URL(proxyReq.path, `${proxyReq.protocol}//${proxyReq.host}`).href;
    console.log('  --> Forward', proxyReq.method, forwardUrl);
    const proxyRes = await until(proxy, 'proxyRes');
    console.log('  <-- Receive', proxyRes.statusCode);
    await until(proxy, 'end');
  });
}

module.exports = ajax;
