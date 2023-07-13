const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const router = express.Router();
var mongoDB = require('./view/search/mongo.js');
const ejs = require('ejs')

app.use('/', router);

/**  Express 
 *      Calls all files in view as a static (for css)
*/
app.use(express.static(__dirname+"/view"));
app.use(express.json());

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/view'+'/'+'index.html');
  });

//==================================================================================================//

/**
 * Gets location back from site once user has selected location
 */
app.post('/search', async (req,res) => {
  const location = req.body.parcel;
  console.dir(location)
  try{
    let result = await mongoDB.connectFind(location);
    //console.log("result:  " + result);
    res.send(result);
    //res.redirect(`/listings?data=${encodeURIComponent(JSON.stringify(result))}`);
  } catch (error){
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Render follow-up website
 */
// Set the views directory
app.set('view engine', 'ejs');
// Route handler for '/listings'
app.set('views', path.join(__dirname, 'view'));

app.get('/listings', (req, res) => {
  try {
    const queriedData = JSON.parse(req.query.data);
    console.log(queriedData + "           queried data")
    // Check for data
    if (!queriedData || queriedData.length === 0) {
      throw new Error('Data is missing');
    }
    const data = JSON.parse(queriedData);
    // Render the 'listings' view and pass the queried data
    res.render('listings', { data });
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    res.status(400).send('Bad Request');
  }
});

//==================================================================================================//







/**
 * Start server
 */
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
