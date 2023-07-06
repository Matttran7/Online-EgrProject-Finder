const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const router = express.Router();
var mongoDB = require('./view/search/mongo.js');


/**  Express 
 *      Calls all files in view as a static (for css)
*/
app.use(express.static(__dirname+"/view"));
app.use(express.json());

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/view'+'/'+'index.html');
  });

/**
 * Gets location back from site once user has selected location
 */
app.post('/search',(req,res) => {
  const { parcel } = req.body;
  // connect to mongodb and find all entries matching "parcel"
  mongoDB.connectAdd(parcel);
});

/**
 * Start server
 */
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
