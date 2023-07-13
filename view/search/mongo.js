const mongoose = require('mongoose');

// Connect to mongodb ** only when searched, don't wanna connect if no search
const { MongoClient } = require('mongodb');
var CONFIG = require('../../config.json');
const uri = 'mongodb+srv://'+CONFIG.mUser+':'+CONFIG.mPass+'@pmcluster.kpll3ey.mongodb.net/';


/**
 * Connect to the mongo database then call folowup functions [FindLocations, createListing, listDatabases]
 */
async function connectFind(loc) {
    const client = new MongoClient(uri);
    let res_list = null;
    if (typeof loc != 'string'){
        loc = ""; // empty str
    }
    try {
        await client.connect();
        console.log("Successfully connected");
        // Find location
        res_list = await FindLocations(client, loc);
        /**
         * Should then call a GET function to send data to client (should it be through app.js)
         */
    } catch (error){
        console.log(error);
    } finally {
        await client.close();
        //console.log(JSON.stringify(res_list)+ "<<----- res_list")
        return JSON.stringify(res_list);
    }
};

/**
 * Find all entries in database that matches input "location"
 */
var searched_list = require('./search_list.js');
async function FindLocations(client, location){
    let res_list = [];
    location = location.toLowerCase();

    const cursor = await client.db("Locations").collection("Names").find({State:location}).sort();
    const result = await cursor.toArray();
    if(result.length > 0){
        result.forEach(id => {
            res_list.push(id);
        })
    } else{
        console.log("None found");
    }
    return res_list
}

/**
 * add new listing to the "Locations" database
 * await createListing(client,{
 *          _id: "Arkansas"       
 *      })
 */
async function createListing(client, newListing){
   const result = await client.db("Locations").collection("Names").insertOne(newListing);
   console.log(result);
}

async function listDatabases (client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("DATABASES:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
};

/**
 * Export functions
 */
module.exports.connectFind = connectFind;