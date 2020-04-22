const {MongoClient} = require('mongodb');
require('dotenv').config();

async function main(){
    // const uri = "mongodb+srv://abrar:pa55word@usersignup-ewwmc.mongodb.net/test?retryWrites=true&w=majority";
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@usersignup-ewwmc.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    // databasesList = await client.getDB("Dashoard-APIs");
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Help docs:
// https://github.com/mongodb-developer/nodejs-quickstart/blob/master/connection.js
// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database