const { homedir } = require('os');
const homeDirectorys = homedir();
const home = process.env.HOME || homeDirectorys;
module.exports.add = (title) => {
  console.log(home);
};
