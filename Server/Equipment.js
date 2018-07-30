var express = require('express');
var bodyParser = require('body-parser');
var squel = require("squel");
var app = express();
var moment = require('moment');
var DBUtils = require('./DBUtils');
var help = require('./HelpFunc');
var cors = require('cors');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var router= express.Router();

//get all the equipment in the room
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "tel",
//         "Inventor": 111,
//         "Status": "in use",
//         "Warranty": "2017-02-03T00:00:00.000Z"
//     },
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "tel",
//         "Inventor": 1234,
//         "Status": "in use",
//         "Warranty": "2019-02-03T00:00:00.000Z"
//     }

router.get('/floors/:floorId/rooms/:roomId/equipment', function (req, res) {
    var floorNum = req.param('floorId')
    var roomNum = req.param('roomId')
    if (!floorNum || !roomNum) {

        res.send({ status: "failed", response: "Invalid value" });
        res.end();
    }
    else {
        //check if table name RoomEquipment
        var query = squel.select().from("EquipmentInRoom")
            .where("RoomNum='" + roomNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "there are no equipment at the room." });
            }
            else {
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


//equipment in use  at the floor
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "tel",
//         "Inventor": 111,
//         "Status": "in use",
//         "Warranty": "2017-02-03T00:00:00.000Z"
//     },
router.get('/floors/:floorId/equipUse', function (req, res) {
    var floorNum = req.param('floorId');
    var status = "in use";
    if (!floorNum) {
        res.send({ status: "failed", response: "Invalid value." });
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
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment not in use at the floor
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "computer",
//         "Inventor": 2222,
//         "Status": "not in use",
//         "Warranty": "2017-02-05T00:00:00.000Z"
//     },
router.get('/floors/:floorId/equipNotUse', function (req, res) {
    var floorNum = req.param('floorId');
    var status = "not in use";
    if (!floorNum) {
        res.send({ status: "failed", response: "Invalid value." });
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
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment  in use at the room
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "tel",
//         "Inventor": 111,
//         "Status": "in use",
//         "Warranty": "2017-02-03T00:00:00.000Z"
//     },
router.get('/floors/:floorId/rooms/:roomId/equipUse', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var status = "in use";
    if (!floorNum || !roomNum) {
        res.send({ status: "failed", response: "Invalid value." });
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
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//equipment not in use at the room
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "computer",
//         "Inventor": 2222,
//         "Status": "not in use",
//         "Warranty": "2017-02-05T00:00:00.000Z"
//     }
router.get('/floors/:floorId/rooms/:roomId/equipNotUse', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var status = "not in use";
    if (!floorNum || !roomNum) {
        res.send({ status: "failed", response: "Invalid value." });
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
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//get all Equipment at the floor 
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "EquipName": "tel",
//         "Inventor": 111,
//         "Status": "in use",
//         "Warranty": "2017-02-03T00:00:00.000Z"- can be null
//     },
router.get('/floors/:floorId/equipment', function (req, res) {
    var floorNum = req.param('floorId')
    if (!floorNum) {
        res.send({ status: "failed", response: "Invalid value" });
        res.end();
    }
    else {
        var query = squel.select().from("EquipmentInRoom")
            .where("FloorNum='" + floorNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number doesn't exist." });
            }
            else {
                resParam= help.changeJSON(resParam);
                res.send({ status: "ok", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});



//add equipment to room
//In the post body:
// "EquipName":"Tel",
// "Inventor":"2222",
// "Status":"in use",
// "Warranty":""- can be null
router.post('/floors/:floorId/rooms/:roomId/addEquipment', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var equipmentName = req.body.EquipName;
    var inventor = req.body.Inventor;
    var warranty = req.body.Warranty;
    var status = req.body.Status;
    var description = req.body.Description;

    if (!floorNum || !roomNum || !inventor || !status || !equipmentName) {
        res.send({ status: "failed", response: "failed to add new equipment to the room." });
        res.end();
    }
    //need to check type of for the db???
    else {
        var query = squel.select().from("EquipmentInRoom")
            .where("EquipName='" + '$'+equipmentName + "'")
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
                    .set("EquipName",'$'+ equipmentName)
                    .set("Inventor", inventor)
                    .set("Warranty", warranty)
                    .set("Status", status)
                    .set("Description", description)
                    .toString());
                DBUtils.Insert(query1).then(function (resParam) {

                    console.log("The equipment at the room has been added succesfuly to the system.");
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('failed to add the equipment to the system.');
                    res.send({ status: "failed", response: resParam });

                });
            }
        }).catch(function (resParam) {
            console.log('failed to add the equipment to the system.');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//update equipment at room
//in the req body:
// {
// 	"EquipName":"Tel1",
// 	"Inventor":"22221",
// 	"Status":"not in use",
// 	"Warranty":"1.2.17"
// }
router.put('/floors/:floorId/rooms/:roomId/editEquiInRoom/:inventor', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var inventor = req.param('inventor');
    var equipNameNew = req.body.EquipName;
    var inventorNew = req.body.Inventor;
    var status = req.body.Status;
    var warranty = req.body.Warranty;

    if (!floorNum || !roomNum || !equipNameNew || !inventor  || !inventorNew || !status) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("EquipmentInRoom")
            .where("FloorNum='"+floorNum+"'")
            .where("RoomNum='"+roomNum+"'")
            .where("Inventor='" + inventor + "'")
            .toString();
            //check if the equipment exist in the room
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Equipment doesn't exist in the room." });
            }
            else {
                var query = (
                    squel.update()
                        .table("EquipmentInRoom").where("FloorNum='" + floorNum + "'")
                        .where("RoomNum='"+roomNum+"'")
                        .where("Inventor='"+inventor+"'")
                        .set("EquipName", '$'+equipNameNew)
                        .set("Inventor", inventorNew)
                        .set("Status", status)
                        .set("Warranty", warranty)
                        .toString()
                );
                console.log(query);
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("updated succesufuly.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('failed to update the equipment in the room.2');
                    res.send({ status: "failed", response: resParam });
                });

            }

        }).catch(function (resParam) {
            console.log('failed to update the equipment in the room3');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//delete equipment in room
router.delete('/floors/:floorId/rooms/:roomId/deleteEquiInRoom/:invent', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var inventor = req.param('invent');
    if (!floorNum || !roomNum || !inventor) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        //check if the equipment in room exist
        var query = squel.select()
            .from("EquipmentInRoom")
            .where("FloorNum='"+floorNum+"'")
            .where("RoomNum='"+roomNum+"'")
            .where("Inventor='" + inventor + "'")            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Equipment doesn't exist in the room." });
            }
            else {
                var query = squel.delete()
                    .from("EquipmentInRoom")
                    .where("FloorNum='"+floorNum+"'")
                    .where("RoomNum='"+roomNum+"'")
                    .where("Inventor='" + inventor + "'")                    .toString();
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("Equipment has been removed from the room.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log("Remove equipment failed.1")
                    res.send({ status: "failed", response: resParam });
                });
            }
        }).catch(function (resParam) {
            console.log("Remove equipment failed.2")
            res.send({ status: "failed", response: resParam });
        });
    }
});

module.exports = router;



// var port = 4000;
// app.listen(port, function () {
//     console.log('listening to port: ' + port);
// });