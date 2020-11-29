const pool = require("../utils/pool");

const create_table = () => {
  console.log('Created Auth Table');
  return Promise.resolve(true);
}

module.exports = { create_table };