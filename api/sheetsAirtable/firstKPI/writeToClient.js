const Airtable = require('airtable');
const getSheet = require('../getSheets');

const { asyncForEach } = require('../../../services/tools');

const writeToClient = (record, baseID, tab, range) => {
  const master = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(baseID);
  return new Promise(async (resolve) => {
    console.log(`Updating: ${record.get('ID')}`);
    const values = await getSheet(record.get('GooglesheetID'), range);

    if (!values.err) {
      master(tab).update([
        {
          "id": record.id,
          "fields": {
            "Totaal A - user": '',
            "Totaal A - conversie": '',
            "Totaal A - cr": '',
            "Totaal A - bayesian": '',
            "Totaal B - user": '',
            "Totaal B - conversie": '',
            "Totaal B - cr": '',
            "Totaal B - diff": '',
            "Totaal B - bayesian": '',

            "Desktop A - user": '',
            "Desktop A - conversie": '',
            "Desktop A - cr": '',
            "Desktop A - bayesian": '',
            "Desktop B - user": '',
            "Desktop B - conversie": '',
            "Desktop B - cr": '',
            "Desktop B - diff": '',
            "Desktop B - bayesian": '',

            "Tablet A - user": '',
            "Tablet A - conversie": '',
            "Tablet A - cr": '',
            "Tablet A - bayesian": '',
            "Tablet B - user": '',
            "Tablet B - conversie": '',
            "Tablet B - cr": '',
            "Tablet B - diff": '',
            "Tablet B - bayesian": '',

            "Mobile A - user": '',
            "Mobile A - conversie": '',
            "Mobile A - cr": '',
            "Mobile A - bayesian": '',
            "Mobile B - user": '',
            "Mobile B - conversie": '',
            "Mobile B - cr": '',
            "Mobile B - diff": '',
            "Mobile B - bayesian": '',

            "New A - user": '',
            "New A - conversie": '',
            "New A - cr": '',
            "New A - bayesian": '',
            "New B - user": '',
            "New B - conversie": '',
            "New B - cr": '',
            "New B - diff": '',
            "New B - bayesian": '',

            "Returning A - user": '',
            "Returning A - conversie": '',
            "Returning A - cr": '',
            "Returning A - bayesian": '',
            "Returning B - user": '',
            "Returning B - conversie": '',
            "Returning B - cr": '',
            "Returning B - diff": '',
            "Returning B - bayesian": '',

            "A - exit rate": '',
            "A - uplift": '',
            "A - time on page": '',
            "A - uplift 2": '',
            "B - exit rate": '',
            "B - uplift": '',
            "B - time on page": '',
            "B - uplift 2": '',
          }
        },
      ], function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
    setTimeout(() => {
      master(tab).update([
        {
          "id": record.id,
          "fields": {
            "Totaal A - user": values.totaalA[0],
            "Totaal A - conversie": values.totaalA[1],
            "Totaal A - cr": values.totaalA[2],
            "Totaal A - bayesian": values.totaalA[5],
            "Totaal B - user": values.totaalB[0],
            "Totaal B - conversie": values.totaalB[1],
            "Totaal B - cr": values.totaalB[2],
            "Totaal B - diff": values.totaalB[3],
            "Totaal B - bayesian": values.totaalB[5],

            "Desktop A - user": values.desktopA[0],
            "Desktop A - conversie": values.desktopA[1],
            "Desktop A - cr": values.desktopA[2],
            "Desktop A - bayesian": values.desktopA[5],
            "Desktop B - user": values.desktopB[0],
            "Desktop B - conversie": values.desktopB[1],
            "Desktop B - cr": values.desktopB[2],
            "Desktop B - diff": values.desktopB[3],
            "Desktop B - bayesian": values.desktopB[5],

            "Tablet A - user": values.tabletA[0],
            "Tablet A - conversie": values.tabletA[1],
            "Tablet A - cr": values.tabletA[2],
            "Tablet A - bayesian": values.tabletA[5],
            "Tablet B - user": values.tabletB[0],
            "Tablet B - conversie": values.tabletB[1],
            "Tablet B - cr": values.tabletB[2],
            "Tablet B - diff": values.tabletB[3],
            "Tablet B - bayesian": values.tabletB[5],

            "Mobile A - user": values.mobileA[0],
            "Mobile A - conversie": values.mobileA[1],
            "Mobile A - cr": values.mobileA[2],
            "Mobile A - bayesian": values.mobileA[5],
            "Mobile B - user": values.mobileB[0],
            "Mobile B - conversie": values.mobileB[1],
            "Mobile B - cr": values.mobileB[2],
            "Mobile B - diff": values.mobileB[3],
            "Mobile B - bayesian": values.mobileB[5],

            "New A - user": values.newA[0],
            "New A - conversie": values.newA[1],
            "New A - cr": values.newA[2],
            "New A - bayesian": values.newA[5],
            "New B - user": values.newB[0],
            "New B - conversie": values.newB[1],
            "New B - cr": values.newB[2],
            "New B - diff": values.newB[3],
            "New B - bayesian": values.newB[5],

            "Returning A - user": values.returnA[0],
            "Returning A - conversie": values.returnA[1],
            "Returning A - cr": values.returnA[2],
            "Returning A - bayesian": values.returnA[5],
            "Returning B - user": values.returnB[0],
            "Returning B - conversie": values.returnB[1],
            "Returning B - cr": values.returnB[2],
            "Returning B - diff": values.returnB[3],
            "Returning B - bayesian": values.returnB[5],

            "A - exit rate": values.segmentA[0],
            "A - uplift": values.segmentA[1],
            "A - time on page": values.segmentA[2],
            "A - uplift 2": values.segmentA[3],
            "B - exit rate": values.segmentB[0],
            "B - uplift": values.segmentB[1],
            "B - time on page": values.segmentB[2],
            "B - uplift 2": values.segmentB[3],

            "Sheet Finished": values.finished,
          }
        },
      ], function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
      });
    }, 500);

      resolve();
    } else {
      console.log(values.message);

      resolve();
    }
  });
}

const go = (clientRecordArray, baseID, tab, range) => {
  return new Promise((resolve) => {
    asyncForEach(clientRecordArray, async (e, i) => {
      await writeToClient(e, baseID, tab, range);
      
      if (i + 1 === clientRecordArray.length) {
        resolve();
      }
    });
  });
};

module.exports = go;