import './app1.css';
import $ from 'jquery';

/* 
将当前的全局对象window作为事件总线 通过jQuery包装
*/
const eventBus = $(window);
/*  
数据相关都放入到model中 
    定义数据的本身的方法,和数据的增删改查的方法
    数据是从本地存储中取出来的
    其中还定义了更新数据的方法
    将传递进来的data数据 更新到m对象上
    并且事件总线触发 m:updated事件 通知到controller控制器模块
*/
const m = {
  data: {
    n: parseInt(localStorage.getItem('n')),
  },
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger('m:updated');
    localStorage.setItem('n', m.data.n);
  },
  get() {},
};

/* 
    视图相关的代码都放入到view中 
    定义对应的视图代码
    el表示元素节点
    初始化的方法表示 传入进来的容器作为元素节点

    如果说容器子元素长度不为0的时候 就删除容器中的子元素
    并且将n值替换掉html中的{{n}}并且添加到容器中去
*/

const v = {
  el: null,
  html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="multiply2">*2</button>
            <button id="divide2">/2</button>
        </div>
    </div>
    `,
  init(container) {
    v.el = $(container);
  },
  render(n) {
    if (v.el.children().length !== 0) {
      v.el.empty();
    }
    $(v.html.replace('{{n}}', n)).appendTo(v.el);
  },
};

/* 其他部分添加到controller 
   controller部分中 将对应的处理逻辑拼接在一起
   初始化函数中包含如下部分:
   1. 视图的初始化
   2. 视图的渲染
   3. 控制器的自动绑定事件
   4. 监听数据更新事件 m:updated 回调函数为视图的渲染函数:render(data); 

    通过哈希表帮我们简化重复的事件绑定问题
    我们本来需要这样处理事件
    const app1 = $("#app1");
    app1.on("click","#add1",add);
    通过哈希表简化了之间的关系:
    events:{
     "func node":callback
    }
    callback对应了对应的事件处理函数
    定义一个函数autoBindEvents自动绑定事件
    for(let key in events){}
    其中let func = c[c.events[key]]; 函数
    通过空格 划分处理函数和事件名字
    let eventname = key.slice(0,spaceIndex);从第0个索引开始到空格索引结束 拿到的字符串不包括spaceIndex位置上的值
    let node = key.slice(spaceIndex+1);空格之后到字符串结束
*/
const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n);
    c.autoBindEvents();
    eventBus.on('m:updated', () => {
      v.render(m.data.n);
    });
  },
  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #multiply2': 'multiply',
    'click #divide2': 'divide',
  },
  add() {
    m.update({ n: m.data.n + 1 });
  },
  minus() {
    m.update({ n: m.data.n - 1 });
  },
  multiply() {
    m.update({ n: m.data.n * 2 });
  },
  divide() {
    m.update({ n: m.data.n / 2 });
  },
  autoBindEvents() {
    for (const key in c.events) {
      const value = c[c.events[key]];
      const spaceIndex = key.indexOf(' ');
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      v.el.on(part1, part2, value);
    }
  },
};

export default c;
