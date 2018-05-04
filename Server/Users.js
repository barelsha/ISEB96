//import { exists } from 'fs';

var express = require('express');
var router= express.Router();
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
module.exports = router;

//check if the user has premission to connect the system
// "response": [
//     {
//         "FirstName": "shahar",
//         "LastName": "barel",
//         "Username": "barelsha",
//         "Tel": null,
//         "ID": null,
//         "Email": null,
//         "PermissionType": "admin"
//     }
app.get('/username/:user', function (req, res) {
    var username = req.param('user');
    if (!username) {
        res.send({ status: "Failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Username dosen't have permission to log in the system." });
            }
            //save the permission type to know what action the user can do
            else {
                res.send({ status: "OK", response: resParam });
            }
        }).catch(function (resParam) {
            console.log('Failed to excute');
            res.send({ status: "`failed", response: resParam });
        });
    }
});


//insert user to the system
//the request body:
// {
// 	"FirstName":"Stav",
// 	"LastName":"Lut",
// 	"Username":"stavlut",
// 	"Tel":"", -can be NULL
// 	"ID":"", -can be NULL
// 	"Email":"", -can be NULL
// 	"PermissionType":"admin"
// }
app.post('/username/insertNew/new', function (req, res) {
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var username = req.body.Username;
    var tel = req.body.Tel;
    var Id = req.body.ID;
    var email = req.body.Email;
    var permission = req.body.PermissionType;

    if (!username || !firstName || !lastName || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("Users")
            .where("Username='" + username + "'")
            .toString();
        console.log(query);

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "Username already exist in the system." });
            }

            else {
                var query1 = (squel.insert().into("Users")
                    .set("FirstName", firstName)
                    .set("LastName", lastName)
                    .set("Username", username)
                    .set("Tel", tel)
                    .set("ID", Id)
                    .set("Email", email)
                    .set("PermissionType", permission)
                    .toString());
                DBUtils.Insert(query1).then(function (resParam) {

                    console.log("The user have been added succesfuly to the system.");
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to add the user to the system.');
                    res.send({ status: "failed", response: resParam });

                });
            }
        }).catch(function (resParam) {
            console.log('Failed to add the user to the system.');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//edit user detail- give me all the fields of the DB. Using put
//should get at the req th follwing:
// "FirstName":"miri",
// "LastName":"Choen",
// "Username":"moshecho",
// "Tel":"111",- can be NULL
// "ID":"", -can be NULL
// "Email":"", -can be NULL
// "PermissionType":"regular"- from scroll down list- ask Mendy
app.put('/users/editUser/:username', function (req, res) {
    var username = req.param('username');
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var newUsername = req.body.Username;
    var tel = req.body.Tel;
    var Id = req.body.ID;
    var email = req.body.Email;
    var permission = req.body.PermissionType;
    if (!username || !firstName || !lastName || !newUsername || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Usename doesn't exist in the system." });
            }
            else {
                var query = (
                    squel.update()
                        .table("Users").where("Username='" + username + "'")
                        .set("FirstName", firstName)
                        .set("LastName", lastName)
                        .set("Username", newUsername)
                        .set("Tel", tel)
                        .set("ID", Id)
                        .set("Email", email)
                        .set("PermissionType", permission)
                        .toString()
                );
                console.log(query);
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("updated succesufuly.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log('Failed to update username.2');
                    res.send({ status: "failed", response: resParam });
                });

            }

        }).catch(function (resParam) {
            console.log('Failed to update username.3');
            res.send({ status: "failed", response: resParam });
        });
    }
});

//delete user from the system
app.delete('/users/deleteUser/:username', function (req, res) {
    var username = req.param('username');
    if (!username) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        //check if the username exist
        var query = squel.select()
            .from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Usename doesn't exist in the system." });
            }
            else {
                var query = squel.delete()
                    .from("Users")
                    .where("Username='" + username + "'")
                    .toString();
                DBUtils.Insert(query).then(function (resParam) {
                    console.log("removed user.")
                    res.send({ status: "ok", response: resParam });
                }).catch(function (resParam) {
                    console.log("removed user failed.")
                    res.send({ status: "failed", response: resParam });
                });
            }
        }).catch(function (resParam) {
            console.log("removed user failed.")
            res.send({ status: "failed", response: resParam });
        });
    }
});



var port = 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});