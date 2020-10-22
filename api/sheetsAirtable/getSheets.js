require('dotenv').config();
const { JWT } = require('google-auth-library');

const getSheet = (sheetID, range) => {
  return new Promise(async (resolve) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}`; 

    const auth = new JWT(
      process.env.GOOGLE_EMAIL,
      null,
      process.env.GOOGLE_KEY.replace(/\\n/g, "\n"),
      ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets']
    );

    try {
      const resp = await auth.request({ url });
      const rows = resp.data.values;

      const values = {
        totaalA: rows[0],
        totaalB: rows[1],
        desktopA: rows[3],
        desktopB: rows[4],
        tabletA: rows[6],
        tabletB: rows[7],
        mobileA: rows[9],
        mobileB: rows[10],
        newA: rows[12],
        newB: rows[13],
        returnA: rows[15],
        returnB: rows[16],
        finished: false,
      };

      if (range === 'Data!J14:O35') {
        values.segmentA = rows[20] || ['', '', '', ''];
        values.segmentB = rows[21] || ['', '', '', ''];
      } else if (range === 'Airtable!C2:H41') {
        values.segmentA = rows[38] || ['', '', '', ''];
        values.segmentB = rows[39] || ['', '', '', ''];
        values.finished = true;
      }

      if (!values.totaalA.length) {
        values.err = true;
        values.message = 'No values found in the Airtable tab';
      }

      resolve(values);
    } catch (err) {
      let errMsg = {
        err: true,
        message: '',
      }

      switch (err.message) {
        case 'Requested entity was not found.':
          errMsg.message = 'GooglesheetID not found';
          break;
        case 'Cannot read property \'0\' of undefined':
          errMsg.message = 'No values found in Airtable tab';
          break;
        case 'The caller does not have permission':
          errMsg.message = 'The server doe not have promission to the google sheet';
          break;
        case `Unable to parse range: Airtable!${range}`:
          errMsg.message = 'Airtable tab not found in google sheet';
          break;
        default:
          errMsg.message = 'Googlesheets error';
          console.log('Googlesheets: ' + err.message);
      }

      resolve(errMsg);
    }
  });
}

module.exports = getSheet;