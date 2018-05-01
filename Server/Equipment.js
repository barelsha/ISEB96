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

//get all the equipment in the room
app.get('/floors/:floorId/rooms/:roomId/equipment', function (req, res) {
    var floorNum = req.param('floorId')
    var roomNum = req.param('roomId')
    if (!floorNum || !roomNum) {

        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        //check if table name RoomEquipment
        var query = squel.select().from("EquipmentInRoom")
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


//equipment in use  at the floor, check url
app.get('/floors/:floorId/equipUse', function (req, res) {
    var floorNum = req.param('floorId');
    var status = "in use";
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        //check if table name Equipment (add table)
        var query = squel.select().from("EquipmentInRoom")
            .where("FloorNum='" + floorNum + "'").where("Status='" + status + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number doesn't exist." });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment not in use at the floor, check url
app.get('/floors/:floorId/equipNotUse', function (req, res) {
    var floorNum = req.param('floorId');
    var status = "not in use";
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("EquipmentInRoom")
            .where("FloorNum='" + floorNum + "'").where("Status='" + status + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number doesn't exist." });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment  in use at the room, check url
app.get('/floors/:floorId/rooms/:roomId/equipUse', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var status = "in use";
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        //check if table name Equipment (add table)
        var query = squel.select().from("EquipmentInRoom")
            .where("FloorNum='" + floorNum + "'").where("RoomNum='" + roomNum + "'").where("Status='" + status + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number or room number doesn't exist." });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment not in use at the room, check url
app.get('/floors/:floorId/rooms/:roomId/equipNotUse', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var status = "not in use";
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("EquipmentInRoom")
            .where("FloorNum='" + floorNum + "'").where("RoomNum='" + roomNum + "'").where("Status='" + status + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number or room number doesn't exist." });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//add equipment to room
app.post('/floors/:floorId/rooms/:roomId/addEquipment', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var equipmentName = req.body.EquipName;
    var inventor = req.body.Inventor;
    var warranty = req.body.Warranty;
    var status = req.body.Status;

    if (!floorNum || !roomNum || !inventor || !status || !equipmentName) {
        res.send({ status: "failed", response: "failed to add new equipment to the room." });
        res.end();
    }
    //need to check type of for the db???
    else {
        var query = squel.select().from("EquipmentInRoom")
            .where("EquipName='" + equipmentName + "'")
            .where("Inventor='" + inventor + "'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "The current equipment already exist at the system." });
            }
            else {
                var query1 = (squel.insert().into("EquipmentInRoom")
                    .set("RoomNum", roomNum)
                    .set("FloorNum", floorNum)
                    .set("EquipName", equipmentName)
                    .set("Inventor", inventor)
                    .set("Warranty", warranty)
                    .set("Status", status)
                    .toString());
                DBUtils.Insert(query1).then(function (resParam) {

                    console.log("The equipment at the room has been added succesfuly to the system.");
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to add the equipment to the system.');
                    res.send({ status: "failed", response: resParam });

                });
            }
        }).catch(function (resParam) {
            console.log('Failed to add the equipment to the system.');
            res.send({ status: "failed", response: resParam });
        });
    }
});




var port = 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});