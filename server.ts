// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');  

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

var squel = require("squel");
var DBUtils = require('./DBUtils');
var bodyParser = require('body-parser');
var moment = require('moment');
var cors = require('cors');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

app.get('/floors/:floorId/rooms/:roomId', (req, res) => {
  var floorNum=req.param('floorId')
     var roomNum= req.param('roomId')
     if(!floorNum || !roomNum){

         res.send({status:"Failed", response:"Invalid value"});
         res.end();
     }
     else{
         var query=squel.select().from("Rooms")
         .where("FloorNumber='"+floorNum+"'")
         .where("RoomNumber='"+roomNum+"'")
         .toString();
         DBUtils.Select(query).then(function(resParam){
             if(resParam.length==0){
                 res.send({status:"failed",response:"No floor number or room number"});
             }
             else{
                 res.send({status:"OK",response:resParam});
             }
         }).catch(function(resParam){
             console.log('Failed to excute');
             res.send({status:"`failed",response:resParam});
         });
     }
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
