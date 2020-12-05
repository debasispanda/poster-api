const pool = require("../utils/pool")();
const TABLE_NAME = "session";

const create_table = () => {
  return pool
    .query(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE)`
    )
    .then(() =>
      pool.query(
        `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE`
      )
    )
    .then(() =>
      pool.query(
        `CREATE INDEX "IDX_session_expire" ON ${TABLE_NAME} ("expire")`
      )
    );
};

module.exports = { create_table };
