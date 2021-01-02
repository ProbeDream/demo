let a = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4];

const unique = (arr) => {
  let hashTable = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i] in hashTable) {
    } else {
      hashTable[a[i]] = true;
    }
  }
  return Object.keys(hashTable);
};

/*
打印出hashTable所有的键 对象的键是不能重复的 [ '2', '3', '4', '5' ]
*/
console.log(unique(a));
