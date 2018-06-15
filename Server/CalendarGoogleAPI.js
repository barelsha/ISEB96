const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var moment = require('moment');


const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'credentials.json';

// // If modifying these scopes, delete credentials.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// const TOKEN_PATH = 'credentials.json';

// // Load client secrets from a local file.
// try {
//   const content = fs.readFileSync('client_secret.json');
//   authorize(JSON.parse(content), listEvents);
//   authorize(JSON.parse(content),creteEvents);
// } catch (err) {
//   return console.log('Error loading client secret file:', err);
// }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @return {function} if error in reading credentials.json asks for a new one.
 */
exports.authorize=function (credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  let token = {};
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  try {
    token = fs.readFileSync(TOKEN_PATH);
  } catch (err) {
    return getAccessToken(oAuth2Client, callback);
  }
  oAuth2Client.setCredentials(JSON.parse(token));
  return callback(oAuth2Client);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to', TOKEN_PATH);
      } catch (err) {
        console.error(err);
      }
      callback(oAuth2Client);
    });
  });
}

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
exports.listEvents= function(/*day,*/calId,auth, callback) {
  console.log('3');

  const calendar = google.calendar({version: 'v3', auth});
  // //events for 6.6
  // var day1="2018-06-06"; 
  //  var day2="2018-06-07";
  //var minDay=moment(day).format("YYYY-MM-DDTHH:mm:ssZ");
  //var maxDay =moment(day).add(1, 'days').format("YYYY-MM-DDTHH:mm:ssZ");
  calendar.events.list({
    calendarId: calId,
    // timeMin:minDay,
    // timeMax:maxDay, 
    maxResults:2500,
    singleEvents: true,
    orderBy: 'startTime',
    timeZone:'Asia/Jerusalem',

  }, (err, {data}) => {
    console.log('4');

    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        // console.log(`${start} - ${event.summary}`);
      });
      callback(events);
    } else {
      callback(events);
      console.log('No upcoming events found.');
    }
  });
}

exports.creteEvents=function (event, calId, auth){
    // var event = {
    //     'summary': 'Google I/O 2015',
    //     'location': '800 Howard St., San Francisco, CA 94103',
    //     'description': 'A chance to hear more about Google\'s developer products.',
    //     'start': {
    //       'dateTime': '2018-06-28T09:00:00-07:00',
    //       'timeZone': 'America/Los_Angeles',
    //     },
    //     'end': {
    //       'dateTime': '2018-06-28T17:00:00-08:00',
    //       'timeZone': 'America/Los_Angeles',
    //     },
    //     'recurrence': [
    //       'RRULE:FREQ=DAILY;COUNT=2'
    //     ],
    //     'attendees': [
    //       {'email': 'lpage@example.com'},
    //       {'email': 'sbrin@example.com'},
    //     ],
    //     'reminders': {
    //       'useDefault': false,
    //       'overrides': [
    //         {'method': 'email', 'minutes': 24 * 60},
    //         {'method': 'popup', 'minutes': 10},
    //       ],
    //     },
    //   };
      
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.insert({
        auth: auth,
        calendarId: calId,
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return '0';
        }
        console.log('Event created: %s', event.htmlLink);
        return '1';
      });
}

exports.deleteEvent=function (eventId,calId,auth){
  var params = {
    auth:auth,
    calendarId: calId,
    eventId: eventId,
  };
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.delete(params, function(err) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return '0';
    }
    console.log('Event deleted.');
    return '1';
  });
}