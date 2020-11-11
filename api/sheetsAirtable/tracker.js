const getClientRecord = require('./getClientRecord');
const writeToClient = require('./firstKPI/writeToClient');

const { asyncForEach } = require('../../services/tools');

const clients = require('./clients');

const link = (e) => {
  return new Promise(async (resolve) => {
    console.log(e.name);
    console.log('Tracker: Getting records...');
    const toUpdate = await getClientRecord(e.baseID, e.tab, 'Track data daily');

    if (toUpdate.length) {
      await writeToClient(toUpdate, e.baseID, e.tab, 'Data!J14:O35');
    } else {
      console.log('Up to date');
    }

    resolve();
  });
}

const go = () => {
  return new Promise(async (resolve) => {
    asyncForEach(clients, async (e, i) => {
      await link(e);
      if (i+1 === clients.length) {
        console.log('Sheets-Airtable-Tracker: Done!');
        resolve();
      }
    });
  });
}

module.exports = go;