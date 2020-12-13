/* 需要渲染的数据 */
const total = 100000;
/* 每次渲染的数据条数 */
const once = 20;
/* 需要执行的次数 */
const loopCount = Math.ceil(total / once);
/* 渲染次数统计 */
let countRender = 0;
/* 用来存放fragment的列表 */
const ul = document.querySelector('ul');

const add = () => {
  /* 
   createDocumentFragment是DOM节点,不是主DOM树的一部分, 
   通常是创建文档片段,将元素添加到文档片段中,最后将文档片段加入到DOM树,
   对应的DOM树中,文档片段被其所有的子元素所代替

   文档片段存在于内存中,并不在DOM树中,因此元素的插入并不会引起页面回流
   */
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < once; i++) {
    const li = document.createElement('li');
    li.innerHTML = i;
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  countRender++;
  loop();
};
const loop = () => {
  if (countRender < loopCount) {
    /* 
      该API是由浏览器提供的API:
      告诉浏览器你希望执行的一段动画 
      并且在下次重回之前调用对应的回调函数更新动画
      回调函数执行次数通常是每秒60次
    */
    window.requestAnimationFrame(add);
  }
};
loop();
