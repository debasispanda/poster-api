const { create_table: create_auth_table  } = require('../auth').db;
const { create_table: create_user_table  } = require('../user').db;

const create_tables = () => {
  return Promise.all([
    create_auth_table(),
    create_user_table()
  ]);
};

module.exports = { create_tables };
