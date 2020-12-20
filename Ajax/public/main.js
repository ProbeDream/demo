let n = 1;
/* 请求CSS */
/* getCSS.onclick = () => {
  const XHR = new XMLHttpRequest();
  let method = 'GET';
  let url = 'style.css';
  XHR.open(method, url);
  XHR.onload = () => {
    let style = document.createElement('style');
    style.innerHTMl = XHR.response;
    document.head.appendChild(style);
    console.log('成功了');
  };
  XHR.onerror = () => {
    console.log('失败了');
  };
}; */

getCSS.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', '/style.css');
  XHR.onreadystatechange = () => {
    /* 
      确定响应状态为完成并且响应状态为大于等于200小鱼300的时候
      表示下载操作已完成:
      对应的状态码:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
      对应的表意为:成功响应和重定向
    */
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status >= 200 && XHR.status < 300) {
        const style = document.createElement('style');
        style.innerHTML = XHR.response;
        document.head.appendChild(style);
      }
    } else {
      console.log(`加载CSS失败`);
    }
  };
  XHR.send();
};

getJS.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', '/2.js');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status >= 200 && XHR.status < 300) {
        const script = document.createElement('script');
        script.innerHTML = XHR.response;
        document.body.appendChild(script);
      }
    } else {
      console.log(`javascrit文件加载失败`);
    }
  };
  XHR.send();
};

getHTML.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', '/3.html');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status === 200) {
        const div = document.createElement('div');
        div.innerHTML = XHR.response;
        document.body.appendChild(div);
      }
    } else {
      console.log(`加载html文件失败`);
    }
  };
  XHR.send();
};

getXML.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', '/4.xml');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status === 200) {
        const dom = XHR.responseXML;
        const text = dom.getelementsByTagName('warning')[0].textContent;
        console.log(text.trim());
      }
    }
  };
  XHR.send();
};

getJSON.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', '/5.json');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status === 200) {
        const boolean = JSON.parse(XHR.response);
        console.log(boolean);
      }
    } else {
      console.log('加载JSON文件失败');
    }
  };
  XHR.send();
};

getPage.onclick = () => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', `/page${n + 1}`);
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE) {
      if (XHR.status === 200) {
        const array = JSON.parse(XHR.response);
        array.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item.id;
          xxx.appendChild(li);
        });
      }
      n += 1;
    }
  };
  XHR.send();
};
