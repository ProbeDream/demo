/* 
[
  { "id": 1, "name": "Julia", "password": "****", "age": 18 },
  { "id": 2, "name": "probe", "password": "****", "age": 30 }
]

let content = fs.readFileSync('./user.json').toString();
let data = JSON.parse(content);
console.log(data);
*/
const fs = require('fs');
let arr = [
  { name: 'aaa', age: 18, id: 1 },
  { name: 'bbb', age: 22, id: 2 },
];

let store = JSON.stringify(arr);
fs.writeFileSync('./user.json', store);

console.log(JSON.parse(fs.readFileSync('./user.json').toString()));
