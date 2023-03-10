const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const setInitialData = require('./src/utils/initial-data');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  setInitialData();
  server.listen(3001, () => {
    console.log('Server listening at 3001'); // eslint-disable-line no-console
  });
});
