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

//check if the user has premission to connect the system
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
app.post('/username/insertNew/new', function (req, res) {
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var username = req.body.Username;
    var tel= req.body.Tel;
    var Id= req.body.ID;
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
                    .set("Tel",tel)
                    .set("ID",Id)
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

//edit user detail
app.put('/users/editUser/:username',function(req,res){
    var username=req.param.username;
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var newUsername = req.body.Username;
    var tel= req.body.Tel;
    var Id= req.body.ID;
    var email = req.body.Email;
    var permission = req.body.PermissionType;
    if(!username){
        res.send({status:"failed", response:"Invalid value."});
    }
    else{
        var query= squel.select()
        .field("Username")
        .from("Users")
        .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length==0){
                res.send({status:"failed",response:"Failed to edit username."});
            }
            else{
                if(!newUsername){

                }
                var query=(
                    squel.update()
                    .table("Users")
                    .set("FirstName",firstName)
                    .set("LastName",lastName)
                    .set("Username",newUsername)
                    .set("Tel",tel)
                    .set("ID",Id)
                    .set("Email",email)
                    .set("PermissionType",permission)
                    .toString()
                 );
                 DBUtils.Insert(query).then(function(resParam){
                     console.log("updated succesufuly.")
                     res.send({status:"ok",response:resParam});
                 }).catch(function(resParam){
                     console.log('Failed to update username.');
                     res.send({status:"failed",response:resParam});
                 });
                
            }

        }).catch(function(resParam){
            console.log('Failed to update username.');
            res.send({status:"failed",response:resParam});
        });
    }
});




var port = 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});