let a = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4];

const unique = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
};
console.log(unique(a));
