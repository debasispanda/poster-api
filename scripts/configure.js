const { Client } = require('pg');
require('dotenv/config');

const create_db = async () => {
  const client = new Client({
    database: 'postgres'
  });

  const DATABASE = process.env.PGDATABASE || 'poster_db';

  await client.connect();

  await client.query(`CREATE DATABASE ${DATABASE}`)
    .then(() => {
      console.log(`Databse ${DATABASE} created successfully!`);
      client.end()
    })
    .catch(error => {
      console.error(error); 
      process.exit(1)
    });
};

try {
  create_db();
} catch (error) {
  console.error(error);
  process.exit(1);
}
