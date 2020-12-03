const { User, Session } = require("../src/db");

const create_tables = () => {
  return Promise.all([
    User.create_table(),
    Session.create_table()
  ]);
};

module.exports = create_tables;
