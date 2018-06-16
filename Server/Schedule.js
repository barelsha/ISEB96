const express = require('express');
const bodyParser = require('body-parser');
const squel = require("squel");
const app = express();
const moment = require('moment');
const DBUtils = require('./DBUtils');
const cors = require('cors');
const path = require('path');
const CalendarGoogleAPI = require('./CalendarGoogleAPI');
const helpFunc = require('./HelpFunc');
const router = express.Router();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//router.get('/floors/:floorId/rooms/:roomId/Schedule/:day', function (req, res) {
router.get('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
   // var day = req.param('day');
    let floorNum = req.param('floorId')
    let roomNum = req.param('roomId')
    if (!floorNum || !roomNum /*|| !day*/) {
        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        let query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'").where("FloorNumber='" + floorNum + "'")
            .toString();
        console.log(query);
        DBUtils.Select(query).then(function (resParam) {
            console.log("1");
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                console.log("2");
                //get the calendar Id 
                let calId = resParam[0]["CalId"];
                //var calId = helpFunc.getRoomCalId(floorNum, roomNum);
                console.log(calId);
                //there is no calendar for the room
                if (calId == null) {
                    res.send({ status: "failed", response: "The room number doesn't have calendar." });
                }
                else {
                    try {
                        //var day="2018-06-06"; 
                        const content = fs.readFileSync(path.join(__dirname, 'client_secret.json'));
                        console.log("3");
                        CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                            console.log("4");
                            CalendarGoogleAPI.listEvents(/*day,*/ calId, response, function (events) {
                                // console.log(events);
                                // events.map((event, i) => {
                                //     const start = event.start.dateTime || event.start.date;
                                //     //console.log(`${start} - ${event.summary}`);
                                //     //console.log(`${event.end.dateTime}`)
                                // });
                                console.log(events)
                                if (events.length == 0) {
                                    res.send({ status: "OK", response: "No upcoming events found" });
                                }
                                res.send({ status: "OK", response: events });
                            });
                        });
                    } catch (err) {
                        res.send({ status: "Failed", response: "Can't return events" });
                        return console.log('Error loading client secret file:', err);
                    }
                }
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});

//add event to the calendar
// "Summary":"אירוע חדש",
// "Location":"חדר 5",
// "Start":"2018-06-09T06:00:00+03:00",
// "End":"2018-06-09T07:00:00+03:00", 
// "Description":"משהו משהו"
router.post('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    let summary = req.body.summary;
    //let location = req.body.Location;
    //let description = req.body.Description;
    let start = req.body.start;
    let end = req.body.end;
    let floorNum = req.param('floorId')
    let roomNum = req.param('roomId')
    if (!floorNum || !roomNum || !summary || /*!location ||*/ !start || !end) {
        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        let query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'").where("FloorNumber='" + floorNum + "'")
            .toString();
        console.log(query);

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                //get the calendar Id 
                let calId = resParam[0]["CalId"];
                //var calId = helpFunc.getRoomCalId(floorNum, roomNum);
                console.log(calId);

                //there is no calendar for the room
                if (calId == null) {
                    res.send({ status: "failed", response: "The room number doesn't have calendar." });
                }
                else {
                    let event = {
                        "summary": summary,
                        // "location": location,
                        "start": start,
                        //  {
                        //     'dateTime': start,
                        //     'timeZone': 'Asia/Jerusalem'
                        // },
                        "end": end,
                        // {
                        //     'dateTime': end,
                        //     'timeZone': 'Asia/Jerusalem'
                        // },
                        "description": "description"
                    }
                    const content = fs.readFileSync(path.join(__dirname, 'client_secret.json'));
                    CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                        CalendarGoogleAPI.creteEvents(event, calId, response, function (ans) {
                            console.log(ans);
                            if (ans == 1) {
                                res.send({ status: "OK", response: JSON.stringify(event)});
                            }
                            if (ans == 0) {
                                res.send({ status: "Failed", response: "Can't insert event to calendar" });
                            }
                        });
                    });
                }
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }

});


//Delete event. Request with the event id (id)
//"EventID":"127semvqr381qq3h9rjfsgs8v4"
router.delete('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    var eventId = req.body.EventID;
    var floorNum = req.param('floorId')
    var roomNum = req.param('roomId')
    //var calID="aXNlOTZidWlsZGluZ0BnbWFpbC5jb20";
    if (!floorNum || !roomNum || !eventId) {
        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        var query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'").where("FloorNumber='" + floorNum + "'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                //get the calendar Id 
                var calId = resParam[0]["CalId"];
                //var calId = helpFunc.getRoomCalId(floorNum, roomNum);
                console.log(calId);

                //there is no calendar for the room
                if (calId == null) {
                    res.send({ status: "failed", response: "The room number doesn't have calendar." });
                }
                else {
                    const content = fs.readFileSync('client_secret.json');
                    CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                        CalendarGoogleAPI.deleteEvent(eventId, calId, response, function (ans) {
                            console.log(ans);
                            if (ans == 1) {
                                res.send({ status: "OK", response: "Event deleted." });
                            }
                            if (ans == 0) {
                                res.send({ status: "Failed", response: "Can't delete event from the calendar." });
                            }
                        });
                    });
                }
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});

module.exports = router;

