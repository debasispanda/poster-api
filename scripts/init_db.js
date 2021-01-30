const { Functions, User, Role } = require('../src/db');
const create_tables = require('./create_tables');

const initDB = async () => {
  try {
    await Functions.update_timestamp();
    await create_tables();
    await Role.create_default();
    await User.create_default();
  } catch (error) {
    console.error(error);
  }
}

module.exports = initDB;
