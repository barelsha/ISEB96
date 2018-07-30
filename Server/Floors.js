// var express = require('express');
// var bodyParser = require('body-parser');
// var squel = require("squel");
// var app = express();
// var moment = require('moment');
// var DBUtils = require('./DBUtils');
// var cors = require('cors');
// var path = require('path');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
// //app.use("/floor");

// //??//
// //app.use(express.static(__dirname + '/app'));


// // //get all Equipment at the floor 
// // app.get('/floors/:floorId/equipment', function (req, res) {
// //     var floorNum = req.param('floorId')
// //     if (!floorNum) {
// //         res.send({ status: "failed", response: "Invalid value" });
// //         res.end();
// //     }
// //     else {
// //         var query = squel.select().from("EquipmentInRoom")
// //             .where("FloorNum='" + floorNum + "'")
// //             .toString();
// //         DBUtils.Select(query).then(function (resParam) {
// //             if (resParam.length == 0) {
// //                 res.send({ status: "failed", response: "floor number doesn't exist." });
// //             }
// //             else {
// //                 res.send({ status: "ok", response: resParam });
// //             }
// //         }).catch(function (resParam) {
// //             console.log('failed to excute');
// //             res.send({ status: "`failed", response: resParam });
// //         });
// //     }
// // });

// // //get all People at the floor 
// // app.get('/floors/:floorId/users', function (req, res) {
// //     var floorNum = req.param('floorId')
// //     if (!floorNum) {
// //         res.send({ status: "failed", response: "Invalid value" });
// //         res.end();
// //     }
// //     else {
// //         //check if table name Equipment (add table)
// //         var query = squel.select().from("PeopleInRoom")
// //             .where("FloorNum='" + floorNum + "'")
// //             .toString();
// //         DBUtils.Select(query).then(function (resParam) {
// //             if (resParam.length == 0) {
// //                 res.send({ status: "failed", response: "floor number doesn't exist." });
// //             }
// //             else {
// //                 res.send({ status: "ok", response: resParam });
// //             }
// //         }).catch(function (resParam) {
// //             console.log('failed to excute');
// //             res.send({ status: "`failed", response: resParam });
// //         });
// //     }
// // });



// // app.post('/Try',function(req,res){
// //     var id=req.body.ID;
// //     var roomNumber=req.body.RoomNumber;
// //     var date=req.body.Date;
// //     var time=req.body.Time;

// //     var query =(
// //         squel.insert()
// //             .into("OrderRoom")
// //             .set("ID", id)
// //             .set("RoomNumber", roomNumber)
// //             .set("Date", date)
// //             .set("Time", time)
// //             .toString()
// //             );
// //     console.log('builded query '+ query);
// //     DBUtils.Insert(query).then(function(resParam){
// //         console.log('signIn successfully');
// //         res.send({status:"ok", response:resParam});
// //     }).catch(function(resParam){
// //         console.log('signIn failed');
// //         res.send({status:"failed", response:resParam});
// //     });
// // });


// // //Register to the system
// // app.post('/Registration', function (req, res) {
// //     var firstName = req.body.FirstName;
// //     var lastName = req.body.LastName;
// //     var username = req.body.Username;
// //     var password = req.body.Password;
// //     var tel = req.body.Tel;
// //     var Id = req.body.ID;
// //     var Email = req.body.Email;
// //     if (!username || !firstName || !lastName || !password) {
// //         res.send({ status: "failed", response: "Invalid value." });
// //         res.end();
// //     }
// //     else {
// //         var query1 = squel.select().field("Username")
// //             .from("Users").where("Username='" + username + "'")
// //             .toString();
// //         //check if the username alredy exist
// //         DBUtils.Select(query1).then(function (resParam) {
// //             if (resParam.length > 0) {
// //                 res.send({ status: "failed", response: "failed to signIn- user name already exist." });
// //             }
// //             //username doesn't exist in the system
// //             else {

// //                 // var query =(
// //                 //     squel.insert()
// //                 //         .into("Users")
// //                 //         .set("UserName", userName)
// //                 //         .set("Password", password)
// //                 //         .set("FirstName", firstName)
// //                 //         .set("LastName", lastName)
// //                 //         .set("Adress", adress)
// //                 //         .set("City", city)
// //                 //         .set("Phone", phone)
// //                 //         .set("Cellular", cellular)
// //                 //         .set("Mail",mail)
// //                 //         .set("Country",country)
// //                 //         .set("CreditCardNumber", creditCardNumber)
// //                 //         .set("isAdmin",isAdmin)
// //                 //         .set("Question", question)
// //                 //         .set("Answer", answer)
// //                 //         .toString()
// //                 //         );



// //                 var query2 = (squel.insert().into("Users")
// //                     .set("FirstName", firstName).set("LastName", lastName)
// //                     .set("Username", username).set("Password", password)
// //                     .set("Tel", tel).set("ID", Id).set("Email", Email)
// //                     .toString());
// //                 DBUtils.Insert(query2).then(function (resParam) {
// //                     console.log('SignIn successfuly.');
// //                     res.send({ status: "ok", response: resParam });
// //                 }).catch(function (resParam) {
// //                     console.log('signIn failed');
// //                     res.send({ status: "failed", response: resParam });
// //                 });
// //             }
// //         }).catch(function (resParam) {
// //             console.log('signIn failed');
// //             res.send({ status: "failed", response: resParam });
// //         });
// //     }
// // });




// function queryDatabase() {
//     console.log('Reading rows from the Table...');

//     // Read all rows from table
//     request = new Request(
//         "SELECT * FROM Rooms",
//         function (err, rowCount, rows) {
//             console.log(rowCount + ' row(s) returned');
//             process.exit();
//         }
//     );
// }


// // var port = 4000;
// // app.listen(port, function () {
// //    console.log('listening to port: ' + port);
// });