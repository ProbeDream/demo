
/* 当前显示 */
let divScreen = document.querySelector('#screen');
/* 取号 */
let btnCreateNumber = document.querySelector('#createNumber');
/* 叫号 */
let btnCallNumber = document.querySelector('#callNumber');
/* 最新号码 */
let spanNewNumber = document.querySelector('#newNumber');
/* 当前队列 */
let spanQueue = document.querySelector('#queue');
const queue = [];
let number = 0;

btnCreateNumber.onclick = () => {
  number += 1;
  queue.push.call(queue, number);
  spanNewNumber.innerText = number;
  spanQueue.innerText = JSON.stringify(queue);
};

btnCallNumber.onclick = () => {
  if(queue.length !== 0){
    const n = queue.shift.call(queue);
    divScreen.innerText = `请${n}号顾客用餐!`;
  }else{
    divScreen.innerText = "现在无人用餐,请叫号用餐!";  
  }
  spanQueue.innerText = JSON.stringify(queue);
};
