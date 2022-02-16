const router = require('koa-path-match');
const config = require('config');

const route = router();

function html(params) {
  const host = config.get('proxy.host');
  console.log(host);
  return route('/').get(async ctx => {
    ctx.body = 'It works!';
  });
}

module.exports = html;
