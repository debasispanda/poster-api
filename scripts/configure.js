const { DB } = require('../src/db');
const create_tables = require('./create_tables');
require('dotenv/config');

(async () => {
  try {
    await DB.create();
    await create_tables();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
