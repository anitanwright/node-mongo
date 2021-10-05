// acts as a client for the mongo server
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert').strict;
// sets up the connection to the server
const url = 'mongodb://localhost:27017/';
// name of the database we are connecting to
const dbname = 'nucampsite';

// allows us to connect the mongo client with the mongo db server with 3 paramaters
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    // use to check for any errors
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');
    // passing in the dbname to this db method. Obj will use a set of methods to interact with the database.
    const db = client.db(dbname);
    // droping the current collection from the database with a method that takes 'name' as first arg, callback func as second (err, result)

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result); // should say true if successful
        
        //recreate the campsite collection
        const collection = db.collection('campsites');
        // inserting document into the collection using the collection obj using a method with two args, string and callback func
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => { // sec arg- callback func
            assert.strictEqual(err, null);
            // will print all documents to the console
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});

// this code uses nested callbacks because this is an async operation. 
