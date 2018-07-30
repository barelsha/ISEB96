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


// GET localhost:4000/floors/0/rooms/5/schedule
router.get('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    let floorNum = req.param('floorId')
    let roomNum = req.param('roomId')
    if (!floorNum || !roomNum) {
        res.send({ status: "failed", response: "Invalid value" });
        res.end();
    }
    else {
        let query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'").where("FloorNumber='" + floorNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                //get the calendar Id 
                let calId = resParam[0]["CalId"];
                //there is no calendar for the room
                if (calId == null) {
                    res.send({ status: "failed", response: "The room number doesn't have calendar." });
                }
                else {
                    try {
                        const content = fs.readFileSync(path.join(__dirname, 'client_secret.json'));
                        CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                            CalendarGoogleAPI.listEvents(/*day,*/ calId, response, function (events) {
                                res.send({ status: "ok", response: events });
                            });
                        });
                    } catch (err) {
                        res.send({ status: "failed", response: "Can't return events" });
                        return console.log('Error loading client secret file:', err);
                    }
                }
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});

//add event to the calendar
router.post('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    let summary = req.body.summary;
    let start = req.body.start;
    let end = req.body.end;
    let floorNum = req.param('floorId')
    let roomNum = req.param('roomId')
    if (!floorNum || !roomNum || !summary || /*!location ||*/ !start || !end) {
        res.send({ status: "failed", response: "Invalid value" });
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
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                            //console.log(ans.data);
                            // ans.then(x=> console.log(x));
                            res.send({ status: "ok", response: ans.data });
                        });
                    });
                }
            }
        },
        function (err){
            console.log(err);
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }

});


//Delete event. Request with the event id (id)
//"eventId":"127semvqr381qq3h9rjfsgs8v4"
router.delete('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    var eId = req.body.eventId;
    var floorNum = req.param('floorId')
    var roomNum = req.param('roomId')
    //var calID="aXNlOTZidWlsZGluZ0BnbWFpbC5jb20";
    if (!floorNum || !roomNum || !eId) {
        res.send({ status: "failed", response: "Invalid value" });
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
                    const content = fs.readFileSync(path.join(__dirname, 'client_secret.json'));
                    CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                        CalendarGoogleAPI.deleteEvent(eId, calId, response, function (ans) {
                            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                            //console.log(ans.data);
                            // ans.then(x=> console.log(x));
                            res.send({ status: "ok", response: ans.data });
                        });
                    });
                }
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


router.put('/floors/:floorId/rooms/:roomId/schedule', function (req, res) {
    let eId = req.body.eventId;
    let event = req.body.event;
    let floorNum = req.param('floorId');
    let roomNum = req.param('roomId');
    if (!floorNum || !roomNum ||!event || !eId) {
        res.send({ status: "failed", response: "Invalid value" });
        res.end();
    }
    else {
        let query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'").where("FloorNumber='" + floorNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                //get the calendar Id 
                let calId = resParam[0]["CalId"];
                //there is no calendar for the room
                if (calId == null) {
                    res.send({ status: "failed", response: "The room number doesn't have calendar." });
                }
                else {
                    const content = fs.readFileSync(path.join(__dirname, 'client_secret.json'));
                    CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                        CalendarGoogleAPI.updateEvent(eId, calId, response, function (ans) {
                            res.send({ status: "ok", response: ans.data });
                        });
                    });
                }
            }
        },
        function (err){
            console.log(err);
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }

});

module.exports = router;

