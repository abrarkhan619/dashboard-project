const { MongoClient } = require('mongodb');
require('dotenv').config();


async function main() {
    
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@usersignup-ewwmc.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Find the listing named "TCS" that we created in create.js
        await findService(client, "TCS");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print a listing with the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 *       It's best to use findOne when querying on fields that are guaranteed to be unique.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} service The name of the listing you want to find
 */
async function findService(client, service) {
    // See http://bit.ly/Node_findOne for the findOne() docs
    const result = await client.db("Dashboard-APIs").collection("APIs").findOne({ name: service });

    if (result) {
        console.log(`Found a service in the collection with the name '${service}':`);
        console.log(result);
    } else {
        console.log(`No service found with the name '${service}'`);
    }
}

// Help docs:
// https://developer.mongodb.com/quickstart/node-crud-tutorial
// https://github.com/mongodb-developer/nodejs-quickstart/blob/master/read.js
