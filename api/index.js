const router = require('express').Router();

const sheetsAirtableLink = require('./sheetsAirtable/index');

const apiRouter = () => {
  router.get('/sheetsAirtableLink', async (req, res) => {
    res.send('Airtable is updating'); 
    await sheetsAirtableLink();
  });

  return router
}

module.exports = apiRouter;