const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const router = express.Router();

// Connect to mongodb
var CONFIG = require('./config.json');
const uri = 'mongodb+srv://'+CONFIG.mUser+':'+CONFIG.mPass+'@pmcluster.kpll3ey.mongodb.net/';

async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected");
    } catch (error){
        console.log(error);
    }
}

// express
app.use(express.static(__dirname+"/view"));

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/'+'index.html');
  });

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
connect();