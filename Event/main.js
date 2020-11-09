const l1 = document.querySelector('level1');
const l2 = document.querySelector('level2');
const l3 = document.querySelector('level3');
const l4 = document.querySelector('level3');
const l5 = document.querySelector('level5');
const l6 = document.querySelector('level6');
const l7 = document.querySelector('level7');
let n = 1;
l1.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l2.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l3.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l4.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l5.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l6.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
l7.addEventListener('click', (e) => {
  const t = e.currentTarget;
  setTimeout(() => {
    t.classList.remove('x');
  }, n * 1000);
  n += 1;
});
