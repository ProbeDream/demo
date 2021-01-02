let a = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4];
const unique = (arr) => {
  const hashMap = new Map();
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (hashMap.has(arr[i])) {
      hashMap.set(arr[i], true);
    } else {
      hashMap.set(arr[i], false);
      result.push(arr[i]);
    }
  }
  return result;
};
console.log(unique(a));
