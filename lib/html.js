const router = require('koa-path-match');
const config = require('config');
const httpProxy = require('http-proxy');

const route = router();
const proxy = httpProxy.createProxy({
  changeOrigin: true,
  autoRewrite: true,
  protocolRewrite: 'http',
  // cookieDomainRewrite
});

function html(params) {
  const host = config.get('proxy.host');
  return route(['/', '/apps/:seg*']).get(async ctx => {
    const path = ctx.path;
    const forwardUrl = new URL(path, host).href;
    console.log('  --- Forward', forwardUrl);
    return new Promise(resolve => {
      proxy.web(ctx.req, ctx.res, {
        target: forwardUrl,
      }, () => resolve());
    });
  });
}

module.exports = html;
