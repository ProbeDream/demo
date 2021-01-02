let a = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4];

const unique = (arr) => {
  return [...new Set(arr)];
};

console.log(unique(a));
