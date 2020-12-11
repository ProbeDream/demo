let http = require('http');
let url = require('url');
let fs = require('fs');
const { log } = require('console');
let port = process.argv[2];

if (!port) {
  console.log('请您指定对应的端口比如说:8080这样的也行啊!');
  process.exit(1);
}

let Server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = '';
  /* 路径和查询字符串中 查找?符号的位置 如果说存在的话 */
  if (pathWithQuery.indexOf('?') >= 0) {
    /* 查找对应的查询字符串 从? 开始进行取值 */
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  let path = parseURL.pathname;
  let query = parseURL.query;
  let method = request.method;

  console.log(
    `有一个用户发送对应的请求过来了路径和待查询的参数为:${pathWithQuery}`
  );

  if (path === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(`
    <!DOCTYPE html>
    <head>
    <link rel="stylesheet" href="style.css">
    </head>
    <body>
    <h1>成功，标题变红！</h1>
    </body>
    `);
    response.end();
  } else if (path === '/style.css') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css;charset=utf-8');
    response.write(`body{color:red;}`);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write('您输入的路径不存在对应的内容');
    response.end();
  }
});

Server.listen(port, () => {
  console.log(`监听并且启动 http://localhost:${port}`);
});
