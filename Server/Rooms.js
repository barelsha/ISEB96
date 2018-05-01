var express = require('express');
var bodyParser = require('body-parser');
var squel = require("squel");
var app = express();
var moment = require('moment');
var DBUtils = require('./DBUtils');
var cors = require('cors');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


//get the room detalis according to the floor and room
app.get('/floors/:floorId/rooms/:roomId', function (req, res) {
    var floorNum = req.param('floorId')
    var roomNum = req.param('roomId')
    if (!floorNum || !roomNum) {

        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        var query = squel.select().from("PeopleInRoom")
            .where("FloorNum='" + floorNum + "'")
            .where("RoomNum='" + roomNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "No floor number or room number" });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});

//add people to room
app.post('/floors/:floorId/rooms/:roomId/addPerson', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var supervisor = req.body.Supervisor;
    var email = req.body.Email;


    if (!floorNum || !roomNum || !firstName || !lastName || !supervisor) {
        res.send({ status: "failed", response: "failed to add new equipment to the room." });
        res.end();
    }
    else {
        var query = squel.select().from("PeopleInRoom")
            .where("RoomNum='" + roomNum + "'")
            .where("FirstName='" + firstName + "'")
            .where("LastName='" + lastName + "'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "The person already exist at the current room." });
            }
            else {
                var query1 = (squel.insert().into("PeopleInRoom")
                    .set("RoomNum", roomNum)
                    .set("FloorNum", floorNum)
                    .set("FirstName", firstName)
                    .set("LastName", lastName)
                    .set("Supervisor", supervisor)
                    .set("Email", email)
                    .toString());
                DBUtils.Insert(query1).then(function (resParam) {

                    console.log("The person have been added to the room.");
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to add the person to the room.');
                    res.send({ status: "failed", response: resParam });

                });
            }
        }).catch(function (resParam) {
            console.log('Failed to add the person to the room.');
            res.send({ status: "failed", response: resParam });
        });
    }
});

var port = 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});


