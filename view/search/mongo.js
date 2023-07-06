const mongoose = require('mongoose');

// Connect to mongodb ** only when searched, don't wanna connect if no search
const { MongoClient } = require('mongodb');
var CONFIG = require('../../config.json');
const uri = 'mongodb+srv://'+CONFIG.mUser+':'+CONFIG.mPass+'@pmcluster.kpll3ey.mongodb.net/';


/**
 * Connect to the mongo database then call folowup functions [FindLocations, createListing, listDatabases]
 */
async function connectAdd(loc) {
    const client = new MongoClient(uri);
/*    if (typeof loc == 'string'){
        return null
    }*/
    try {
        await client.connect();
        console.log("Successfully connected");
        // Find location
        await FindLocations(client, loc);
    } catch (error){
        console.log(error);
    } finally {
        await client.close();
    }
};

/**
 * Find all entries in database that matches input "location"
 */
async function FindLocations(client, location){
    location = location.toLowerCase();
    const cursor = await client.db("Locations").collection("Names").find({State:location}).sort();
    const result = await cursor.toArray();
    if(result.length > 0){
        result.forEach(id => {
            console.log(id);
        })
    } else{
        console.log("None found");
    }
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
module.exports.connectAdd = connectAdd;