const http = require('http');
const url = require('url');
const fs = requre('fs');
let port = process.argv[2];

if (!port) {
  console.log(`请指定对应的端口好嘛 node-dev server.js 8888也可以的`);
  process.exit(1);
}

let server = http.createServer((request, response) => {
  let parseURL = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(0, pathWithQuery.indexOf('?'));
  }
  let { pathname, query } = parseURL;
  let { method } = request;

  const session = JSON.parse(fs.readFileSync('./session.json').toString());
  /* 如果请求的路由为 /sign_in 并且请求的方法为POST执行以下操作 */
  if (pathname === '/sign_in' && method === 'POST') {
    const userArray = JSON.parse(fs.readFileSync('./db/users.json'));
    const arr = [];
    /* 请求监听到了data事件  */
    request.on('data', (chunk) => {
      arr.push(chunk);
    });
    request.on('end', () => {
      const string = Buffer.concat(arr).toString();
      const obj = JSON.parse(string);
      const user = userArray.find(
        (user) => user.name === obj.name && user.password === obj.password
      );
      if (user === undefined) {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'application/json;charset=utf-8');
      } else {
        response.statusCode = 200;
        const random = Math.random();
        session[random] = { user_id: user.id };
        fs.writeFileSync('./session.json', JSON.stringify(session));
        response.setHeader('Set-Cookie', `session_id=${random};HttpOnly`);
      }
      response.end();
    });
  } else if (path === '/home.html') {
    const cookie = request.headers['cookie'];
    let sessionId;
    try {
      sessionId = cookie
        .split(';')
        .filter((s) => s.indexOf('session_id') >= 0)[0]
        .split('=')[1];
    } catch (error) {}
    if (sessionId && session[sessionId]) {
      const userId = session[sessionId].user_id;
      const userArray = JSON.parse(fs.readFileSync('./db/user.json'));
      const user = userArray.find((user) => user.id === userId);
      const homeHtml = fs.readFileSync('./public/home.html').toString();
      let string = '';
      if (user) {
        string = homeHtml
          .replace('{{loginStatus}}', '已登录')
          .replace('{{user.name}}', user.name);
        response.write(string);
      }
    } else {
      const homeHtml = fs.readFileSync('./public/home.html').toString();
      const string = homeHtml
        .replace('{{loginStatus}}', '未登录')
        .replace('{{user.name}}', '');
      response.write(string);
    }
    response.end();
  } else if (pathname === '/register' && method === 'POST') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const userArray = JSON.parse(fs.readFileSync('./db/user.json'));
    const array = [];
    request.on('data', (chunk) => {
      array.push(chunk);
    });
    request.on('end', () => {
      const string = Buffer.concat(array).toString();
      const obj = JSON.parse(string);
      const lastUser = userArray[userArray.length - 1];
      const newUser = {
        id: lastUser ? lastUser.id + 1 : 1,
        name: obj.name,
        password: obj.password,
      };
      userArray.push(newUser);
      fs.writeFileSync('./db/user.json', JSON.stringify(userArray));
      response.end();
    });
  } else {
    /* 设置兜底的静态服务器配置 */
    response.statusCode = 200;
    const filePath = pathname === '/' ? '/index.html' : pathname;
    const index = filePath.lastIndexOf('.');
    const suffix = filePath.substring(index);
    const fileTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
    };
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
  }
});

server.listen(port, () => {
  console.log(`监听端口${port}成功,请打开localhost://${port}`);
});
