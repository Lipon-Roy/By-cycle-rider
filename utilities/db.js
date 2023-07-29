const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
    
        await client.connect();
    
        console.log("You successfully connected to MongoDB!");
    } catch(err) {
        await client.close();
        console.log(err.message);
    }
}
run().catch(console.dir);
module.exports = client;