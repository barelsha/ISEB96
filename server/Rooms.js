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

var router= express.Router();


//get the room detalis according to the floor and room. From "PeopleInRoom" table
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "FirstName": "dima",
//         "LastName": "med1",
//         "Supervisor": "no",
//         "Email": ""
//     }
router.get('/floors/:floorId/rooms/:roomId', function (req, res) {
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

//return room detailes from "Rooms" table
// "response": [
//     {
//         "RoomNumber": 1,
//         "FloorNumber": 1,
//         "RoomName": "prof", -can be NULL
//         "Tel": 111, -can be NULL
//         "RoomType": "Sminar",
//         "MaxOccupancy": 2
//     }
router.get('/roomsDetails/:roomId', function (req, res) {
    var roomNum = req.param('roomId')
    if (!roomNum) {

        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("Rooms")
            .where("RoomNumber='" + roomNum + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The room number doesn't exist at the system." });
            }
            else {
                //           console.log(resParam[0]["MaxOccupancy"]);
                res.send({ status: "OK", response: resParam[0] });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


//add people to room
//  "FirstName":"miri",
// "LastName":"Choen",
// "Supervisor":"no",- need to be in check box
// "email":""- can be NULL

router.post('/floors/:floorId/rooms/:roomId/addPerson', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var supervisor = req.body.Supervisor;
    var email = req.body.Email;

    if (!floorNum || !roomNum || !firstName || !lastName || !supervisor || !email) {
        res.send({ status: "failed", response: "failed to add the person to the room." });
        res.end();
    }

    else {
        var query = squel.select().from("PeopleInRoom")
            .where("FloorNum='" + floorNum + "'")
            .where("RoomNum='" + roomNum + "'")
            .where("FirstName='" + firstName + "'")
            .where("LastName='" + lastName + "'")
            .where("Email='" + email + "'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            console.log(resParam);
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "The person already exist at the current room." });
            }

            else {
                var query2 = squel.select().from("Rooms")
                    .where("RoomNumber='" + roomNum + "'")
                    .toString();
                DBUtils.Select(query2).then(function (resParam) {
                    var maxOccupancy = resParam[0]["MaxOccupancy"];
                    var query3 = squel.select().from("PeopleInRoom")
                    .where("FloorNum='" + floorNum + "'")
                    .where("RoomNum='" + roomNum + "'")
                    .toString();
                //check if their is place at the room 
                DBUtils.Select(query3).then(function (resParam1) {
                    console.log(resParam1.length);
                    console.log(maxOccupancy);

                    if (maxOccupancy == resParam1.length) {

                        console.log('There is no place to add people to the room.');
                        res.send({ status: "failed", response: resParam1 });
                    }
                    else {
                        //insert new person to the room
                        var query4 = (squel.insert().into("PeopleInRoom")
                            .set("RoomNum", roomNum)
                            .set("FloorNum", floorNum)
                            .set("FirstName", firstName)
                            .set("LastName", lastName)
                            .set("Supervisor", supervisor)
                            .set("Email", email)
                            .toString());
                        DBUtils.Insert(query4).then(function (resParam) {
                            console.log("The person been added to the room.");
                            res.send({ status: "ok", response: resParam });
                        }).catch(function (resParam) {
                            console.log('Failed to add the person to the room.1');
                            res.send({ status: "failed", response: resParam });

                        });
                    }
                }).catch(function (resParam) {
                    console.log('Failed to add the person to the room.3');
                    res.send({ status: "failed", response: resParam });
                });
      
                }).catch(function (resParam) {
                    console.log('Failed to add the person to the room.3');
                    res.send({ status: "failed", response: resParam });
                });
            }


        }).catch(function (resParam) {
            console.log('Failed to add the person to the room.4');
            res.send({ status: "failed", response: resParam });
        });

    }
});

//delete person from the room- "PeopleInRoom" table
// {
//  "FirstName":"mor",
//  "LastName":"shimon"
// }
router.delete('/floors/:floorId/rooms/:roomId/deletePerson', function (req, res) {
    var floorNum=req.param('floorId');
    var roomNum=req.param('roomId');
    var firstName = req.body.FirstName;
    var lastName=req.body.LastName;
    var email= req.body.Email;
    console.log(firstName);
    console.log(lastName);
    if (!firstName || !lastName || !email) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        //check if the person exist in the room
        var query = squel.select()
            .from("PeopleInRoom")
            .where("FloorNum='"+floorNum+"'")
            .where("RoomNum='"+roomNum+"'")
            .where("Email='"+email+"'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Person doesn't exist in the room." });
            }
            else {
                var query1 = squel.delete()
                    .from("PeopleInRoom")
                    .where("FloorNum='"+floorNum+"'")
                    .where("RoomNum='"+roomNum+"'")
                    .where("Email='"+email+"'")
                    .toString();
                DBUtils.Insert(query1).then(function (resParam) {
                    console.log("The person has been deleted from the room.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log("remove person from the room has been failed.")
                    res.send({ status: "failed", response: resParam });
                });
            }
        }).catch(function (resParam) {
            console.log("remove person from the room has been failed.")
            res.send({ status: "failed", response: resParam });
        });
    }

});


