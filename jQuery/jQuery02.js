//TODO

/* 
    声明一个全局的函数jQuery:
    1. 传入的参数为选择器或者数组模板
    2. 返回一个API对象,其中内容包括:
        - 包括元素类数组
        - 老的API对象
    3. 涉及到一些链式操作频繁的API,需要返回包装/增强后的jQuery对象也就是
    function xxx(){
      return jQuery(CurrentContext);
    }
*/
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === 'string') {
    /* 
        如果第一位是以<开头表示传入的是一个标签
    */
    if (selectorOrArrayOrTemplate[0] === '<') {
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      /* 
            如果不是标签的话,反之就是一个选择器
        */
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    /* 直接将selectorOrArrayOrTemplate赋值给elements */
    elements = selectorOrArrayOrTemplate;
  }
  const createElement = (string) => {
    /* 
        创建一个template标签作为容器
        并且对应子元素是被删除空格的传入的参数
        并且返回容器内容的第一个子元素!
    */
    const container = document.createElement('template');
    container.innerHTML = string.trim();
    return container.content.firstChild;
  };
  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    /* 根据传入的索引值,返回api中类数组对应的元素 */
    return this.elements[index];
  },
  appendTo(node) {
    /* 
        如果说节点为Element的实例对象
        此时的jquery对象则遍历elements并且对每一个元素进行node.appendChild操作
    */
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
    } else if (node.jquery === true) {
      /* 
        如果node.jquery为true 则对每一个el进行 node.get(0).appendChild操作
    */
      this.each((el) => node.get(0).appendChild(el));
    }
  },
  append(children) {
    /* 
        传入的子节点的为Element的对象的话则直接添加到elements的第一个元素中
    */
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      /* 
        HTMLCollection:节点对象的结合,只能够包含元素节点element,不能够包含其他类型的节点
        HTMLCollection的实例对象没有对应的forEach方法,只能够通过for循环遍历
        1. 如果传入的children为HTMLCollection的实例对象的话,则需要通过for循环遍历添加到element[0]中
    */
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      /* 
        如果传入的children为jQuery对象的话,其中包含了elements和oldApi
        就通过each方法将element添加到当前jQuery对象的elements[0]中
      */
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  find(selector) {
    console.log(1);
    let arr = [];
    /* 
        1. 对当前的elements进行循环操作
        2. 对当前jQuery对象的elements中的每一个节点进行查询 传入参数为选择器
        3. 并且转换为数组对象
    */
    for (let i = 0; i < this.elements.length; i++) {
      console.log(3);
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      arr = arr.concat(this.elements2);
    }
    arr.oldApi = this;
    /* 返回一个jQuery的包装/增强对象 */
    return jQuery(arr);
  },
  each(fn) {
    /* 
        对elements中的每一个元素执行fn方法
    */
    for (let i = 0; i < this.elements.length; i++) {
      //fn(elements[i],i){todo}
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const arr = [];
    this.each((node) => {
      /* 
        如果说在arr中找不到node.parentNode的话,就将parentNode添加到数组中去
      */
      if (arr.indexOf(node.parentNode) === -1) {
        arr.push(node.parentNode);
      }
    });
    return jQuery(arr);
  },
  children() {
    const arr = [];
    this.each((node) => {
      /* 找不到node.parentNode的话就将节点的子节点添加进入 */
      if (arr.indexOf(node.parentNode) === -1) {
        arr.push(...node.children);
      }
    });
    return jQuery(arr);
  },
  print() {
    /* 
        定义的print打印方法其实也是打印API中的elements
    */
    console.log(this.elements);
  },
  addClass(className) {
    /* 
        let test = jQuery(".test");
        test.addClass("xxx")
        很有可能我们通过jquery拿到的是一个test类的伪数组
        如果添加类名的话,应该是对伪数组进行遍历添加操作!
    */
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this;
  },
  end() {
    return this.oldApi;
  },
};
