const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

// call this method which returns a promise and if it fails, gets called at the catch method at bottom.  Clears out preexisting data
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites')
    //this method now returns a promise and receives the result 
    .then(result => {
        console.log('Dropped Collection:', result);
    })
    //lets you know about the error, but still continues to the next
    .catch(err => console.log('No collection to drop.'));
    //passing 3 args (db, name:, and string'campsites')
    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'campsites');
    })
    // operating on the value of findDocument method's promise
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
            'campsites');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
// this err method will run if the promise rejects 
.catch(err => console.log(err));