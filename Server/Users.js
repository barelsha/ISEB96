//import { exists } from 'fs';

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
var soap = require('soap');


var router = express.Router();


//check if the username exist in the university
//"Username":"linoykal"
//"Password":"swws",
//"ID":"2222"
router.post('/username/login', function (req, res,next) {
    var username = req.body.Username;
    var password = req.body.Password;
    var id = req.body.ID;

    if (!username || !password || !id) {
        res.send({ status: "Failed", response: "Missing arguments." });
        res.end();
    }
    else {
        var url = 'http://bgu-cc-msdb.bgu.ac.il/BguAuthWebService/AuthenticationProvider.asmx?wsdl';
        var args = {
            uname: username, pwd: password, id: id
        }

        soap.createClient(url, function (err, client) {
            if (err) {
                throw err;
            }
            else {
                //return if the user valide with the username, password and id of the university 
                client.validateUserWithID(args, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(result.validateUserWithIDResult);
                        if (result.validateUserWithIDResult) {
                            next();
                            //res.send({ status: "OK", response: "The username exist in the system." });
                        }
                        else {
                            res.send({ status: "Failed", response: "The username or password or ID dosen't exist in the system."});
                        }
                    }
                });
            }
        });
    }
});

//check if the user has permission to our system in Users table
//"Username":"linoykal",
//"ID":"33299"
router.post('/username/login', function (req, res) {
    var username = req.body.Username;
    var id = req.body.ID;

    if (!username || !id) {
        res.send({ status: "Failed", response: "Missing arguments." });
        res.end();
    }
    else{
        var query = squel.select().from("Users")
            .where("Username='" + username + "'").where("ID='"+id+"'")
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

//return user details from users table
router.get('/username/:username', function (req, res) {
    var username = req.param('username');
    if(!username){
        res.send({ status: "Failed", response: "Missing arguments." });
        res.end();
    }
    else {
        var query = squel.select().from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "The username dosen't exist in the system." });
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

    


//insert user to the system
//the request body:
// {
// 	"Username":"stavlut",
// 	"ID":"",
// 	"PermissionCode":"admin"
// }
router.post('/username/insertNew/new', function (req, res) {
    var username = req.body.Username;
    var Id = req.body.ID;
    var permission = req.body.PermissionCode;

    if (!username || !Id || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
        res.end();
    }
    else {
        var query = squel.select().from("Users")
            .where("Username='" + username + "'").where("ID='"+Id+"'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "Username already exist in the system." });
            }
            else {
                var query1 = (squel.insert().into("Users")
                    .set("Username", username)
                    .set("ID", Id)
                    .set("PermissionCode", permission)
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
// "Username":"moshecho",
// "ID":"", 
// "PermissionCode":"7"
router.put('/users/editUser/:username', function (req, res) {
    var username = req.param('username');
    var newUsername = req.body.Username;
    var Id = req.body.ID;
    var permission = req.body.PermissionCode;
    if (!username || !Id || !newUsername || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        var query = squel.select()
            .from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Username doesn't exist in the system." });
            }
            else {
                var query = (
                    squel.update()
                        .table("Users").where("Username='" + username + "'")
                        .set("Username", newUsername)
                        .set("ID", Id)
                        .set("PermissionCode", permission)
                        .toString()
                );
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
router.delete('/users/deleteUser/:username', function (req, res) {
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
                res.send({ status: "failed", response: "Username doesn't exist in the system." });
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


module.exports = router;
