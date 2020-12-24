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

ajax('get', 'http://bb.com:8888/friends.json').then((response) => {
  console.log(response);
});

const jsonp = (url) => {
  return new Promise((resolve, reject) => {
    const random = `probeJSONPCallbackName ${Math.random()}`;
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
};

jsonp('http://bb.com:8888/friends.js').then((data) => {
  console.log(data);
});
