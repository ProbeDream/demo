const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2];

if (!port) {
  console.log(`请您指定对应的端口好吗? node server.js 8888 也可以的`);
  process.exit(1);
}

const server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWidthQuery = request.url;
  let queryString = '';
  if (pathWidthQuery.indexOf('?') >= 0) {
    queryString = pathWidthQuery.substring(pathWidthQuery.indexOf('?'));
  }
  let path = parseURL.pathname;
  let query = parseURL.query;
  let method = parseURL.method;
  console.log(`有人来请求了:${pathWidthQuery}`);
  if (path === '/index.html') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(fs.readFileSync('./public/index.html'));
    response.end();
  } else if (path === '/bb.js') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
    response.write(fs.readFileSync('./public/bb.js'));
    response.end();
  } else if (path === '/friends.js') {
    /* 当前的请求以http:probe.com:9999开头的 */
    if (request.headers['referer'].indexOf('http://probe.com:9999') === 0) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
      /* 定义一个字符串 */
      const string = `window['{{xxx}}']({{data}})`;
      /* 获取数据 */
      const data = fs.readFileSync('./public/friends.json').toString();
      /* 将字符串的内容替换为数据 最后将写的内容返回出去 */
      const string2 = string
        .replace('{{data}}', data)
        .replace('{{xxx}}', query.callback);
      response.write(string2);
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else if (path === '/friends.json') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    /* 指定对应的URL可以跨域 */
    response.setHeader('Access-Control-Allow-Origin', 'http://probe.com:9999');
    response.write(fs.readFileSync('./public/friends.json'));
    response.end();
  } else {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write('您输入的地址无对应的内容,请输入正确的路径地址');
    response.end();
  }
});

server.listen(port, () => {
  console.log(`监听${port}成功!`);
});
