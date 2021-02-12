const fs = require('fs');
const homeDirectory = require('os').homedir();
const p = require('path');
const home = process.env.HOME || homeDirectory;
const dbPath = p.join(home, '.todo');
let list;
module.exports.read = (path = dbPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'a+' }, (error, data) => {
      if (error) {
        return reject(error);
      }
      try {
        list = JSON.parse(data.toString());
      } catch (exception) {
        list = [];
      }
      resolve(list);
    });
  });
};
module.exports.write = (list, path = dbPath) => {
  return new Promise((resolve, reject) => {
    const string = JSON.stringify(list);
    fs.writeFile(path, string + '\n', (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};
