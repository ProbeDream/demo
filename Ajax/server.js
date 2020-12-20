const http = require('http');
const url = require('url');
let port = process.argv[2];

if (!port) {
  console.log(`请你指定对应的端口:8080这样的也可以啊!`);
  process.exit(1);
}

let Server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWidthQuery = request.url;
  let queryString = '';
  if (pathWidthQuery.indexOf('?') >= 0) {
    queryString = pathWidthQuery.substring(0, pathWidthQuery.indexOf('?'));
  }
  let path = parseURL.pathname;
  let query = parseURL.query;
  let method = parseURL.method;
  console.log(
    `有一个用户发送对应的请求过来了路径和带查询的参数为:${pathWidthQuery}`
  );

  if (path === '/index.html') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    let string = fs.readFileSync('public/index.html').toString();
    let page1 = fs.readFileSync('db/page1.json').toString();
    const array = JSON.parse(page1);
    const result = array.map((item) => `<li>${item.id}</li>`).join('');
    string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`);
    response.write(string);
    response.end();
  } else if (path === '/main.js') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
    response.write(fs.readyFileSync('/public/main.js'));
    response.end();
  } else if (path === '/style.css' || path === '/2.css') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css;charset=utf-8');
    response.write(fs.readFileSync('public/style.css'));
    response.end();
  } else if (path === '/2.js') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
    response.write(fs.readFileSync('public/2.js'));
    response.end();
  } else if (path === '/3.html') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(fs.readFileSync('public/3.html'));
    response.end();
  } else if (path === '/4.html') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(fs.readFileSync('public/4.html'));
    response.end();
  } else if (path === '/5.json') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('public/5.json'));
    response.end();
  } else if (path === '/page2') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('public/page2.json'));
    response.end();
  } else if (path === '/page3') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('public/page3.json'));
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write('您输入的路径不存在对应的内容!');
    response.end();
  }
});

Server.listen(port, () => {
  console.log(`监听并且启动:https://localhost:${port}`);
});
