# AirtableSheetLink

This NodeJS script imports data from google sheets and adds this data to airtable records on a schedule (every workday, 8AM).  
The script determines which airtable records to update thru the following airtable views:
* Track data daily
* Sheets query KPI 1
* Sheets query KPI 2

## Environment variables needed:  
AIRTABLE_KEY = "found thru the airtable api"  
GOOGLE_EMAIL = "Found in the google developers console after creating a service account"  
GOOGLE_KEY = "Found in the google developers console after creating a service account"  


## Dev usage
To start the server use:  
```bash
npm start
```

### How to edit
#### Schedule
The schedule can be edit in the server file, while using the cron format, <https://crontab.guru/> for more info.

#### Airtable
The airtable view names and the airtable field names that will contain the data are hardcoded.  
So if you want to change the name of the views or fields, then these names have to be updated in the script as well.  

You can change the view names in the following files:
* api/sheetsAirtable/tracker.js
* api/sheetsAirtable/index.js

You can change the field names in the following files:  
* api/sheetsAirtable/firstKPI/writeToClient.js
* api/sheetsAirtable/secondKPI/writeToClient2.js

#### Google sheet
The dimensions of the google sheets are hardcoded as well (Tracker: Data!J14:O35, KPI 1: Airtable!C2:H41, KPI 2: Airtable!C21:H37),  
if the provided sheet is used this will work as expected, but if you want to change these dimensions, you can do so in the following files:  
* api/sheetsAirtable/tracker.js
* api/sheetsAirtable/index.js
