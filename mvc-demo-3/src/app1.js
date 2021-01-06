import './app1.css';
import Vue from 'vue';

const init = (el) => {
  const m = {
    get() {
      return parseFloat(localStorage.getItem('n'));
    },
    set(n) {
      localStorage.setItem('n', n);
    },
  };

  new Vue({
    el: el,
    data: { n: m.get() },
    methods: {
      add() {
        this.n += 1;
      },
      minus() {
        this.n -= 1;
      },
      multiply() {
        this.n *= 2;
      },
      divide() {
        this.n /= 2;
      },
    },
    watch: {
      n() {
        m.set(this.n);
      },
    },
    template: `
        <section id="app1">
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div class="actions">
                <button @click="add">+1</button>
                <button @click="minus">-1</button>
                <button @click="multiply">*2</button>
                <button @click="divide">/2</button>
            </div>
        </section>
      `,
  });
};

export default init;
