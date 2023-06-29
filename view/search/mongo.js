console.log("mongo")
const mongoose = require('mongoose');

// Connect to mongodb ** only when searched, don't wanna connect if no search
var CONFIG = require('../../config.json');
const uri = 'mongodb+srv://'+CONFIG.mUser+':'+CONFIG.mPass+'@pmcluster.kpll3ey.mongodb.net/';

var connect = async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected");

    } catch (error){
        console.log(error);
    }
}

connect()