var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));



app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'dist/index.html'));
});


var equip = require('./Server/Equipment');
var rooms = require('./Server/Rooms');
var users = require('./Server/Users');

app.use('/', equip);
app.use('/', rooms);
app.use('/', users);

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});
