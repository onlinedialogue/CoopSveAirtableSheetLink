require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app)
const cron = require('node-cron');

const sheetsTracker = require('./api/sheetsAirtable/tracker');
const sheetsAirtableLink = require('./api/sheetsAirtable');

const api = require('./api')();
app.use('/api', api);

http.listen(process.env.PORT, () => {
  console.log('listening on port: ' + process.env.PORT);

  cron.schedule('00 8 * * 1-5', async () => {
    console.log('AIRTABLE-LINK');
    await sheetsAirtableLink();

    console.log('TRACKER');
    await sheetsTracker();
  });
});

sheetsAirtableLink();