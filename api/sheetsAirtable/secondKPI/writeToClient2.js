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
            "Totaal A - conversie 2": '',
            "Totaal A - user 2": '',
            "Totaal A - cr 2": '',
            "Totaal A - bayesian 2": '',
            "Totaal B - user 2": '',
            "Totaal B - conversie 2": '',
            "Totaal B - cr 2": '',
            "Totaal B - diff 2": '',
            "Totaal B - bayesian 2": '',

            "Desktop A - user 2": '',
            "Desktop A - conversie 2": '',
            "Desktop A - cr 2": '',
            "Desktop A - bayesian 2": '',
            "Desktop B - user 2": '',
            "Desktop B - conversie 2": '',
            "Desktop B - cr 2": '',
            "Desktop B - diff 2": '',
            "Desktop B - bayesian 2": '',

            "Tablet A - user 2": '',
            "Tablet A - conversie 2": '',
            "Tablet A - cr 2": '',
            "Tablet A - bayesian 2": '',
            "Tablet B - user 2": '',
            "Tablet B - conversie 2": '',
            "Tablet B - cr 2": '',
            "Tablet B - diff 2": '',
            "Tablet B - bayesian 2": '',

            "Mobile A - user 2": '',
            "Mobile A - conversie 2": '',
            "Mobile A - cr 2": '',
            "Mobile A - bayesian 2": '',
            "Mobile B - user 2": '',
            "Mobile B - conversie 2": '',
            "Mobile B - cr 2": '',
            "Mobile B - diff 2": '',
            "Mobile B - bayesian 2": '',

            "New A - user 2": '',
            "New A - conversie 2": '',
            "New A - cr 2": '',
            "New A - bayesian 2": '',
            "New B - user 2": '',
            "New B - conversie 2": '',
            "New B - cr 2": '',
            "New B - diff 2": '',
            "New B - bayesian 2": '',

            "Returning A - user 2": '',
            "Returning A - conversie 2": '',
            "Returning A - cr 2": '',
            "Returning A - bayesian 2": '',
            "Returning B - user 2": '',
            "Returning B - conversie 2": '',
            "Returning B - cr 2": '',
            "Returning B - diff 2": '',
            "Returning B - bayesian 2": '',
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
          "Totaal A - conversie 2": values.totaalA[1],
          "Totaal A - user 2": values.totaalA[0],
          "Totaal A - cr 2": values.totaalA[2],
          "Totaal A - bayesian 2": values.totaalA[5],
          "Totaal B - user 2": values.totaalB[0],
          "Totaal B - conversie 2": values.totaalB[1],
          "Totaal B - cr 2": values.totaalB[2],
          "Totaal B - diff 2": values.totaalB[3],
          "Totaal B - bayesian 2": values.totaalB[5],

          "Desktop A - user 2": values.desktopA[0],
          "Desktop A - conversie 2": values.desktopA[1],
          "Desktop A - cr 2": values.desktopA[2],
          "Desktop A - bayesian 2": values.desktopA[5],
          "Desktop B - user 2": values.desktopB[0],
          "Desktop B - conversie 2": values.desktopB[1],
          "Desktop B - cr 2": values.desktopB[2],
          "Desktop B - diff 2": values.desktopB[3],
          "Desktop B - bayesian 2": values.desktopB[5],

          "Tablet A - user 2": values.tabletA[0],
          "Tablet A - conversie 2": values.tabletA[1],
          "Tablet A - cr 2": values.tabletA[2],
          "Tablet A - bayesian 2": values.tabletA[5],
          "Tablet B - user 2": values.tabletB[0],
          "Tablet B - conversie 2": values.tabletB[1],
          "Tablet B - cr 2": values.tabletB[2],
          "Tablet B - diff 2": values.tabletB[3],
          "Tablet B - bayesian 2": values.tabletB[5],

          "Mobile A - user 2": values.mobileA[0],
          "Mobile A - conversie 2": values.mobileA[1],
          "Mobile A - cr 2": values.mobileA[2],
          "Mobile A - bayesian 2": values.mobileA[5],
          "Mobile B - user 2": values.mobileB[0],
          "Mobile B - conversie 2": values.mobileB[1],
          "Mobile B - cr 2": values.mobileB[2],
          "Mobile B - diff 2": values.mobileB[3],
          "Mobile B - bayesian 2": values.mobileB[5],

          "New A - user 2": values.newA[0],
          "New A - conversie 2": values.newA[1],
          "New A - cr 2": values.newA[2],
          "New A - bayesian 2": values.newA[5],
          "New B - user 2": values.newB[0],
          "New B - conversie 2": values.newB[1],
          "New B - cr 2": values.newB[2],
          "New B - diff 2": values.newB[3],
          "New B - bayesian 2": values.newB[5],

          "Returning A - user 2": values.returnA[0],
          "Returning A - conversie 2": values.returnA[1],
          "Returning A - cr 2": values.returnA[2],
          "Returning A - bayesian 2": values.returnA[5],
          "Returning B - user 2": values.returnB[0],
          "Returning B - conversie 2": values.returnB[1],
          "Returning B - cr 2": values.returnB[2],
          "Returning B - diff 2": values.returnB[3],
          "Returning B - bayesian 2": values.returnB[5],
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
};

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