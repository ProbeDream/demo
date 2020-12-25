/* 封装了一个普通的ajax请求 请求/friends.json路由 */
const XHR = new XMLHttpRequest();
XHR.open('GET', '/friends.json');
XHR.onreadystatechange = () => {
  if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
    console.log(XHR.response);
  }
};
XHR.send();
