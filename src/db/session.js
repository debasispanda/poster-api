const pool = require("../utils/pool")();

const create_table = () => {
  return pool
    .query(
      `CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE)`
    )
    .then(() =>
      pool.query(
        'ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE'
      )
    )
    .then(() =>
      pool.query('CREATE INDEX "IDX_session_expire" ON "session" ("expire")')
    );
};

module.exports = { create_table };
