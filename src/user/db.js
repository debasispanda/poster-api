const pool = require("../utils/pool");
const TABLE_NAME = 'users';

const create_table = () => {
  const auth_table = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  return pool.query(auth_table);
};

const get_users = (id) => {
  let select_users = `SELECT * FROM ${TABLE_NAME}`;
  if (id) {
    select_users = `${select_users} WHERE id = ${id}`
  }
  return pool.query(select_users);
};

const save_user = (email, firstname, lastname, password) => {
  const insert_user = `INSERT INTO ${TABLE_NAME} (email, firstname, lastname, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  return pool.query(insert_user, [email, firstname, lastname, password]);
};

const delete_user = (id) => {
  const delete_user = `DELETE FROM ${TABLE_NAME} WHERE id = ${id}`;
  return pool.query(delete_user);
};

module.exports = { create_table, get_users, save_user, delete_user };
