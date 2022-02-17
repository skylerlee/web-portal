const fs = require('fs');
const http = require('http');
const https = require('https');
const config = require('config');
const lib = require('./lib');

function mapFiles(conf) {
  const keys = Object.keys(conf);
  return keys.reduce((prev, key) => {
    const val = conf[key];
    if (typeof val === 'string') {
      prev[key] = fs.readFileSync(val);
    }
    return prev;
  }, {});
}

function run() {
  const local = config.get('local');
  const app = lib.init();
  const server = local.ssl
    ? https.createServer(mapFiles(local.ssl), app.callback())
    : http.createServer(app.callback());
  server.listen(local.port);
}

run();
