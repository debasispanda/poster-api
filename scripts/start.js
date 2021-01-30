const createApp = require('../src/app');
const initDB = require('./init_db');
const retryConnection = require('./retry-connection');

(async () => {
  try {
    await retryConnection();
    await initDB();
    await createApp();
  } catch (error) {
    console.log(error);
  }
})();
