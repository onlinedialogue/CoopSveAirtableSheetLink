const getClientRecord = require('./getClientRecord');
const writeToClient = require('./firstKPI/writeToClient');
const writeToClient2 = require('./secondKPI/writeToClient2');

const { asyncForEach } = require('../../services/tools');

const clients = require('./clients');

const link = (e) => {
  return new Promise(async (resolve) => {
    console.log(e.name);

    if (e.secondTab) {
      console.log('Table 2: Getting records...');
      const toUpdate2 = await getClientRecord(e.baseID, e.tab, 'Sheets query KPI 2');
      if (toUpdate2.length) {
        await writeToClient2(toUpdate2, e.baseID, e.tab, 'Airtable!C21:H37');
      } else {
        console.log('Up to date');
      }
    }

    console.log('Table 1: Getting records');
    const toUpdate = await getClientRecord(e.baseID, e.tab, 'Sheets query KPI 1');

    if (toUpdate.length) {
      await writeToClient(toUpdate, e.baseID, e.tab, 'Airtable!C2:H41');
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
        console.log('Sheets-Airtable: Done!');
        resolve();
      }
    });
  });
}

module.exports = go;