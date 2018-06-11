var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

//var fs= require('fs');
//var data=fs.readFileSync

// Create connection to database
// var config = {
//     userName: 'ise96',
//     password: 'nBah9azm',
//     server: 'ise96building.database.windows.net',
//     requestTimeout: 30000,
//     options: {encrypt: true,database: 'ISE96'}
// };

var config = {
    userName: 'ise96',
    password: 'nBah9azm',
    server: 'ise96building.database.windows.net',
    requestTimeout: 30000,
    options: {encrypt: true,database: 'ISE96'}
};


exports.Select = function(query) {
    return new Promise(function(resolve,reject) {
        connection = new Connection(config);
        var ans = [];
        var properties = [];
        var connection;
        connection.on('connect', function(err) {
            if (err) {
                //console.error('error connecting: ' + err.message);
                reject(err);
            }
            //console.log('connection on');
            var dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    //console.log(err);
                    reject(err);
                }
            });

            dbReq.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName !== null)
                        properties.push(column.colName);
                });
            });
            dbReq.on('row', function (row) {
                var item = {};
                for (i=0; i<row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            dbReq.on('requestCompleted', function () {
                //console.log('request Completed: '+ dbReq.rowCount + ' row(s) returned');
                //console.log(ans);
                connection.close();
                resolve(ans);

            });
            connection.execSql(dbReq);
        });
    });
};

exports.Insert = function(query) {
    return new Promise(function(resolve,reject) {
        connection = new Connection(config);
        var ans = [];
        var properties = [];
        var connection;
        connection.on('connect', function(err) {
            if (err) {
                //console.error('error connecting: ' + err.message);
                reject(err);
            }
            //console.log('connection on');
            var dbReq=new Request(query, function(err,rowCount){
                if(err){
                    console.log(err);
                    reject(err);
                }
            });

            dbReq.on('requestCompleted',function(){
                //console.log('request completed!');
                connection.close();
                var ans=[];
                resolve(ans);
            });
            connection.execSql(dbReq);
        });
    });
};