import EventBus from './EventBus.js';

class Model extends EventBus {
  constructor(options) {
    super();
    const keys = ['data', 'update', 'create', 'delete', 'get'];
    keys.forEach((key) => {
      this[key] = options[key];
    });
  }

  create() {
    /* console?.error?. */
    console && console.error && console.error('你还没有实现create');
  }
  delete() {
    console && console.error && console.error('你还没有实现delete');
  }
  update() {
    console && console.error && console.error('你还没有实现update');
  }
  get() {
    console && console.error && console.error('你还没有实现get');
  }
}

export default Model;
