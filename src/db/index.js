const pool = require("../utils/pool")('postgres');

const create = () => {
  const DATABASE = process.env.PGDATABASE || 'poster_db';
  return pool.query(`CREATE DATABASE ${DATABASE}`);
};

module.exports = { 
  DB: { create },
  Auth: require('./auth'),
  User: require('./user'),
  Session: require('./session')
};
