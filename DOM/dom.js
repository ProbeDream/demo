window.dom = {
  create(string) {
    /* 
        创建一个模板标签作为容器
        1. 模板标签的内容为 去除空格的传入的内容
        2. 之后返回容器本身内容的第一个子元素
    */
    const container = document.createElement('template');
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node1, node2) {
    /* 
      insertBefore(newNode,referenceNode)
      node2表示要插入的节点
      node1.nextSibling表示当前节点的弟弟
      插入在这个前面才算是真真意义的往后面插入一个节点 
    */
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    /* 
        node插入到parent之前
    */
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    /* 
        拿到对应的父节点之后然后再删除传入的节点
    */
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const arr = [];
    //x为传入节点的第一个儿子
    let x = node.firstChild;
    while (x) {
      /*
      x还存在的时候 删除第一个儿子
      1. node节点儿子数量-1 
      2. 并且返回第一个儿子本身被存入arr
      3. x拿到之后的儿子
      */
      arr.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return arr;
  },
  attr(node, name, value) {
    if (arguments.length === 3) {
      /* 当参数列表长度为3的时候 给传入的node设置参数 */
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      trimStr = string.trim();
      'innerText' in node
        ? (node.innerText = trimStr)
        : (node.textContent = trimStr);
    } else if (arguments.length === 1) {
      return 'innerText' in node ? node.innerText : node.textContent;
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    /* 
        传入为三个参数,那么就是针对对应的属性给定值
    */
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      /* 
        传入为两个参数的时候 获取指定属性的值
        1. 判断name是否为字符串还是对象
            - 字符串的话则返回属性值
            - instanceof检测 对象遍历然后设置属性值
      */
      if (typeof name === 'string') {
        return node[name];
      } else if (name instanceof Object) {
        const object = name;
        for (const key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      /* 检测对应的节点累列表中是否存在className */
      return node.classList.contains(className);
    },
    on(node, eventName, fn) {
      node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
      node.removeEventListener(eventName, fn);
    },
    find(selector, scope) {
      /* scope表示文档对象DOM */
      return (scope || document).querySelector(selector);
    },
    parent(node) {
      return node.parentNode;
    },
    children(node) {
      return node.children;
    },
    siblings(node) {
      /* 拿到当前节点父节点的儿子们并且过滤掉不是node */
      return Array.from(node.parentNode.children).filter((n) => n !== node);
    },
    next(node) {
      let x = node.nextSibling;
      /* 
        如果说下一个元素存在并且为文本节点的话
        继续往下面拿
      */
      while (x && x.nodeType === Node.TEXT_NODE) {
        x = x.nextSibling;
      }
      return x;
    },
    previous(node) {
      let x = node.previousSibling;
      while (x && x.nodeType === Node.TEXT_NODE) {
        x = x.previousSibling;
      }
      return x;
    },
    each(nodeList, fn) {
      for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i]);
      }
    },
    index(node) {
      /* 找到在当前父类中的位置:
        1. 先通过children方法传入自己的父亲拿到自己的所有兄弟节点
        2. 在所有的兄弟节点里面去比对
        3. 如果一旦发现对应的坐标i对应了传入的node立即停止循环返回坐标变量i  
      */
      const list = dom.children(node.parentNode);
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i] === node) {
          break;
        }
      }
      return i;
    },
  },
};
