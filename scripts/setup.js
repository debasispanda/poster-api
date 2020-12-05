const { DB, Functions, User, Role } = require('../src/db');
const create_tables = require('./create_tables');
require('dotenv/config');

(async () => {
  try {
    await DB.create();
    await Functions.update_timestamp();
    await create_tables();
    await Role.create_default();
    await User.create_default();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
