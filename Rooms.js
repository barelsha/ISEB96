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

app.use(express.static(path.join(__dirname, 'dist')));



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

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
app.get('/roomsDetails/:roomId', function (req, res) {
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
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


//add people to room
//	"FirstName":"miri",
// "LastName":"Choen",
// "Supervisor":"no",- need to be in check box
// "email":""- can be NULL

app.post('/floors/:floorId/rooms/:roomId/addPerson', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var supervisor = req.body.Supervisor;
    var email = req.body.Email;

    if (!floorNum || !roomNum || !firstName || !lastName || !supervisor) {
        res.send({ status: "failed", response: "failed to add the person to the room." });
        res.end();
    }

    else {
        var query = squel.select().from("PeopleInRoom")
            .where("FloorNum='" + floorNum + "'")
            .where("RoomNum='" + roomNum + "'")
            .where("FirstName='" + firstName + "'")
            .where("LastName='" + lastName + "'")
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
// 	"FirstName":"mor",
// 	"LastName":"shimon"
// }
app.delete('/floors/:floorId/rooms/:roomId/deletePerson', function (req, res) {
    var floorNum=req.param('floorId');
    var roomNum=req.param('roomId');
    var firstName = req.body.FirstName;
    var lastName=req.body.LastName;
    if (!firstName || !lastName) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        //check if the person exist in the room
        var query = squel.select()
            .from("PeopleInRoom")
            .where("FloorNum='"+floorNum+"'")
            .where("RoomNum='"+roomNum+"'")
            .where("FirstName='" + firstName + "'")
            .where("LastName='"+lastName+"'")
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
                    .where("FirstName='" + firstName + "'")
                    .where("LastName='"+lastName+"'")
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
// 	"FirstName":"dima",
// 	"LastName":"med1",
// 	"Supervisor":"no",
// 	"Email":""- can be null
// }
app.put('/floors/:floorId/rooms/:roomId/editRoomPeople/:first/:last', function (req, res) {
    var floorNum = req.param('floorId');
    var roomNum = req.param('roomId');
    var firstName = req.param('first');
    var lastName = req.param('last');
    var firstNameNew = req.body.FirstName;
    var lastNameNew = req.body.LastName;
    var supervisorNew = req.body.Supervisor;
    var emailNew = req.body.Email;

    if (!floorNum || !roomNum || !firstName || !lastName  || !firstNameNew || !lastNameNew || !supervisorNew) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("PeopleInRoom")
            .where("FirstName='" + firstName + "'")
            .where("LastName='"+lastName+"'")
            .toString();
            //check if the person exist in the room
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Person doesn't exist in the room." });
            }
            else {
                var query = (
                    squel.update()
                        .table("PeopleInRoom").where("FirstName='" + firstName + "'")
                        .where("LastName='"+lastName+"'")
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
app.get('/floors/:floorId/users', function (req, res) {
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





var port = 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});


