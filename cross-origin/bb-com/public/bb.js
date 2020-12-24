const XHR = new XMLHttpRequest();
XHR.open('GET', '/friends.json');
XHR.onreadystatechange = () => {
  if (XHR.readyState === XMLHttpRequest.D && XHR.status === 200) {
    console.log(XHR.response);
  }
};
XHR.send();
