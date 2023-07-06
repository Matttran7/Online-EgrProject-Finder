const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const router = express.Router();
var mongoDB = require('./view/search/mongo.js');

app.use('/', router);

/**  Express 
 *      Calls all files in view as a static (for css)
*/
app.use(express.static(__dirname+"/view"));
app.use(express.json());

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/view'+'/'+'index.html');
  });

app.get('/listings',function(req,res) {
  res.sendFile(__dirname+'/view'+'/'+'listings.html');
});

/**
 * Gets location back from site once user has selected location
 */
app.post('/search',(req,res) => {
  const { parcel } = req.body;
  RedirectToListings(parcel);
});

/**
 * After user selected location, get data and redirect user to follow-up page
 */
async function RedirectToListings(parcel){
  // connect to mongodb and find all entries matching "parcel"
  await mongoDB.connectAdd(parcel);
}

/**
 * Start server
 */
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
