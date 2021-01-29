const bcrypt = require("bcrypt");
const pool = require("../utils/pool");
const TABLE_NAME = "users";

const create_table = () => {
  const table_query = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      roles TEXT [],
      created_at timestamp default current_timestamp
    );
  `;
  return pool.query(table_query);
};

const get_all = () => {
  const query = `SELECT * FROM ${TABLE_NAME}`;
  return pool.query(query).then((res) => res.rows);
};

const get_by_key_value = (field_name, field_value) => {
  const query = `SELECT * FROM ${TABLE_NAME} WHERE ${field_name} = $1`;
  return pool.query(query, [field_value]).then((res) => res.rows[0]);
};

const save = async (email, firstname, lastname, password, roles) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO ${TABLE_NAME} (email, firstname, lastname, password, roles)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  return pool
    .query(query, [email, firstname, lastname, hashPassword, roles])
    .then((res) => res.rows[0]);
};

const delete_one = (id) => {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id = ${id}`;
  return pool.query(query).then((res) => res.rows[0]);
};

const create_default = () => {
  return save("admin@poster.com", "Poster", "Admin", "Poster@123", ["Admin"]);
};

module.exports = {
  create_table,
  get_all,
  get_by_key_value,
  save,
  delete_one,
  create_default,
};
