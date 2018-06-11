var express = require('express');
var bodyParser = require('body-parser');
var squel = require("squel");
var app = express();
var moment = require('moment');
var DBUtils = require('./DBUtils');
var cors = require('cors');
var path = require('path');
var CalendarGoogleAPI = require('./CalendarGoogleAPI');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var router = express.Router();

const fs = require('fs');



// router.get('/floors/:floorId/rooms/:roomId/Schedule/:day', function (req, res) {
//     var day = req.param('day');
//     var floorNum = req.param('floorId')
//     var roomNum = req.param('roomId')
//     if (!floorNum || !roomNum || !day) {
//         res.send({ status: "Failed", response: "Invalid value" });
//         res.end();
//     }
//     else {
        try {
            var day="2018-06-06"; 

            const content = fs.readFileSync('client_secret.json');
            CalendarGoogleAPI.authorize(JSON.parse(content), function (response) {
                CalendarGoogleAPI.listEvents(day, response, function (events) {
                    // console.log(events);
                    events.map((event, i) => {
                        const start = event.start.dateTime || event.start.date;
                        console.log(`${start} - ${event.summary}`);
                        console.log()
                        var bb=`${start} - ${event.summary}`;
                        console.log(bb)

                       // res.send({ status: "OK", response: resParam });

                    });
                });
            });
            // CalendarGoogleAPI.authorize(JSON.parse(content),CalendarGoogleAPI.creteEvents);
        } catch (err) {
            return console.log('Error loading client secret file:', err);
        }
    // }
//});
