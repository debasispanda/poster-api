const { Pool } = require("pg");

// All parameters are used from the environment variable
// Check your .env file for more details.
module.exports = new Pool({
  connectionString: process.env.DB_URL,
});
