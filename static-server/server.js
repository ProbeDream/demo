let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.argv[2];
if (!port) {
  console.log(`请您指定对应的端口哪怕是 node-dev server.js 8080 也可以的`);
  process.exit(1);
}
const server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    /* 查询字符串为 ?开始的地方开始截取pathWithQuery */
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  let { pathname, query } = parseURL;
  let { method } = request;
  console.log(`来请求了:${pathWithQuery}`);
  response.statusCode = 200;
  console.log(`你访问的pathname:${pathname}`);
  /* 文件路径根据路径名判断 如果说为/ 那么文件路径为"/index.html" 否则为路径名 */
  const filePath = pathname === '/' ? '/index.html' : pathname;
  console.log(`此时的filepath:${filePath}`);
  const index = filePath.lastIndexOf('.');
  const suffix = filePath.substring(index);
  /* 定义一个文件类型 */
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  };
  /* 
    内容类型 根据后缀名设置 如果没有后缀名那么默认的为 text/html解析网页的类型
  */
  response.setHeader(
    'Content-Type',
    `${fileTypes[suffix] || 'text/html'};charset=utf-8`
  );
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = '文件不存在';
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
});

server.listen(port, () => {
  console.log(`监听${port}成功,请打开http://localhost:${port}`);
});
