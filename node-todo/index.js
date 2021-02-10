const { homedir } = require('os');
const fs = require('fs');
const path = require('path');
const homeDirectorys = homedir();
const home = process.env.HOME || homeDirectorys;
const dbPath = path.join(home, './todo');
module.exports.add = (title) => {
  fs.readFile(
    dbPath,
    {
      flag: 'a+',
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (exception) {
          list = [];
        }
        console.log(list, title);
        const task = {
          "title": title,
          done: false,
        };
        list.push(task);
        const string = JSON.stringify(list);
        fs.writeFile(dbPath, string, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  );
};
