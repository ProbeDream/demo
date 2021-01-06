import $ from 'jquery';

/* 
    借助jQuery提供的事件处理机制 包装成为一个类
    实例化之后的类对象有 on  trigger off三个来自jQuery的事件处理方法
*/
class EventBus {
  constructor() {
    this._eventBus = $(window);
  }
  on(eventName, fn) {
    return this._eventBus.on(eventName, fn);
  }
  trigger(eventName, fn) {
    return this._eventBus.trigger(eventName, fn);
  }
  off(eventName, fn) {
    return this._eventBus.off(eventName, fn);
  }
}

export default EventBus;
