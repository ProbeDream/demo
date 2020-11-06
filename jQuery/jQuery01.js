window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === '<') {
      /* 如果传入的参数为标签 */
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      /* 传入的不是标签的话 应该就是选择器 */
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  /* 
    createElement:创建元素
        1. 创建一个模板标签作为容器
        2. 去除空格的字符串作为标签的内容
        3. 最后返回容器第一个子元素
  */
  const createElement = (string) => {
    const container = document.createElement('template');
    container.innerHTML = string.trim();
    return container.content.firstChild;
  };

  /* 
     jquery:是否是jquery对象(jQuery构造出来的对象)
  */
  return {
    jquery: true,
    elements,
    get(index) {
      return elements[index];
    },
    appendTo(node) {
      if (node instanceof Element) {
        //fn(elements[i],i)
        this.each((el) => {
          node.appendChild(el);
        });
      } else if (node.query === true) {
        this.each((el) => {
          this.get(0).appendChild(el);
        });
      }
    },
    append(children) {
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
        children.each((node) => this.get(0).appendChild(node));
      }
    },
    find(selector) {
      let arr = [];
      for (let i = 0; i < elements.length; i++) {
        /* 
            查找的话是基于elements的每一项作为基准去查找
        */
        const elements2 = Array.from(elements[i].querySelectorAll(selector));
        /* 
            将找到的结果与定义的空数组连接到一起
        */
        arr = arr.concat(elements2);
      }
      arr.oldApi = this;
      /* 
        传入一个Array对象对应的elements为传入的数组并且返回包装好的jQuery对象
      */
      return jQuery(arr);
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }

      return this;
    },
    parent() {
      const arr = [];
      this.each((node) => {
        if (arr.indexOf(node.parenNode) === -1) {
          arr.push(node.parenNode);
        }
      });
      console.log(this);
      return jQuery(arr);
    },
    children() {
      const arr = [];
      this.each((node) => {
        arr.push(...node.children);
      });
      return jQuery(arr);
    },
    print() {
      console.log(elements);
    },
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    },
    oldApi: selectorOrArrayOrTemplate.oldApi,
    end() {
      return this.oldApi;
    },
  };
};
