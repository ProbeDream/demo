import './x.styl';
import './y.styl';
import png from './assets/example01.png';

const app = document.getElementById('app');
app.innerHTML = `
<img src="${png}" >`;

const button = document.createElement('button');
button.innerText = `懒加载`;
button.onclick = () => {
  const promise = import('./lazy.js');
  promise.then(
    (module) => {
      const func = module.default;
      func();
    },
    () => {
      console.log(`lazy error!`);
    }
  );
};

app.appendChild(button);
