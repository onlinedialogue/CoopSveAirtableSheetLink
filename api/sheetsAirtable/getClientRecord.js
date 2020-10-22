const Airtable = require('airtable');

const clientObj = (baseID, tabName, query) => {
  return new Promise((resolve) => {
    const clientAirtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(baseID);
    const clientRecordArray = [];

    clientAirtable(tabName).select({
      view: query,
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        clientRecordArray.push(record);
      });
      fetchNextPage();
    }, function done(err) {
      if (err) {
        console.error(err);
        resolve();
      }
      resolve(clientRecordArray);
    });
  });
};

module.exports = clientObj;