const pool = require('../src/utils/pool');
const retryConnection = async (retries = 5) => {
  while (retries) {
    try {
      const client = await pool.connect();
      if (client) {
        break;
      }
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

module.exports = retryConnection;
