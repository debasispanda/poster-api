const pool = require("../utils/pool")();
const TABLE_NAME = "roles";

const create_table = () => {
  const table_query = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      priviledges TEXT [],
      description VARCHAR(255),
      created_by VARCHAR(255) NOT NULL,
      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp
    );
  `;

  const timestamp = `
    CREATE TRIGGER ${TABLE_NAME}_updated_at_auto
    BEFORE UPDATE ON ${TABLE_NAME}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp (updated_at);  
  `;
  return pool.query(table_query).then(() => pool.query(timestamp));
};

const get_all = () => {
  const query = `SELECT * FROM ${TABLE_NAME}`;
  return pool.query(query).then((res) => res.rows);
};

const get_by_key_value = (field_name, field_value) => {
  const query = `SELECT * FROM ${TABLE_NAME} WHERE ${field_name} = $1`;
  return pool.query(query, [field_value]).then((res) => res.rows[0]);
};

const save = (name, priviledges, description, created_by) => {
  const query = `INSERT INTO ${TABLE_NAME} (name, priviledges, description, created_by)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  return pool
    .query(query, [name, priviledges, description, created_by])
    .then((res) => res.rows[0]);
};

const delete_one = (id) => {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id = ${id}`;
  return pool.query(query);
};

const create_default = () => {
  return save("Admin", ["All"], "Admin Role", "System");
};

module.exports = {
  create_table,
  get_all,
  get_by_key_value,
  save,
  delete_one,
  create_default,
};