//edit user detail- give me all the fields of the DB
//using "PeopleInRoom" table
//should get at the req the following:
// {
//  "FirstName":"dima",
//  "LastName":"med1",
//  "Supervisor":"no",
//  "Email":""- can be null
// }
router.put('/floors/:floorId/rooms/:roomId/editRoomPeople/:first/:last/:email', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var firstName = req.param('first');
    var lastName = req.param('last');
    var email = req.param('email');
    var firstNameNew = req.body.FirstName;
    var lastNameNew = req.body.LastName;
    var supervisorNew = req.body.Supervisor;
    var emailNew = req.body.Email;

    if (!floorNum || !roomNum || !firstName || !lastName  || !firstNameNew || !lastNameNew || !supervisorNew || !emailNew) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("PeopleInRoom")
            .where("FirstName='" + firstName + "'")
            .where("LastName='"+lastName+"'")
            .where("Email='"+email+"'")
            .toString();
            //check if the person exist in the room
        console.log(query);
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                console.log("Person doesn't exist in the room.");
                res.send({ status: "failed", response: "Person doesn't exist in the room." });
            }
            else {
                var query = (
                    squel.update()
                        .table("PeopleInRoom").where("FirstName='" + firstName + "'")
                        .where("LastName='"+lastName+"'")
                        .where("Email='"+email+"'")
                        .set("FirstName", firstNameNew)
                        .set("LastName", lastNameNew)
                        .set("Supervisor", supervisorNew)
                        .set("Email", emailNew)
                        .toString()
                );
                console.log(query);
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("updated succesufuly.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to update the person in the room.2');
                    res.send({ status: "failed", response: resParam });
                });

            }

        }).catch(function (resParam) {
            console.log('Failed to update the person in the room3');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//get all People at the floor 
// "response": [
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "FirstName": "dima",
//         "LastName": "med1",
//         "Supervisor": "no",
//         "Email": ""
//     },
//     {
//         "RoomNum": 1,
//         "FloorNum": 1,
//         "FirstName": "miri",
//         "LastName": "levi",
//         "Supervisor": "no",
//         "Email": "undefined"
//     },
router.get('/floors/:floorId/users', function (req, res) {
    var floorNum = req.param('floorId')
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value" });
        res.end();
    }
    else {
        //check if table name Equipment (add table)
        var query = squel.select().from("PeopleInRoom")
            .where("FloorNum='" + floorNum + "'")
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
            res.send({ status: "`failed", response: resParam });
        });
    }
});

//return the rooms number at the floor
// "response": [
//     {
//         "RoomNumber": 1
//     },
//     {
//         "RoomNumber": 2
router.get('/floors/:floorId', function (req, res) {
    var floorNum = req.param('floorId')
    if (!floorNum) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("(" + squel.select().from("PeopleInRoom") + ") pir")
        .right_join("Rooms", null, "Rooms.FloorNumber = pir.FloorNum and Rooms.RoomNumber = pir.RoomNum")
            .where("FloorNumber='" + floorNum + "'").order("RoomNumber")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "floor number doesn't exist." });
            }
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute.');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


// router.get('/floors/:floorId/equipment', function (req, res) {
//     console.log(req);
//     var floorNum = req.param('floorId')
//     if (!floorNum) {
//         res.send({ status: "Failed", response: "Invalid value." });
//         res.end();
//         console.log(floorNum);
//     }
//     else {
//         var query = squel.select().from("(" + squel.select().from("EquipmentInRoom") + ") eir")
//         .right_join("Rooms", null, "Rooms.FloorNumber = eir.FloorNum and Rooms.RoomNumber = eir.RoomNum")
//             .where("FloorNumber='" + floorNum + "'").order("RoomNumber")
//             .toString();
//         DBUtils.Select(query).then(function (resParam) {
//             if (resParam.length == 0) {
//                 res.send({ status: "failed", response: "floor number doesn't exist." });
//             }
//             else {
//                 res.send({ status: "OK", response: resParam });
//             }
//         }).catch(function (resParam) {
//             console.log('Failed to excute.');
//             res.send({ status: "`failed", response: resParam });
//         });
//     }
// });

//edit the room detail (not people in room)
//using "Rooms" table
//should get at the req the following:
// {
//  "RoomNumber":"1",
//  "FloorNumber":"0",
//  "RoomName":"חדר", can be NULL
//  "Tel":"12", can be NULL
//  "RoomType":"seminar",
//  "MaxOccupancy":"10"
// }
router.put('/floors/:floorId/rooms/:roomId/editRoomDetails', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var roomNumNew = req.body.RoomNumber;
    var floorNumNew=req.body.FloorNumber;
    var roomNameNew=req.body.RoomName;
    var telNew=req.body.Tel;
    var roomTypeNew=req.body.RoomType;
    var maxOccNew=req.body.MaxOccupancy;
    console.log(floorNum);
    console.log(roomNum);

    console.log(roomNumNew);
    console.log(floorNumNew);
    console.log(roomNameNew);
    console.log(telNew);
    console.log(roomTypeNew);
    console.log(maxOccNew);



    if (!floorNum || !roomNum || !roomNumNew || !floorNumNew  || !roomTypeNew || !maxOccNew) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("Rooms")
            .where("FloorNumber='" + floorNum + "'")
            .where("RoomNumber='"+roomNum+"'")
            .toString();
            //check if the room exist in the system
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Room doesn't exist in the system." });
            }
            else {
                var query = (
                    squel.update()
                        .table("Rooms").where("RoomNumber='" + roomNum + "'")
                        .where("FloorNumber='"+floorNum+"'")
                        .set("RoomNumber", roomNumNew)
                        .set("FloorNumber", floorNumNew)
                        .set("RoomName", roomNameNew)
                        .set("Tel", telNew)
                        .set("RoomType",roomTypeNew)
                        .set("MaxOccupancy", maxOccNew)
                        .toString()
                );
                console.log(query);
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("updated succesufuly.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to update the room details.');
                    res.send({ status: "failed", response: resParam });
                });

            }

        }).catch(function (resParam) {
            console.log('Failed to update the room details.');
            res.send({ status: "failed", response: resParam });
        });
    }
});

module.exports = router;



// var port = 4000;
// app.listen(port, function () {
//     console.log('listening to port: ' + port);
// });


