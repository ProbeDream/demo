/* 封装一个ajax */
const ajax = (method, url) => {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest();
    XHR.open(method, url);
    XHR.onreadystatechange = () => {
      if (XHR.readyState === XMLHttpRequest.DONE) {
        if (XHR.status === 200) {
          resolve(XHR.response);
        } else {
          reject(XHR);
        }
      }
    };
    XHR.send();
  });
};

/* 
  请求friends.json成功的时候执行resolve(XHR.response)
  将响应的内容打印出来
*/
ajax('get', 'http://bb.com:8888/friends.json').then((response) => {
  console.log(response);
});

/* 封装成为一个jsonp */
const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    /* 保证函数的唯一性 */
    const random = `probeJSONPCallbackName${Math.random()}`;
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${random}`;
    /* 为了防止每次都创建一个标签插入到网页中 执行完毕之后就删除对应的标签对象 */
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
};

/* 
  创建一个script并且指定对应的url
*/
jsonp('http://bb.com:8888/friends.js').then((data) => {
  console.log(data);
});
