const express = require('express');
const bodyParser = require('body-parser');
const squel = require("squel");
const app = express();
const moment = require('moment');
const DBUtils = require('./DBUtils');
const cors = require('cors');
const path = require('path');
const soap = require('soap');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'private.key'));

const LoginError = {
    UniversityAuthorization: 1,
    SystemAuthorization: 2,
    MissingParameters: 3,
    EnteredCatch: 4,
    properties: {
      1: { description: "didnt pass university authorization", value: 1 },
      2: { description: "didnt pass system authorization", value: 2 },
      3: { description: "missing arguments in http body", value: 3 },
      4: { description: "request route process entered catch scope while run time", value: 4 }
    }
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var router = express.Router();


//check if the username exist in the university
//"Username":"linoykal"
//"Password":"swws",
//"ID":"2222"
router.post('/login', function (req, res,next) {
    let username = req.body.Username;
    let password = req.body.Password;
    let id = req.body.ID;
    
    if (!username || !password || !id) {
        res.json(LoginError.MissingParameters);
        res.end();
    }
    else {
        let url = 'http://bgu-cc-msdb.bgu.ac.il/BguAuthWebService/AuthenticationProvider.asmx?wsdl';
        let args = {
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
                        }
                        else {
                            console.log(LoginError.properties[LoginError.UniversityAuthorization]);
                            res.json(LoginError.UniversityAuthorization);
                            //res.send(LoginError.UniversityAuthorization);
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
router.post('/login', function (req, res) {
    let username = req.body.Username;
    let id = req.body.ID;

    if (!username || !id) {
        console.log(LoginError.properties[LoginError.MissingParameters]);
        res.json(LoginError.MissingParameters);
        res.end();
    }
    else{
        let query = squel.select().from("Users")
            .where("Username='" + username + "'").where("ID='"+id+"'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                console.log(LoginError.properties[LoginError.SystemAuthorization]);
                res.json(LoginError.SystemAuthorization);
            }
            //save the permission type to know what action the user can do
            else {
                console.log(resParam);
                jwt.sign(resParam[0], RSA_PRIVATE_KEY, { expiresIn: '30 days' } ,(err, token) => {
                        res.json({token});
                    }
                );
            }
        }).catch(function (resParam) {
            console.log(LoginError.properties[LoginError.EnteredCatch]);
            res.json(LoginError.EnteredCatch);
        });
    }
});

//return user details from users table
router.get('/username/:username', function (req, res) {
    let username = req.param('username');
    if(!username){
        res.send({ status: "Failed", response: "Missing arguments." });
        res.end();
    }
    else {
        let query = squel.select().from("Users")
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
            res.send({ status: "failed", response: resParam });
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
    let username = req.body.Username;
    let Id = req.body.ID;
    let permission = req.body.PermissionCode;

    if (!username || !Id || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
        res.end();
    }
    else {
        let query = squel.select().from("Users")
            .where("Username='" + username + "'").where("ID='"+Id+"'")
            .toString();

        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length > 0) {
                res.send({ status: "failed", response: "Username already exist in the system." });
            }
            else {
                let query1 = (squel.insert().into("Users")
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
    let username = req.param('username');
    let newUsername = req.body.Username;
    let Id = req.body.ID;
    let permission = req.body.PermissionCode;
    if (!username || !Id || !newUsername || !permission) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        let query = squel.select()
            .from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Username doesn't exist in the system." });
            }
            else {
                let query = (
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
    let username = req.param('username');
    if (!username) {
        res.send({ status: "failed", response: "Invalid value." });
    }
    else {
        //check if the username exist
        let query = squel.select()
            .from("Users")
            .where("Username='" + username + "'")
            .toString();
        DBUtils.Select(query).then(function (resParam) {
            if (resParam.length == 0) {
                res.send({ status: "failed", response: "Username doesn't exist in the system." });
            }
            else {
                let query = squel.delete()
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
