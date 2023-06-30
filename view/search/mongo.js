const mongoose = require('mongoose');

// Connect to mongodb ** only when searched, don't wanna connect if no search
var CONFIG = require('../../config.json');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://'+CONFIG.mUser+':'+CONFIG.mPass+'@pmcluster.kpll3ey.mongodb.net/';

async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Successfully connected");
        // [List the databases] //
        //await listDatabases(client);
        // [Add new location] // 
        /*await createListing(client,{
            _id: "Arkansas"
        })*/
        // [Find location by name] //
        await FindLocations(client, "ble");
    } catch (error){
        console.log(error);
    } finally {
        await client.close();
    }
};

async function FindLocations(client, location){
    const cursor = await client.db("Locations").collection("Names").find({_id:location}).sort();
    const result = await cursor.toArray();
    if(result.length > 0){
        result.forEach(id => {
            console.log(id);
        })
    } else{
        console.log("None found");
    }
}

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

module.exports.connect = connect;