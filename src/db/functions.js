const pool = require("../utils/pool");

const update_timestamp = () => {
  const query = `
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
  return pool.query(query);
};

module.exports = { update_timestamp };
