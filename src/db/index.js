const pool = require("../utils/pool")("postgres");

const create = () => {
  const DATABASE = process.env.PGDATABASE || "poster_db";
  return pool.query(`CREATE DATABASE ${DATABASE}`);
};

module.exports = {
  DB: { create },
  Functions: { ...require("./functions") },
  User: require("./user"),
  Session: require("./session"),
  Role: require("./role"),
};
