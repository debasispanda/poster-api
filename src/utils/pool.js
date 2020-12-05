const { Pool } = require("pg");

module.exports = (database = process.env.PGDATABASE) => {
  return new Pool({
    database,
  });
};
