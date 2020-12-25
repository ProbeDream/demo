let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.arg[2];
if (!port) {
  console.log(`请您指定对应的端口哪怕是 node-dev server.js 8080 也可以的`);
  process.exit(1);
}
const server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWidthQuery = request.url;
  let queryString = '';
  if (pathWidthQuery.indexOf('?') >= 0) {
      /* 查询字符串为 ?开始的地方开始截取pathWithQuery */
    queryString = pathWidthQuery.substring(pathWidthQuery.indexOf('?'));
  }
});

server.listen(port, () => {
  console.log(`监听${port}成功,请打开http://localhost:${port}`);
});
