const { User, Session, Role } = require("../src/db");

const create_tables = () => {
  return Promise.all([
    Session.create_table(),
    User.create_table(),
    Role.create_table()
  ]);
};

module.exports = create_tables;
